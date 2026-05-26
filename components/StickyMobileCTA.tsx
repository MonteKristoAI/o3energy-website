import { CTAProps } from '@/lib/types'
import { Phone } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export interface StickyMobileCTAProps {
  phone: string
  primaryCTA: CTAProps
}

export function StickyMobileCTA({ phone, primaryCTA }: StickyMobileCTAProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-brand-primary border-t border-white/10 p-3 flex items-center justify-between lg:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
      <a href={`tel:${phone.replace(/\\D/g, '')}`} className="flex items-center gap-2 text-white hover:text-brand-orange transition-colors" aria-label={`Call ${phone}`}>
        <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
          <Phone className="h-5 w-5" />
        </div>
        <span className="font-semibold text-sm font-body tracking-wider">{phone}</span>
      </a>
      <Button asChild size="sm" className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-full px-6 font-semibold">
        <Link href={primaryCTA.href}>
          {primaryCTA.label}
        </Link>
      </Button>
    </div>
  )
}
