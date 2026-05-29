import React, { useState } from 'react'
import { megaregions } from '../data/mapData.js'

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
    const parts = dish.split(' — ')
    return { name: parts[0], prep: parts.slice(1).join(' — '), authenticityMarker: '' }
  }
  return dish
}

function normalizeTags(val) {
  if (!val) return { tags: [], prose: null }
  if (Array.isArray(val)) {
    // Detect mixed arrays — if any item is very long, treat the join as prose
    const joined = val.join(', ')
    if (joined.length > 200) return { tags: [], prose: joined }
    return { tags: val.filter(Boolean), prose: null }
  }
  const str = String(val).trim()
  // If the whole string is a prose sentence (no short comma-separated items), show as prose
  const parts = str.split(/[,;]/).map(s => s.trim()).filter(Boolean)
  const avgLen = parts.reduce((s, p) => s + p.length, 0) / (parts.length || 1)
  if (avgLen > 55 || parts.length <= 1) return { tags: [], prose: str }
  return { tags: parts, prose: null }
}

const ACCENT = {
  atlantic:'#5b9bd5', mid_atlantic:'#7b72c8', appalachian:'#52a85a',
  lowcountry:'#d4a030', gulf:'#30a882', heartland:'#d47830',
  plains:'#c8b030', tex_mex:'#c84830', southwest:'#c87040',
  cascadia:'#28a898', california:'#8860c8',
}

const T = {
  bg:       '#f5efe6',
  card:     '#ffffff',
  cardAlt:  '#fdf8f3',
  ink:      '#1a1208',
  inkMid:   '#5a4a35',
  inkLight: '#9c876a',
  border:   '#ddd0bf',
  amber:    '#c47a30',
}

function Eyebrow({ children, color }) {
  return (
    <p style={{ fontFamily: '"Courier New", monospace', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: color || T.inkLight, marginBottom: '0.5rem' }}>
      {children}
    </p>
  )
}

function Tag({ children }) {
  return (
    <span style={{
      display: 'inline-block', fontSize: '0.72rem', padding: '3px 10px',
      borderRadius: '999px', border: `1px solid ${T.border}`,
      background: T.card, color: T.inkMid,
      marginRight: '6px', marginBottom: '6px', lineHeight: 1,
    }}>
      {children}
    </span>
  )
}

function Divider() {
  return <div style={{ borderTop: `1px solid ${T.border}`, margin: '1.25rem 0' }}/>
}

function Breadcrumb({ megaregionId, microName, onBack }) {
  const mega = megaregions.find(m => m.id === megaregionId)
  if (!mega) return null
  const c = ACCENT[megaregionId] || T.amber
  return (
    <button onClick={onBack}
      className="flex items-center gap-1.5 mb-5"
      style={{ color: T.inkLight, fontSize: '0.72rem', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
    >
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
      </svg>
      <span style={{ color: c, fontWeight: 600 }}>{mega.label}</span>
      {microName && <><span style={{ color: T.border }}>/</span><span>{microName}</span></>}
    </button>
  )
}

function SubstituteCard({ heirloomIngredients, substitutionRule }) {
  const [open, setOpen] = useState(false)
  const items = (heirloomIngredients || []).map(normalizeIngredient)

  return (
    <div style={{ border: `1px solid ${T.border}`, borderRadius: '12px', overflow: 'hidden' }}>
      {/* Ingredients */}
      <div style={{ padding: '1rem 1.25rem', background: T.cardAlt }}>
        <Eyebrow>Heirloom Ingredients</Eyebrow>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {items.map((ing, i) => (
            <li key={i} style={{ display: 'flex', gap: '10px', marginBottom: i < items.length - 1 ? '10px' : 0 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: T.amber, marginTop: 6, flexShrink: 0 }}/>
              <div>
                <span style={{ fontWeight: 600, fontSize: '0.82rem', color: T.ink }}>{ing.name}</span>
                {ing.role && <span style={{ fontSize: '0.72rem', color: T.inkLight, marginLeft: '6px' }}>{ing.role}</span>}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Toggle */}
      <button onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between"
        style={{
          padding: '0.75rem 1.25rem',
          background: open ? '#fff8ef' : T.card,
          borderTop: `1px solid ${T.border}`,
          cursor: 'pointer', border: 'none', borderTopWidth: 1, borderTopStyle: 'solid', borderTopColor: T.border,
        }}
      >
        <div className="flex items-center gap-2">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            style={{ color: T.amber }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
          </svg>
          <span style={{ fontFamily: '"Courier New", monospace', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: T.amber }}>
            Kitchen Substitution
          </span>
        </div>
        <svg className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          style={{ color: T.inkLight }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      <div style={{ overflow: 'hidden', maxHeight: open ? '20rem' : 0, transition: 'max-height 0.3s ease' }}>
        <div style={{ padding: '1rem 1.25rem', background: '#fff8ef', borderTop: `1px solid #f0d8b0` }}>
          <p style={{ fontSize: '0.82rem', lineHeight: 1.8, color: T.inkMid, margin: 0 }}>
            {substitutionRule}
          </p>
        </div>
      </div>
    </div>
  )
}

// ── All-megaregions grid ────────────────────────────────────────────────────

export function AllMegaregionsGrid({ allMicroRegions, onSelectMegaregion }) {
  return (
    <div style={{ padding: '2rem 2rem 3rem', maxWidth: 900 }}>
      <p style={{ fontFamily: '"Courier New", monospace', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: T.inkLight, marginBottom: '0.5rem' }}>
        Explore
      </p>
      <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', fontWeight: 700, color: T.ink, margin: '0 0 0.4rem' }}>
        American Culinary Atlas
      </h2>
      <p style={{ fontSize: '0.85rem', color: T.inkMid, marginBottom: '2rem' }}>
        Select a region on the map above, or choose a megaregion below.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem' }}>
        {megaregions.map(mr => {
          const count = allMicroRegions.filter(m => m.megaregionId === mr.id).length
          const c = ACCENT[mr.id] || T.amber
          return (
            <button key={mr.id} onClick={() => onSelectMegaregion(mr.id)}
              style={{
                textAlign: 'left', padding: '0.9rem 1rem',
                background: T.card, border: `1px solid ${T.border}`,
                borderRadius: '10px', cursor: 'pointer',
                transition: 'border-color 0.15s, box-shadow 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = c; e.currentTarget.style.boxShadow = `0 2px 12px ${c}22`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: c, flexShrink: 0 }}/>
                <span style={{ fontWeight: 600, fontSize: '0.85rem', color: T.ink }}>{mr.label}</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.7rem', fontFamily: '"Courier New", monospace', color: T.inkLight, paddingLeft: 18 }}>
                {count} micro-regions
              </p>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Megaregion landing ──────────────────────────────────────────────────────

export function MegaregionLanding({ megaregionId, label, microRegions, onSelectMicro, onBack }) {
  const accent = ACCENT[megaregionId] || T.amber

  return (
    <div style={{ padding: '1.75rem 2rem 3rem', maxWidth: 900 }}>
      <Breadcrumb megaregionId={megaregionId} onBack={onBack}/>

      <p style={{ fontFamily: '"Courier New", monospace', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: accent, marginBottom: '0.4rem' }}>
        Megaregion
      </p>
      <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2.2rem', fontWeight: 700, color: T.ink, margin: '0 0 0.4rem' }}>
        {label}
      </h1>
      <p style={{ fontSize: '0.85rem', color: T.inkMid, marginBottom: '1.75rem' }}>
        {microRegions.length} micro-regions — select one to explore
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '0.75rem' }}>
        {microRegions.map((micro, i) => {
          const dish = typeof micro.iconicDish === 'string'
            ? micro.iconicDish.split(' — ')[0]
            : micro.iconicDish?.name || ''
          return (
            <button key={micro.id} onClick={() => onSelectMicro(micro.id)}
              style={{
                textAlign: 'left', padding: '0.9rem 1rem',
                background: T.card, border: `1px solid ${T.border}`,
                borderRadius: '10px', cursor: 'pointer',
                transition: 'border-color 0.15s, box-shadow 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.boxShadow = `0 2px 12px ${accent}22`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
                <span style={{ fontFamily: '"Courier New", monospace', fontSize: '0.62rem', color: T.inkLight, marginTop: 2, flexShrink: 0 }}>
                  {String(i+1).padStart(2,'0')}
                </span>
                <span style={{ fontWeight: 600, fontSize: '0.85rem', color: T.ink, lineHeight: 1.3 }}>{micro.name}</span>
              </div>
              {dish && <p style={{ margin: 0, fontSize: '0.72rem', color: T.inkLight, paddingLeft: 22, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{dish}</p>}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Micro-region detail ─────────────────────────────────────────────────────

export default function DetailCanvas({ microRegion, megaregionId, onBack }) {
  if (!microRegion) return null

  const { name, boundsDescription, deviation, heirloomIngredients, substitutionRule } = microRegion
  const culture = normalizeTags(microRegion.culture)
  const terroir  = normalizeTags(microRegion.terroir)
  const dish     = normalizeIconicDish(microRegion.iconicDish)
  const accent   = ACCENT[megaregionId] || T.amber

  return (
    <div style={{ padding: '1.75rem 2rem 3rem', maxWidth: 720 }}>
      <Breadcrumb megaregionId={megaregionId} microName={name} onBack={onBack}/>

      {/* Header */}
      <Eyebrow>Micro-Region Profile</Eyebrow>
      <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2.4rem', fontWeight: 700, color: T.ink, lineHeight: 1.15, margin: '0 0 1rem' }}>
        {name}
      </h1>
      <p style={{ fontSize: '0.85rem', lineHeight: 1.7, color: T.inkMid, borderLeft: `3px solid ${T.border}`, paddingLeft: '0.9rem', margin: '0 0 1.25rem' }}>
        {boundsDescription}
      </p>

      <Divider/>

      {/* Culture + Terroir */}
      {(culture.tags.length > 0 || culture.prose || terroir.tags.length > 0 || terroir.prose) && (
        <>
          <div style={{ marginBottom: '1.25rem' }}>
            {(culture.tags.length > 0 || culture.prose) && (
              <div style={{ marginBottom: '1rem' }}>
                <Eyebrow>Cultural Influences</Eyebrow>
                {culture.tags.length > 0
                  ? <div>{culture.tags.map((c,i) => <Tag key={i}>{c}</Tag>)}</div>
                  : <p style={{ fontSize: '0.82rem', lineHeight: 1.75, color: T.inkMid, margin: 0 }}>{culture.prose}</p>
                }
              </div>
            )}
            {(terroir.tags.length > 0 || terroir.prose) && (
              <div>
                <Eyebrow>Terroir Markers</Eyebrow>
                {terroir.tags.length > 0
                  ? <div>{terroir.tags.map((t,i) => <Tag key={i}>{t}</Tag>)}</div>
                  : <p style={{ fontSize: '0.82rem', lineHeight: 1.75, color: T.inkMid, margin: 0 }}>{terroir.prose}</p>
                }
              </div>
            )}
          </div>
          <Divider/>
        </>
      )}

      {/* Deviation */}
      {deviation && (
        <>
          <div style={{ marginBottom: '1.25rem' }}>
            <Eyebrow>Regional Deviation</Eyebrow>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.85, color: T.inkMid, margin: 0 }}>{deviation}</p>
          </div>
          <Divider/>
        </>
      )}

      {/* Iconic dish */}
      {dish?.name && (
        <>
          <div style={{ marginBottom: '1.25rem', padding: '1.25rem', background: T.card, borderRadius: 12, border: `1px solid ${T.border}` }}>
            <Eyebrow>Iconic Dish</Eyebrow>
            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1.5rem', fontWeight: 700, color: accent, margin: '0 0 0.75rem' }}>
              {dish.name}
            </h3>
            {dish.prep && (
              <p style={{ fontSize: '0.85rem', lineHeight: 1.8, color: T.inkMid, margin: '0 0 0.75rem' }}>{dish.prep}</p>
            )}
            {dish.authenticityMarker && (
              <div style={{ display: 'flex', gap: 10, background: `${accent}10`, border: `1px solid ${accent}30`, borderRadius: 8, padding: '0.6rem 0.8rem' }}>
                <span style={{ color: accent, fontSize: '0.85rem', flexShrink: 0 }}>★</span>
                <p style={{ fontSize: '0.75rem', lineHeight: 1.6, color: T.inkMid, margin: 0 }}>{dish.authenticityMarker}</p>
              </div>
            )}
          </div>
          <Divider/>
        </>
      )}

      <SubstituteCard heirloomIngredients={heirloomIngredients} substitutionRule={substitutionRule}/>
    </div>
  )
}
