'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

export interface PartnerLogo {
  name: string
  src?: string
  href?: string
}

export interface PartnerMarqueeProps {
  logos: readonly PartnerLogo[]
  variant?: 'home' | 'footer'
  pauseOnHover?: boolean
  eyebrow?: string
  /** Cycle duration in seconds for one full loop. Lower = faster. */
  speed?: number
}

/**
 * Continuous horizontal scroll. Uses TWO identical lists side-by-side and animates
 * `translateX(-50%)` so when the first list scrolls off-screen the second occupies the
 * same position, producing a seamless infinite loop with no jump at the seam.
 */
export function PartnerMarquee({
  logos,
  variant = 'home',
  pauseOnHover = true,
  eyebrow = 'Trusted by',
  speed = 35,
}: PartnerMarqueeProps) {
  function renderLogo(logo: PartnerLogo) {
    if (logo.src) {
      return (
        <Image
          src={logo.src}
          alt={`${logo.name} logo`}
          width={220}
          height={120}
          unoptimized
          className="h-20 md:h-28 w-auto object-contain max-w-[200px] grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
        />
      )
    }
    return (
      <span className="whitespace-nowrap text-2xl md:text-4xl font-display font-semibold tracking-tight text-brand-primary/55 group-hover:text-brand-primary transition-colors">
        {logo.name}
      </span>
    )
  }

  function logoNode(logo: PartnerLogo, idx: number, ariaHidden = false) {
    const inner = renderLogo(logo)
    return (
      <li
        key={idx}
        className="shrink-0 group flex items-center"
        aria-hidden={ariaHidden || undefined}
      >
        {logo.href ? (
          <Link
            href={logo.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${logo.name} (opens new tab)`}
            tabIndex={ariaHidden ? -1 : 0}
            className="block px-2"
          >
            {inner}
          </Link>
        ) : (
          <div className="px-2">{inner}</div>
        )}
      </li>
    )
  }

  if (variant === 'footer') {
    return (
      <ul role="list" className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
        {logos.map((logo, idx) => (
          <li key={idx} className="group">
            {logo.href ? (
              <Link href={logo.href} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${logo.name} (opens new tab)`}>
                {renderLogo(logo)}
              </Link>
            ) : (
              renderLogo(logo)
            )}
          </li>
        ))}
      </ul>
    )
  }

  return (
    <section
      className="w-full overflow-hidden bg-white py-14 md:py-20 border-y border-border"
      aria-label="Selected clients"
    >
      <div className="max-w-7xl mx-auto px-4 mb-10 text-center">
        <p className="text-eyebrow text-text-2">{eyebrow}</p>
      </div>

      {/* Marquee track: TWO identical ULs side-by-side, animated as a unit. */}
      <div
        className={cn(
          'marquee-track flex w-max items-center',
          pauseOnHover && 'hover:[animation-play-state:paused]',
        )}
        style={{ animation: `marquee-scroll ${speed}s linear infinite` }}
      >
        <ul role="list" className="flex shrink-0 gap-14 md:gap-24 px-7 md:px-12 items-center">
          {logos.map((logo, idx) => logoNode(logo, idx))}
        </ul>
        <ul role="list" aria-hidden="true" className="flex shrink-0 gap-14 md:gap-24 px-7 md:px-12 items-center">
          {logos.map((logo, idx) => logoNode(logo, idx + logos.length, true))}
        </ul>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes marquee-scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            @media (prefers-reduced-motion: reduce) {
              .marquee-track { animation: none !important; }
            }
          `,
        }}
      />
    </section>
  )
}
