'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ProjectCard } from '@/components/ProjectCard'
import type { Project } from '@/lib/types'
import { cn } from '@/lib/utils'

export interface ProjectScrollerProps {
  projects: Project[]
}

/**
 * Horizontal snap scroller for project cards with clickable prev/next arrow buttons.
 * Native wheel scroll is touchpad-only on desktop; mouse-wheel users can't scroll
 * horizontally, so the arrows are required as the primary control.
 *
 * Arrows fade in/out depending on scroll position (no point in showing "prev" when
 * already at the start).
 */
export function ProjectScroller({ projects }: ProjectScrollerProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const updateButtons = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    // 2px tolerance avoids rounding misses at the exact edge
    setCanPrev(scrollLeft > 2)
    setCanNext(scrollLeft + clientWidth < scrollWidth - 2)
  }, [])

  useEffect(() => {
    updateButtons()
    const el = trackRef.current
    if (!el) return
    el.addEventListener('scroll', updateButtons, { passive: true })
    window.addEventListener('resize', updateButtons)
    return () => {
      el.removeEventListener('scroll', updateButtons)
      window.removeEventListener('resize', updateButtons)
    }
  }, [updateButtons])

  const scrollBy = (direction: 'prev' | 'next') => {
    const el = trackRef.current
    if (!el) return
    // Scroll by ~1.5 cards so multiple clicks reveal a fresh card each time
    const card = el.querySelector('[data-project-card]') as HTMLElement | null
    const cardWidth = card?.offsetWidth ?? 360
    const gap = 24
    const step = (cardWidth + gap) * 1.5
    el.scrollBy({ left: direction === 'next' ? step : -step, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-4 px-4 md:mx-0 md:px-0 scroll-smooth"
        style={{ scrollbarWidth: 'none' }}
      >
        {projects.map((project) => (
          <div key={project.slug} data-project-card>
            <ProjectCard project={project} variant="scroll" />
          </div>
        ))}
      </div>

      {/* Hide native scrollbar in webkit too */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .flex.overflow-x-auto::-webkit-scrollbar { display: none; }
          `,
        }}
      />

      {/* Prev / Next arrow buttons */}
      <button
        type="button"
        onClick={() => scrollBy('prev')}
        disabled={!canPrev}
        aria-label="Previous projects"
        className={cn(
          'absolute left-2 md:-left-4 top-1/2 -translate-y-1/2 z-20',
          'h-12 w-12 md:h-14 md:w-14 rounded-full bg-white text-brand-primary shadow-[0_8px_24px_-6px_rgba(2,34,64,0.35)]',
          'flex items-center justify-center transition-all duration-200',
          'hover:bg-brand-orange hover:text-white hover:scale-105',
          'disabled:opacity-0 disabled:pointer-events-none',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2',
        )}
      >
        <ChevronLeft className="h-6 w-6" strokeWidth={2.5} />
      </button>

      <button
        type="button"
        onClick={() => scrollBy('next')}
        disabled={!canNext}
        aria-label="Next projects"
        className={cn(
          'absolute right-2 md:-right-4 top-1/2 -translate-y-1/2 z-20',
          'h-12 w-12 md:h-14 md:w-14 rounded-full bg-white text-brand-primary shadow-[0_8px_24px_-6px_rgba(2,34,64,0.35)]',
          'flex items-center justify-center transition-all duration-200',
          'hover:bg-brand-orange hover:text-white hover:scale-105',
          'disabled:opacity-0 disabled:pointer-events-none',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2',
        )}
      >
        <ChevronRight className="h-6 w-6" strokeWidth={2.5} />
      </button>
    </div>
  )
}
