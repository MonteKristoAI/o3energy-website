import { HeroSecondary } from '@/components/HeroSecondary'
import { MetricsCounterStrip } from '@/components/MetricsCounterStrip'
import { ProcessTimeline } from '@/components/ProcessTimeline'
import { CTABand } from '@/components/CTABand'
import { generatePageSchema } from '@/lib/schema'
import { metricsData } from '@/lib/data/metrics'
import { images } from '@/lib/data/images'
import Image from 'next/image'
import { FileCheck, Handshake, Pickaxe, Settings } from 'lucide-react'

export const metadata = {
  title: 'About O3 Energy | Solar EPC Operating Since 2011',
  description:
    'Founded in 2011 by Brad Stutzman. O3 Energy delivers commercial and utility-scale solar projects from four offices across the US and the Pacific Islands.',
}

export default function AboutPage() {
  const processSteps = [
    { number: 1, title: 'Feasibility & modeling', description: 'We analyze your utility interval data, structural drawings, and local rate tariffs to model what a system will cost and produce.', icon: FileCheck },
    { number: 2, title: 'Development & permitting', description: 'Our team handles interconnection applications, environmental review, and AHJ permitting before crews mobilize.', icon: Handshake },
    { number: 3, title: 'Engineering & construction', description: 'In-house engineers design the system. NABCEP-certified crews build it to the spec we modeled in step one.', icon: Pickaxe },
    { number: 4, title: 'Commissioning & O&M', description: 'We energize the system and provide long-term monitoring, preventive maintenance, and warranty escalation for 25 years.', icon: Settings },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generatePageSchema('/about')) }}
      />

      <HeroSecondary
        eyebrow="Our story"
        headline="Solar that survives 30 years, built by a team that has been here since 2011."
        subheadline="O3 Energy was founded in Dallas to remove the handoffs that kill commercial solar projects."
        media={images.about}
        overlayStrength="heavy"
      />

      <MetricsCounterStrip metrics={metricsData} variant="about" />

      {/* Why O3 exists — with bg image + heavy navy overlay */}
      <section className="py-24 px-4 relative overflow-hidden">
        <Image
          src={images.bg.whyO3}
          alt=""
          fill
          sizes="100vw"
          className="object-cover absolute inset-0 z-0"
          aria-hidden="true"
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-brand-primary/68 via-brand-primary/68 to-brand-dark/78" />

        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-eyebrow text-brand-orange mb-4 block text-center">Why O3 exists</span>
          <h2 className="text-3xl md:text-5xl font-display font-semibold text-white mb-10 text-center tracking-tight text-balance">
            One contract. One project manager. One 25-year escalation desk.
          </h2>
          <div className="space-y-6 text-lg text-white/85 leading-relaxed">
            <p>
              In the early days of commercial solar, organizations had to coordinate a fragmented ecosystem. You needed a
              financier, a developer, an engineering firm, and a local construction crew. When a project hit a roadblock
              in permitting, interconnection, or supply chain, the finger-pointing began.
            </p>
            <p>
              We founded O3 Energy in 2011 to break that cycle. By vertically integrating project development, EPC, and
              financing under one roof, we eliminated the handoffs that kill projects. The person who scopes your site
              is on the same team as the person who answers your monitoring alert in year twelve.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 relative overflow-hidden bg-brand-dark">
        <Image
          src={images.bg.fourPhases}
          alt=""
          fill
          sizes="100vw"
          className="object-cover absolute inset-0 z-0 opacity-25"
          aria-hidden="true"
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-brand-dark/90 via-brand-primary/85 to-brand-dark/95" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-eyebrow text-brand-orange mb-4 block">How we deliver</span>
            <h2 className="text-3xl md:text-5xl font-display font-semibold text-white mb-4 tracking-tight">
              Four phases, one team
            </h2>
            <p className="text-lg text-white/75 max-w-2xl mx-auto">
              Every project runs through the same four phases. No phase gets handed off to a vendor we cannot reach by
              phone.
            </p>
          </div>
          <ProcessTimeline steps={processSteps} orientation="horizontal" variant="dark" />
        </div>
      </section>

      <CTABand
        headline="Meet the team behind the work."
        ctaPrimary={{ label: 'View leadership', href: '/leadership' }}
        variant="dark"
      />
    </>
  )
}
