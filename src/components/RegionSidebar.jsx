import React from 'react'
import { megaregions } from '../data/mapData.js'

const ACCENT = {
  atlantic:'#2a6aaa', mid_atlantic:'#5548a0', appalachian:'#2a7838',
  lowcountry:'#a87818', gulf:'#088860', heartland:'#b85820',
  plains:'#8a7a18', tex_mex:'#b82018', southwest:'#b85018',
  cascadia:'#0a7870', california:'#6038a0',
}

function getCultureTag(culture) {
  if (!culture) return ''
  const src = Array.isArray(culture) ? culture[0] : String(culture).split(/[,;]/)[0]
  const s = (src || '').trim()
  return s.length > 46 ? s.slice(0, 46) + '…' : s
}

export default function RegionSidebar({
  allMicroRegions, activeMegaregionId, activeMicroId,
  onSelectMegaregion, onSelectMicro,
}) {
  return (
    <div className="flex flex-col h-full overflow-hidden"
      style={{ background: '#faf6f0' }}>

      {/* Sidebar header */}
      <div className="px-4 pt-4 pb-2 flex-shrink-0"
        style={{ borderBottom: '1px solid #e8dcd0' }}>
        <p style={{ fontFamily:'"Courier New",monospace', fontSize:'0.62rem',
          letterSpacing:'0.14em', textTransform:'uppercase', color:'#9c876a' }}>
          Regions
        </p>
      </div>

      {/* Accordion tree — alphabetical, always fully visible */}
      <div className="flex-1 overflow-y-auto">
        {[...megaregions].sort((a, b) => a.label.localeCompare(b.label)).map(mr => {
          const accent    = ACCENT[mr.id] || '#7a6040'
          const isOpen    = activeMegaregionId === mr.id
          const micros    = allMicroRegions.filter(m => m.megaregionId === mr.id)
                                        .sort((a, b) => a.name.localeCompare(b.name))

          return (
            <div key={mr.id} style={{ borderBottom: '1px solid #ece0d0' }}>

              {/* ── Megaregion row ── */}
              <button
                onClick={() => onSelectMegaregion(isOpen ? null : mr.id)}
                className="w-full text-left flex items-center gap-2.5 px-4 py-2.5 transition-colors"
                style={{
                  background: isOpen ? `${accent}12` : 'transparent',
                }}
                onMouseEnter={e => { if (!isOpen) e.currentTarget.style.background = '#f0e8de' }}
                onMouseLeave={e => { if (!isOpen) e.currentTarget.style.background = 'transparent' }}
              >
                {/* Color dot */}
                <div className="flex-shrink-0 w-2.5 h-2.5 rounded-full"
                  style={{ background: accent }}/>

                {/* Label */}
                <span className="flex-1 min-w-0" style={{
                  fontSize:'0.8rem', fontWeight: isOpen ? 600 : 500,
                  color: isOpen ? '#1a1208' : '#5a4a35',
                  overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap',
                }}>
                  {mr.label}
                </span>

                {/* Micro count + chevron */}
                <span style={{
                  fontSize:'0.62rem', color:'#9c876a',
                  fontFamily:'"Courier New",monospace', flexShrink:0,
                }}>
                  {micros.length}
                </span>
                <svg
                  className={`flex-shrink-0 w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  style={{ color: isOpen ? accent : '#9c876a' }}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                </svg>
              </button>

              {/* ── Micro-region list (slides open) ── */}
              <div style={{
                overflow:'hidden',
                maxHeight: isOpen ? `${micros.length * 52}px` : 0,
                transition: 'max-height 0.25s ease',
              }}>
                {micros.map((micro, i) => {
                  const isActive = activeMicroId === micro.id
                  return (
                    <button
                      key={micro.id}
                      onClick={() => onSelectMicro(micro.id)}
                      className="w-full text-left flex items-start gap-2 py-2 pr-3 transition-colors"
                      style={{
                        paddingLeft: '1.25rem',
                        background: isActive ? `${accent}18` : 'transparent',
                        borderLeft: isActive ? `3px solid ${accent}` : '3px solid transparent',
                      }}
                      onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = '#f0e8de' }}
                      onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
                    >
                      <span style={{
                        fontFamily:'"Courier New",monospace', fontSize:'0.6rem',
                        color:'#b8a48a', marginTop:'3px', flexShrink:0, width:'16px',
                      }}>
                        {String(i+1).padStart(2,'0')}
                      </span>
                      <div style={{ minWidth:0 }}>
                        <p style={{
                          fontSize:'0.76rem', fontWeight: isActive ? 600 : 400,
                          color: isActive ? '#1a1208' : '#5a4a35',
                          lineHeight:1.3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap',
                        }}>
                          {micro.name}
                        </p>
                        <p style={{
                          fontSize:'0.66rem', color:'#9c876a', marginTop:'1px',
                          overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap',
                        }}>
                          {getCultureTag(micro.culture)}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>

            </div>
          )
        })}
      </div>
    </div>
  )
}
