import { Person } from '@/lib/types'
import { User } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export interface LeadershipCardProps {
  person: Person
  variant?: 'featured' | 'standard'
}

export function LeadershipCard({ person, variant = 'standard' }: LeadershipCardProps) {
  const isFeatured = variant === 'featured'
  
  const LinkedinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
      <rect x="2" y="9" width="4" height="12"></rect>
      <circle cx="4" cy="4" r="2"></circle>
    </svg>
  )

  if (isFeatured) {
    return (
      <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-bg-white rounded-3xl border border-border overflow-hidden flex flex-col md:flex-row mb-8">
        <div className="w-full md:w-1/3 relative aspect-[3/4] md:aspect-auto">
          {person.portrait ? (
            <Image src={person.portrait.src} alt={person.portrait.alt} fill className="object-cover" />
          ) : (
            <div className="w-full h-full bg-brand-primary/5 flex items-center justify-center text-brand-primary/20">
              <User className="h-24 w-24" />
            </div>
          )}
        </div>
        <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col justify-center">
          <h3 className="text-3xl md:text-4xl font-display font-semibold text-brand-primary mb-2">{person.name}</h3>
          <p className="text-xl text-brand-orange font-medium mb-6">{person.title}</p>
          <div className="prose prose-lg text-text-2 mb-8">
            <p>{person.bio}</p>
          </div>
          {person.linkedinUrl && (
            <a href={person.linkedinUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-text-2 hover:text-brand-orange transition-colors mt-auto w-fit" aria-label={`LinkedIn profile for ${person.name}`}>
              <LinkedinIcon />
            </a>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-bg-white rounded-3xl border border-border overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      <div className="w-full relative aspect-[4/5]">
        {person.portrait ? (
          <Image src={person.portrait.src} alt={person.portrait.alt} fill className="object-cover" />
        ) : (
          <div className="w-full h-full bg-brand-primary/5 flex items-center justify-center text-brand-primary/20">
            <User className="h-16 w-16" />
          </div>
        )}
      </div>
      <div className="p-8 flex flex-col flex-1">
        <h3 className="text-2xl font-display font-semibold text-brand-primary mb-1">{person.name}</h3>
        <p className="text-brand-orange font-medium mb-4">{person.title}</p>
        <p className="text-text-2 mb-6 line-clamp-4 flex-1">{person.bio}</p>
        {person.linkedinUrl && (
          <a href={person.linkedinUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-text-2 hover:text-brand-orange transition-colors mt-auto w-fit" aria-label={`LinkedIn profile for ${person.name}`}>
            <LinkedinIcon />
          </a>
        )}
      </div>
    </div>
  )
}
