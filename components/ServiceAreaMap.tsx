'use client'

import { Office } from '@/lib/types'
import { MapPin } from 'lucide-react'

export interface ServiceAreaMapProps {
  offices: Office[]
}

export function ServiceAreaMap({ offices }: ServiceAreaMapProps) {
  // Static SVG map with pin overlays for demonstration.
  return (
    <div className="w-full max-w-5xl mx-auto aspect-video bg-brand-primary/5 rounded-3xl border border-border relative overflow-hidden flex items-center justify-center">
      {/* Abstract Map Background (Placeholder for real SVG) */}
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#F36E20 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
        <span className="font-display font-bold text-6xl md:text-9xl tracking-widest text-brand-primary">O3 MAP</span>
      </div>

      {/* Render pins roughly where they belong using relative % positioning */}
      {offices.map((office, idx) => {
        const pos = {
          'dallas-hq': { top: '60%', left: '45%' },
          'california': { top: '45%', left: '15%' },
          'mexico': { top: '80%', left: '40%' },
          'guam': { top: '65%', left: '5%' }
        }[office.slug] || { top: '50%', left: '50%' }

        return (
          <button 
            key={idx}
            className="absolute flex flex-col items-center gap-1 group transform -translate-x-1/2 -translate-y-full hover:z-20"
            style={pos}
            aria-label={`View ${office.city} details`}
            onClick={() => {
              const el = document.getElementById(`office-${office.slug}`)
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <div className="bg-brand-primary text-white text-xs px-2 py-1 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap mb-1">
              {office.city}
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-brand-orange animate-ping rounded-full opacity-40"></div>
              <MapPin className="h-8 w-8 text-brand-orange relative z-10 drop-shadow-md" fill="currentColor" />
            </div>
          </button>
        )
      })}
    </div>
  )
}
