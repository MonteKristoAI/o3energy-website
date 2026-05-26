import { HeroSecondary } from '@/components/HeroSecondary'
import { ProjectGalleryFilterable } from '@/components/ProjectGalleryFilterable'
import { CTABand } from '@/components/CTABand'
import { generatePageSchema } from '@/lib/schema'
import { projectsData } from '@/lib/data/projects'
import { images } from '@/lib/data/images'

export const metadata = {
  title: 'Projects | Solar Portfolio | O3 Energy',
  description:
    'Browse ten named commercial and utility-scale solar installations O3 Energy has commissioned, ranging from 45 kW to 503 kW across the US continental states and the Pacific Islands.',
}

export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generatePageSchema('/projects')) }}
      />

      <HeroSecondary
        eyebrow="Commissioned portfolio"
        headline="Ten named projects. 45 kW to 503 kW. Continental US to the Pacific."
        subheadline="Filter by industry, capacity range, or location. Each project lists the named client, the system size, the location, and the commissioning year."
        media={images.projects}
      />

      <section className="py-24 px-4 bg-bg-cream">
        <div className="max-w-7xl mx-auto">
          <ProjectGalleryFilterable projects={projectsData} />
        </div>
      </section>

      <CTABand
        headline="Want to be project number eleven?"
        subheadline="Tell us about your site. 100 kW to 10 MW. We will reply within one business day."
        ctaPrimary={{ label: 'Submit a project', href: '/partners' }}
        ctaSecondary={{ label: 'Request a Consultation', href: '/contact' }}
        variant="dark"
      />
    </>
  )
}
