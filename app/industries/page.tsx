import { HeroSecondary } from '@/components/HeroSecondary'
import { IndustryCard } from '@/components/IndustryCard'
import { CTABand } from '@/components/CTABand'
import { generatePageSchema } from '@/lib/schema'
import { industriesData } from '@/lib/data/industries'
import { projectsData } from '@/lib/data/projects'
import { images } from '@/lib/data/images'

export const metadata = {
  title: 'Industries We Serve | Commercial · Government · Utility-Scale | O3 Energy',
  description:
    'Solar across commercial, government, and utility-scale buyers. O3 Energy adapts financing, permitting, and ownership structure to each sector.',
}

export default function IndustriesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generatePageSchema('/industries')) }}
      />

      <HeroSecondary
        eyebrow="Who we work with"
        headline="Commercial. Government. Utility-scale. The mechanics shift by buyer."
        subheadline="A municipal procurement officer signs different paperwork than a hospitality COO. We adapt the financing, permitting, and ownership structure to fit."
        media={images.industries}
      />

      <section className="py-24 px-4 bg-bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industriesData.map((industry) => (
              <IndustryCard
                key={industry.slug}
                industry={industry}
                featuredProject={projectsData.find((p) => p.slug === industry.featuredProjectSlug)}
              />
            ))}
          </div>
        </div>
      </section>

      <CTABand
        headline="Specific facility or RFP in hand?"
        subheadline="Tell us the project type and timeline. We will reply within one business day."
        ctaPrimary={{ label: 'Request a Consultation', href: '/contact' }}
        variant="dark"
      />
    </>
  )
}
