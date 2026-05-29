import React, { useState } from 'react'
import { megaregions } from '../data/mapData.js'

// ── Design tokens ─────────────────────────────────────────────────
const ACCENT = {
  atlantic:'#2a6aaa', mid_atlantic:'#5548a0', appalachian:'#2a7838',
  lowcountry:'#a87818', gulf:'#088860', heartland:'#b85820',
  plains:'#8a7a18', tex_mex:'#b82018', southwest:'#b85018',
  cascadia:'#0a7870', california:'#6038a0',
}

// Hero photography — one curated Unsplash photo per megaregion
const HERO_PHOTO = {
  atlantic:    '1476224203421-9ac39bcb3327',
  mid_atlantic:'1559181567-c3190b5ade49',
  appalachian: '1544025162-d76694d4ed99',
  lowcountry:  '1565958011703-44f9829ba187',
  gulf:        '1504674900247-0877df9cc836',
  heartland:   '1551782045-a5c813399f0',
  plains:      '1546069901-ba9599a7e63c',
  tex_mex:     '1565299585323-38d6b0865b47',
  southwest:   '1504675099197-d176b9b41d83',
  cascadia:    '1510812431401-41d2bd2722f3',
  california:  '1490645935967-10de6ba17061',
}

// Ingredient → emoji (covers most common culinary ingredients)
function ingredientEmoji(name = '') {
  const n = name.toLowerCase()
  if (/lobster/.test(n)) return '🦞'
  if (/crab|crawfish|crayfish/.test(n)) return '🦀'
  if (/shrimp|prawn/.test(n)) return '🦐'
  if (/oyster|clam|mussel|scallop/.test(n)) return '🦪'
  if (/salmon|trout|cod|catfish|fish|flounder|redfish|mullet|shad/.test(n)) return '🐟'
  if (/beef|brisket|steak|longhorn|shortrib/.test(n)) return '🥩'
  if (/pork|ham|bacon|sausage|lard|fatback|tasso|andouille|boudin/.test(n)) return '🥓'
  if (/chicken|turkey|hen/.test(n)) return '🍗'
  if (/venison|deer|bison|buffalo|elk|game/.test(n)) return '🦌'
  if (/duck|goose/.test(n)) return '🦆'
  if (/corn|maize|grits|hominy/.test(n)) return '🌽'
  if (/tomato/.test(n)) return '🍅'
  if (/potato|spud/.test(n)) return '🥔'
  if (/apple/.test(n)) return '🍎'
  if (/peach/.test(n)) return '🍑'
  if (/berry|blueberry|cranberry|blackberry/.test(n)) return '🫐'
  if (/grape|muscadine|scuppernong/.test(n)) return '🍇'
  if (/chile|chili|pepper|jalapeño|serrano|habanero|anaheim|hatch/.test(n)) return '🌶️'
  if (/onion|shallot|leek|ramp|scallion/.test(n)) return '🧅'
  if (/garlic/.test(n)) return '🧄'
  if (/cheese|cheddar|queso/.test(n)) return '🧀'
  if (/wheat|flour|grain/.test(n)) return '🌾'
  if (/maple/.test(n)) return '🍁'
  if (/honey|molasses|sorghum|syrup/.test(n)) return '🍯'
  if (/mushroom|truffle/.test(n)) return '🍄'
  if (/lemon|lime|citrus|orange/.test(n)) return '🍋'
  if (/herb|basil|thyme|sage|bay|parsley|cilantro|spicebush|ramp/.test(n)) return '🌿'
  if (/salt/.test(n)) return '🧂'
  if (/olive|avocado/.test(n)) return '🫒'
  if (/rice/.test(n)) return '🍚'
  if (/bread|biscuit|cornbread|tortilla|kolache/.test(n)) return '🍞'
  if (/butter|cream|milk|dairy/.test(n)) return '🧈'
  if (/egg/.test(n)) return '🥚'
  if (/peanut|nut|pecan|almond|walnut/.test(n)) return '🥜'
  if (/bean|pea|lentil/.test(n)) return '🫘'
  if (/squash|pumpkin|gourd/.test(n)) return '🎃'
  if (/seaweed|dulse|kelp/.test(n)) return '🌊'
  if (/cactus|nopa|prickly/.test(n)) return '🌵'
  return '🌿'
}

// ── Data normalizers ──────────────────────────────────────────────
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

// ── Small primitives ──────────────────────────────────────────────
function SectionHeader({ icon, label, accent }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:'1rem' }}>
      <span style={{ fontSize:'1rem' }}>{icon}</span>
      <span style={{
        fontFamily:'"Courier New",monospace', fontSize:'0.62rem',
        letterSpacing:'0.16em', textTransform:'uppercase',
        color: accent || '#9c876a',
      }}>
        {label}
      </span>
      <div style={{ flex:1, height:1, background:'#e8dcd0', marginLeft:4 }}/>
    </div>
  )
}

function TagChip({ children }) {
  return (
    <span style={{
      display:'inline-block', fontSize:'0.73rem', padding:'4px 11px',
      borderRadius:999, border:'1px solid #ddd0bf', background:'white',
      color:'#5a4a35', marginRight:6, marginBottom:6, lineHeight:1.3,
    }}>
      {children}
    </span>
  )
}

// ── Substitution card ─────────────────────────────────────────────
function SubCard({ heirloomIngredients, substitutionRule, accent }) {
  const [open, setOpen] = useState(false)
  const items = (heirloomIngredients || []).map(normalizeIngredient)

  return (
    <div style={{ border:'1px solid #e0d4c0', borderRadius:14, overflow:'hidden',
                  background:'white', boxShadow:'0 1px 4px rgba(0,0,0,0.06)' }}>
      {/* Ingredient grid */}
      <div style={{ padding:'1.25rem 1.5rem', background:'#fdf9f3' }}>
        <SectionHeader icon="🌿" label="Heirloom Ingredients" accent={accent}/>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(160px,1fr))',
                      gap:'0.75rem' }}>
          {items.map((ing, i) => (
            <div key={i} style={{
              display:'flex', alignItems:'flex-start', gap:10,
              background:'white', borderRadius:10, padding:'0.7rem 0.85rem',
              border:'1px solid #ece2d4',
            }}>
              <span style={{ fontSize:'1.4rem', lineHeight:1, flexShrink:0 }}>
                {ingredientEmoji(ing.name)}
              </span>
              <div>
                <div style={{ fontWeight:600, fontSize:'0.82rem', color:'#1a1208',
                              lineHeight:1.3 }}>
                  {ing.name}
                </div>
                {ing.role && (
                  <div style={{ fontSize:'0.7rem', color:'#9c876a', marginTop:2,
                                lineHeight:1.4 }}>
                    {ing.role}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Toggle */}
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width:'100%', display:'flex', alignItems:'center',
          justifyContent:'space-between', padding:'0.85rem 1.5rem',
          background: open ? '#fff8ef' : 'white',
          borderTop:'1px solid #e8dcd0', cursor:'pointer',
          border:'none', borderTopWidth:1, borderTopStyle:'solid',
          borderTopColor:'#e8dcd0', transition:'background 0.15s',
        }}
      >
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <span style={{ fontSize:'0.9rem' }}>🔄</span>
          <span style={{ fontFamily:'"Courier New",monospace', fontSize:'0.62rem',
            letterSpacing:'0.14em', textTransform:'uppercase', color:accent }}>
            Kitchen Substitution
          </span>
        </div>
        <svg style={{ width:16, height:16, color:'#9c876a',
          transform: open ? 'rotate(180deg)' : 'none', transition:'transform 0.2s' }}
          fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      <div style={{ overflow:'hidden', maxHeight: open ? '20rem' : 0,
                    transition:'max-height 0.3s ease' }}>
        <div style={{ padding:'1.25rem 1.5rem', background:'#fff8ef',
                      borderTop:'1px solid #f0d8a8' }}>
          <p style={{ fontSize:'0.85rem', lineHeight:1.85, color:'#5a4a35', margin:0 }}>
            {substitutionRule}
          </p>
        </div>
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────
export default function MicroDetail({
  microRegion, megaregionId, siblingRegions,
  activeMicroId, onBack, onSelectMicro,
}) {
  const [heroError, setHeroError] = useState(false)
  const mega   = megaregions.find(m => m.id === megaregionId)
  const accent = ACCENT[megaregionId] || '#a87818'

  const { name, boundsDescription, deviation, heirloomIngredients, substitutionRule } = microRegion
  const culture = normalizeTags(microRegion.culture)
  const terroir  = normalizeTags(microRegion.terroir)
  const dish     = normalizeIconicDish(microRegion.iconicDish)

  const idx  = siblingRegions.findIndex(m => m.id === activeMicroId)
  const prev = idx > 0 ? siblingRegions[idx - 1] : null
  const next = idx < siblingRegions.length - 1 ? siblingRegions[idx + 1] : null

  const heroPhotoId = HERO_PHOTO[megaregionId]
  const heroUrl = heroPhotoId
    ? `https://images.unsplash.com/photo-${heroPhotoId}?auto=format&fit=crop&w=1400&q=75`
    : null

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', overflow:'hidden',
                  background:'#f5efe6' }}>

      {/* ── Sticky top nav ──────────────────────────────────── */}
      <nav style={{
        flexShrink:0, display:'flex', alignItems:'center',
        justifyContent:'space-between', padding:'0 1.25rem', height:50,
        background:'white', borderBottom:'1px solid #e8dcd0',
        position:'sticky', top:0, zIndex:10,
        boxShadow:'0 1px 6px rgba(0,0,0,0.06)',
      }}>
        <button onClick={onBack} style={{
          display:'flex', alignItems:'center', gap:7,
          background:'none', border:'none', cursor:'pointer', padding:'4px 0',
        }}>
          <svg style={{ width:16, height:16, color:accent }}
            fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M15 19l-7-7 7-7"/>
          </svg>
          <span style={{ fontSize:'0.82rem', fontWeight:600, color:accent }}>
            Back to Map
          </span>
        </button>

        <span style={{ fontFamily:'Georgia,serif', fontWeight:700,
          letterSpacing:'0.2em', textTransform:'uppercase',
          fontSize:'0.85rem', color:'#5a4a35' }}>
          Terroir
        </span>

        <div style={{ display:'flex', gap:4 }}>
          {[['‹', prev], ['›', next]].map(([arrow, target]) => (
            <button key={arrow}
              onClick={() => target && onSelectMicro(target.id)}
              disabled={!target}
              title={target?.name}
              style={{
                width:32, height:32, borderRadius:6, fontSize:'1.1rem',
                border:'1px solid #ddd0bf',
                background: target ? 'white' : '#f8f4ee',
                color: target ? '#5a4a35' : '#c8b8a4',
                cursor: target ? 'pointer' : 'default',
                display:'flex', alignItems:'center', justifyContent:'center',
              }}>
              {arrow}
            </button>
          ))}
        </div>
      </nav>

      {/* ── Scrollable body ─────────────────────────────────── */}
      <div style={{ flex:1, overflowY:'auto' }}>

        {/* ── HERO ─────────────────────────────────────────── */}
        <div style={{
          position:'relative', height:280, overflow:'hidden',
          background: heroError || !heroUrl
            ? `linear-gradient(135deg, ${accent}dd 0%, ${accent}88 100%)`
            : undefined,
        }}>
          {heroUrl && !heroError && (
            <img
              src={heroUrl}
              alt={name}
              onError={() => setHeroError(true)}
              style={{ width:'100%', height:'100%', objectFit:'cover',
                       objectPosition:'center', display:'block' }}
            />
          )}
          {/* Gradient overlay */}
          <div style={{
            position:'absolute', inset:0,
            background:'linear-gradient(to top, rgba(10,6,2,0.82) 0%, rgba(10,6,2,0.25) 55%, transparent 100%)',
          }}/>
          {/* Text overlay */}
          <div style={{
            position:'absolute', bottom:0, left:0, right:0,
            padding:'1.5rem 2rem 1.75rem',
          }}>
            {/* Megaregion chip */}
            <div style={{
              display:'inline-flex', alignItems:'center', gap:6,
              padding:'3px 10px', borderRadius:999, marginBottom:'0.6rem',
              background:`${accent}30`, border:`1px solid ${accent}60`,
            }}>
              <div style={{ width:6, height:6, borderRadius:'50%',
                            background:accent, flexShrink:0 }}/>
              <span style={{
                fontFamily:'"Courier New",monospace', fontSize:'0.6rem',
                letterSpacing:'0.12em', textTransform:'uppercase', color:'#f0e4d0',
              }}>
                {mega?.label}
              </span>
            </div>
            {/* Region name */}
            <h1 style={{
              fontFamily:'Georgia,serif', fontSize:'clamp(1.6rem,4vw,2.4rem)',
              fontWeight:700, color:'white', lineHeight:1.1, margin:0,
              textShadow:'0 2px 12px rgba(0,0,0,0.4)',
            }}>
              {name}
            </h1>
          </div>
        </div>

        {/* ── Content ──────────────────────────────────────── */}
        <div style={{ maxWidth:780, margin:'0 auto', padding:'2rem 1.5rem 4rem' }}>

          {/* Geographic description */}
          <p style={{
            fontSize:'0.9rem', lineHeight:1.8, color:'#7a6040',
            borderLeft:`3px solid ${accent}55`, paddingLeft:'1rem',
            margin:'0 0 2rem', fontStyle:'italic',
          }}>
            {boundsDescription}
          </p>

          {/* ── Culture + Terroir ─────────────────────────── */}
          {(culture.tags.length > 0 || culture.prose ||
            terroir.tags.length > 0 || terroir.prose) && (
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr',
                          gap:'1.5rem', marginBottom:'2rem' }}>
              {(culture.tags.length > 0 || culture.prose) && (
                <div style={{ background:'white', borderRadius:14, padding:'1.25rem 1.5rem',
                              border:'1px solid #e8dcd0',
                              boxShadow:'0 1px 4px rgba(0,0,0,0.05)' }}>
                  <SectionHeader icon="🏛️" label="Cultural Influences" accent={accent}/>
                  {culture.tags.length > 0
                    ? <div>{culture.tags.map((t,i) => <TagChip key={i}>{t}</TagChip>)}</div>
                    : <p style={{ fontSize:'0.82rem', lineHeight:1.75, color:'#5a4a35',
                                  margin:0 }}>{culture.prose}</p>
                  }
                </div>
              )}
              {(terroir.tags.length > 0 || terroir.prose) && (
                <div style={{ background:'white', borderRadius:14, padding:'1.25rem 1.5rem',
                              border:'1px solid #e8dcd0',
                              boxShadow:'0 1px 4px rgba(0,0,0,0.05)' }}>
                  <SectionHeader icon="🌱" label="Terroir Markers" accent={accent}/>
                  {terroir.tags.length > 0
                    ? <div>{terroir.tags.map((t,i) => <TagChip key={i}>{t}</TagChip>)}</div>
                    : <p style={{ fontSize:'0.82rem', lineHeight:1.75, color:'#5a4a35',
                                  margin:0 }}>{terroir.prose}</p>
                  }
                </div>
              )}
            </div>
          )}

          {/* ── Regional Deviation ───────────────────────── */}
          {deviation && (
            <div style={{ background:'white', borderRadius:14,
                          padding:'1.5rem 1.75rem', marginBottom:'2rem',
                          border:'1px solid #e8dcd0',
                          boxShadow:'0 1px 4px rgba(0,0,0,0.05)',
                          borderLeft:`4px solid ${accent}` }}>
              <SectionHeader icon="🧭" label="Regional Deviation" accent={accent}/>
              <p style={{ fontSize:'0.88rem', lineHeight:1.9, color:'#3a2a18', margin:0 }}>
                {deviation}
              </p>
            </div>
          )}

          {/* ── Iconic Dish ──────────────────────────────── */}
          {dish?.name && (
            <div style={{
              borderRadius:16, overflow:'hidden', marginBottom:'2rem',
              border:'1px solid #e8dcd0',
              boxShadow:'0 2px 12px rgba(0,0,0,0.08)',
            }}>
              {/* Dish header bar */}
              <div style={{ background:accent, padding:'0.65rem 1.5rem',
                            display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ fontSize:'1rem' }}>🍽️</span>
                <span style={{ fontFamily:'"Courier New",monospace', fontSize:'0.62rem',
                  letterSpacing:'0.16em', textTransform:'uppercase',
                  color:'rgba(255,255,255,0.85)' }}>
                  Iconic Dish
                </span>
              </div>

              <div style={{ background:'white', padding:'1.5rem' }}>
                <h2 style={{
                  fontFamily:'Georgia,serif', fontSize:'1.9rem', fontWeight:700,
                  color:'#1a1208', margin:'0 0 1rem', lineHeight:1.2,
                }}>
                  {dish.name}
                </h2>

                {dish.prep && (
                  <p style={{ fontSize:'0.88rem', lineHeight:1.85,
                              color:'#3a2a18', margin:'0 0 1rem' }}>
                    {dish.prep}
                  </p>
                )}

                {dish.authenticityMarker && (
                  <div style={{
                    display:'flex', gap:10, background:`${accent}0e`,
                    border:`1px solid ${accent}28`, borderRadius:10,
                    padding:'0.75rem 1rem',
                  }}>
                    <span style={{ color:accent, fontSize:'1rem', flexShrink:0,
                                   marginTop:1 }}>★</span>
                    <p style={{ fontSize:'0.8rem', lineHeight:1.7,
                                color:'#5a4a35', margin:0, fontStyle:'italic' }}>
                      {dish.authenticityMarker}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Heirloom Ingredients + Substitution ──────── */}
          <SubCard
            heirloomIngredients={heirloomIngredients}
            substitutionRule={substitutionRule}
            accent={accent}
          />

          {/* ── Sibling navigation ───────────────────────── */}
          {(prev || next) && (
            <div style={{
              marginTop:'2.5rem', display:'grid',
              gridTemplateColumns: prev && next ? '1fr 1fr' : '1fr',
              gap:'0.75rem',
            }}>
              {prev && (
                <button onClick={() => onSelectMicro(prev.id)} style={{
                  textAlign:'left', padding:'1rem 1.25rem', background:'white',
                  border:'1px solid #e8dcd0', borderRadius:12, cursor:'pointer',
                  transition:'border-color 0.15s, box-shadow 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=accent; e.currentTarget.style.boxShadow=`0 2px 10px ${accent}18` }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='#e8dcd0'; e.currentTarget.style.boxShadow='none' }}>
                  <div style={{ fontFamily:'"Courier New",monospace', fontSize:'0.58rem',
                    letterSpacing:'0.1em', textTransform:'uppercase',
                    color:'#9c876a', marginBottom:3 }}>← Previous</div>
                  <div style={{ fontSize:'0.85rem', fontWeight:600,
                                color:'#1a1208' }}>{prev.name}</div>
                </button>
              )}
              {next && (
                <button onClick={() => onSelectMicro(next.id)} style={{
                  textAlign:'right', padding:'1rem 1.25rem', background:'white',
                  border:'1px solid #e8dcd0', borderRadius:12, cursor:'pointer',
                  transition:'border-color 0.15s, box-shadow 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=accent; e.currentTarget.style.boxShadow=`0 2px 10px ${accent}18` }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='#e8dcd0'; e.currentTarget.style.boxShadow='none' }}>
                  <div style={{ fontFamily:'"Courier New",monospace', fontSize:'0.58rem',
                    letterSpacing:'0.1em', textTransform:'uppercase',
                    color:'#9c876a', marginBottom:3 }}>Next →</div>
                  <div style={{ fontSize:'0.85rem', fontWeight:600,
                                color:'#1a1208' }}>{next.name}</div>
                </button>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
