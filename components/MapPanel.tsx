'use client'

import dynamic from 'next/dynamic'
import type { Office } from '@/lib/types'

// react-leaflet touches `window` on mount so we must skip SSR.
// Wrapping the dynamic import inside a Client Component is the Next 16 supported pattern.
const InteractiveMap = dynamic(
  () => import('@/components/InteractiveMap').then((m) => m.InteractiveMap),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full h-[480px] md:h-[560px] rounded-3xl bg-brand-primary/5 border border-border flex items-center justify-center text-text-2"
        role="status"
        aria-live="polite"
      >
        Loading map...
      </div>
    ),
  },
)

export function MapPanel({ offices }: { offices: Office[] }) {
  return <InteractiveMap offices={offices} />
}
