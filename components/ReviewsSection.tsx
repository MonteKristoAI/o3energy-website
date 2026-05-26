import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

/**
 * Demo Google-style review wall.
 * Reviews here are PLACEHOLDER for the portfolio demo. Replace with real review-API output
 * (Google Place Details API) before any paid launch.
 *
 * The "Leave a Review" CTA points to a Google Search URL for MonteKristo AI's listing.
 * When MonteKristo's Google Business Profile Place ID is known, swap to the canonical
 * write-review URL: `https://search.google.com/local/writereview?placeid={PLACE_ID}`
 */
const MK_REVIEW_URL = 'https://g.page/r/CRgguphQBNFxEBM/review'

interface Review {
  initials: string
  name: string
  role: string
  rating: 1 | 2 | 3 | 4 | 5
  date: string
  body: string
  avatarColor: string
}

const reviews: Review[] = [
  {
    initials: 'JW',
    name: 'James W.',
    role: 'Facilities Director, C&I Real Estate',
    rating: 5,
    date: '2 months ago',
    body:
      'O3 commissioned our 503 kW municipal system on a tight permitting window. The crew handled every AHJ touchpoint without escalation. Asset management has stayed responsive through year two.',
    avatarColor: 'bg-brand-orange',
  },
  {
    initials: 'MS',
    name: 'Maria S.',
    role: 'Sustainability Lead, Hospitality Group',
    rating: 5,
    date: '4 months ago',
    body:
      'We needed solar across four hotel properties in the Pacific. O3 was the only developer who had local presence in Guam and could actually deliver the logistics. Pre-Paid PPA structure made the financing work.',
    avatarColor: 'bg-brand-primary',
  },
  {
    initials: 'RK',
    name: 'Robert K.',
    role: 'VP Operations, Auto Distribution',
    rating: 5,
    date: '6 months ago',
    body:
      'Commissioned our 116 kW facility two weeks ahead of schedule. Cody walked us through the financing options and the engineering team kept the design tight on our roof structural limits.',
    avatarColor: 'bg-accent-coral',
  },
  {
    initials: 'LM',
    name: 'Linda M.',
    role: 'Operations, Nonprofit',
    rating: 5,
    date: '8 months ago',
    body:
      'Solar financing was the bottleneck for our facility. O3 structured a PPA that fit our nonprofit budget cycle. Their team treated our project the same as any commercial site.',
    avatarColor: 'bg-success',
  },
]

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={
            i < rating
              ? 'h-4 w-4 fill-[#fbbc04] text-[#fbbc04]'
              : 'h-4 w-4 fill-transparent text-text-2/30'
          }
        />
      ))}
    </div>
  )
}

function GoogleBadge() {
  return (
    <div className="flex items-center gap-1.5 text-[10px] font-semibold text-text-2 uppercase tracking-wider">
      <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
      <span>Posted via Google</span>
    </div>
  )
}

export function ReviewsSection() {
  return (
    <section className="py-24 px-4 bg-bg-white border-y border-border">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <span className="text-eyebrow text-brand-orange mb-4 block">Client reviews</span>
          <h2 className="text-4xl md:text-5xl font-display font-semibold text-brand-primary mb-6 tracking-tight text-balance">
            What past clients say
          </h2>
          <div className="flex items-center justify-center gap-3">
            <StarRow rating={5} />
            <span className="text-sm text-text-1 font-semibold">5.0</span>
            <span className="text-sm text-text-2">based on {reviews.length}+ Google reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {reviews.map((review) => (
            <article
              key={review.name}
              className="bg-bg-cream border border-border rounded-2xl p-6 md:p-7 flex flex-col gap-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-display font-bold shrink-0 ${review.avatarColor}`}
                    aria-hidden="true"
                  >
                    {review.initials}
                  </div>
                  <div>
                    <div className="font-display font-semibold text-brand-primary leading-tight">{review.name}</div>
                    <div className="text-sm text-text-2 leading-tight">{review.role}</div>
                  </div>
                </div>
                <GoogleBadge />
              </div>
              <div className="flex items-center gap-3">
                <StarRow rating={review.rating} />
                <span className="text-xs text-text-2">{review.date}</span>
              </div>
              <p className="text-text-1 leading-relaxed">{review.body}</p>
            </article>
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            asChild
            size="lg"
            className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-full px-8 h-14 font-semibold shadow-lg"
          >
            <Link href={MK_REVIEW_URL} target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" className="mr-2" aria-hidden="true">
                <path fill="#fff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#fff" opacity="0.85" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#fff" opacity="0.7" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#fff" opacity="0.55" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Leave a Review on Google
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
