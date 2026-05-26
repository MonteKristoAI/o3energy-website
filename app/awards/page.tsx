import { HeroSecondary } from '@/components/HeroSecondary'
import { CTABand } from '@/components/CTABand'
import { generatePageSchema } from '@/lib/schema'
import { images } from '@/lib/data/images'
import { Award, Trophy, Medal, Star } from 'lucide-react'

export const metadata = {
  title: 'Awards & Certifications | O3 Energy',
  description:
    'O3 Energy holds NABCEP, SEIA, CABA, and WRISE memberships. Multi-year recognition by Solar Power World Magazine.',
}

export default function AwardsPage() {
  const awards = [
    { title: 'Top Solar Contractors Award', years: '2013 to 2019', org: 'Solar Power World Magazine', icon: Trophy },
    { title: 'Top Commercial Solar Developer in Texas', years: '2017 to 2019', org: 'Solar Power World Magazine', icon: Star },
    { title: 'Featured Contractor for Texas', years: '2018', org: 'Solar Power World Magazine, Top Contractors Edition', icon: Award },
    { title: 'Industry Development Award', years: '2017', org: 'Solar Business Festival', icon: Award },
    { title: 'Ranked 3rd Best Commercial Solar Contractor', years: '', org: 'GC Magazine', icon: Medal },
  ]

  const memberships = [
    { org: 'SEIA. Solar Energy Industries Association', url: 'https://www.seia.org/' },
    { org: 'NABCEP. North American Board of Certified Energy Practitioners', url: 'https://www.nabcep.org/' },
    { org: 'CABA. Continental Automated Building Association', url: 'https://www.caba.org/' },
    { org: 'WRISE. Women of Renewable Industries and Sustainable Energy', url: 'http://wrisenergy.org/' },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generatePageSchema('/awards')) }}
      />

      <HeroSecondary
        eyebrow="Recognition"
        headline="Multi-year recognition from Solar Power World, plus active SEIA and NABCEP membership."
        subheadline="Awards listed verbatim with the year ranges issued. Memberships are current."
        media={images.awards}
      />

      <section className="py-24 px-4 bg-bg-cream min-h-[50vh]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-display font-semibold text-brand-primary mb-8 border-b border-border pb-4 tracking-tight">
              Awards
            </h2>
            <ul className="space-y-6">
              {awards.map((award, idx) => (
                <li
                  key={idx}
                  className="flex gap-4 p-6 bg-white rounded-2xl border border-border hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-brand-primary/5 rounded-full flex items-center justify-center shrink-0">
                    <award.icon className="h-6 w-6 text-brand-orange" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-semibold text-brand-primary mb-1">{award.title}</h3>
                    <div className="text-text-2">
                      {award.org}
                      {award.years && (
                        <span className="text-brand-orange font-medium">. {award.years}</span>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-display font-semibold text-brand-primary mb-8 border-b border-border pb-4 tracking-tight">
              Memberships
            </h2>
            <ul className="space-y-4">
              {memberships.map((m, idx) => (
                <li key={idx}>
                  <a
                    href={m.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-6 bg-white rounded-2xl border border-border hover:border-brand-orange transition-colors group hover:shadow-md"
                  >
                    <h3 className="text-lg font-semibold text-brand-primary group-hover:text-brand-orange transition-colors">
                      {m.org}
                    </h3>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CTABand
        headline="Build your next project with a named team."
        ctaPrimary={{ label: 'Request a Consultation', href: '/contact' }}
        variant="dark"
      />
    </>
  )
}
