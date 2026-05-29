import React, { useState, useEffect, useRef } from 'react'
import Layout from './components/Layout.jsx'
import SvgMap from './components/SvgMap.jsx'
import RegionSidebar from './components/RegionSidebar.jsx'
import MicroDetail from './components/MicroDetail.jsx'
import { AllMegaregionsGrid } from './components/DetailCanvas.jsx'
import { allMicroRegions } from './data/index.js'
import { megaregions } from './data/mapData.js'
import { microRegionPaths } from './data/microRegionPaths.js'

// ── URL hash routing ─────────────────────────────────────────────
// Format: #micro/{id}
function getMicroIdFromHash() {
  const hash = window.location.hash
  const m = hash.match(/^#micro\/(.+)$/)
  return m ? decodeURIComponent(m[1]) : null
}
function setHash(microId) {
  const hash = microId ? `#micro/${encodeURIComponent(microId)}` : '#'
  window.history.pushState({ microId: microId || null }, '', hash)
}

export default function App() {
  // Initialise from URL on first load (handles refresh)
  const [activeMegaregionId, setActiveMegaregionId]           = useState(null)
  const [activeMicroId, setActiveMicroId]                     = useState(() => {
    const id = getMicroIdFromHash()
    if (id && allMicroRegions.find(m => m.id === id)) return id
    return null
  })
  const [highlightedMicroId, setHighlightedMicroId]           = useState(null)
  const [highlightedMegaregionId, setHighlightedMegaregionId] = useState(null)

  // Keep activeMegaregionId in sync with active micro on init
  useEffect(() => {
    if (activeMicroId) {
      const micro = allMicroRegions.find(m => m.id === activeMicroId)
      if (micro) setActiveMegaregionId(micro.megaregionId)
    }
  }, []) // eslint-disable-line

  // Sync URL → state when user presses browser back/forward
  useEffect(() => {
    function onPop(e) {
      const microId = e.state?.microId ?? getMicroIdFromHash()
      if (microId && allMicroRegions.find(m => m.id === microId)) {
        const micro = allMicroRegions.find(m => m.id === microId)
        setActiveMegaregionId(micro.megaregionId)
        setActiveMicroId(microId)
      } else {
        // Back to map
        setActiveMicroId(null)
        setHighlightedMicroId(null)
        setHighlightedMegaregionId(null)
      }
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  // ── Navigation helpers ─────────────────────────────────────────
  function goToMicro(microId) {
    const micro = allMicroRegions.find(m => m.id === microId)
    if (!micro) return
    setActiveMegaregionId(micro.megaregionId)
    setActiveMicroId(microId)
    setHighlightedMicroId(null)
    setHighlightedMegaregionId(null)
    setHash(microId)
  }

  function backToMap() {
    setActiveMicroId(null)
    setActiveMegaregionId(null)
    setHighlightedMicroId(null)
    setHighlightedMegaregionId(null)
    setHash(null)
  }

  // MAP pin navigate
  function handleMapSelectMicro(microId) { goToMicro(microId) }

  // MAP shape click → highlight only
  function handleMapShapeHighlight(microId) {
    setHighlightedMegaregionId(null)
    const micro = allMicroRegions.find(m => m.id === microId)
    if (micro) setActiveMegaregionId(micro.megaregionId)
    setHighlightedMicroId(prev => prev === microId ? null : microId)
  }

  // TREE megaregion → expand + highlight all
  function handleSelectMegaregion(id) {
    const isOpen = activeMegaregionId === id
    setActiveMegaregionId(isOpen ? null : id)
    setHighlightedMicroId(null)
    setHighlightedMegaregionId(prev => prev === id ? null : id)
  }

  // TREE micro → navigate if detail open, highlight if map showing
  function handleTreeSelectMicro(id) {
    setHighlightedMegaregionId(null)
    if (activeMicro) { goToMicro(id); return }
    if (id === highlightedMicroId) { setHighlightedMicroId(null); return }
    const micro = allMicroRegions.find(m => m.id === id)
    if (micro) setActiveMegaregionId(micro.megaregionId)
    setHighlightedMicroId(id)
  }

  const activeMicro = allMicroRegions.find(m => m.id === activeMicroId) || null
  const microList   = allMicroRegions.filter(m => m.megaregionId === activeMegaregionId)

  // ── Full-page detail view ──────────────────────────────────────
  if (activeMicro) {
    return (
      <MicroDetail
        microRegion={activeMicro}
        megaregionId={activeMegaregionId}
        siblingRegions={microList}
        activeMicroId={activeMicroId}
        onBack={backToMap}
        onSelectMicro={goToMicro}
      />
    )
  }

  // ── Map layout ─────────────────────────────────────────────────
  return (
    <Layout
      nav={
        <RegionSidebar
          allMicroRegions={allMicroRegions}
          activeMegaregionId={activeMegaregionId}
          activeMicroId={highlightedMicroId}
          onSelectMegaregion={handleSelectMegaregion}
          onSelectMicro={handleTreeSelectMicro}
        />
      }
      main={
        <MapPanel
          onSelectMicro={handleMapSelectMicro}
          onShapeHighlight={handleMapShapeHighlight}
          highlightedMicroId={highlightedMicroId}
          highlightedMegaregionId={highlightedMegaregionId}
        />
      }
    />
  )
}

// ── Map panel ────────────────────────────────────────────────────
function MapPanel({ onSelectMicro, onShapeHighlight, highlightedMicroId, highlightedMegaregionId }) {
  const [scale, setScale]   = useState(1)
  const [offset, setOffset] = useState({ x:0, y:0 })
  const [isDragging, setIsDragging] = useState(false)
  const mapRef       = useRef(null)
  const scrollLocked = useRef(false)
  const scrollTimer  = useRef(null)
  const dragRef      = useRef(null)   // { startX, startY, startOx, startOy }

  // Document-level listeners keep drag alive even when mouse leaves the container
  useEffect(() => {
    function onMove(e) {
      if (!dragRef.current) return
      const clientX = e.touches ? e.touches[0].clientX : e.clientX
      const clientY = e.touches ? e.touches[0].clientY : e.clientY
      setOffset({
        x: clientX - dragRef.current.startX,
        y: clientY - dragRef.current.startY,
      })
    }
    function onUp() {
      dragRef.current = null
      setIsDragging(false)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup',   onUp)
    document.addEventListener('touchmove', onMove, { passive: false })
    document.addEventListener('touchend',  onUp)
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup',   onUp)
      document.removeEventListener('touchmove', onMove)
      document.removeEventListener('touchend',  onUp)
    }
  }, [])

  // Zoom to megaregion when highlighted
  useEffect(() => {
    if (!highlightedMegaregionId || !mapRef.current) return
    const regions = microRegionPaths.filter(r => {
      const m = allMicroRegions.find(m => m.id === r.id)
      return m?.megaregionId === highlightedMegaregionId && r.cx > 0
    })
    if (!regions.length) return
    const xs = regions.map(r => r.cx), ys = regions.map(r => r.cy)
    const cx = (Math.min(...xs) + Math.max(...xs)) / 2
    const cy = (Math.min(...ys) + Math.max(...ys)) / 2
    const spanX = Math.max(...xs) - Math.min(...xs)
    const spanY = Math.max(...ys) - Math.min(...ys)
    const { width:W, height:H } = mapRef.current.getBoundingClientRect()
    const svgRatio = Math.min(W/960, H/600)
    const zX = (W*0.65) / ((spanX+60)*svgRatio)
    const zY = (H*0.65) / ((spanY+60)*svgRatio)
    const targetZ = Math.min(6, Math.max(1.5, Math.min(zX,zY)))
    setScale(targetZ)
    setOffset({ x: targetZ*svgRatio*(480-cx), y: targetZ*svgRatio*(300-cy) })
  }, [highlightedMegaregionId])

  function handleMapClick(id) {
    if (!scrollLocked.current) onSelectMicro(id)
  }

  function handleWheel(e) {
    e.preventDefault()
    scrollLocked.current = true
    clearTimeout(scrollTimer.current)
    scrollTimer.current = setTimeout(() => { scrollLocked.current = false }, 500)

    const factor   = e.deltaY < 0 ? 1.15 : 1 / 1.15
    const newScale = Math.max(0.5, Math.min(8, scale * factor))
    const f        = newScale / scale

    const rect = mapRef.current?.getBoundingClientRect()
    if (!rect) { setScale(newScale); return }
    const mx = e.clientX - rect.left
    const my = e.clientY - rect.top

    setScale(newScale)
    setOffset(prev => ({
      x: (1 - f) * (mx - rect.width  / 2) + f * prev.x,
      y: (1 - f) * (my - rect.height / 2) + f * prev.y,
    }))
  }

  function startDrag(clientX, clientY) {
    dragRef.current = {
      startX: clientX - offset.x,
      startY: clientY - offset.y,
    }
    setIsDragging(true)
  }

  function handleMouseDown(e) { startDrag(e.clientX, e.clientY) }
  function handleTouchStart(e) {
    if (e.touches.length === 1) startDrag(e.touches[0].clientX, e.touches[0].clientY)
  }

  function resetZoom() { setScale(1); setOffset({ x:0, y:0 }) }

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%',
                  background:'#7aabca', overflow:'hidden' }}>

      {/* Title bar */}
      <div style={{
        flexShrink:0, padding:'0.65rem 1.25rem',
        background:'linear-gradient(135deg,rgba(10,6,2,0.72),rgba(30,20,8,0.60))',
        backdropFilter:'blur(6px)', borderBottom:'1px solid rgba(255,255,255,0.10)',
        display:'flex', alignItems:'baseline', justifyContent:'space-between',
      }}>
        <div>
          <span style={{ fontFamily:'Georgia,serif', fontSize:'1.1rem', fontWeight:700,
            letterSpacing:'0.32em', textTransform:'uppercase', color:'#f0e4d0' }}>
            American Culinary Atlas
          </span>
          <span style={{ fontFamily:'"Courier New",monospace', fontSize:'0.58rem',
            letterSpacing:'0.12em', color:'rgba(240,228,208,0.42)', marginLeft:'1rem' }}>
            76 micro-regions · hover a pin to explore
          </span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:6 }}>
          <button onClick={resetZoom} title="Centre map" style={{
            width:28, height:28, borderRadius:4, display:'flex',
            alignItems:'center', justifyContent:'center',
            background: scale>1 ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.08)',
            border:'1px solid rgba(255,255,255,0.22)', color:'rgba(240,228,208,0.85)',
            cursor:'pointer',
          }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"
              stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <circle cx="8" cy="8" r="3"/>
              <line x1="8" y1="1" x2="8" y2="4"/>
              <line x1="8" y1="12" x2="8" y2="15"/>
              <line x1="1" y1="8" x2="4" y2="8"/>
              <line x1="12" y1="8" x2="15" y2="8"/>
            </svg>
          </button>
          <div style={{ width:1, height:16, background:'rgba(255,255,255,0.15)' }}/>
          {[['−', 1/1.4], ['+', 1.4]].map(([label, factor]) => (
            <button key={label}
              onClick={() => setScale(s => Math.max(1, Math.min(8, s*factor)))}
              style={{ width:28, height:28, borderRadius:4, fontSize:'1rem', fontWeight:700,
                background:'rgba(255,255,255,0.12)', border:'1px solid rgba(255,255,255,0.22)',
                color:'rgba(240,228,208,0.85)', cursor:'pointer', lineHeight:1 }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Map canvas */}
      <div ref={mapRef}
        style={{ flex:1, overflow:'hidden',
                 cursor: isDragging ? 'grabbing' : 'grab' }}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div style={{
          width:'100%', height:'100%',
          transform:`scale(${scale}) translate(${offset.x/scale}px,${offset.y/scale}px)`,
          transformOrigin:'center center',
          transition: dragging ? 'none' : 'transform 0.15s ease',
        }}>
          <SvgMap
            onSelectMicro={handleMapClick}
            onShapeHighlight={id => { if (!scrollLocked.current) onShapeHighlight(id) }}
            highlightedMicroId={highlightedMicroId}
            highlightedMegaregionId={highlightedMegaregionId}
            zoomScale={scale}
          />
        </div>
      </div>
    </div>
  )
}
