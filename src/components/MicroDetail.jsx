import React, { useState } from 'react'
import { megaregions } from '../data/mapData.js'

const ACCENT = {
  atlantic:'#2a6aaa', mid_atlantic:'#5548a0', appalachian:'#2a7838',
  lowcountry:'#a87818', gulf:'#088860', heartland:'#b85820',
  plains:'#8a7a18', tex_mex:'#b82018', southwest:'#b85018',
  cascadia:'#0a7870', california:'#6038a0',
}

// ── Data helpers ─────────────────────────────────────────────────
function normalizeIngredient(item) {
  if (typeof item === 'string') {
    const m = item.match(/^([^(]+?)\s*\((.+)\)$/)
    if (m) return { name: m[1].trim(), role: m[2].trim() }
    const di = item.indexOf(' — ')
    if (di > -1) return { name: item.slice(0, di), role: item.slice(di + 3) }
    return { name: item, role: '' }
  }
  return item
}

function normalizeIconicDish(dish) {
  if (!dish) return null
  if (typeof dish === 'string') {
    const p = dish.split(' — ')
    return { name: p[0], prep: p.slice(1).join(' — '), authenticityMarker: '' }
  }
  return dish
}

function normalizeTags(val) {
  if (!val) return { tags: [], prose: null }
  if (Array.isArray(val)) {
    const joined = val.join(', ')
    if (joined.length > 200) return { tags: [], prose: joined }
    return { tags: val.filter(Boolean), prose: null }
  }
  const str = String(val).trim()
  const parts = str.split(/[,;]/).map(s => s.trim()).filter(Boolean)
  const avg = parts.reduce((s, p) => s + p.length, 0) / (parts.length || 1)
  if (avg > 55 || parts.length <= 1) return { tags: [], prose: str }
  return { tags: parts, prose: null }
}

// ── Primitives ────────────────────────────────────────────────────
const T = {
  ink:'#1a1208', inkMid:'#5a4a35', inkLight:'#9c876a',
  border:'#e8dcd0', bg:'#f5efe6', card:'#ffffff',
}

function SectionLabel({ children, accent }) {
  return (
    <p style={{
      fontFamily:'"Courier New",monospace', fontSize:'0.6rem',
      letterSpacing:'0.16em', textTransform:'uppercase',
      color: accent || T.inkLight, marginBottom:'0.6rem',
      borderBottom:`1px solid ${T.border}`, paddingBottom:'0.4rem',
    }}>
      {children}
    </p>
  )
}

function Pill({ children }) {
  return (
    <span style={{
      display:'inline-block', fontSize:'0.73rem', padding:'3px 10px',
      borderRadius:999, border:`1px solid ${T.border}`,
      background: T.card, color: T.inkMid,
      marginRight:6, marginBottom:6, lineHeight:1.25,
    }}>
      {children}
    </span>
  )
}

// ── Kitchen Substitution ─────────────────────────────────────────
function KitchenCard({ heirloomIngredients, substitutionRule, accent }) {
  const [open, setOpen] = useState(false)
  const items = (heirloomIngredients || []).map(normalizeIngredient)

  return (
    <div style={{ border:`1px solid ${T.border}`, borderRadius:12, overflow:'hidden' }}>
      <div style={{ padding:'1rem 1.25rem', background:'#fdf8f3' }}>
        <SectionLabel accent={accent}>Heirloom Ingredients</SectionLabel>
        <ul style={{ listStyle:'none', margin:0, padding:0, display:'flex', flexDirection:'column', gap:8 }}>
          {items.map((ing, i) => (
            <li key={i} style={{ display:'flex', gap:8, alignItems:'flex-start' }}>
              <div style={{ width:6, height:6, borderRadius:'50%', background:accent||T.inkLight,
                            flexShrink:0, marginTop:5 }}/>
              <div>
                <span style={{ fontWeight:600, fontSize:'0.82rem', color:T.ink }}>{ing.name}</span>
                {ing.role && <span style={{ fontSize:'0.72rem', color:T.inkLight, marginLeft:6 }}>{ing.role}</span>}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={() => setOpen(v => !v)} style={{
        width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'0.7rem 1.25rem', background: open ? '#fff8ef' : T.card,
        borderTop:`1px solid ${T.border}`, cursor:'pointer', border:'none',
        borderTopWidth:1, borderTopStyle:'solid', borderTopColor: T.border,
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:7 }}>
          <svg style={{ width:14, height:14, color:accent||T.inkLight }}
            fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
          </svg>
          <span style={{ fontFamily:'"Courier New",monospace', fontSize:'0.6rem',
            letterSpacing:'0.12em', textTransform:'uppercase', color:accent||T.inkLight }}>
            Kitchen Substitution
          </span>
        </div>
        <svg style={{ width:15, height:15, color:T.inkLight,
          transform: open ? 'rotate(180deg)' : 'none', transition:'transform 0.2s' }}
          fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
      <div style={{ overflow:'hidden', maxHeight: open ? '18rem' : 0, transition:'max-height 0.3s ease' }}>
        <div style={{ padding:'1rem 1.25rem', background:'#fff8ef',
          borderTop:`1px solid #f0d8b0` }}>
          <p style={{ fontSize:'0.82rem', lineHeight:1.85, color:T.inkMid, margin:0 }}>
            {substitutionRule}
          </p>
        </div>
      </div>
    </div>
  )
}

// ── Main export ──────────────────────────────────────────────────
export default function MicroDetail({ microRegion, megaregionId, siblingRegions,
                                      activeMicroId, onBack, onSelectMicro }) {
  const mega   = megaregions.find(m => m.id === megaregionId)
  const accent = ACCENT[megaregionId] || '#a87818'
  const idx    = siblingRegions.findIndex(m => m.id === activeMicroId)
  const prev   = idx > 0 ? siblingRegions[idx - 1] : null
  const next   = idx < siblingRegions.length - 1 ? siblingRegions[idx + 1] : null

  const { name, boundsDescription, deviation, heirloomIngredients, substitutionRule } = microRegion
  const culture = normalizeTags(microRegion.culture)
  const terroir  = normalizeTags(microRegion.terroir)
  const dish     = normalizeIconicDish(microRegion.iconicDish)

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', overflow:'hidden' }}>

      {/* ── Top bar ──────────────────────────────────────────── */}
      <div style={{
        flexShrink:0, display:'flex', alignItems:'center',
        justifyContent:'space-between', padding:'0 1.25rem',
        height:46, background:'#fff', borderBottom:`1px solid ${T.border}`,
      }}>
        {/* Back to map */}
        <button onClick={onBack} style={{
          display:'flex', alignItems:'center', gap:6,
          background:'none', border:'none', cursor:'pointer', padding:0,
        }}>
          <svg style={{ width:16, height:16, color:accent }}
            fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
          </svg>
          <span style={{ fontSize:'0.8rem', fontWeight:600, color:accent }}>Back to Map</span>
        </button>

        {/* Breadcrumb chip */}
        <div style={{ display:'flex', alignItems:'center', gap:5,
          padding:'3px 10px', borderRadius:999,
          background:`${accent}15`, border:`1px solid ${accent}35` }}>
          <div style={{ width:6, height:6, borderRadius:'50%', background:accent }}/>
          <span style={{ fontFamily:'"Courier New",monospace', fontSize:'0.58rem',
            letterSpacing:'0.1em', textTransform:'uppercase', color:accent }}>
            {mega?.label}
          </span>
        </div>

        {/* Prev / Next */}
        <div style={{ display:'flex', gap:4 }}>
          {[['prev', prev, '‹'], ['next', next, '›']].map(([key, target, arrow]) => (
            <button key={key} onClick={() => target && onSelectMicro(target.id)}
              disabled={!target} title={target?.name}
              style={{
                padding:'4px 9px', borderRadius:6, border:`1px solid ${T.border}`,
                background: target ? T.card : '#f8f3ee', cursor: target ? 'pointer' : 'default',
                color: target ? T.inkMid : '#d8ccc0', fontSize:'0.85rem', fontWeight:500,
                lineHeight:1,
              }}>
              {arrow}
            </button>
          ))}
        </div>
      </div>

      {/* ── Scrollable content ───────────────────────────────── */}
      <div style={{ flex:1, overflowY:'auto', background:T.bg }}>
        <div style={{ maxWidth:680, margin:'0 auto', padding:'2rem 1.5rem 3.5rem' }}>

          {/* Hero */}
          <h1 style={{
            fontFamily:'Georgia,serif', fontSize:'clamp(1.8rem,4vw,2.6rem)',
            fontWeight:700, color:T.ink, lineHeight:1.1, margin:'0 0 0.9rem',
          }}>
            {name}
          </h1>
          <p style={{
            fontSize:'0.87rem', lineHeight:1.75, color:'#7a6040',
            borderLeft:`3px solid ${accent}55`, paddingLeft:'0.9rem',
            margin:'0 0 2rem', maxWidth:560,
          }}>
            {boundsDescription}
          </p>

          {/* Culture + Terroir */}
          {(culture.tags.length > 0 || culture.prose || terroir.tags.length > 0 || terroir.prose) && (
            <>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem',
                marginBottom:'2rem' }}>
                {(culture.tags.length > 0 || culture.prose) && (
                  <div>
                    <SectionLabel accent={accent}>Cultural Influences</SectionLabel>
                    {culture.tags.length > 0
                      ? <div>{culture.tags.map((c,i) => <Pill key={i}>{c}</Pill>)}</div>
                      : <p style={{ fontSize:'0.82rem', lineHeight:1.75, color:T.inkMid, margin:0 }}>{culture.prose}</p>
                    }
                  </div>
                )}
                {(terroir.tags.length > 0 || terroir.prose) && (
                  <div>
                    <SectionLabel accent={accent}>Terroir Markers</SectionLabel>
                    {terroir.tags.length > 0
                      ? <div>{terroir.tags.map((t,i) => <Pill key={i}>{t}</Pill>)}</div>
                      : <p style={{ fontSize:'0.82rem', lineHeight:1.75, color:T.inkMid, margin:0 }}>{terroir.prose}</p>
                    }
                  </div>
                )}
              </div>
              <div style={{ borderTop:`1px solid ${T.border}`, marginBottom:'2rem' }}/>
            </>
          )}

          {/* Regional Deviation */}
          {deviation && (
            <>
              <div style={{ marginBottom:'2rem' }}>
                <SectionLabel accent={accent}>Regional Deviation</SectionLabel>
                <p style={{ fontSize:'0.87rem', lineHeight:1.9, color:T.ink, margin:0 }}>
                  {deviation}
                </p>
              </div>
              <div style={{ borderTop:`1px solid ${T.border}`, marginBottom:'2rem' }}/>
            </>
          )}

          {/* Iconic Dish */}
          {dish?.name && (
            <>
              <div style={{ marginBottom:'2rem' }}>
                <SectionLabel accent={accent}>Iconic Dish</SectionLabel>
                <h2 style={{ fontFamily:'Georgia,serif', fontSize:'1.6rem',
                  fontWeight:700, color:accent, margin:'0 0 0.6rem' }}>
                  {dish.name}
                </h2>
                {dish.prep && (
                  <p style={{ fontSize:'0.87rem', lineHeight:1.85, color:T.ink, margin:'0 0 0.8rem' }}>
                    {dish.prep}
                  </p>
                )}
                {dish.authenticityMarker && (
                  <div style={{
                    display:'flex', gap:8, background:`${accent}0e`,
                    border:`1px solid ${accent}28`, borderRadius:8, padding:'0.65rem 0.9rem',
                  }}>
                    <span style={{ color:accent, fontSize:'0.9rem', flexShrink:0 }}>★</span>
                    <p style={{ fontSize:'0.78rem', lineHeight:1.65, color:T.inkMid, margin:0 }}>
                      {dish.authenticityMarker}
                    </p>
                  </div>
                )}
              </div>
              <div style={{ borderTop:`1px solid ${T.border}`, marginBottom:'2rem' }}/>
            </>
          )}

          <KitchenCard
            heirloomIngredients={heirloomIngredients}
            substitutionRule={substitutionRule}
            accent={accent}
          />

        </div>
      </div>
    </div>
  )
}
