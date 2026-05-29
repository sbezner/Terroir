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

// micro-region → megaregion lookup (for fill decisions)
const MICRO_TO_MEGA = {}
allMicroRegions.forEach(m => { MICRO_TO_MEGA[m.id] = m.megaregionId })

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

        <rect width="960" height="600" fill="#7aabca"/>

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

        {/* Pins + popups — rendered last so they sit on top */}
        {microRegionPaths.filter(r => r.cx > 0).map(r => {
          const isHov      = hoveredId === r.id
          const isSelected =
            highlightedMicroId === r.id ||
            (highlightedMegaregionId && MICRO_TO_MEGA[r.id] === highlightedMegaregionId)
          const c   = COLORS[r.id]
          const pin  = isSelected ? '#c8880e' : (c?.pin  ?? '#7a6a50')
          const dark = isSelected ? '#7a5200' : (c?.dark ?? '#4a3a28')
          const accentColor = '#c8880e'
          const name  = MICRO_NAME[r.id] || r.id
          // Display name: truncate if too long for popup
          const displayName = name.length > 26 ? name.slice(0, 24) + '…' : name

          // Pin tip sits at region centroid
          const tx = r.cx
          const ty = r.cy

          // Top of pin circle = ty - R*1.7 - R = ty - R*2.7
          const pinTop  = ty - R * 2.7
          // Popup sits above pin
          const popTop  = pinTop - GAP - PH
          const popLeft = tx - PW / 2

          // Button inside popup
          const btnY  = popTop + PH * 0.62
          const btnH  = PH * 0.32
          const btnX  = popLeft + PW * 0.12
          const btnW  = PW * 0.76

          return (
            <g key={r.id}
              onMouseEnter={() => setHoveredId(r.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* ── Popup (only when hovered) ─────────── */}
              {isHov && (
                <g filter="url(#pp)"
                  onMouseEnter={() => setHoveredId(r.id)}
                  onMouseLeave={() => setHoveredId(null)}>
                  {/* Card body */}
                  <rect x={popLeft} y={popTop}
                    width={PW} height={PH} rx={PR}
                    fill="white"/>
                  {/* Accent stripe at top of card — always amber */}
                  <rect x={popLeft} y={popTop}
                    width={PW} height={3/zoomScale} rx={PR}
                    fill={accentColor}/>
                  {/* Invisible bridge fills the gap between popup and pin — prevents flicker */}
                  <rect x={tx - PW/3} y={pinTop - GAP}
                    width={PW/1.5} height={GAP * 1.5}
                    fill="transparent" stroke="none"/>
                  {/* Caret pointing down to pin */}
                  <polygon
                    points={`${tx - ARROW},${popTop+PH} ${tx + ARROW},${popTop+PH} ${tx},${pinTop}`}
                    fill="white"/>
                  {/* Region name */}
                  <text x={tx} y={popTop + PH * 0.35}
                    textAnchor="middle" dominantBaseline="middle"
                    fontSize={FS} fontFamily="Georgia,serif" fontWeight="600"
                    fill="#1a1208" style={{ userSelect:'none', pointerEvents:'none' }}>
                    {displayName}
                  </text>
                  {/* "View Region →" button */}
                  <g onClick={e => { e.stopPropagation(); onSelectMicro(r.id) }}
                    style={{ cursor:'pointer' }}>
                    <rect x={btnX} y={btnY} width={btnW} height={btnH}
                      rx={btnH / 2} fill={accentColor}/>
                    <text x={tx} y={btnY + btnH / 2}
                      textAnchor="middle" dominantBaseline="middle"
                      fontSize={FSS} fontFamily="system-ui,sans-serif" fontWeight="600"
                      fill="white" style={{ userSelect:'none', pointerEvents:'none' }}>
                      View Region →
                    </text>
                  </g>
                </g>
              )}

              {/* ── Pin marker ───────────────────────── */}
              <g transform={`translate(${tx},${ty})`}
                filter={isHov ? 'url(#ph)' : 'url(#ps)'}>
                <path d={pinD(isHov ? R * 1.2 : R)} fill={pin}/>
                {/* Inner highlight glint */}
                <circle cx={0} cy={-(isHov ? R*1.2 : R)*1.7}
                  r={(isHov ? R*1.2 : R) * 0.38}
                  fill="rgba(255,255,255,0.40)"/>
              </g>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
