import React, { useState, useEffect, useRef } from 'react'
import Layout from './components/Layout.jsx'
import TerritorMap from './components/TerritorMap.jsx'
import RegionSidebar from './components/RegionSidebar.jsx'
import MicroDetail from './components/MicroDetail.jsx'
import { allMicroRegions } from './data/index.js'
import { megaregions } from './data/mapData.js'

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

  // ── Map layout — full-width, browse panel lives inside the map ─
  return (
    <Layout
      main={
        <TerritorMap
          onSelectMicro={handleMapSelectMicro}
          onShapeHighlight={handleMapShapeHighlight}
          highlightedMicroId={highlightedMicroId}
          highlightedMegaregionId={highlightedMegaregionId}
          allMicroRegions={allMicroRegions}
          activeMegaregionId={activeMegaregionId}
          onSelectMegaregion={handleSelectMegaregion}
          onTreeSelectMicro={handleTreeSelectMicro}
        />
      }
    />
  )
}

