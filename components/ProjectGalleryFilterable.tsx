'use client'

import { useState, useMemo } from 'react'
import { Project } from '@/lib/types'
import { ProjectCard } from './ProjectCard'
import { SearchX } from 'lucide-react'
import { Button } from './ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export interface ProjectGalleryFilterableProps {
  projects: Project[]
  initialFilters?: { industry?: string; capacity?: string; location?: string }
}

export function ProjectGalleryFilterable({ projects, initialFilters = {} }: ProjectGalleryFilterableProps) {
  const [industryFilter, setIndustryFilter] = useState<string>(initialFilters.industry || 'all')
  const [capacityFilter, setCapacityFilter] = useState<string>(initialFilters.capacity || 'all')
  const [stateFilter, setStateFilter] = useState<string>(initialFilters.location || 'all')

  const uniqueStates = useMemo(() => {
    const states = new Set<string>()
    projects.forEach(p => {
      if (p.location.state) states.add(p.location.state)
    })
    return Array.from(states).sort()
  }, [projects])

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      // Industry filter
      if (industryFilter !== 'all' && p.industry !== industryFilter) return false
      
      // Capacity filter
      if (capacityFilter !== 'all') {
        const capKw = p.capacity.unit === 'MW' ? p.capacity.value * 1000 : p.capacity.value
        if (capacityFilter === '<100' && capKw >= 100) return false
        if (capacityFilter === '100-500' && (capKw < 100 || capKw > 500)) return false
        if (capacityFilter === '>500' && capKw <= 500) return false
      }
      
      // State filter
      if (stateFilter !== 'all' && p.location.state !== stateFilter) return false
      
      return true
    })
  }, [projects, industryFilter, capacityFilter, stateFilter])

  const handleReset = () => {
    setIndustryFilter('all')
    setCapacityFilter('all')
    setStateFilter('all')
  }

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-2xl border border-border shadow-sm sticky top-24 z-30">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full flex-1">
          <Select value={industryFilter} onValueChange={setIndustryFilter}>
            <SelectTrigger aria-label="Filter by industry">
              <SelectValue placeholder="All Industries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Industries</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="government">Government</SelectItem>
              <SelectItem value="hospitality">Hospitality</SelectItem>
              <SelectItem value="religious">Religious</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={capacityFilter} onValueChange={setCapacityFilter}>
            <SelectTrigger aria-label="Filter by capacity">
              <SelectValue placeholder="All Capacities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Capacities</SelectItem>
              <SelectItem value="<100">&lt; 100 kW</SelectItem>
              <SelectItem value="100-500">100 - 500 kW</SelectItem>
              <SelectItem value=">500">&gt; 500 kW</SelectItem>
            </SelectContent>
          </Select>

          <Select value={stateFilter} onValueChange={setStateFilter}>
            <SelectTrigger aria-label="Filter by location">
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {uniqueStates.map(state => (
                <SelectItem key={state} value={state}>{state}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {(industryFilter !== 'all' || capacityFilter !== 'all' || stateFilter !== 'all') && (
          <Button variant="ghost" onClick={handleReset} className="shrink-0 text-text-2 hover:text-brand-orange">
            Reset filters
          </Button>
        )}
      </div>

      {/* Results Region */}
      <div aria-live="polite" aria-atomic="true" className="w-full min-h-[50vh]">
        <span className="sr-only">Showing {filteredProjects.length} projects</span>
        
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
              <ProjectCard key={project.slug} project={project} variant="grid" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center bg-white border border-border border-dashed rounded-3xl">
            <div className="w-16 h-16 bg-brand-primary/5 rounded-full flex items-center justify-center text-brand-primary mb-4">
              <SearchX className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-display font-semibold text-brand-primary mb-2">No projects match these filters</h3>
            <p className="text-text-2 mb-6 max-w-sm text-balance">We couldn't find any portfolio projects matching your exact criteria. Try broadening your filters.</p>
            <Button onClick={handleReset} variant="outline" className="rounded-full">
              Reset all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
