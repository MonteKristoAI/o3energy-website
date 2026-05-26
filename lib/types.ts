import type { LucideIcon } from 'lucide-react'

export interface MediaProps {
  src: string
  alt: string
  width?: number
  height?: number
  treatment?: 'duotone-hero' | 'navy-gradient' | 'plain'
  priority?: boolean
  blurDataURL?: string
}

export interface CTAProps {
  label: string
  href: string
  intent?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  icon?: LucideIcon
  external?: boolean
}

export interface TrustItem {
  icon: LucideIcon
  label: string
  href?: string
}

export interface Metric {
  value: number
  label: string
  suffix?: string
  prefix?: string
  decimals?: number
  duration?: number
}

export interface Service {
  slug: 'project-development' | 'epc' | 'installation-maintenance' | 'financing' | 'asset-management'
  title: string
  oneLiner: string
  shortDescription: string
  icon: LucideIcon
  href: string
  featured?: boolean
}

export interface Industry {
  slug: 'commercial' | 'government' | 'utility-scale'
  title: string
  shortDescription: string
  href: string
  featuredProjectSlug?: string
}

export interface Project {
  slug: string
  client: string
  capacity: { value: number; unit: 'kW' | 'MW' }
  location: { city: string; state?: string; country?: string }
  industry: Industry['slug'] | 'religious' | 'hospitality'
  commissioningYear: number
  outcomeLine: string
  hero: MediaProps
  authorized?: boolean
}

export interface Person {
  slug: string
  name: string
  title: string
  bio: string
  linkedinUrl?: string
  portrait: MediaProps | null
  isFeatured?: boolean
  education?: string
}

export interface Office {
  slug: string
  city: string
  state?: string
  country?: string
  territory?: string
  fullAddress: string
  googleMapsUrl: string
  type: 'hq' | 'regional'
  description: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface BreadcrumbItem {
  label: string
  href: string
}

export interface ProcessStep {
  number: number
  title: string
  description: string
  icon: LucideIcon
}
