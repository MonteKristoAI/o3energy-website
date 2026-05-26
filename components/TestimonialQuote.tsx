import { Person } from '@/lib/types'
import { Quote } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface TestimonialQuoteProps {
  quote: string
  author: Person
  avatarSize?: 'sm' | 'md' | 'lg'
}

export function TestimonialQuote({ quote, author, avatarSize = 'md' }: TestimonialQuoteProps) {
  const initials = author.name.split(' ').map(n => n[0]).join('').substring(0, 2)
  
  const sizeClasses = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-14 h-14 text-base',
    lg: 'w-16 h-16 text-lg'
  }

  return (
    <figure className="flex flex-col items-center text-center max-w-4xl mx-auto px-4 py-12 md:py-20 relative">
      <Quote className="h-12 w-12 text-brand-orange opacity-20 mb-6 absolute top-4 md:top-8" aria-hidden="true" />
      
      <blockquote className="relative z-10 w-full">
        <p className="text-2xl md:text-4xl font-display font-semibold italic text-brand-primary leading-tight mb-10 text-balance mx-auto">
          "{quote}"
        </p>
      </blockquote>
      
      <figcaption className="flex items-center gap-4 text-left">
        <div className={cn("rounded-full bg-brand-primary flex items-center justify-center shrink-0 text-bg-cream font-display font-semibold", sizeClasses[avatarSize])}>
          {initials}
        </div>
        <div>
          <div className="font-semibold text-brand-primary text-lg">{author.name}</div>
          <div className="text-text-2 text-sm">{author.title}</div>
        </div>
      </figcaption>
    </figure>
  )
}
