import { HeroSecondary } from '@/components/HeroSecondary'
import { ServiceTile } from '@/components/ServiceTile'
import { CTABand } from '@/components/CTABand'
import { generatePageSchema } from '@/lib/schema'
import { servicesData } from '@/lib/data/services'
import { images } from '@/lib/data/images'

export const metadata = {
  title: 'Services | Project Development, EPC, Financing, O&M | O3 Energy',
  description:
    'Five solar services, one project manager. Project development, EPC, installation and maintenance, financing, and asset management for commercial and utility-scale buyers.',
}

export default function ServicesPage() {
  // All 5 services as cards. First card spans 2 columns on lg+; remaining 4 fill the grid.
  const [featured, ...rest] = servicesData
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generatePageSchema('/services')) }}
      />

      <HeroSecondary
        eyebrow="What we do"
        headline="One project manager from site assessment to year 25."
        subheadline="Five services, one contract. Project development, EPC, installation and maintenance, financing, and asset management."
        media={images.services}
        overlayStrength="heavy"
      />

      <section className="py-24 px-4 bg-bg-cream">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Featured service spans full width on lg, two columns on md */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ServiceTile service={featured} size="lg" />
            <ServiceTile service={rest[0]} size="md" />
          </div>
          {/* Remaining 3 services in a row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.slice(1).map((service) => (
              <ServiceTile key={service.slug} service={service} size="md" />
            ))}
          </div>
        </div>
      </section>

      <CTABand
        headline="Have a specific scope in mind?"
        subheadline="Tell us the project type, capacity range, and timeline. We will reply within one business day."
        ctaPrimary={{ label: 'Request a Consultation', href: '/contact' }}
        variant="dark"
      />
    </>
  )
}
