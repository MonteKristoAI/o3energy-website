import { TrustItem } from '@/lib/types'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export interface TrustStripProps {
  items: TrustItem[]
  variant?: 'dark' | 'light'
  layout?: 'inline' | 'grid'
}

export function TrustStrip({ items, variant = 'dark', layout = 'inline' }: TrustStripProps) {
  const bgClasses = variant === 'dark' ? 'bg-brand-primary text-white border-none' : 'bg-bg-cream text-brand-primary border-y border-border'
  const iconClasses = variant === 'dark' ? 'text-brand-orange' : 'text-brand-orange'
  const hoverClasses = variant === 'dark' ? 'hover:bg-white/5' : 'hover:bg-black/5'

  return (
    <div className={cn("w-full py-8 px-4", bgClasses)}>
      <ul 
        role="list" 
        className={cn(
          "max-w-7xl mx-auto grid gap-6",
          layout === 'inline' 
            ? "grid-cols-2 md:grid-cols-3 lg:flex lg:flex-row lg:justify-center lg:flex-wrap lg:gap-12" 
            : "grid-cols-2 md:grid-cols-4 lg:grid-cols-5"
        )}
      >
        {items.map((item, idx) => {
          const content = (
            <>
              <item.icon className={cn("h-6 w-6 shrink-0", iconClasses)} aria-hidden="true" />
              <span className="font-medium text-sm md:text-base leading-tight text-balance">{item.label}</span>
            </>
          )

          return (
            <li key={idx} className="flex">
              {item.href ? (
                <Link 
                  href={item.href}
                  className={cn("flex items-center gap-3 p-2 -m-2 rounded-lg transition-colors w-full", hoverClasses)}
                >
                  {content}
                </Link>
              ) : (
                <div className="flex items-center gap-3 py-2 w-full">
                  {content}
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
