import React, { useEffect, useRef, useState, useCallback } from 'react'
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

// ── Main component ────────────────────────────────────────────────
export default function TerritorMap({
  onSelectMicro, onShapeHighlight,
  highlightedMicroId, highlightedMegaregionId,
}) {
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

      {/* Leaflet map */}
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
