import React, { useState } from 'react'
import { microRegionPaths } from '../data/microRegionPaths.js'
import { allMicroRegions } from '../data/index.js'

// ── Colours ───────────────────────────────────────────────────────
const MEGA_HUE = {
  atlantic:210, mid_atlantic:255, appalachian:135, lowcountry:42,
  gulf:165, heartland:25, plains:48, tex_mex:8,
  southwest:22, cascadia:175, california:278,
}
// Pin colours: each megaregion family gets a subtle tint so pins are
// distinguishable by region without being garish on the neutral map
function buildColors() {
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
      const hue = Math.round(n > 1 ? h - 14 + (28/(n-1))*i : h)
      c[id] = {
        // Pin uses a muted version of the megaregion hue
        pin:  `hsl(${hue},38%,44%)`,
        dark: `hsl(${hue},38%,28%)`,
      }
    })
  })
  return c
}
const COLORS = buildColors()
const MICRO_NAME = {}
allMicroRegions.forEach(m => { MICRO_NAME[m.id] = m.name })

// Classic map pin: teardrop pointing down, tip at (0,0)
// Circle body centred at (0, -R*1.7)
function pinD(R) {
  const cy = -R * 1.7
  const k  = R * 0.552   // cubic bezier control for circle approximation
  return [
    `M 0,${cy - R}`,
    `C ${k},${cy-R} ${R},${cy-k} ${R},${cy}`,
    `C ${R},${cy+k} ${R*0.55},${cy+R} 0,0`,
    `C ${-R*0.55},${cy+R} ${-R},${cy+k} ${-R},${cy}`,
    `C ${-R},${cy-k} ${-k},${cy-R} 0,${cy-R}`,
    'Z',
  ].join(' ')
}

// micro-region → megaregion lookup
const MICRO_TO_MEGA = {}
allMicroRegions.forEach(m => { MICRO_TO_MEGA[m.id] = m.megaregionId })

// For multi-polygon regions, compute a centroid per disconnected sub-shape.
// The path 'd' contains multiple sub-paths separated by 'Z M'.
// Only shapes above a minimum bounding-box area get their own pin.
function getSubCentroids(d, mainCx, mainCy) {
  const MIN_AREA = 120  // SVG units² — skip tiny slivers
  const parts = d.split(/Z\s*M\s+/)
  if (parts.length <= 1) return [{ cx: mainCx, cy: mainCy }]

  const results = parts.map((part, i) => {
    const seg = i === 0 ? part : 'M ' + part
    const xs = [], ys = []
    for (const [, x, y] of seg.matchAll(/(-?[\d.]+),(-?[\d.]+)/g)) {
      xs.push(+x); ys.push(+y)
    }
    if (xs.length < 4) return null
    const w = Math.max(...xs) - Math.min(...xs)
    const h = Math.max(...ys) - Math.min(...ys)
    if (w * h < MIN_AREA) return null
    return {
      cx: Math.round(xs.reduce((a,b) => a+b, 0) / xs.length),
      cy: Math.round(ys.reduce((a,b) => a+b, 0) / ys.length),
      area: w * h,
    }
  }).filter(Boolean)

  return results.length ? results : [{ cx: mainCx, cy: mainCy }]
}

// Pre-compute all pin locations (one or many per region)
const REGION_PINS = {}
microRegionPaths.forEach(r => {
  if (r.cx > 0) REGION_PINS[r.id] = getSubCentroids(r.d, r.cx, r.cy)
})

export default function SvgMap({ onSelectMicro, onShapeHighlight, highlightedMicroId, highlightedMegaregionId, zoomScale = 1 }) {
  const [hoveredId, setHoveredId] = useState(null)

  // All sizes in SVG units, divided by zoomScale so they stay constant physical size
  const R     = 5.5  / zoomScale   // pin circle radius
  const PW    = 148  / zoomScale   // popup width
  const PH    = 52   / zoomScale   // popup height
  const PR    = 5    / zoomScale   // popup corner radius
  const FS    = 8.5  / zoomScale   // popup name font size
  const FSS   = 7    / zoomScale   // popup button font size
  const GAP   = 4    / zoomScale   // gap between pin top and popup bottom
  const ARROW = 5    / zoomScale   // caret size

  return (
    <div className="relative w-full h-full">
      <svg viewBox="0 0 960 600" className="w-full h-full"
        preserveAspectRatio="xMidYMid meet" style={{ display:'block' }}>

        <defs>
          <filter id="ps" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy={1.5/zoomScale} stdDeviation={2/zoomScale}
              floodColor="#000" floodOpacity="0.38"/>
          </filter>
          <filter id="ph" x="-60%" y="-60%" width="220%" height="220%">
            <feDropShadow dx="0" dy={2/zoomScale} stdDeviation={3.5/zoomScale}
              floodColor="#000" floodOpacity="0.50"/>
          </filter>
          <filter id="pp" x="-10%" y="-30%" width="120%" height="160%">
            <feDropShadow dx="0" dy={2/zoomScale} stdDeviation={4/zoomScale}
              floodColor="#000" floodOpacity="0.22"/>
          </filter>
        </defs>

        {/* Ocean background — tap/click clears any open popup */}
        <rect width="960" height="600" fill="#7aabca"
          onClick={() => setHoveredId(null)}
          onTouchStart={() => setHoveredId(null)}
          style={{ cursor:'default' }}/>

        {/* Region fills — neutral parchment; micro or full megaregion turns amber */}
        {microRegionPaths.map(r => {
          const isSelected =
            highlightedMicroId === r.id ||
            (highlightedMegaregionId && MICRO_TO_MEGA[r.id] === highlightedMegaregionId)
          return (
            <path key={r.id} d={r.d}
              fill={isSelected ? 'rgba(234,160,48,0.42)' : '#d6c9a8'}
              stroke={isSelected ? 'rgba(200,130,10,0.85)' : 'rgba(170,148,110,0.55)'}
              strokeWidth={isSelected ? 0.7 : 0.3}
              strokeLinejoin="round"
              style={{ cursor: onShapeHighlight ? 'pointer' : 'default',
                       transition:'fill 0.18s ease, stroke 0.18s ease' }}
              onClick={() => onShapeHighlight?.(r.id)}
            />
          )
        })}

        {/* ── Pass 1: all pin bodies (no popup) ──────────────────────
            Rendering pins before the popup layer means the popup
            always paints on top of every other pin.              */}
        {microRegionPaths.filter(r => REGION_PINS[r.id]).map(r => {
          const isHov      = hoveredId === r.id
          const isSelected =
            highlightedMicroId === r.id ||
            (highlightedMegaregionId && MICRO_TO_MEGA[r.id] === highlightedMegaregionId)
          const c   = COLORS[r.id]
          const pin = isSelected ? '#c8880e' : (c?.pin ?? '#7a6a50')
          const pins = REGION_PINS[r.id]

          return (
            <g key={r.id}
              onMouseEnter={() => setHoveredId(r.id)}
              onMouseLeave={() => setHoveredId(null)}
              // Mobile: first tap shows popup (same as hover); user then taps "View Region →"
              onTouchStart={e => { e.stopPropagation(); setHoveredId(r.id) }}
              style={{ cursor:'pointer' }}
            >
              {pins.map((pt, pi) => (
                <g key={pi} transform={`translate(${pt.cx},${pt.cy})`}
                  filter={isHov ? 'url(#ph)' : 'url(#ps)'}>
                  <path d={pinD(isHov ? R*1.2 : R)} fill={pin}/>
                  <circle cx={0} cy={-(isHov ? R*1.2 : R)*1.7}
                    r={(isHov ? R*1.2 : R)*0.38}
                    fill="rgba(255,255,255,0.40)"/>
                </g>
              ))}
            </g>
          )
        })}

        {/* ── Pass 2: active popup — rendered last, always on top ── */}
        {(() => {
          if (!hoveredId) return null
          const r = microRegionPaths.find(p => p.id === hoveredId)
          if (!r || !REGION_PINS[r.id]) return null

          const accentColor = '#c8880e'
          const name        = MICRO_NAME[r.id] || r.id
          const displayName = name.length > 26 ? name.slice(0, 24) + '…' : name
          const pins        = REGION_PINS[r.id]
          const primary     = pins.reduce((a, b) => (b.area ?? 0) > (a.area ?? 0) ? b : a, pins[0])
          const tx = primary.cx, ty = primary.cy
          const pinTop  = ty - R * 2.7
          const popTop  = pinTop - GAP - PH
          const popLeft = tx - PW / 2
          const btnY = popTop + PH * 0.62
          const btnH = PH * 0.32
          const btnX = popLeft + PW * 0.12
          const btnW = PW * 0.76

          return (
            <g filter="url(#pp)"
              onMouseEnter={() => setHoveredId(hoveredId)}
              onMouseLeave={() => setHoveredId(null)}
              onTouchStart={e => e.stopPropagation()}>
              <rect x={popLeft} y={popTop} width={PW} height={PH} rx={PR} fill="white"/>
              <rect x={popLeft} y={popTop} width={PW} height={3/zoomScale} rx={PR} fill={accentColor}/>
              {/* Invisible bridge — prevents flicker as mouse travels pin→popup */}
              <rect x={tx - PW/3} y={pinTop - GAP} width={PW/1.5} height={GAP*1.5}
                fill="transparent" stroke="none"/>
              <polygon
                points={`${tx-ARROW},${popTop+PH} ${tx+ARROW},${popTop+PH} ${tx},${pinTop}`}
                fill="white"/>
              <text x={tx} y={popTop + PH*0.35}
                textAnchor="middle" dominantBaseline="middle"
                fontSize={FS} fontFamily="Georgia,serif" fontWeight="600"
                fill="#1a1208" style={{ userSelect:'none', pointerEvents:'none' }}>
                {displayName}
              </text>
              <g
                onClick={e => { e.stopPropagation(); onSelectMicro(r.id) }}
                onTouchEnd={e => { e.stopPropagation(); e.preventDefault(); onSelectMicro(r.id) }}
                style={{ cursor:'pointer' }}>
                <rect x={btnX} y={btnY} width={btnW} height={btnH}
                  rx={btnH/2} fill={accentColor}/>
                <text x={tx} y={btnY + btnH/2}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize={FSS} fontFamily="system-ui,sans-serif" fontWeight="600"
                  fill="white" style={{ userSelect:'none', pointerEvents:'none' }}>
                  View Region →
                </text>
              </g>
            </g>
          )
        })()}
      </svg>
    </div>
  )
}
