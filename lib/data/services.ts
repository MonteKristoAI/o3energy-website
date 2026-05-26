import { Service } from '../types'
import { HardHat, Wrench, PiggyBank, BarChart3, Sun } from 'lucide-react'

export const servicesData: Service[] = [
  {
    slug: 'project-development',
    title: 'Project Development',
    oneLiner: 'From site selection to a signed PPA in 12 to 18 months.',
    shortDescription:
      'We run site assessment, interconnection applications, environmental review, and AHJ permitting so a project is ready to build before construction crews mobilize.',
    icon: Sun,
    href: '/services/project-development',
    featured: true,
  },
  {
    slug: 'epc',
    title: 'EPC',
    oneLiner: 'Engineering, procurement, and construction under one contract.',
    shortDescription:
      'In-house engineers, full-time procurement, and field-tested construction crews. One contract for design, equipment sourcing, and build, with one project manager from kickoff to commissioning.',
    icon: HardHat,
    href: '/services/epc',
    featured: true,
  },
  {
    slug: 'installation-maintenance',
    title: 'Installation & Maintenance',
    oneLiner: '25 to 30 years of operation, serviced by the team that built it.',
    shortDescription:
      'Annual panel cleanings, preventive maintenance, PV inspections, electrical testing, and warranty enforcement for the full operating life of your system.',
    icon: Wrench,
    href: '/services/installation-maintenance',
  },
  {
    slug: 'financing',
    title: 'Financing',
    oneLiner: 'PPA, Pre-Paid PPA, ESA, direct purchase, or tax-equity structuring.',
    shortDescription:
      'Five financing modes for commercial and utility-scale solar. We structure Power Purchase Agreements, Pre-Paid PPAs, Energy Service Agreements, and tax-equity vehicles, and walk you through which mode fits.',
    icon: PiggyBank,
    href: '/services/financing',
  },
  {
    slug: 'asset-management',
    title: 'Asset Management',
    oneLiner: '24/7 monitoring, invoicing, and SREC handling for the long horizon.',
    shortDescription:
      'Active portfolio monitoring, billing and funds distribution, SREC monetization, and warranty claims management so your assets perform exactly as modeled across 25 years.',
    icon: BarChart3,
    href: '/services/asset-management',
  },
]
