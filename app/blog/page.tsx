import { HeroSecondary } from '@/components/HeroSecondary'
import { CTABand } from '@/components/CTABand'
import { generatePageSchema } from '@/lib/schema'
import { sortedBlogPosts } from '@/lib/data/blog'
import { images } from '@/lib/data/images'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'

export const metadata = {
  title: 'Solar Industry Insights | O3 Energy Blog',
  description:
    'Field notes, policy analysis, and project economics from the O3 Energy team. Practical writing on commercial solar payback, utility-scale interconnection, asset management, and tax-exempt PPA structures.',
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

export default function BlogIndexPage() {
  const [featured, ...rest] = sortedBlogPosts

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generatePageSchema('/blog')) }}
      />

      <HeroSecondary
        eyebrow="Insights"
        headline="Solar economics, written by the team building the projects."
        subheadline="Field notes from active job sites, policy analysis on the IRA and ITC, and the project math we wish more buyers saw before signing a PPA."
        media={images.about}
      />

      {/* Featured post */}
      <section className="py-20 px-4 bg-bg-cream">
        <div className="max-w-7xl mx-auto">
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-center bg-bg-white rounded-3xl border border-border overflow-hidden shadow-card hover:shadow-card-hover transition-all"
          >
            <div className="relative aspect-[16/10] lg:aspect-auto lg:h-full min-h-[320px]">
              <Image
                src={featured.hero.src}
                alt={featured.hero.alt}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
              />
              <span className="absolute top-5 left-5 bg-brand-orange text-white text-xs font-semibold tracking-wider uppercase px-3 py-1.5 rounded-full">
                Featured
              </span>
            </div>
            <div className="p-8 lg:p-12 lg:pl-2">
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-text-2 mb-5">
                <span className="text-brand-orange">{featured.category}</span>
                <span aria-hidden>·</span>
                <span>{formatDate(featured.publishedAt)}</span>
                <span aria-hidden>·</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {featured.readingMinutes} min read
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-brand-primary mb-5 tracking-tight text-balance group-hover:text-brand-orange transition-colors">
                {featured.title}
              </h2>
              <p className="text-base md:text-lg text-text-2 leading-relaxed mb-6 line-clamp-4">{featured.excerpt}</p>
              <div className="text-sm text-text-2 mb-6">
                By <span className="font-semibold text-brand-primary">{featured.author.name}</span> ·{' '}
                {featured.author.title}
              </div>
              <span className="inline-flex items-center gap-2 font-semibold text-brand-primary group-hover:text-brand-orange transition-colors">
                Read the article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Remaining posts grid */}
      {rest.length > 0 && (
        <section className="pb-24 px-4 bg-bg-cream">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <span className="text-eyebrow text-brand-orange mb-4 block">More articles</span>
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-brand-primary tracking-tight">
                The rest of the catalog
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col bg-bg-white rounded-2xl border border-border overflow-hidden shadow-card hover:shadow-card-hover transition-all"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={post.hero.src}
                      alt={post.hero.alt}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-text-2 mb-3">
                      <span className="text-brand-orange">{post.category}</span>
                      <span aria-hidden>·</span>
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                    <h3 className="text-xl font-display font-semibold text-brand-primary mb-3 tracking-tight text-balance group-hover:text-brand-orange transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-text-2 leading-relaxed mb-5 line-clamp-3 flex-1">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-text-2">
                      <span>
                        <Clock className="h-3.5 w-3.5 inline mr-1" />
                        {post.readingMinutes} min read
                      </span>
                      <span className="inline-flex items-center gap-1 font-semibold text-brand-primary group-hover:text-brand-orange transition-colors">
                        Read <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand
        headline="Have a project that does not fit the standard template?"
        subheadline="We have written about the easy cases. The harder ones we usually answer over a 30-minute consultation call."
        ctaPrimary={{ label: 'Request a Consultation', href: '/contact' }}
        ctaSecondary={{ label: 'See our portfolio', href: '/projects' }}
        variant="dark"
      />
    </>
  )
}
