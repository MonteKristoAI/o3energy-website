import { Industry } from '../types'

export const industriesData: Industry[] = [
  {
    slug: 'commercial',
    title: 'Commercial',
    shortDescription:
      'Corporate facilities, hospitality, retail, and manufacturing where day-time load runs the bill and demand charges punish the back office.',
    href: '/industries/commercial',
    featuredProjectSlug: 'coca-cola-houston',
  },
  {
    slug: 'government',
    title: 'Government',
    shortDescription:
      'Municipal, county, federal, and education buyers with tax-exempt status that need creative PPA and ESA structures to make solar work on the budget cycle.',
    href: '/industries/government',
    featuredProjectSlug: 'city-of-murrieta',
  },
  {
    slug: 'utility-scale',
    title: 'Utility-Scale',
    shortDescription:
      '100 kW to 10 MW distributed generation. Landowners with sited acreage, IPPs, and utility off-takers looking for a developer who owns the full lifecycle.',
    href: '/industries/utility-scale',
    featuredProjectSlug: 'guam-resorts',
  },
]
