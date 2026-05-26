import { generatePageSchema } from '@/lib/schema'
import { ContactForm } from '@/components/ContactForm'
import { officesData } from '@/lib/data/offices'
import { images } from '@/lib/data/images'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Contact O3 Energy | Dallas, TX | (888) 999-2902',
  description:
    'Send a message to O3 Energy. Phone, email, and four office locations. Schedule a consultation directly on the home page.',
}

export default function ContactPage() {
  const hq = officesData.find((o) => o.type === 'hq')

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generatePageSchema('/contact')) }}
      />

      <section className="pt-32 pb-24 relative overflow-hidden min-h-[100dvh]">
        <div className="absolute inset-0 z-0">
          <Image
            src={images.bg.contactPanel}
            alt=""
            fill
            sizes="100vw"
            priority
            className="object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-brand-dark/60" />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/70 via-brand-primary/55 to-brand-primary/70" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(243,110,32,0.22),_transparent_55%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 w-full">
          {/* Left column — info */}
          <div className="text-white pt-4">
            <span className="text-eyebrow text-brand-orange mb-4 block">Get in touch</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold mb-6 text-balance tracking-tight text-white">
              Send a message
            </h1>
            <p className="text-lg md:text-xl text-white/85 max-w-lg mb-10 leading-relaxed">
              Have a general question? Send a short note and we will route it to the right desk. We respond within one
              business day.
            </p>

            <div className="space-y-7 mb-10">
              <div className="flex items-start gap-4 group">
                <div className="bg-white/10 p-3.5 rounded-2xl shrink-0 transition-colors group-hover:bg-brand-orange/20">
                  <Phone className="h-6 w-6 text-brand-orange" />
                </div>
                <div>
                  <div className="text-xs text-white/60 uppercase tracking-wider font-semibold mb-1">Call</div>
                  <a
                    href="tel:8889992902"
                    className="text-xl md:text-2xl font-display font-semibold text-white hover:text-brand-orange transition-colors"
                  >
                    (888) 999-2902
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="bg-white/10 p-3.5 rounded-2xl shrink-0 transition-colors group-hover:bg-brand-orange/20">
                  <Mail className="h-6 w-6 text-brand-orange" />
                </div>
                <div>
                  <div className="text-xs text-white/60 uppercase tracking-wider font-semibold mb-1">Email</div>
                  <a
                    href="mailto:info@o3energy.com"
                    className="text-xl md:text-2xl font-display font-semibold text-white hover:text-brand-orange transition-colors"
                  >
                    info@o3energy.com
                  </a>
                </div>
              </div>
              {hq && (
                <div className="flex items-start gap-4 group">
                  <div className="bg-white/10 p-3.5 rounded-2xl shrink-0 transition-colors group-hover:bg-brand-orange/20">
                    <MapPin className="h-6 w-6 text-brand-orange" />
                  </div>
                  <div>
                    <div className="text-xs text-white/60 uppercase tracking-wider font-semibold mb-1">Headquarters</div>
                    <div className="text-lg font-medium max-w-[280px] leading-snug text-white">{hq.fullAddress}</div>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3.5 rounded-2xl shrink-0">
                  <Clock className="h-6 w-6 text-brand-orange" />
                </div>
                <div>
                  <div className="text-xs text-white/60 uppercase tracking-wider font-semibold mb-1">Response time</div>
                  <div className="text-lg font-medium text-white">One business day</div>
                </div>
              </div>
            </div>

            {/* Cross-link to home page schedule section */}
            <Link
              href="/#schedule"
              className="inline-flex items-center gap-2 text-brand-orange font-semibold hover:text-white transition-colors"
            >
              Ready for a consultation? Use the 3-step scheduler
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          {/* Right column — inquiry form only */}
          <div>
            <div className="bg-white p-6 md:p-10 rounded-3xl border border-border shadow-2xl relative">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-brand-orange rounded-full blur-3xl opacity-20 pointer-events-none" />
              <h2 className="text-2xl md:text-3xl font-display font-semibold mb-2 text-brand-primary tracking-tight">
                Quick message
              </h2>
              <p className="text-text-2 mb-6 text-sm">
                For consultation requests, the 3-step scheduler on our home page routes faster.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
