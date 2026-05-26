import { industriesData } from '@/lib/data/industries'
import { projectsData } from '@/lib/data/projects'
import { notFound } from 'next/navigation'
import { generatePageSchema } from '@/lib/schema'
import { CTABand } from '@/components/CTABand'
import { ProjectCard } from '@/components/ProjectCard'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export function generateStaticParams() {
  return industriesData.map((industry) => ({ slug: industry.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const industry = industriesData.find((i) => i.slug === slug)
  if (!industry) return { title: 'Industry Not Found' }
  return {
    title: `${industry.title} Solar | O3 Energy`,
    description: industry.shortDescription,
  }
}

const detailCopy: Record<string, { h2: string; body: string[]; bullets: string[] }> = {
  commercial: {
    h2: 'Demand charges, peak shaving, and a 7 to 12 year payback',
    body: [
      'Commercial buyers care about three numbers: how much the system reduces the demand charge, how much it offsets daytime baseload, and when the cumulative savings pay back the investment.',
      'We size and model every commercial system against your measured 15-minute interval data. The proposal we give you ties the array directly to those three numbers. No marketing claims, just the math against your tariff and load profile.',
    ],
    bullets: [
      'Tariff-modeled production against your actual interval data',
      'Demand-charge reduction analysis at the meter level',
      'PPA, Pre-Paid PPA, or direct purchase financing for cap-ex avoidance',
      'NABCEP-certified install with O&M handoff to the same team',
    ],
  },
  government: {
    h2: 'Tax-exempt budgets, federal procurement, and offices in Guam and Mexico',
    body: [
      'Government and tax-exempt buyers cannot directly monetize the federal solar ITC. That changes the financing structure. We package PPAs and ESAs that let municipalities, school districts, and federal facilities access solar without taking on cap-ex.',
      'Our four offices include locations in Tamuning, Guam and Lagos de Moreno, Mexico. That matters for federal procurement on Pacific bases and for binational projects that need permitting expertise on both sides of a border.',
    ],
    bullets: [
      'PPA and ESA structuring for tax-exempt entities',
      'Multi-jurisdiction permitting across our active states',
      'Pacific Islands presence for federal and resort projects',
      'Compliance with GSA and state procurement codes',
    ],
  },
  'utility-scale': {
    h2: 'Distributed generation from 100 kW to 10 MW under one developer',
    body: [
      'Utility-scale solar takes 18 months and four disciplines: site sourcing, interconnection, PPA structuring, and asset management at scale. Most developers own one of those disciplines and outsource the other three.',
      'O3 Energy owns all four. For projects 100 kW to 10 MW where a landowner, IPP, or off-taker brings the site, we co-deliver under our channel partner program. PPA, Pre-Paid PPA, ESA, or project acquisition.',
    ],
    bullets: [
      'Site sourcing and structural review',
      'Interconnection queue management with the local utility',
      'PPA, Pre-Paid PPA, and ESA structuring with our capital partners',
      'Channel partnership for sited projects in the 100 kW to 10 MW range',
    ],
  },
}

export default async function IndustryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const industry = industriesData.find((i) => i.slug === slug)
  if (!industry) notFound()

  const copy = detailCopy[industry.slug] ?? detailCopy['commercial']

  // Related projects per industry mapping
  const projectMatcher: Record<string, (slugs: string[]) => boolean> = {
    commercial: () => true,
    government: () => true,
    'utility-scale': () => true,
  }
  let relatedProjects = projectsData.filter((p) => p.industry === industry.slug)
  if (relatedProjects.length < 3) {
    // Top up with hospitality/religious where vertical is thin
    relatedProjects = [
      ...relatedProjects,
      ...projectsData.filter((p) => !relatedProjects.includes(p)).slice(0, 3 - relatedProjects.length),
    ]
  }
  relatedProjects = relatedProjects.slice(0, 3)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generatePageSchema(`/industries/${industry.slug}`)) }}
      />

      <section className="pt-32 pb-24 bg-white border-b border-border">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Link
            href="/industries"
            className="inline-flex items-center text-text-2 hover:text-brand-orange mb-8 transition-colors font-semibold tracking-wide"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to industries
          </Link>
          <span className="text-eyebrow text-brand-orange mb-4 block">Sector</span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-semibold text-brand-primary mb-6 text-balance tracking-tight">
            {industry.title}
          </h1>
          <p className="text-2xl text-text-2 text-balance leading-relaxed mx-auto max-w-3xl font-light">
            {industry.shortDescription}
          </p>
        </div>
      </section>

      <section className="py-24 px-4 bg-bg-cream">
        <div className="max-w-4xl mx-auto mb-24">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-brand-primary mb-8 tracking-tight">
            {copy.h2}
          </h2>
          <div className="space-y-6 text-lg text-text-2 leading-relaxed">
            {copy.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            {copy.bullets.map((b, i) => (
              <li key={i} className="flex gap-3 p-5 bg-white border border-border rounded-2xl text-text-1">
                <span className="w-2 h-2 rounded-full bg-brand-orange mt-2.5 shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-eyebrow text-brand-orange mb-4 block">Track record</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-brand-primary">
              Projects in this sector
            </h2>
          </div>
          {relatedProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          ) : (
            <p className="text-center text-text-2 text-lg">No projects published for this sector yet.</p>
          )}
        </div>
      </section>

      <CTABand
        headline={industry.slug === 'utility-scale' ? 'Have a sited 100 kW to 10 MW project?' : 'Specific facility in mind?'}
        subheadline="Tell us the project type, capacity range, and timeline."
        ctaPrimary={{
          label: industry.slug === 'utility-scale' ? 'Submit a project' : 'Request a Consultation',
          href: industry.slug === 'utility-scale' ? '/partners' : '/contact',
        }}
        variant="dark"
      />
    </>
  )
}
