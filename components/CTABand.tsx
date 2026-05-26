import { CTAProps } from '@/lib/types'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { images } from '@/lib/data/images'

export interface CTABandProps {
  headline: string
  subheadline?: string
  ctaPrimary: CTAProps
  ctaSecondary?: CTAProps
  variant?: 'dark' | 'light' | 'orange'
  /** When true, renders the same solar-farm background image with heavy overlay. Default: true on dark variant. */
  withImage?: boolean
}

export function CTABand({
  headline,
  subheadline,
  ctaPrimary,
  ctaSecondary,
  variant = 'dark',
  withImage,
}: CTABandProps) {
  const useImage = withImage ?? variant === 'dark'

  const bgClasses = {
    dark: 'bg-brand-primary text-white',
    light: 'bg-bg-cream text-text-1 border-y border-border',
    orange: 'bg-brand-orange text-white',
  }

  return (
    <section
      className={cn(
        'py-16 md:py-24 px-4 w-full text-center relative overflow-hidden',
        bgClasses[variant],
      )}
    >
      {useImage && variant === 'dark' && (
        <>
          <Image
            src={images.bg.cta}
            alt=""
            fill
            sizes="100vw"
            className="object-cover absolute inset-0 z-0"
            aria-hidden="true"
          />
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-brand-primary/62 via-brand-primary/62 to-brand-primary/78" />
        </>
      )}

      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 relative z-10">
        <h2 className="text-3xl md:text-5xl font-display font-semibold text-inherit tracking-tight text-balance">
          {headline}
        </h2>
        {subheadline && (
          <p className="text-lg md:text-xl opacity-90 max-w-2xl text-inherit font-body text-balance">
            {subheadline}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Button
            asChild
            size="lg"
            className={cn(
              variant === 'dark' || variant === 'orange'
                ? 'bg-brand-orange hover:bg-brand-orange/90 text-white rounded-full px-8 h-14 shadow-lg font-semibold'
                : 'bg-brand-primary hover:bg-brand-dark text-white rounded-full px-8 h-14 font-semibold',
            )}
          >
            <Link href={ctaPrimary.href}>
              {ctaPrimary.icon && <ctaPrimary.icon className="mr-2 h-5 w-5" />}
              {ctaPrimary.label}
            </Link>
          </Button>
          {ctaSecondary && (
            <Button
              asChild
              size="lg"
              variant="outline"
              className={cn(
                variant === 'dark'
                  ? 'bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50 rounded-full px-8 h-14 font-semibold backdrop-blur-sm'
                  : 'rounded-full px-8 h-14 bg-white text-brand-primary border-border hover:bg-bg-cream font-semibold',
              )}
            >
              <Link href={ctaSecondary.href}>
                {ctaSecondary.icon && <ctaSecondary.icon className="mr-2 h-5 w-5" />}
                {ctaSecondary.label}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
