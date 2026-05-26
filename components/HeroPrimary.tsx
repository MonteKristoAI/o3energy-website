import { CTAProps, MediaProps } from '@/lib/types'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export interface HeroPrimaryProps {
  eyebrow?: string
  headline: string
  subheadline?: string
  primaryCTA: CTAProps
  secondaryCTA?: CTAProps
  media: MediaProps
  height?: 'sm' | 'md' | 'lg' | 'xl'
}

export function HeroPrimary({
  eyebrow,
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  media,
  height = 'lg',
}: HeroPrimaryProps) {
  const heightClasses = {
    sm: 'min-h-[50vh] md:min-h-[55vh]',
    md: 'min-h-[60vh] md:min-h-[70vh]',
    lg: 'min-h-[70vh] md:min-h-[85vh]',
    xl: 'min-h-[80vh] md:min-h-[95vh]',
  }

  return (
    <section
      role="banner"
      className={cn(
        'relative flex items-center w-full overflow-hidden',
        heightClasses[height],
      )}
    >
      {/* Full-bleed background image */}
      <div className="absolute inset-0 bg-brand-dark">
        <Image
          src={media.src}
          alt={media.alt}
          fill
          priority={media.priority}
          sizes="100vw"
          className="object-cover"
        />
        {/* Dark overlay so text is readable. Combination of solid + gradient. */}
        <div className="absolute inset-0 bg-brand-dark/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/85 via-brand-dark/55 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 md:px-8 lg:px-12 py-24 md:py-32">
        <div className="max-w-3xl">
          {eyebrow && (
            <span className="text-eyebrow text-brand-orange mb-6 block">{eyebrow}</span>
          )}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-semibold text-white tracking-tighter leading-[1.05] mb-6 text-balance">
            {headline}
          </h1>
          {subheadline && (
            <p className="text-lg md:text-xl text-white/85 max-w-[60ch] leading-relaxed mb-10 text-pretty">
              {subheadline}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-full px-8 h-14 shadow-lg hover:-translate-y-0.5 transition-all font-semibold"
            >
              <Link href={primaryCTA.href}>
                {primaryCTA.icon && <primaryCTA.icon className="mr-2 h-5 w-5" />}
                {primaryCTA.label}
              </Link>
            </Button>
            {secondaryCTA && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full px-8 h-14 bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50 backdrop-blur-sm transition-all font-semibold"
              >
                <Link href={secondaryCTA.href}>
                  {secondaryCTA.icon && <secondaryCTA.icon className="mr-2 h-5 w-5" />}
                  {secondaryCTA.label}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
