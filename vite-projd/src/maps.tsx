import React, { useEffect, useRef } from 'react'

// Simple Maps page that dynamically loads the Google Maps JS API and
// creates a map centered on a default location. The API key must be
// provided via Vite env: VITE_GOOGLE_MAPS_API_KEY
//
// Usage:
// 1. Create a file `vite-projd/.env` with:
//    VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
// 2. Restart the dev server (Vite reads env at start).
// 3. Import and render this component: `import Maps from './maps'`

declare global {
  interface Window {
    google?: any
  }
}

const loadScript = (src: string) => {
  return new Promise<void>((resolve, reject) => {
    // If script already present, resolve when it loads
    const existing = document.querySelector(`script[src="${src}"]`)
    if (existing) {
      if ((existing as HTMLScriptElement).getAttribute('data-loaded') === 'true') {
        resolve()
        return
      }
      existing.addEventListener('load', () => resolve())
      existing.addEventListener('error', () => reject(new Error('Failed to load script')))
      return
    }

    const s = document.createElement('script')
    s.src = src
    s.async = true
    s.defer = true
    s.addEventListener('load', () => {
      s.setAttribute('data-loaded', 'true')
      resolve()
    })
    s.addEventListener('error', () => reject(new Error('Failed to load script')))
    document.head.appendChild(s)
  })
}

const Maps: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null)

  // Vite exposes env vars via import.meta.env and they must start with VITE_
  const apiKey = (import.meta as any).env?.VITE_GOOGLE_MAPS_API_KEY || ''

  useEffect(() => {
    if (!apiKey) return

    const initMap = () => {
      if (!mapRef.current) return
      const google = (window as any).google
      if (!google || !google.maps) return
      const center = { lat: 37.7749, lng: -122.4194 } // San Francisco as default
      const map = new google.maps.Map(mapRef.current, {
        center,
        zoom: 12,
      })
      new google.maps.Marker({ position: center, map })
    }

    if ((window as any).google && (window as any).google.maps) {
      initMap()
      return
    }

    const src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    loadScript(src)
      .then(initMap)
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error('Failed to load Google Maps script', err)
      })
  }, [apiKey])

 // if (!apiKey) {
   // return (
     // <div style={{ padding: 20 }}>
      //  <h2>Maps key not found</h2>
     // </div>
   // )
  //}

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div
        ref={mapRef}
        id="map"
        style={{ width: '100vh', height: '90vh', borderRadius: 5, boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}
      />
    </div>
  )
}

export default Maps
