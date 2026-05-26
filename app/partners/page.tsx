import { HeroSecondary } from '@/components/HeroSecondary'
import { JointVentureForm } from '@/components/JointVentureForm'
import { CTABand } from '@/components/CTABand'
import { generatePageSchema } from '@/lib/schema'
import { images } from '@/lib/data/images'
import Image from 'next/image'
import { Check, Search, FileText, Wrench, BarChart3 } from 'lucide-react'

export const metadata = {
  title: 'Channel Partner Program | 100 kW to 10 MW Joint Ventures | O3 Energy',
  description:
    'Submit a 100 kW to 10 MW solar project for joint venture. O3 Energy delivers PPA, Pre-Paid PPA, ESA, project acquisitions, and full dev + EPC + O&M as your partner.',
}

const lookingFor = [
  { label: 'Project size 100 kW to 10 MW', icon: Search },
  { label: 'PPA or PPA Line of Site', icon: FileText },
  { label: 'Distributed generation sites in the US', icon: Search },
  { label: 'Developers with a track record of successful, quality projects', icon: Check },
]

const offerings = [
  { label: 'PPAs, Pre-Paid PPAs, and Energy Service Agreements', icon: FileText },
  { label: 'Project acquisitions', icon: Check },
  { label: 'Development, EPC, and O&M services', icon: Wrench },
  { label: 'Long-term asset management', icon: BarChart3 },
]

export default function PartnersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generatePageSchema('/partners')) }}
      />

      <HeroSecondary
        eyebrow="Channel partner program"
        headline="Have a 100 kW to 10 MW project in development? We co-deliver."
        subheadline="O3 Energy partners with developers, landowners, and IPPs to take sited projects from PPA structuring through commissioning and 25-year asset management."
        media={images.partners}
        overlayStrength="heavy"
      />

      <section className="py-24 px-4 bg-bg-cream">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <span className="text-eyebrow text-brand-orange mb-4 block">What we look for</span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-brand-primary mb-8 tracking-tight">
              The right fit
            </h2>
            <ul className="space-y-3">
              {lookingFor.map((item, i) => (
                <li key={i} className="flex items-start gap-4 p-5 bg-white border border-border rounded-2xl">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className="text-text-1 leading-snug">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-eyebrow text-brand-orange mb-4 block">What we deliver</span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-brand-primary mb-8 tracking-tight">
              How we co-deliver
            </h2>
            <ul className="space-y-3">
              {offerings.map((item, i) => (
                <li key={i} className="flex items-start gap-4 p-5 bg-white border border-border rounded-2xl">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className="text-text-1 leading-snug">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Submit a project — with bg image + heavy overlay */}
      <section className="py-24 px-4 relative overflow-hidden">
        <Image
          src={images.bg.submitProject}
          alt=""
          fill
          sizes="100vw"
          className="object-cover absolute inset-0 z-0"
          aria-hidden="true"
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-brand-primary/68 via-brand-primary/68 to-brand-dark/78" />

        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <span className="text-eyebrow text-brand-orange mb-4 block">Submit a project</span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-white tracking-tight mb-4 text-balance">
              Tell us about your project
            </h2>
            <p className="text-lg text-white/85 max-w-2xl mx-auto">
              Seven fields. One business-day response. Our acquisitions team reviews every submission against active
              capital and EPC capacity.
            </p>
          </div>
          <JointVentureForm />
        </div>
      </section>

      <CTABand
        headline="Prefer to talk first?"
        subheadline="If your project does not fit the form, send us a note and we will route it to the right desk."
        ctaPrimary={{ label: 'Request a Consultation', href: '/contact' }}
        variant="light"
      />
    </>
  )
}
