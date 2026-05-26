import { Project } from '@/lib/types'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { MapPin } from 'lucide-react'

export interface ProjectCardProps {
  project: Project
  variant?: 'grid' | 'scroll'
}

export function ProjectCard({ project, variant = 'grid' }: ProjectCardProps) {
  const isScroll = variant === 'scroll'
  
  return (
    <div 
      className={cn(
        "group flex flex-col bg-white border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-300 relative",
        isScroll ? "w-[320px] md:w-[384px] shrink-0 snap-start" : "w-full"
      )}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-primary/5">
        <Image
          src={project.hero.src}
          alt={project.hero.alt}
          fill
          sizes={isScroll ? "384px" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="inline-block bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-brand-primary shadow-sm border border-black/5 capitalize">
            {project.industry}
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="text-metric text-accent-coral mb-2" style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)' }}>
          {project.capacity.value}
          <span className="text-xl font-body ml-1">{project.capacity.unit}</span>
        </div>
        <h3 className="text-xl font-display font-semibold text-brand-primary mb-1 line-clamp-1">
          {project.client}
        </h3>
        <div className="flex items-center text-sm text-text-2 mb-5 gap-1.5">
          <MapPin className="h-4 w-4 shrink-0 opacity-70" />
          <span className="line-clamp-1">{project.location.city}{project.location.state ? `, ${project.location.state}` : ''}</span>
        </div>
        <div className="mt-auto pt-4 border-t border-border/50 text-sm font-medium text-brand-primary line-clamp-2">
          {project.outcomeLine}
        </div>
      </div>
    </div>
  )
}
