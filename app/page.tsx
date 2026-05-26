import { HeroPrimary } from '@/components/HeroPrimary'
import { MetricsCounterStrip } from '@/components/MetricsCounterStrip'
import { ServiceTile } from '@/components/ServiceTile'
import { IndustryCard } from '@/components/IndustryCard'
import { ProjectCard } from '@/components/ProjectCard'
import { ProjectScroller } from '@/components/ProjectScroller'
import { TrustStrip } from '@/components/TrustStrip'
import { PartnerMarquee } from '@/components/PartnerMarquee'
import { Button } from '@/components/ui/button'
import { ReviewsSection } from '@/components/ReviewsSection'
import { MultiStepConsultationForm } from '@/components/MultiStepConsultationForm'
import { ContactForm } from '@/components/ContactForm'
import { generatePageSchema } from '@/lib/schema'
import { metricsData } from '@/lib/data/metrics'
import { servicesData } from '@/lib/data/services'
import { industriesData } from '@/lib/data/industries'
import { projectsData } from '@/lib/data/projects'
import { officesData } from '@/lib/data/offices'
import { getFeaturedPost } from '@/lib/data/blog'
import { images } from '@/lib/data/images'
import { ArrowRight, ShieldCheck, MapPin, Award, Sun, Phone, Mail, Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'O3 Energy | Commercial & Utility-Scale Solar EPC | Dallas, TX',
  description:
    'Texas-based solar EPC partner for 100 kW to 10 MW commercial, government, and utility-scale projects. Operating since 2011 across the US and the Pacific Islands.',
}

export default function HomePage() {
  const homeServices = servicesData.slice(0, 4)
  const featuredProjects = projectsData.slice(0, 6)
  const hq = officesData.find((o) => o.type === 'hq')
  const featuredPost = getFeaturedPost()
  const featuredPostDate = new Date(featuredPost.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generatePageSchema('/')) }}
      />

      <HeroPrimary
        eyebrow="Commercial & Utility-Scale Solar"
        headline="From site assessment to 25-year warranty. One contract."
        subheadline="Texas-based solar EPC since 2011. Four offices across the US and the Pacific. Projects from 45 kW to 503 kW, financed, built, and operated by one team."
        primaryCTA={{ label: 'Request a Consultation', href: '/#schedule' }}
        secondaryCTA={{ label: 'See the portfolio', href: '/projects', icon: ArrowRight }}
        media={{ ...images.home, priority: true }}
      />

      <TrustStrip
        items={[
          { icon: Sun, label: 'Operating since 2011' },
          { icon: Award, label: 'NABCEP certified' },
          { icon: ShieldCheck, label: 'SEIA member' },
          { icon: MapPin, label: 'Dallas · SF · Mexico · Guam' },
        ]}
        variant="dark"
      />

      <MetricsCounterStrip metrics={metricsData} variant="home" />

      {/* Services — 4 equal cards in a single row on desktop */}
      <section className="py-24 px-4 bg-bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-eyebrow text-brand-orange mb-4 block">What we deliver</span>
              <h2 className="text-4xl md:text-5xl font-display font-semibold text-brand-primary mb-6 tracking-tight">
                Five services, one project manager
              </h2>
              <p className="text-lg text-text-2">
                Project development, EPC, installation and maintenance, financing, and asset management. You sign one
                contract. You call one person.
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-6 h-12 border-brand-primary/20 text-brand-primary hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all font-semibold shrink-0"
            >
              <Link href="/services">
                See all services <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {homeServices.map((service) => (
              <ServiceTile key={service.slug} service={service} size="sm" />
            ))}
          </div>
        </div>
      </section>

      <PartnerMarquee logos={images.partnerLogos} eyebrow="Selected clients" />

      {/* Portfolio scroll with solar bg image */}
      <section className="py-24 px-4 relative overflow-hidden">
        <Image
          src={images.bg.portfolio}
          alt=""
          fill
          sizes="100vw"
          className="object-cover absolute inset-0 z-0"
          aria-hidden="true"
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-brand-primary/65 via-brand-primary/65 to-brand-dark/75" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-eyebrow text-brand-orange mb-4 block">Commissioned portfolio</span>
              <h2 className="text-4xl md:text-5xl font-display font-semibold text-white mb-6 tracking-tight text-balance">
                Ten named projects. 45 kW to 503 kW. Continental US to Guam.
              </h2>
            </div>
            <Button
              asChild
              size="lg"
              className="rounded-full px-6 h-12 bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold shadow-lg shrink-0"
            >
              <Link href="/projects">
                View full portfolio <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <ProjectScroller projects={featuredProjects} />
        </div>
      </section>

      {/* Industries */}
      <section className="py-24 px-4 bg-bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-eyebrow text-brand-orange mb-4 block">Who we work with</span>
              <h2 className="text-4xl md:text-5xl font-display font-semibold text-brand-primary mb-6 tracking-tight">
                Three buyer types. Three permitting realities.
              </h2>
              <p className="text-lg text-text-2">
                Commercial buyers care about demand charges. Tax-exempt government buyers need creative PPA structures.
                Utility-scale partners need a developer who owns interconnection.
              </p>
            </div>
          </div>

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

      {/* SCHEDULE A CONSULTATION — multi-step form lives here on home, before Reviews */}
      <section id="schedule" className="py-24 px-4 relative overflow-hidden bg-bg-cream">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16">
          <div className="lg:sticky lg:top-28 self-start">
            <span className="text-eyebrow text-brand-orange mb-4 block">Schedule a consultation</span>
            <h2 className="text-4xl md:text-5xl font-display font-semibold text-brand-primary mb-6 tracking-tight text-balance">
              Three steps. One business day to response.
            </h2>
            <p className="text-lg text-text-2 mb-8 leading-relaxed max-w-md">
              Pick the services you need. Tell us the timeline. Leave your details. A consultant from O3 Energy will
              reach out to schedule the call.
            </p>
            <ul className="space-y-4 text-text-1">
              <li className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-brand-orange/15 text-brand-orange flex items-center justify-center shrink-0 font-display font-bold text-sm">
                  1
                </div>
                <div>
                  <div className="font-display font-semibold text-brand-primary">Services</div>
                  <div className="text-sm text-text-2">Pick one or more.</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-brand-orange/15 text-brand-orange flex items-center justify-center shrink-0 font-display font-bold text-sm">
                  2
                </div>
                <div>
                  <div className="font-display font-semibold text-brand-primary">Timeline</div>
                  <div className="text-sm text-text-2">Roughly when you want to start.</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-brand-orange/15 text-brand-orange flex items-center justify-center shrink-0 font-display font-bold text-sm">
                  3
                </div>
                <div>
                  <div className="font-display font-semibold text-brand-primary">Contact details</div>
                  <div className="text-sm text-text-2">Name, company, email, phone.</div>
                </div>
              </li>
            </ul>
            <div className="mt-10 pt-8 border-t border-border flex items-center gap-3 text-sm text-text-2">
              <Clock className="h-5 w-5 text-brand-orange shrink-0" />
              <span>Average response time: one business day.</span>
            </div>
          </div>

          <div>
            <MultiStepConsultationForm />
          </div>
        </div>
      </section>

      <ReviewsSection />

      {/* INSIGHTS / BLOG TEASER — one featured post + CTA to /blog */}
      <section className="py-24 px-4 bg-bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-eyebrow text-brand-orange mb-4 block">From the field</span>
              <h2 className="text-4xl md:text-5xl font-display font-semibold text-brand-primary mb-6 tracking-tight">
                Writing on solar economics, by the team building the projects.
              </h2>
              <p className="text-lg text-text-2">
                Field notes from active sites, policy analysis on the IRA and ITC, and the project math we wish more
                buyers saw before signing a PPA.
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-6 h-12 border-brand-primary/20 text-brand-primary hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all font-semibold shrink-0"
            >
              <Link href="/blog">
                Visit the blog <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <Link
            href={`/blog/${featuredPost.slug}`}
            className="group grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-center bg-white rounded-3xl border border-border overflow-hidden shadow-sm hover:shadow-xl transition-all"
          >
            <div className="relative aspect-[16/10] lg:aspect-auto lg:h-full min-h-[320px]">
              <Image
                src={featuredPost.hero.src}
                alt={featuredPost.hero.alt}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
              />
              <span className="absolute top-5 left-5 bg-brand-orange text-white text-xs font-semibold tracking-wider uppercase px-3 py-1.5 rounded-full">
                Latest article
              </span>
            </div>
            <div className="p-8 lg:p-12 lg:pl-2">
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-text-2 mb-5">
                <span className="text-brand-orange">{featuredPost.category}</span>
                <span aria-hidden>·</span>
                <span>{featuredPostDate}</span>
                <span aria-hidden>·</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {featuredPost.readingMinutes} min read
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-semibold text-brand-primary mb-5 tracking-tight text-balance group-hover:text-brand-orange transition-colors">
                {featuredPost.title}
              </h3>
              <p className="text-base md:text-lg text-text-2 leading-relaxed mb-6 line-clamp-3">
                {featuredPost.excerpt}
              </p>
              <div className="text-sm text-text-2 mb-6">
                By <span className="font-semibold text-brand-primary">{featuredPost.author.name}</span> ·{' '}
                {featuredPost.author.title}
              </div>
              <span className="inline-flex items-center gap-2 font-semibold text-brand-primary group-hover:text-brand-orange transition-colors">
                Read the article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* CONTACT FORM — final section on home page replaces the old button-only CTABand */}
      <section id="contact" className="py-24 px-4 relative overflow-hidden">
        <Image
          src={images.bg.cta}
          alt=""
          fill
          sizes="100vw"
          className="object-cover absolute inset-0 z-0"
          aria-hidden="true"
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-brand-primary/85 via-brand-primary/85 to-brand-dark/92" />

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16">
          {/* Left: NAP + supporting info */}
          <div className="text-white">
            <span className="text-eyebrow text-brand-orange mb-4 block">Get in touch</span>
            <h2 className="text-4xl md:text-5xl font-display font-semibold mb-6 text-balance tracking-tight text-white">
              Have a question instead?
            </h2>
            <p className="text-lg text-white/85 mb-10 leading-relaxed max-w-md">
              Not ready for a consultation call? Send a short message and we will route it to the right desk. Same
              one-business-day response.
            </p>

            <div className="space-y-7">
              <div className="flex items-start gap-4 group">
                <div className="bg-white/10 p-3.5 rounded-2xl shrink-0 transition-colors group-hover:bg-brand-orange/20">
                  <Phone className="h-5 w-5 text-brand-orange" />
                </div>
                <div>
                  <div className="text-xs text-white/60 uppercase tracking-wider font-semibold mb-1">Call</div>
                  <a
                    href="tel:8889992902"
                    className="text-lg md:text-xl font-display font-semibold text-white hover:text-brand-orange transition-colors"
                  >
                    (888) 999-2902
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="bg-white/10 p-3.5 rounded-2xl shrink-0 transition-colors group-hover:bg-brand-orange/20">
                  <Mail className="h-5 w-5 text-brand-orange" />
                </div>
                <div>
                  <div className="text-xs text-white/60 uppercase tracking-wider font-semibold mb-1">Email</div>
                  <a
                    href="mailto:info@o3energy.com"
                    className="text-lg md:text-xl font-display font-semibold text-white hover:text-brand-orange transition-colors"
                  >
                    info@o3energy.com
                  </a>
                </div>
              </div>
              {hq && (
                <div className="flex items-start gap-4 group">
                  <div className="bg-white/10 p-3.5 rounded-2xl shrink-0 transition-colors group-hover:bg-brand-orange/20">
                    <MapPin className="h-5 w-5 text-brand-orange" />
                  </div>
                  <div>
                    <div className="text-xs text-white/60 uppercase tracking-wider font-semibold mb-1">Headquarters</div>
                    <div className="text-base font-medium max-w-[280px] leading-snug text-white">{hq.fullAddress}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: General inquiry form */}
          <div>
            <div className="bg-white p-6 md:p-10 rounded-3xl border border-border shadow-2xl relative">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-brand-orange rounded-full blur-3xl opacity-20 pointer-events-none" />
              <h3 className="text-2xl md:text-3xl font-display font-semibold mb-2 text-brand-primary tracking-tight">
                Send a message
              </h3>
              <p className="text-text-2 mb-6 text-sm">We respond within one business day.</p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
