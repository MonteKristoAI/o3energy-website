import { HeroSecondary } from '@/components/HeroSecondary'
import { LeadershipCard } from '@/components/LeadershipCard'
import { CTABand } from '@/components/CTABand'
import { generatePageSchema } from '@/lib/schema'
import { peopleData } from '@/lib/data/people'
import { images } from '@/lib/data/images'

export const metadata = {
  title: 'Leadership | O3 Energy',
  description:
    'Meet the named team at O3 Energy. Brad Stutzman (CEO) and the regional presidents who run operations across the US and the Pacific Islands.',
}

export default function LeadershipPage() {
  const featuredLeader = peopleData.find((p) => p.isFeatured)
  const standardLeaders = peopleData.filter((p) => !p.isFeatured)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generatePageSchema('/leadership')) }}
      />

      <HeroSecondary
        eyebrow="Leadership"
        headline="The people who own your project from kickoff through year thirty."
        subheadline="Founded by Brad Stutzman in 2011. Operated today by a leadership team with decades of EPC, utility construction, and renewable-asset experience."
        media={images.leadership}
      />

      <section className="py-24 px-4 bg-bg-cream border-t border-border">
        <div className="max-w-7xl mx-auto">
          {featuredLeader && (
            <div className="mb-12">
              <LeadershipCard person={featuredLeader} variant="featured" />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {standardLeaders.map((person) => (
              <LeadershipCard key={person.slug} person={person} variant="standard" />
            ))}
          </div>
        </div>
      </section>

      <CTABand
        headline="Want to talk to the team directly?"
        subheadline="Request a consultation. The named person who answers is also the person who runs your project."
        ctaPrimary={{ label: 'Request a Consultation', href: '/contact' }}
        variant="dark"
      />
    </>
  )
}
