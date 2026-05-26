import { Industry, Project } from '@/lib/types'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { images } from '@/lib/data/images'

export interface IndustryCardProps {
  industry: Industry
  featuredProject?: Project
}

export function IndustryCard({ industry, featuredProject }: IndustryCardProps) {
  const fallback =
    industry.slug in images.industryDetail
      ? images.industryDetail[industry.slug as keyof typeof images.industryDetail]
      : images.industries
  const imgSrc = featuredProject?.hero?.src || fallback.src
  const imgAlt = featuredProject?.hero?.alt || fallback.alt

  return (
    <Link
      href={industry.href}
      className="group flex flex-col bg-white border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] h-full"
      aria-label={`${industry.title}. ${industry.shortDescription}`}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-brand-primary/5">
        <Image
          src={imgSrc}
          alt={imgAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {featuredProject && (
          <div className="absolute bottom-4 left-4 right-4 flex">
            <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-brand-primary shadow-sm border border-black/5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-coral" />
              {featuredProject.client}. {featuredProject.capacity.value} {featuredProject.capacity.unit}
            </div>
          </div>
        )}
      </div>
      <div className="p-6 lg:p-8 flex flex-col flex-1">
        <h3 className="text-2xl font-display font-semibold text-brand-primary mb-3">{industry.title}</h3>
        <p className="text-text-2 mb-6 leading-relaxed">{industry.shortDescription}</p>
        <div className="mt-auto flex items-center text-brand-orange font-semibold tracking-wide pt-4 border-t border-border/50">
          <span>See industry capability</span>
          <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}
