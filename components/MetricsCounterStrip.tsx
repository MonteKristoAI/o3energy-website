'use client'

import { Metric } from '@/lib/types'
import { MetricTile } from './MetricTile'
import { cn } from '@/lib/utils'

export interface MetricsCounterStripProps {
  metrics: Metric[]
  variant?: 'home' | 'about'
  animateOnScroll?: boolean
}

export function MetricsCounterStrip({ metrics, variant = 'home', animateOnScroll = true }: MetricsCounterStripProps) {
  return (
    <section 
      className={cn(
        "w-full py-8 md:py-16 px-4 relative z-20",
        variant === 'home' ? "bg-brand-primary border-t border-white/10" : "bg-bg-cream"
      )}
    >
      <div className="max-w-7xl mx-auto">
        <ul
          role="list"
          className={cn(
            'grid gap-4 md:gap-6',
            // Number of metrics dictates the lg layout so 4 metrics fit in one row.
            metrics.length === 4
              ? 'grid-cols-2 lg:grid-cols-4'
              : metrics.length === 3
              ? 'grid-cols-1 sm:grid-cols-3'
              : 'grid-cols-1 sm:grid-cols-2',
          )}
        >
          {metrics.map((metric, idx) => (
            <li key={idx}>
              <MetricTile {...metric} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
