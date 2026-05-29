import React, { useState, useEffect, useRef } from 'react'
import Layout from './components/Layout.jsx'
import SvgMap from './components/SvgMap.jsx'
import RegionSidebar from './components/RegionSidebar.jsx'
import MicroDetail from './components/MicroDetail.jsx'
import { allMicroRegions } from './data/index.js'
import { megaregions } from './data/mapData.js'
import { microRegionPaths } from './data/microRegionPaths.js'

export default function App() {
  const [activeMegaregionId, setActiveMegaregionId]       = useState(null)
  const [activeMicroId, setActiveMicroId]                 = useState(null)
  const [highlightedMicroId, setHighlightedMicroId]       = useState(null)
  const [highlightedMegaregionId, setHighlightedMegaregionId] = useState(null)

  // MAP pin "View Region →" → navigate to detail page
  function handleMapSelectMicro(microId) {
    const micro = allMicroRegions.find(m => m.id === microId)
    if (micro) {
      setActiveMegaregionId(micro.megaregionId)
      setActiveMicroId(microId)
      setHighlightedMicroId(null)
      setHighlightedMegaregionId(null)
    }
  }

  // MAP shape click → highlight on map + expand in tree, no navigate
  function handleMapShapeHighlight(microId) {
    setHighlightedMegaregionId(null)
    const micro = allMicroRegions.find(m => m.id === microId)
    if (micro) setActiveMegaregionId(micro.megaregionId)
    setHighlightedMicroId(prev => prev === microId ? null : microId)
  }

  // TREE megaregion click → expand/collapse + highlight all its micro-regions
  function handleSelectMegaregion(id) {
    const isOpen = activeMegaregionId === id
    setActiveMegaregionId(isOpen ? null : id)
    setHighlightedMicroId(null)
    setHighlightedMegaregionId(prev => prev === id ? null : id)
  }

  // TREE micro-region click:
  //   • If detail page is open → change the report
  //   • If map is showing → highlight on map
  function handleTreeSelectMicro(id) {
    setHighlightedMegaregionId(null)
    if (activeMicro) {
      // Already on detail page — just switch to new micro-region
      const micro = allMicroRegions.find(m => m.id === id)
      if (micro) setActiveMegaregionId(micro.megaregionId)
      setActiveMicroId(id)
      return
    }
    // Map is showing — highlight only
    if (id === highlightedMicroId) { setHighlightedMicroId(null); return }
    const micro = allMicroRegions.find(m => m.id === id)
    if (micro) setActiveMegaregionId(micro.megaregionId)
    setHighlightedMicroId(id)
  }

  // DETAIL prev/next navigation
  function handleDetailSelectMicro(id) {
    const micro = allMicroRegions.find(m => m.id === id)
    if (micro) setActiveMegaregionId(micro.megaregionId)
    setActiveMicroId(id)
  }

  function handleBackToMap() {
    setActiveMicroId(null)
    setActiveMegaregionId(null)
    setHighlightedMicroId(null)
    setHighlightedMegaregionId(null)
  }

  const activeMicro = allMicroRegions.find(m => m.id === activeMicroId) || null
  const microList   = allMicroRegions.filter(m => m.megaregionId === activeMegaregionId)

  const main = activeMicro ? (
    <MicroDetail
      microRegion={activeMicro}
      megaregionId={activeMegaregionId}
      siblingRegions={microList}
      activeMicroId={activeMicroId}
      onBack={handleBackToMap}
      onSelectMicro={handleDetailSelectMicro}
    />
  ) : (
    <MapPanel
      onSelectMicro={handleMapSelectMicro}
      onShapeHighlight={handleMapShapeHighlight}
      highlightedMicroId={highlightedMicroId}
      highlightedMegaregionId={highlightedMegaregionId}
    />
  )

  return (
    <Layout
      nav={
        <RegionSidebar
          allMicroRegions={allMicroRegions}
          activeMegaregionId={activeMegaregionId}
          activeMicroId={highlightedMicroId || activeMicroId}
          onSelectMegaregion={handleSelectMegaregion}
          onSelectMicro={handleTreeSelectMicro}
        />
      }
      main={main}
    />
  )
}

// ── Map panel with title + zoomable SVG ─────────────────────────
function MapPanel({ onSelectMicro, onShapeHighlight, highlightedMicroId, highlightedMegaregionId }) {
  const [scale, setScale]   = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const [dragStart, setDragStart] = useState(null)
  const mapRef = useRef(null)

  // Zoom + pan to a specific micro-region
  useEffect(() => {
    if (!highlightedMicroId || !mapRef.current) return
    const region = microRegionPaths.find(r => r.id === highlightedMicroId)
    if (!region || region.cx === 0) return
    const { width: W, height: H } = mapRef.current.getBoundingClientRect()
    const svgRatio = Math.min(W / 960, H / 600)
    const targetZ  = 4
    setScale(targetZ)
    setOffset({ x: targetZ * svgRatio * (480 - region.cx),
                y: targetZ * svgRatio * (300 - region.cy) })
  }, [highlightedMicroId])

  // Zoom + pan to show the entire megaregion
  useEffect(() => {
    if (!highlightedMegaregionId || !mapRef.current) return
    const regions = microRegionPaths.filter(r => {
      // look up via allMicroRegions
      const m = allMicroRegions.find(m => m.id === r.id)
      return m?.megaregionId === highlightedMegaregionId && r.cx > 0
    })
    if (!regions.length) return

    const xs = regions.map(r => r.cx)
    const ys = regions.map(r => r.cy)
    const cx = (Math.min(...xs) + Math.max(...xs)) / 2
    const cy = (Math.min(...ys) + Math.max(...ys)) / 2
    const spanX = Math.max(...xs) - Math.min(...xs)
    const spanY = Math.max(...ys) - Math.min(...ys)

    const { width: W, height: H } = mapRef.current.getBoundingClientRect()
    const svgRatio = Math.min(W / 960, H / 600)

    // Choose zoom so the megaregion's bounding box fills ~65% of the viewport
    const zX = (W * 0.65) / ((spanX + 60) * svgRatio)
    const zY = (H * 0.65) / ((spanY + 60) * svgRatio)
    const targetZ = Math.min(6, Math.max(1.5, Math.min(zX, zY)))

    setScale(targetZ)
    setOffset({ x: targetZ * svgRatio * (480 - cx),
                y: targetZ * svgRatio * (300 - cy) })
  }, [highlightedMegaregionId])

  // Prevent accidental click-navigation right after a scroll/zoom gesture.
  const scrollLocked = useRef(false)
  const scrollTimer  = useRef(null)

  // Wrapped handler: silently drops clicks that arrive within 500ms of a scroll
  function handleMapClick(microId) {
    if (scrollLocked.current) return
    onSelectMicro(microId)
  }

  function handleWheel(e) {
    e.preventDefault()
    // Lock out clicks immediately on any scroll event
    scrollLocked.current = true
    clearTimeout(scrollTimer.current)
    scrollTimer.current = setTimeout(() => { scrollLocked.current = false }, 500)

    const factor = e.deltaY < 0 ? 1.15 : 1 / 1.15
    setScale(s => Math.max(1, Math.min(8, s * factor)))
  }

  function handleMouseDown(e) {
    if (scale <= 1) return
    setDragging(true)
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y })
  }

  function handleMouseMove(e) {
    if (!dragging || !dragStart) return
    setOffset({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y })
  }

  function handleMouseUp() { setDragging(false); setDragStart(null) }

  function handleTouchStart(e) {
    if (e.touches.length === 1 && scale > 1) {
      setDragging(true)
      setDragStart({ x: e.touches[0].clientX - offset.x, y: e.touches[0].clientY - offset.y })
    }
  }

  function handleTouchMove(e) {
    if (!dragging || !dragStart || e.touches.length !== 1) return
    e.preventDefault()
    setOffset({ x: e.touches[0].clientX - dragStart.x, y: e.touches[0].clientY - dragStart.y })
  }

  function resetZoom() { setScale(1); setOffset({ x: 0, y: 0 }) }

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', background:'#7aabca', overflow:'hidden' }}>

      {/* ── Flashy editorial title ─────────────────────────── */}
      <div style={{
        flexShrink: 0,
        padding: '0.7rem 1.5rem 0.6rem',
        background: 'linear-gradient(135deg, rgba(10,6,2,0.72) 0%, rgba(30,20,8,0.60) 100%)',
        backdropFilter: 'blur(6px)',
        borderBottom: '1px solid rgba(255,255,255,0.10)',
        display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
      }}>
        <div>
          <span style={{
            fontFamily: 'Georgia,"Times New Roman",serif',
            fontSize: '1.15rem', fontWeight: 700,
            letterSpacing: '0.35em', textTransform: 'uppercase',
            color: '#f0e4d0',
          }}>
            American Culinary Atlas
          </span>
          <span style={{
            fontFamily: '"Courier New",monospace',
            fontSize: '0.6rem', letterSpacing: '0.12em',
            color: 'rgba(240,228,208,0.45)', marginLeft: '1.2rem',
          }}>
            76 micro-regions · click any zone to explore
          </span>
        </div>

        {/* Zoom controls */}
        <div style={{ display:'flex', alignItems:'center', gap:6 }}>

          {/* Centre map — always visible */}
          <button
            onClick={resetZoom}
            title="Centre map"
            style={{
              width:28, height:28, borderRadius:4, display:'flex',
              alignItems:'center', justifyContent:'center',
              background: scale > 1 ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.07)',
              border:'1px solid rgba(255,255,255,0.22)',
              color:'rgba(240,228,208,0.8)', cursor:'pointer',
              transition:'background 0.15s',
            }}
          >
            {/* Crosshair / centre icon */}
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
              onClick={() => setScale(s => Math.max(1, Math.min(8, s * factor)))}
              style={{
                width: 26, height: 26, borderRadius: 4, fontSize: '1rem', fontWeight: 700,
                background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
                color: 'rgba(240,228,208,0.8)', cursor: 'pointer', lineHeight: 1,
              }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Zoomable map canvas ────────────────────────────── */}
      <div
        ref={mapRef}
        style={{ flex: 1, overflow:'hidden', cursor: scale > 1 ? (dragging ? 'grabbing' : 'grab') : 'default' }}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        <div style={{
          width: '100%', height: '100%',
          transform: `scale(${scale}) translate(${offset.x / scale}px, ${offset.y / scale}px)`,
          transformOrigin: 'center center',
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
