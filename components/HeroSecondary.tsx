import { CTAProps, MediaProps } from '@/lib/types'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export interface HeroSecondaryProps {
  eyebrow?: string
  headline: string
  subheadline?: string
  primaryCTA?: CTAProps
  media: MediaProps
  height?: 'sm' | 'md' | 'lg'
  overlayStrength?: 'medium' | 'heavy'
}

export function HeroSecondary({
  eyebrow,
  headline,
  subheadline,
  primaryCTA,
  media,
  height = 'sm',
  overlayStrength = 'heavy',
}: HeroSecondaryProps) {
  const heightClasses = {
    sm: 'min-h-[45vh] md:min-h-[55vh]',
    md: 'min-h-[55vh] md:min-h-[65vh]',
    lg: 'min-h-[65vh] md:min-h-[75vh]',
  }

  // overlayStrength controls how dark the navy overlay is so headline text stays legible.
  const overlayClasses =
    overlayStrength === 'heavy'
      ? 'bg-brand-dark/60'
      : 'bg-brand-dark/42'

  return (
    <section
      role="banner"
      className={cn(
        'relative flex items-center justify-center pt-24 pb-16 overflow-hidden w-full',
        heightClasses[height],
      )}
    >
      <div className="absolute inset-0 bg-brand-dark">
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes="100vw"
          priority={media.priority}
          className="object-cover"
        />
        <div className={cn('absolute inset-0', overlayClasses)} />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/30 via-transparent to-brand-dark/60" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center flex flex-col items-center mt-4">
        {eyebrow && (
          <span className="text-eyebrow text-brand-orange mb-4 block">{eyebrow}</span>
        )}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-white tracking-tighter leading-[1.05] mb-6 text-balance">
          {headline}
        </h1>
        {subheadline && (
          <p className="text-lg md:text-xl text-white/90 max-w-[65ch] leading-relaxed mb-8 text-balance">
            {subheadline}
          </p>
        )}
        {primaryCTA && (
          <Button
            asChild
            size="lg"
            className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-full px-8 h-14 shadow-lg hover:-translate-y-0.5 transition-all mt-2 font-semibold"
          >
            <Link href={primaryCTA.href}>
              {primaryCTA.icon && <primaryCTA.icon className="mr-2 h-5 w-5" />}
              {primaryCTA.label}
            </Link>
          </Button>
        )}
      </div>
    </section>
  )
}
