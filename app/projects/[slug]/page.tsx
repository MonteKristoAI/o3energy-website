import { projectsData } from '@/lib/data/projects'
import { notFound } from 'next/navigation'
import { generatePageSchema } from '@/lib/schema'
import Image from 'next/image'
import { MapPin, Zap, Calendar, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { CTABand } from '@/components/CTABand'

export function generateStaticParams() {
  return projectsData.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projectsData.find((p) => p.slug === slug)
  if (!project) return { title: 'Project Not Found' }
  return {
    title: `${project.client} | ${project.capacity.value} ${project.capacity.unit} Solar | O3 Energy`,
    description: `${project.capacity.value} ${project.capacity.unit} solar installation for ${project.client} in ${project.location.city}, ${project.location.state || project.location.country || ''}. Commissioned ${project.commissioningYear}.`,
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projectsData.find((p) => p.slug === slug)
  if (!project) notFound()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generatePageSchema(`/projects/${project.slug}`)) }}
      />

      <article className="pt-32 pb-16 bg-bg-cream min-h-[100dvh]">
        <div className="max-w-5xl mx-auto px-4">
          <Link
            href="/projects"
            className="inline-flex items-center text-text-2 hover:text-brand-orange mb-8 transition-colors font-semibold"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to portfolio
          </Link>

          <header className="mb-12">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-block bg-white px-3 py-1.5 rounded-full text-xs font-semibold text-brand-primary shadow-sm border border-border uppercase tracking-wider">
                {project.industry}
              </span>
              <span className="text-text-2 font-medium bg-white px-3 py-1.5 rounded-full text-xs shadow-sm border border-border">
                Commissioned {project.commissioningYear}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-semibold text-brand-primary mb-6 text-balance">
              {project.client}
            </h1>
            <p className="text-2xl text-text-2 text-balance border-l-4 border-brand-orange pl-6 py-2 max-w-3xl leading-snug">
              {project.outcomeLine}
            </p>
          </header>

          <div className="relative aspect-video w-full rounded-3xl overflow-hidden mb-16 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)]">
            <Image src={project.hero.src} alt={project.hero.alt} fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 1024px" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-6 text-lg text-text-2 leading-relaxed">
              <h2 className="text-3xl font-display font-semibold text-brand-primary">Project overview</h2>
              <p>
                O3 Energy worked with {project.client} on a {project.capacity.value} {project.capacity.unit} solar
                installation in {project.location.city}. We designed and engineered the system in-house, sourced Tier-1
                modules and inverters through our procurement team, and built the array with our own NABCEP-certified
                construction crew.
              </p>
              <p>
                The system was sized against the facility's measured load profile and commissioned in {project.commissioningYear}.
                O3 Energy continues to monitor the array and manages preventive maintenance, performance reporting, and
                manufacturer warranty escalation for the operating life of the asset.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-border shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] h-fit">
              <h3 className="text-xl font-display font-semibold text-brand-primary mb-6 pb-4 border-b border-border">
                Fast facts
              </h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="bg-brand-primary/5 p-3 rounded-xl text-brand-orange shrink-0">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm text-text-2 uppercase tracking-wider font-semibold mb-1">System size</div>
                    <div className="text-xl font-display font-semibold text-brand-primary">
                      {project.capacity.value} {project.capacity.unit}
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-brand-primary/5 p-3 rounded-xl text-brand-orange shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm text-text-2 uppercase tracking-wider font-semibold mb-1">Location</div>
                    <div className="text-lg font-medium text-brand-primary">
                      {project.location.city}, {project.location.state || project.location.country}
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-brand-primary/5 p-3 rounded-xl text-brand-orange shrink-0">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm text-text-2 uppercase tracking-wider font-semibold mb-1">Commissioned</div>
                    <div className="text-lg font-medium text-brand-primary">{project.commissioningYear}</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </article>

      <CTABand
        headline="Have a site that needs scoping?"
        subheadline="Tell us the location and capacity range. We will reply within one business day."
        ctaPrimary={{ label: 'Request a Consultation', href: '/contact' }}
        variant="dark"
      />
    </>
  )
}
