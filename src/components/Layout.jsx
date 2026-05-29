import React from 'react'

// Sidebar removed — map is now full-width.
// Navigation is handled by the slide-in browse panel inside TerritorMap.
export default function Layout({ main }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100dvh',
                  overflow:'hidden', background:'#f5efe6' }}>
      {main}
    </div>
  )
}
