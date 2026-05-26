import { Service } from '@/lib/types'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { images } from '@/lib/data/images'

export interface ServiceTileProps {
  service: Service
  size?: 'lg' | 'md' | 'sm'
  variant?: 'hub' | 'cross-link'
}

export function ServiceTile({ service, size = 'md' }: ServiceTileProps) {
  const imgSrc =
    service.slug in images.service_by_slug
      ? images.service_by_slug[service.slug as keyof typeof images.service_by_slug]
      : images.services.src

  // sm = compact, used when 4 in a row on home page
  // md = standard card on services hub
  // lg = horizontal featured card
  const isHorizontal = size === 'lg'

  return (
    <Link
      href={service.href}
      className={cn(
        'group flex flex-col bg-bg-white border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(2,34,64,0.12)] h-full',
        isHorizontal && 'md:flex-row',
      )}
      aria-label={`${service.title}. ${service.shortDescription}`}
    >
      {/* Image area */}
      <div
        className={cn(
          'relative overflow-hidden bg-brand-primary/5 shrink-0',
          isHorizontal ? 'md:w-1/2 aspect-video md:aspect-auto' : 'aspect-[16/10]',
        )}
      >
        <Image
          src={imgSrc}
          alt={`${service.title} reference photo`}
          fill
          sizes={isHorizontal ? '(max-width: 768px) 100vw, 600px' : '(max-width: 768px) 100vw, 33vw'}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/55 via-brand-dark/20 to-transparent" />
        {/* Icon badge over image */}
        <div className="absolute top-4 left-4 h-11 w-11 rounded-xl bg-bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-sm">
          <service.icon className="h-5 w-5 text-brand-orange" />
        </div>
      </div>

      {/* Text area */}
      <div
        className={cn(
          'flex flex-col flex-1',
          size === 'sm' ? 'p-5' : 'p-6 lg:p-7',
          isHorizontal && 'md:justify-center md:w-1/2',
        )}
      >
        <h3
          className={cn(
            'font-display font-semibold text-brand-primary mb-3',
            size === 'sm' ? 'text-lg' : 'text-xl md:text-2xl',
          )}
        >
          {service.title}
        </h3>
        <p
          className={cn(
            'text-text-2 leading-relaxed flex-1',
            size === 'sm' ? 'text-sm mb-4' : 'mb-5',
          )}
        >
          {size === 'sm' ? service.oneLiner : service.shortDescription}
        </p>
        <div className="mt-auto flex items-center text-brand-orange font-semibold text-sm tracking-wide">
          <span>Learn more</span>
          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}
