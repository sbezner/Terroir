import React, { useState } from 'react'
import { megaregions } from '../data/mapData.js'

const ACCENT = {
  atlantic:'#2a6aaa', mid_atlantic:'#5548a0', appalachian:'#2a7838',
  lowcountry:'#a87818', gulf:'#088860', heartland:'#b85820',
  plains:'#8a7a18', tex_mex:'#b82018', southwest:'#b85018',
  cascadia:'#0a7870', california:'#6038a0',
}

// ── Normalizers ──────────────────────────────────────────────────
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
function Section({ label, children, accent }) {
  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <p style={{
        fontFamily: '"Courier New", monospace', fontSize: '0.62rem',
        letterSpacing: '0.18em', textTransform: 'uppercase',
        color: accent || '#9c876a', marginBottom: '0.75rem',
        borderBottom: '1px solid #e8dcd0', paddingBottom: '0.5rem',
      }}>
        {label}
      </p>
      {children}
    </div>
  )
}

function Pill({ children }) {
  return (
    <span style={{
      display: 'inline-block', fontSize: '0.75rem',
      padding: '4px 12px', borderRadius: '999px',
      border: '1px solid #ddd0bf', background: '#fff',
      color: '#5a4a35', marginRight: '6px', marginBottom: '6px',
      lineHeight: 1.2,
    }}>
      {children}
    </span>
  )
}

// ── Kitchen substitution card ────────────────────────────────────
function SubstituteCard({ heirloomIngredients, substitutionRule, accent }) {
  const [open, setOpen] = useState(false)
  const items = (heirloomIngredients || []).map(normalizeIngredient)

  return (
    <div style={{ border: '1px solid #ddd0bf', borderRadius: '12px', overflow: 'hidden' }}>
      <div style={{ padding: '1.25rem 1.5rem', background: '#fdf8f3' }}>
        <p style={{
          fontFamily: '"Courier New", monospace', fontSize: '0.62rem',
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: accent || '#9c876a', marginBottom: '0.9rem',
        }}>
          Heirloom Ingredients
        </p>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {items.map((ing, i) => (
            <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <div style={{
                width: 7, height: 7, borderRadius: '50%', flexShrink: 0, marginTop: 5,
                background: accent || '#a87818',
              }}/>
              <div>
                <span style={{ fontWeight: 600, fontSize: '0.85rem', color: '#1a1208' }}>
                  {ing.name}
                </span>
                {ing.role && (
                  <span style={{ fontSize: '0.75rem', color: '#9c876a', marginLeft: 8 }}>
                    {ing.role}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0.85rem 1.5rem', background: open ? '#fff8ef' : '#fff',
          borderTop: '1px solid #ddd0bf', cursor: 'pointer', border: 'none',
          borderTopWidth: 1, borderTopStyle: 'solid', borderTopColor: '#ddd0bf',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg style={{ width: 15, height: 15, color: accent || '#a87818' }}
            fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
          </svg>
          <span style={{
            fontFamily: '"Courier New", monospace', fontSize: '0.62rem',
            letterSpacing: '0.12em', textTransform: 'uppercase', color: accent || '#a87818',
          }}>
            Kitchen Substitution
          </span>
        </div>
        <svg style={{
          width: 16, height: 16, color: '#9c876a',
          transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s',
        }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      <div style={{ overflow: 'hidden', maxHeight: open ? '20rem' : 0, transition: 'max-height 0.3s ease' }}>
        <div style={{
          padding: '1.25rem 1.5rem', background: '#fff8ef',
          borderTop: '1px solid #f0d8b0',
        }}>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.85, color: '#5a4a35', margin: 0 }}>
            {substitutionRule}
          </p>
        </div>
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────
export default function MicroDetailPage({ microRegion, megaregionId, onBack, siblingRegions, activeMicroId, onSelectMicro }) {
  const mega = megaregions.find(m => m.id === megaregionId)
  const accent = ACCENT[megaregionId] || '#a87818'

  const { name, boundsDescription, deviation, heirloomIngredients, substitutionRule } = microRegion
  const culture = normalizeTags(microRegion.culture)
  const terroir  = normalizeTags(microRegion.terroir)
  const dish     = normalizeIconicDish(microRegion.iconicDish)

  // Adjacent micro-regions for previous/next navigation
  const idx   = siblingRegions.findIndex(m => m.id === activeMicroId)
  const prev  = idx > 0 ? siblingRegions[idx - 1] : null
  const next  = idx < siblingRegions.length - 1 ? siblingRegions[idx + 1] : null

  return (
    <div style={{
      height: '100dvh', overflow: 'hidden', display: 'flex', flexDirection: 'column',
      background: '#f5efe6', color: '#1a1208',
    }}>

      {/* ── Sticky top nav bar ──────────────────────────────────── */}
      <nav style={{
        flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 1.5rem', height: 52,
        background: '#fff', borderBottom: '1px solid #e8dcd0',
        position: 'sticky', top: 0, zIndex: 10,
      }}>
        {/* Back to map */}
        <button
          onClick={onBack}
          style={{
            display: 'flex', alignItems: 'center', gap: 7,
            background: 'none', border: 'none', cursor: 'pointer', padding: '6px 0',
          }}
        >
          <svg style={{ width: 17, height: 17, color: accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
          </svg>
          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: accent }}>
            Back to Map
          </span>
        </button>

        {/* Centre wordmark */}
        <span style={{
          fontFamily: 'Georgia, serif', fontWeight: 700,
          letterSpacing: '0.2em', textTransform: 'uppercase',
          fontSize: '0.9rem', color: '#5a4a35',
        }}>
          Terroir
        </span>

        {/* Prev / Next micro-region */}
        <div style={{ display: 'flex', gap: 4 }}>
          <button
            onClick={() => prev && onSelectMicro(prev.id)}
            disabled={!prev}
            title={prev?.name}
            style={{
              padding: '6px 10px', borderRadius: 6, border: '1px solid #ddd0bf',
              background: prev ? '#fff' : '#faf6f0', cursor: prev ? 'pointer' : 'default',
              color: prev ? '#5a4a35' : '#c8b8a4', fontSize: '0.75rem', fontWeight: 500,
              display: 'flex', alignItems: 'center', gap: 4,
            }}
          >
            <svg style={{ width: 13, height: 13 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
            </svg>
            <span className="hidden sm:inline" style={{ fontSize: '0.72rem' }}>Prev</span>
          </button>
          <button
            onClick={() => next && onSelectMicro(next.id)}
            disabled={!next}
            title={next?.name}
            style={{
              padding: '6px 10px', borderRadius: 6, border: '1px solid #ddd0bf',
              background: next ? '#fff' : '#faf6f0', cursor: next ? 'pointer' : 'default',
              color: next ? '#5a4a35' : '#c8b8a4', fontSize: '0.75rem', fontWeight: 500,
              display: 'flex', alignItems: 'center', gap: 4,
            }}
          >
            <span className="hidden sm:inline" style={{ fontSize: '0.72rem' }}>Next</span>
            <svg style={{ width: 13, height: 13 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </nav>

      {/* ── Scrollable body ─────────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '2.5rem 1.5rem 4rem' }}>

          {/* ── Hero ────────────────────────────────────────────── */}
          <div style={{ marginBottom: '2.5rem' }}>
            {/* Region breadcrumb chip */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '4px 12px', borderRadius: 999,
              background: `${accent}18`, border: `1px solid ${accent}40`,
              marginBottom: '1rem',
            }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: accent }}/>
              <span style={{
                fontFamily: '"Courier New", monospace', fontSize: '0.62rem',
                letterSpacing: '0.1em', textTransform: 'uppercase', color: accent,
              }}>
                {mega?.label}
              </span>
            </div>

            <h1 style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700,
              color: '#1a1208', lineHeight: 1.1, margin: '0 0 1rem',
            }}>
              {name}
            </h1>

            <p style={{
              fontSize: '0.9rem', lineHeight: 1.75, color: '#7a6040',
              borderLeft: `3px solid ${accent}55`,
              paddingLeft: '1rem', margin: 0,
              maxWidth: 600,
            }}>
              {boundsDescription}
            </p>
          </div>

          <div style={{ borderTop: '1px solid #e8dcd0', marginBottom: '2.5rem' }}/>

          {/* ── Culture + Terroir ───────────────────────────────── */}
          {(culture.tags.length > 0 || culture.prose || terroir.tags.length > 0 || terroir.prose) && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2.5rem' }}>
                {(culture.tags.length > 0 || culture.prose) && (
                  <Section label="Cultural Influences" accent={accent}>
                    {culture.tags.length > 0
                      ? <div>{culture.tags.map((c, i) => <Pill key={i}>{c}</Pill>)}</div>
                      : <p style={{ fontSize: '0.83rem', lineHeight: 1.75, color: '#5a4a35', margin: 0 }}>{culture.prose}</p>
                    }
                  </Section>
                )}
                {(terroir.tags.length > 0 || terroir.prose) && (
                  <Section label="Terroir Markers" accent={accent}>
                    {terroir.tags.length > 0
                      ? <div>{terroir.tags.map((t, i) => <Pill key={i}>{t}</Pill>)}</div>
                      : <p style={{ fontSize: '0.83rem', lineHeight: 1.75, color: '#5a4a35', margin: 0 }}>{terroir.prose}</p>
                    }
                  </Section>
                )}
              </div>
              <div style={{ borderTop: '1px solid #e8dcd0', marginBottom: '2.5rem' }}/>
            </>
          )}

          {/* ── Regional Deviation ──────────────────────────────── */}
          {deviation && (
            <>
              <Section label="Regional Deviation" accent={accent}>
                <p style={{ fontSize: '0.88rem', lineHeight: 1.9, color: '#3a2a18', margin: 0 }}>
                  {deviation}
                </p>
              </Section>
              <div style={{ borderTop: '1px solid #e8dcd0', marginBottom: '2.5rem' }}/>
            </>
          )}

          {/* ── Iconic Dish ─────────────────────────────────────── */}
          {dish?.name && (
            <>
              <Section label="Iconic Dish" accent={accent}>
                <h2 style={{
                  fontFamily: 'Georgia, serif', fontSize: '1.75rem', fontWeight: 700,
                  color: accent, margin: '0 0 0.75rem',
                }}>
                  {dish.name}
                </h2>
                {dish.prep && (
                  <p style={{ fontSize: '0.88rem', lineHeight: 1.85, color: '#3a2a18', margin: '0 0 1rem' }}>
                    {dish.prep}
                  </p>
                )}
                {dish.authenticityMarker && (
                  <div style={{
                    display: 'flex', gap: 10,
                    background: `${accent}10`, border: `1px solid ${accent}28`,
                    borderRadius: 10, padding: '0.75rem 1rem',
                  }}>
                    <span style={{ color: accent, fontSize: '1rem', flexShrink: 0 }}>★</span>
                    <p style={{ fontSize: '0.8rem', lineHeight: 1.65, color: '#5a4a35', margin: 0 }}>
                      {dish.authenticityMarker}
                    </p>
                  </div>
                )}
              </Section>
              <div style={{ borderTop: '1px solid #e8dcd0', marginBottom: '2.5rem' }}/>
            </>
          )}

          {/* ── Substitution card ───────────────────────────────── */}
          <SubstituteCard
            heirloomIngredients={heirloomIngredients}
            substitutionRule={substitutionRule}
            accent={accent}
          />


        </div>
      </div>
    </div>
  )
}
