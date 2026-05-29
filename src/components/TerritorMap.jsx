import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { microRegionGeoJSON } from '../data/microRegionGeoJSON.js'
import { allMicroRegions } from '../data/index.js'

// Fix Leaflet's default icon path issue with Vite
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// ── Design tokens ─────────────────────────────────────────────────
const MEGA_HUE = {
  atlantic:210, mid_atlantic:255, appalachian:135, lowcountry:42,
  gulf:165, heartland:25, plains:48, tex_mex:8,
  southwest:22, cascadia:175, california:278,
}
export const ACCENT = {
  atlantic:'#2a6aaa', mid_atlantic:'#5548a0', appalachian:'#2a7838',
  lowcountry:'#a87818', gulf:'#088860', heartland:'#b85820',
  plains:'#8a7a18', tex_mex:'#b82018', southwest:'#b85018',
  cascadia:'#0a7870', california:'#6038a0',
}

const MICRO_TO_MEGA = {}
const MICRO_NAME    = {}
allMicroRegions.forEach(m => {
  MICRO_TO_MEGA[m.id] = m.megaregionId
  MICRO_NAME[m.id]    = m.name
})

// Build one pin colour per micro-region (muted megaregion tint)
function buildPinColors() {
  const byMega = {}
  allMicroRegions.forEach(m => {
    if (!byMega[m.megaregionId]) byMega[m.megaregionId] = []
    byMega[m.megaregionId].push(m.id)
  })
  const c = {}
  Object.entries(byMega).forEach(([megaId, ids]) => {
    const h = MEGA_HUE[megaId] ?? 180
    const n = ids.length
    ids.forEach((id, i) => {
      c[id] = `hsl(${Math.round(n>1 ? h-14+(28/(n-1))*i : h)},42%,42%)`
    })
  })
  return c
}
const PIN_COLOR = buildPinColors()

const US_BOUNDS = [[24.5, -125], [49.5, -66.5]]

// ── Custom pin DivIcon ────────────────────────────────────────────
function makePinIcon(fillColor, selected = false) {
  const w = 24, h = 34
  const fill = selected ? '#c8880e' : fillColor
  const ring = selected ? 'rgba(200,120,0,0.4)' : 'rgba(0,0,0,0.18)'

  return L.divIcon({
    html: `<div style="
        width:${w}px;height:${h}px;
        filter:drop-shadow(0 2px 4px ${ring});
        transform:${selected ? 'scale(1.2)' : 'scale(1)'};
        transform-origin:bottom center;
        transition:transform 0.15s ease;
      ">
      <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 24 34">
        <path d="M12,0 C5.4,0 0,5.4 0,12 C0,19 12,34 12,34 C12,34 24,19 24,12 C24,5.4 18.6,0 12,0 Z"
          fill="${fill}"/>
        <circle cx="12" cy="12" r="5" fill="rgba(255,255,255,0.38)"/>
      </svg>
    </div>`,
    className: '',
    iconSize:   [w, h],
    iconAnchor: [w / 2, h],
    popupAnchor:[0, -(h + 4)],
  })
}

// ── Map view controller (accesses Leaflet map instance) ───────────
function MapController({ mapRef, highlightedMegaregionId, regionLayerRef }) {
  const map = useMap()
  useEffect(() => { mapRef.current = map }, [map, mapRef])

  useEffect(() => {
    if (!highlightedMegaregionId || !regionLayerRef.current) return
    const bounds = []
    regionLayerRef.current.eachLayer(layer => {
      const id = layer.feature?.id
      if (id && MICRO_TO_MEGA[id] === highlightedMegaregionId) {
        try { bounds.push(layer.getBounds()) } catch(e){}
      }
    })
    if (!bounds.length) return
    const combined = bounds.reduce((b, nb) => b.extend(nb), bounds[0])
    map.fitBounds(combined, { padding:[50,50], maxZoom:8, animate:true })
  }, [highlightedMegaregionId, map, regionLayerRef])

  return null
}

// ── Browse panel (search + accordion tree) ───────────────────────
function BrowsePanel({ allMicroRegions, activeMegaregionId, onSelectMegaregion, onTreeSelectMicro, highlightedMicroId, onClose }) {
  const [query, setQuery] = useState('')

  const megaregions = useMemo(() => {
    const map = {}
    allMicroRegions.forEach(m => {
      if (!map[m.megaregionId]) map[m.megaregionId] = { id: m.megaregionId, micros: [] }
      map[m.megaregionId].micros.push(m)
    })
    return Object.values(map)
      .sort((a, b) => {
        const nameA = a.micros[0]?.megaregionId || ''
        const nameB = b.micros[0]?.megaregionId || ''
        return nameA.localeCompare(nameB)
      })
  }, [allMicroRegions])

  // Import megaregion labels
  const MEGA_LABELS = {
    atlantic:'Atlantic New England', mid_atlantic:'Mid-Atlantic',
    appalachian:'Appalachian', lowcountry:'Lowcountry', gulf:'Gulf Coast',
    heartland:'Heartland', plains:'Great Plains', tex_mex:'Tex-Mex Borderlands',
    southwest:'Southwest', cascadia:'Cascadia', california:'California',
  }

  const q = query.toLowerCase().trim()
  const filtered = q
    ? allMicroRegions.filter(m => m.name.toLowerCase().includes(q))
    : null

  return (
    <div style={{
      position:'absolute', top:0, left:0, bottom:0,
      width:280, zIndex:1100,
      background:'rgba(15,11,7,0.94)', backdropFilter:'blur(12px)',
      borderRight:'1px solid rgba(255,255,255,0.08)',
      display:'flex', flexDirection:'column',
      boxShadow:'4px 0 24px rgba(0,0,0,0.4)',
    }}>
      {/* Header */}
      <div style={{ flexShrink:0, padding:'1rem 1rem 0.75rem',
        borderBottom:'1px solid rgba(255,255,255,0.08)',
        display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <span style={{ fontFamily:'Georgia,serif', fontSize:'0.85rem', fontWeight:700,
          letterSpacing:'0.2em', textTransform:'uppercase', color:'#f0e4d0' }}>
          Regions
        </span>
        <button onClick={onClose} style={{ background:'none', border:'none',
          cursor:'pointer', color:'rgba(240,228,208,0.5)', fontSize:'1.1rem',
          lineHeight:1, padding:'2px 4px' }}>✕</button>
      </div>

      {/* Search */}
      <div style={{ flexShrink:0, padding:'0.75rem 1rem',
        borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ position:'relative' }}>
          <svg style={{ position:'absolute', left:9, top:'50%', transform:'translateY(-50%)',
            width:14, height:14, color:'rgba(240,228,208,0.4)', pointerEvents:'none' }}
            fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
          </svg>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search regions…"
            style={{
              width:'100%', padding:'7px 28px 7px 30px',
              background:'rgba(255,255,255,0.07)',
              border:'1px solid rgba(255,255,255,0.12)',
              borderRadius:8, color:'#f0e4d0', fontSize:'0.8rem',
              outline:'none', boxSizing:'border-box',
            }}
          />
          {query && (
            <button onClick={() => setQuery('')} style={{
              position:'absolute', right:8, top:'50%', transform:'translateY(-50%)',
              background:'none', border:'none', cursor:'pointer',
              color:'rgba(240,228,208,0.4)', fontSize:'0.85rem', lineHeight:1,
            }}>✕</button>
          )}
        </div>
      </div>

      {/* List */}
      <div style={{ flex:1, overflowY:'auto' }}>
        {filtered ? (
          /* Search results — flat list */
          filtered.length === 0
            ? <p style={{ color:'rgba(240,228,208,0.4)', fontSize:'0.8rem',
                padding:'1.25rem 1rem', margin:0 }}>No regions match "{query}"</p>
            : filtered.map(m => (
                <button key={m.id}
                  onClick={() => { onTreeSelectMicro(m.id); onClose() }}
                  style={{
                    width:'100%', textAlign:'left', padding:'0.6rem 1rem',
                    background: highlightedMicroId===m.id ? 'rgba(200,136,14,0.18)' : 'transparent',
                    borderLeft: highlightedMicroId===m.id ? '3px solid #c8880e' : '3px solid transparent',
                    border:'none', cursor:'pointer', color:'#e8d8bc', fontSize:'0.8rem',
                  }}>
                  <div style={{ fontWeight:500, marginBottom:2 }}>{m.name}</div>
                  <div style={{ color:'rgba(240,228,208,0.4)', fontSize:'0.7rem' }}>
                    {MEGA_LABELS[m.megaregionId]}
                  </div>
                </button>
              ))
        ) : (
          /* Full accordion tree */
          megaregions.map(({ id, micros }) => {
            const isOpen = activeMegaregionId === id
            const accent = ACCENT[id] || '#888'
            const sorted = [...micros].sort((a,b) => a.name.localeCompare(b.name))
            return (
              <div key={id} style={{ borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
                <button
                  onClick={() => onSelectMegaregion(id)}
                  style={{
                    width:'100%', textAlign:'left',
                    padding:'0.65rem 1rem',
                    background: isOpen ? `${accent}18` : 'transparent',
                    border:'none', cursor:'pointer',
                    display:'flex', alignItems:'center', gap:8,
                  }}>
                  <div style={{ width:8, height:8, borderRadius:'50%',
                    background:accent, flexShrink:0 }}/>
                  <span style={{ flex:1, fontSize:'0.8rem', fontWeight:600,
                    color: isOpen ? '#f0e4d0' : 'rgba(240,228,208,0.7)',
                    overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                    {MEGA_LABELS[id]}
                  </span>
                  <span style={{ fontSize:'0.62rem', color:'rgba(240,228,208,0.35)',
                    fontFamily:'"Courier New",monospace' }}>{micros.length}</span>
                  <svg style={{ width:12, height:12, color:'rgba(240,228,208,0.4)',
                    transform: isOpen ? 'rotate(180deg)' : 'none',
                    transition:'transform 0.2s', flexShrink:0 }}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>

                <div style={{ overflow:'hidden', maxHeight: isOpen ? `${sorted.length * 52}px` : 0,
                  transition:'max-height 0.25s ease' }}>
                  {sorted.map((m, i) => {
                    const active = highlightedMicroId === m.id
                    return (
                      <button key={m.id}
                        onClick={() => { onTreeSelectMicro(m.id); if (window.innerWidth < 768) onClose() }}
                        style={{
                          width:'100%', textAlign:'left',
                          padding:'0.5rem 1rem 0.5rem 1.75rem',
                          background: active ? 'rgba(200,136,14,0.18)' : 'transparent',
                          borderLeft: active ? `3px solid ${accent}` : '3px solid transparent',
                          border:'none', cursor:'pointer',
                        }}>
                        <div style={{ display:'flex', gap:6, alignItems:'baseline' }}>
                          <span style={{ fontFamily:'"Courier New",monospace', fontSize:'0.58rem',
                            color:'rgba(240,228,208,0.25)', flexShrink:0 }}>
                            {String(i+1).padStart(2,'0')}
                          </span>
                          <div>
                            <div style={{ fontSize:'0.75rem', fontWeight: active ? 600 : 400,
                              color: active ? '#f0e4d0' : 'rgba(240,228,208,0.6)',
                              lineHeight:1.3 }}>
                              {m.name}
                            </div>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────
export default function TerritorMap({
  onSelectMicro, onShapeHighlight,
  highlightedMicroId, highlightedMegaregionId,
  allMicroRegions, activeMegaregionId, onSelectMegaregion, onTreeSelectMicro,
}) {
  const [panelOpen, setPanelOpen] = useState(false)
  const mapRef         = useRef(null)
  const regionLayerRef = useRef(null)
  const [hovered, setHovered] = useState(null)

  const zoomIn  = useCallback(() => mapRef.current?.zoomIn(),  [])
  const zoomOut = useCallback(() => mapRef.current?.zoomOut(), [])
  const center  = useCallback(() => mapRef.current?.fitBounds(US_BOUNDS, { padding:[20,20], animate:true }), [])

  // Restyle regions when selection changes
  useEffect(() => {
    if (!regionLayerRef.current) return
    regionLayerRef.current.eachLayer(layer => {
      const id = layer.feature?.id
      if (!id) return
      const selected =
        id === highlightedMicroId ||
        (highlightedMegaregionId && MICRO_TO_MEGA[id] === highlightedMegaregionId)
      layer.setStyle({
        fillColor:   selected ? '#e8a030' : '#d6c9a8',
        fillOpacity: selected ? 0.55 : 0.38,
        color:       selected ? '#c07808' : 'rgba(150,130,95,0.55)',
        weight:      selected ? 1.8 : 0.5,
      })
    })
  }, [highlightedMicroId, highlightedMegaregionId])

  function regionStyle(feature) {
    const id       = feature.id
    const selected =
      id === highlightedMicroId ||
      (highlightedMegaregionId && MICRO_TO_MEGA[id] === highlightedMegaregionId)
    return {
      fillColor:   selected ? '#e8a030' : '#d6c9a8',
      fillOpacity: selected ? 0.55 : 0.38,
      color:       selected ? '#c07808' : 'rgba(150,130,95,0.55)',
      weight:      selected ? 1.8 : 0.5,
    }
  }

  function onEachFeature(feature, layer) {
    layer.on({
      mouseover: () => setHovered(feature.id),
      mouseout:  () => setHovered(null),
      click:     () => onShapeHighlight(feature.id),
    })
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', overflow:'hidden' }}>

      {/* Title bar */}
      <div style={{
        flexShrink:0, padding:'0.6rem 1.25rem',
        background:'linear-gradient(135deg,rgba(10,6,2,0.82),rgba(30,20,8,0.70))',
        backdropFilter:'blur(8px)',
        borderBottom:'1px solid rgba(255,255,255,0.10)',
        display:'flex', alignItems:'center', justifyContent:'space-between',
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          {/* Browse toggle */}
          <button
            onClick={() => setPanelOpen(v => !v)}
            title="Browse all regions"
            style={{
              ...ctrlBtn,
              background: panelOpen ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.10)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"
              stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <line x1="2" y1="4" x2="14" y2="4"/>
              <line x1="2" y1="8" x2="10" y2="8"/>
              <line x1="2" y1="12" x2="12" y2="12"/>
            </svg>
          </button>
          <div>
            <span style={{ fontFamily:'Georgia,serif', fontSize:'1.05rem', fontWeight:700,
              letterSpacing:'0.28em', textTransform:'uppercase', color:'#f0e4d0' }}>
              American Culinary Atlas
            </span>
            <span className="hidden sm:inline" style={{ fontFamily:'"Courier New",monospace', fontSize:'0.58rem',
              letterSpacing:'0.12em', color:'rgba(240,228,208,0.4)', marginLeft:'1rem' }}>
              76 micro-regions · tap a pin to explore
            </span>
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:6 }}>
          <button onClick={center} title="Fit USA" style={ctrlBtn}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"
              stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <circle cx="8" cy="8" r="3"/>
              <line x1="8" y1="1" x2="8" y2="4"/><line x1="8" y1="12" x2="8" y2="15"/>
              <line x1="1" y1="8" x2="4" y2="8"/><line x1="12" y1="8" x2="15" y2="8"/>
            </svg>
          </button>
          <div style={{ width:1, height:16, background:'rgba(255,255,255,0.15)' }}/>
          <button onClick={zoomOut} style={ctrlBtn}>−</button>
          <button onClick={zoomIn}  style={ctrlBtn}>+</button>
        </div>
      </div>

      {/* Leaflet map + optional browse panel overlay */}
      <div style={{ flex:1, position:'relative' }}>
        <MapContainer
          bounds={US_BOUNDS}
          boundsOptions={{ padding:[20,20] }}
          zoomControl={false}
          style={{ width:'100%', height:'100%' }}
          minZoom={3} maxZoom={14}
        >
          {/* CartoDB Voyager — free, no API key, warm and beautiful */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
            subdomains="abcd" maxZoom={19}
          />

          <MapController
            mapRef={mapRef}
            highlightedMegaregionId={highlightedMegaregionId}
            regionLayerRef={regionLayerRef}
          />

          {/* Region fills */}
          <GeoJSON
            key="regions"
            data={microRegionGeoJSON}
            style={regionStyle}
            onEachFeature={onEachFeature}
            ref={regionLayerRef}
          />

          {/* Pins — one per micro-region at geographic centroid */}
          {microRegionGeoJSON.features.map(f => {
            const id       = f.id
            const { lat, lon } = f.properties
            if (!lat || !lon || isNaN(lat) || isNaN(lon)) return null

            const megaId   = MICRO_TO_MEGA[id]
            const accent   = ACCENT[megaId] || '#888'
            const selected =
              id === highlightedMicroId ||
              (highlightedMegaregionId && megaId === highlightedMegaregionId)
            const icon     = makePinIcon(PIN_COLOR[id] || '#7a6a50', selected)
            const name     = MICRO_NAME[id] || id
            const display  = name.length > 28 ? name.slice(0,26)+'…' : name

            return (
              <Marker key={id} position={[lat, lon]} icon={icon}
                eventHandlers={{ click: () => onShapeHighlight(id) }}>
                <Popup>
                  <div style={{ fontFamily:'system-ui,sans-serif', minWidth:155, maxWidth:195 }}>
                    <div style={{ height:4, background:accent,
                      borderRadius:'4px 4px 0 0', margin:'-1px -1px 10px' }}/>
                    <div style={{ fontFamily:'Georgia,serif', fontSize:14,
                      fontWeight:700, color:'#1a1208', lineHeight:1.3, marginBottom:10 }}>
                      {display}
                    </div>
                    <button
                      onClick={() => onSelectMicro(id)}
                      style={{ width:'100%', padding:'7px 0', background:accent,
                        color:'white', border:'none', borderRadius:6,
                        fontSize:12, fontWeight:600, cursor:'pointer',
                        fontFamily:'system-ui,sans-serif', letterSpacing:'0.02em' }}>
                      View Region →
                    </button>
                  </div>
                </Popup>
              </Marker>
            )
          })}
        </MapContainer>

        {/* Browse panel — slides in from left over the map */}
        {panelOpen && (
          <>
            <BrowsePanel
              allMicroRegions={allMicroRegions}
              activeMegaregionId={activeMegaregionId}
              onSelectMegaregion={onSelectMegaregion}
              onTreeSelectMicro={onTreeSelectMicro}
              highlightedMicroId={highlightedMicroId}
              onClose={() => setPanelOpen(false)}
            />
            {/* Scrim — tap outside panel to close */}
            <div
              onClick={() => setPanelOpen(false)}
              style={{ position:'absolute', inset:0, zIndex:1050,
                background:'rgba(0,0,0,0.25)', backdropFilter:'blur(1px)' }}
            />
          </>
        )}

        {/* Hover badge */}
        {hovered && (
          <div style={{
            position:'absolute', bottom:28, left:12, zIndex:1000,
            display:'flex', alignItems:'center', gap:8,
            padding:'5px 14px', borderRadius:20,
            background:'rgba(10,6,2,0.82)', backdropFilter:'blur(8px)',
            border:'1px solid rgba(255,255,255,0.15)',
            boxShadow:'0 2px 10px rgba(0,0,0,0.3)', pointerEvents:'none',
          }}>
            <div style={{ width:8, height:8, borderRadius:'50%', flexShrink:0,
              background: ACCENT[MICRO_TO_MEGA[hovered]] || '#888' }}/>
            <span style={{ color:'#f2e8d8', fontSize:'0.72rem',
              fontFamily:'system-ui,sans-serif', fontWeight:500 }}>
              {MICRO_NAME[hovered]}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

const ctrlBtn = {
  width:28, height:28, borderRadius:4, display:'flex',
  alignItems:'center', justifyContent:'center',
  background:'rgba(255,255,255,0.12)', border:'1px solid rgba(255,255,255,0.22)',
  color:'rgba(240,228,208,0.85)', cursor:'pointer', fontSize:'1rem', fontWeight:700,
  lineHeight:1,
}
