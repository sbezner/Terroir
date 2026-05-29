import React, { useState } from 'react'

export default function Layout({ nav, main }) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100dvh',
                  overflow:'hidden', background:'#f5efe6', color:'#1a1208' }}>

      {/* ── Header ─────────────────────────────────────────────── */}
      <header style={{
        flexShrink: 0, display:'flex', alignItems:'center',
        justifyContent:'space-between', padding:'0 1.25rem',
        height: 48, background:'#3d2a18', borderBottom:'1px solid #2a1808',
        zIndex: 10,
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          {/* Mobile hamburger */}
          <button onClick={() => setDrawerOpen(true)}
            className="md:hidden"
            style={{ background:'none', border:'none', cursor:'pointer',
                     padding:'4px', color:'#b8956a' }}
            aria-label="Open navigation">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
          <span style={{
            fontFamily:'Georgia,serif', fontWeight:700,
            letterSpacing:'0.25em', textTransform:'uppercase',
            fontSize:'1rem', color:'#f0e4d0',
          }}>
            Terroir
          </span>
          <span className="hidden sm:block" style={{
            fontFamily:'"Courier New",monospace', fontSize:'0.6rem',
            letterSpacing:'0.14em', textTransform:'uppercase', color:'#7a5c3c',
          }}>
            American Culinary Atlas
          </span>
        </div>
        <span className="hidden md:block" style={{
          fontFamily:'"Courier New",monospace', fontSize:'0.6rem', color:'#5a3c20',
        }}>
          76 micro-regions · 11 megaregions
        </span>
      </header>

      {/* ── Body ────────────────────────────────────────────────── */}
      <div style={{ display:'flex', flex:1, overflow:'hidden', position:'relative' }}>

        {/* Desktop sidebar */}
        <aside className="hidden md:flex" style={{
          width:232, flexShrink:0, flexDirection:'column', overflow:'hidden',
          background:'#faf6f0', borderRight:'1px solid #ddd0bf',
        }}>
          {nav}
        </aside>

        {/* Mobile drawer */}
        {drawerOpen && (
          <div className="md:hidden" style={{
            position:'fixed', inset:0, zIndex:50, display:'flex',
          }} onClick={() => setDrawerOpen(false)}>
            <div style={{
              width:280, maxWidth:'85vw', display:'flex', flexDirection:'column',
              overflow:'hidden', background:'#faf6f0', borderRight:'1px solid #ddd0bf',
              boxShadow:'4px 0 24px rgba(0,0,0,0.18)',
            }} onClick={e => e.stopPropagation()}>
              <div style={{
                display:'flex', alignItems:'center', justifyContent:'space-between',
                padding:'0.75rem 1rem', borderBottom:'1px solid #ddd0bf', flexShrink:0,
              }}>
                <span style={{ fontFamily:'"Courier New",monospace', fontSize:'0.65rem',
                  letterSpacing:'0.12em', textTransform:'uppercase', color:'#7a6040' }}>
                  Regions
                </span>
                <button onClick={() => setDrawerOpen(false)}
                  style={{ background:'none', border:'none', cursor:'pointer', color:'#9c876a' }}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
              <div style={{ flex:1, overflowY:'auto' }}>{nav}</div>
            </div>
            <div style={{ flex:1, background:'rgba(0,0,0,0.3)' }}/>
          </div>
        )}

        {/* Right panel — full height, swaps between map and detail */}
        <main style={{ flex:1, overflow:'hidden', display:'flex',
                       flexDirection:'column', minWidth:0 }}>
          {main}
        </main>

      </div>
    </div>
  )
}
