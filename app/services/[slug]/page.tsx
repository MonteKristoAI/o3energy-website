import { servicesData } from '@/lib/data/services'
import { projectsData } from '@/lib/data/projects'
import { notFound } from 'next/navigation'
import { generatePageSchema } from '@/lib/schema'
import { CTABand } from '@/components/CTABand'
import { HeroSecondary } from '@/components/HeroSecondary'
import { FAQAccordion } from '@/components/FAQAccordion'
import { ProjectCard } from '@/components/ProjectCard'
import { faqsData } from '@/lib/data/faqs'
import { images } from '@/lib/data/images'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export function generateStaticParams() {
  return servicesData.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = servicesData.find((s) => s.slug === slug)
  if (!service) return { title: 'Service Not Found' }
  return {
    title: `${service.title} | O3 Energy`,
    description: service.shortDescription,
  }
}

const detailCopy: Record<string, { heading: string; body: string[]; bullets: string[] }> = {
  'project-development': {
    heading: 'Site selection to a signed PPA',
    body: [
      'Most projects die in development. The site looks good on a satellite map and falls apart when we pull the interconnection queue, the local AHJ tells us we need a major review, or the tariff is structured against the load profile. Our development team has been navigating these failure modes since 2011.',
      'We treat development as four parallel tracks: site, interconnection, environmental, and finance. Each track has a named owner who escalates blockers in writing the same week they appear. No project gets quiet.',
    ],
    bullets: [
      'Site assessment with utility interval data and structural review',
      'Interconnection application and queue management with the local utility',
      'Environmental review and AHJ permitting across our active jurisdictions',
      'Tax-equity and PPA structuring with our capital partners',
    ],
  },
  epc: {
    heading: 'Engineering, procurement, construction. One contract.',
    body: [
      'EPC is where most solar developers outsource. We do not. In-house engineers design the system. Full-time procurement holds preferred pricing with Tier-1 module and inverter brands. Our own construction crews build the array.',
      'When something goes wrong on site, you call one project manager. That manager has the engineer who designed the system on speed dial. That is what a single contract is supposed to mean.',
    ],
    bullets: [
      'In-house engineering: layout, structural, electrical, and interconnection drawings.',
      'Procurement with preferred pricing on Tier-1 modules and inverters.',
      'NABCEP-certified crews with an active OSHA-30 safety program.',
      'One project manager from kickoff through commissioning.',
    ],
  },
  'installation-maintenance': {
    heading: '25 to 30 years of operation, serviced by the same team',
    body: [
      'A solar system is not a finished project on the day it gets commissioned. It is a long horizon asset that needs annual cleaning, preventive maintenance, panel-level monitoring, and someone to chase the manufacturer when a part fails in year nine.',
      'We provide all of that. The crew that installs the system is on the same team as the crew that services it. That continuity is the difference between an asset that performs as modeled and an asset that quietly underperforms for a decade.',
    ],
    bullets: [
      'Annual panel cleanings and visual inspection',
      'Preventive maintenance on inverters, racking, and combiner boxes',
      'PV monitoring at the string or module level',
      'Warranty escalation managed by us on your behalf',
    ],
  },
  financing: {
    heading: 'Five ways to finance a commercial solar asset',
    body: [
      'Cap-ex avoidance is the most common reason organizations look at solar without buying it outright. We structure five common modes and walk you through which one fits your tax position and load profile.',
      'No mode is universally right. A tax-exempt municipal buyer needs a PPA. A profitable commercial buyer with appetite for the ITC may prefer direct purchase. A real estate operator with a long-tenant lease may prefer a Pre-Paid PPA. We model each before recommending one.',
    ],
    bullets: [
      'Power Purchase Agreement (PPA): we own and operate, you pay per kWh produced.',
      'Pre-Paid PPA: lump-sum upfront discount against decades of generation.',
      'Energy Service Agreement (ESA): broader scope than PPA, includes O&M.',
      'Direct purchase with our financing partners for tax-equity structuring.',
      'Project acquisition or joint venture for partners with sited projects.',
    ],
  },
  'asset-management': {
    heading: '24/7 monitoring, billing, and SREC handling for the 25-year horizon',
    body: [
      'An installed solar system generates revenue across two and a half decades. Most of the operational cost in those years has nothing to do with electricity. It is billing, SREC monetization, performance variance reporting to off-takers, and the warranty claim you forgot you needed to file.',
      'Our asset management team carries that work. We monitor systems 24/7, run monthly performance reports against the original financial model, monetize SRECs where applicable, and chase the manufacturer when an inverter fails in year nine.',
    ],
    bullets: [
      '24/7 performance monitoring with daily under-production alerts',
      'Invoicing, billing, and funds distribution for PPA/ESA off-takers',
      'SREC tracking and monetization where state programs apply',
      'Warranty claim management for modules, inverters, and racking',
    ],
  },
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = servicesData.find((s) => s.slug === slug)
  if (!service) notFound()

  const copy = detailCopy[service.slug] ?? detailCopy['project-development']
  const heroImg =
    service.slug in images.service_by_slug
      ? images.service_by_slug[service.slug as keyof typeof images.service_by_slug]
      : images.services.src

  // Pick 2 related projects (different per service) for the cross-link block
  const idx = servicesData.findIndex((s) => s.slug === service.slug)
  const start = (idx * 2) % projectsData.length
  const related = [projectsData[start], projectsData[(start + 1) % projectsData.length]]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generatePageSchema(`/services/${service.slug}`)) }}
      />

      <HeroSecondary
        eyebrow="Service"
        headline={service.title}
        subheadline={service.shortDescription}
        media={{ src: heroImg, alt: `${service.title} reference photo` }}
        overlayStrength="heavy"
      />

      <div className="bg-bg-cream py-6 border-b border-border">
        <div className="max-w-7xl mx-auto px-4">
          <Link
            href="/services"
            className="inline-flex items-center text-text-2 hover:text-brand-orange transition-colors font-semibold tracking-wide text-sm"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to services
          </Link>
        </div>
      </div>

      <section className="py-24 px-4 bg-bg-cream">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-brand-primary mb-8 tracking-tight">
            {copy.heading}
          </h2>
          <div className="space-y-6 text-lg text-text-2 leading-relaxed">
            {copy.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            {copy.bullets.map((b, i) => (
              <li
                key={i}
                className="flex gap-3 p-5 bg-white border border-border rounded-2xl text-text-1"
              >
                <span className="w-2 h-2 rounded-full bg-brand-orange mt-2.5 shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-24 px-4 bg-white border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-eyebrow text-brand-orange mb-4 block">From the portfolio</span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-brand-primary">
              Projects where {service.title.toLowerCase()} mattered
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {related.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-bg-cream">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-eyebrow text-brand-orange mb-4 block">Common questions</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-brand-primary">
              What buyers ask first
            </h2>
          </div>
          <FAQAccordion items={faqsData} />
        </div>
      </section>

      <CTABand
        headline={`Have a ${service.title.toLowerCase()} scope in mind?`}
        subheadline="Tell us the project type, capacity range, and timeline."
        ctaPrimary={{ label: 'Request a Consultation', href: '/contact' }}
        variant="dark"
      />
    </>
  )
}
