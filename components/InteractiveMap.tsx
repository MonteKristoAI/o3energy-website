'use client'

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { Office } from '@/lib/types'
import { useEffect } from 'react'

/**
 * Office coordinates.
 *
 * Guam's REAL longitude is +144.79 (east of dateline). To keep all four offices on the same
 * continuous map canvas WITHOUT wrapping, we normalize Guam to -215.21 (= 144.79 − 360).
 * Visually this still places Guam in the Pacific, but the bounds calculation treats the four
 * pins as a continuous longitudinal span from -215 to -96, so fitBounds frames the Pacific basin
 * with all four pins visible.
 */
const officeCoords: Record<string, [number, number]> = {
  'dallas-hq': [32.7872, -96.7969],
  'san-francisco': [37.789, -122.395],
  mexico: [21.355, -101.928],
  guam: [13.5061, -215.2082], // = 144.7918 - 360
}

export interface InteractiveMapProps {
  offices: Office[]
}

function makeIcon() {
  return L.divIcon({
    className: 'o3-marker',
    html: `
      <svg width="40" height="52" viewBox="0 0 40 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 0C8.95 0 0 8.95 0 20C0 35 20 52 20 52S40 35 40 20C40 8.95 31.05 0 20 0Z" fill="var(--color-brand-orange)"/>
        <circle cx="20" cy="20" r="8.5" fill="var(--color-brand-primary)"/>
        <circle cx="20" cy="20" r="3.5" fill="var(--color-bg-white)"/>
      </svg>
    `,
    iconSize: [40, 52],
    iconAnchor: [20, 52],
    popupAnchor: [0, -46],
  })
}

/**
 * Fits the map viewport to the supplied marker bounds on mount, with comfortable padding
 * so pins are not clipped to the edge of the canvas. Re-runs if the points change.
 */
function FitBoundsToMarkers({ points }: { points: [number, number][] }) {
  const map = useMap()
  useEffect(() => {
    if (points.length === 0) return
    const bounds = L.latLngBounds(points)
    map.fitBounds(bounds, {
      padding: [70, 70],
      maxZoom: 4,
      animate: false,
    })
  }, [map, points])
  return null
}

export function InteractiveMap({ offices }: InteractiveMapProps) {
  const points: [number, number][] = offices
    .map((o) => officeCoords[o.slug])
    .filter((p): p is [number, number] => Array.isArray(p))

  const icon = makeIcon()

  return (
    <div className="w-full h-[480px] md:h-[560px] rounded-3xl overflow-hidden border border-border shadow-floating">
      <MapContainer
        center={[25, -150]}
        zoom={3}
        scrollWheelZoom={false}
        worldCopyJump={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
        />

        <FitBoundsToMarkers points={points} />

        {offices.map((office) => {
          const coords = officeCoords[office.slug]
          if (!coords) return null
          return (
            <Marker key={office.slug} position={coords} icon={icon}>
              <Popup>
                <div className="font-display font-semibold text-brand-primary mb-1">
                  {office.city}
                  {office.state ? `, ${office.state}` : ''}
                  {office.territory ? `, ${office.territory}` : ''}
                </div>
                <div className="text-sm text-text-2 mb-2">{office.description}</div>
                <div className="text-xs text-text-2 leading-snug">{office.fullAddress}</div>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}
