import { HeroSecondary } from '@/components/HeroSecondary'
import { CTABand } from '@/components/CTABand'
import { generatePageSchema } from '@/lib/schema'
import { officesData } from '@/lib/data/offices'
import { images } from '@/lib/data/images'
import { MapPanel } from '@/components/MapPanel'
import { MapPin, Navigation, ExternalLink } from 'lucide-react'

export const metadata = {
  title: 'Locations | Dallas · San Francisco · Mexico · Guam | O3 Energy',
  description:
    'Four office locations across North America and the Pacific Islands. O3 Energy delivers solar projects on the ground from Dallas, San Francisco, Lagos de Moreno, and Tamuning.',
}

export default function LocationsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generatePageSchema('/locations')) }}
      />

      <HeroSecondary
        eyebrow="Where we operate"
        headline="From Dallas to Guam, on the ground where the project is."
        subheadline="Four offices. North America and the Pacific Islands. Local permitting expertise and a service crew who can drive to the site."
        media={images.locations}
        overlayStrength="heavy"
      />

      <section className="py-24 px-4 bg-bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-eyebrow text-brand-orange mb-4 block">Coverage map</span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-brand-primary mb-4 tracking-tight">
              Click a pin for office details
            </h2>
          </div>
          <MapPanel offices={officesData} />
        </div>
      </section>

      <section className="py-24 px-4 bg-white border-y border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-brand-primary mb-12 text-center tracking-tight">
            Office locations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {officesData.map((office) => (
              <div
                id={`office-${office.slug}`}
                key={office.slug}
                className="bg-bg-cream p-8 rounded-2xl border border-border flex flex-col hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-brand-primary/5 rounded-full flex items-center justify-center text-brand-primary shrink-0">
                    <Navigation className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-semibold text-brand-primary">{office.city}</h3>
                    <span className="text-sm font-semibold uppercase tracking-wider text-brand-orange">
                      {office.type === 'hq' ? 'Headquarters' : 'Regional office'}
                    </span>
                  </div>
                </div>

                <p className="text-text-2 mb-6 flex-1">{office.description}</p>

                <div className="pt-6 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-2 text-text-1">
                    <MapPin className="h-5 w-5 shrink-0 text-brand-primary mt-0.5" />
                    <span className="text-sm">{office.fullAddress}</span>
                  </div>
                  <a
                    href={office.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-brand-orange text-sm font-semibold hover:text-brand-primary transition-colors shrink-0"
                  >
                    Get directions <ExternalLink className="ml-1.5 h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        headline="Start your project."
        ctaPrimary={{ label: 'Request a Consultation', href: '/contact' }}
        variant="dark"
      />
    </>
  )
}
