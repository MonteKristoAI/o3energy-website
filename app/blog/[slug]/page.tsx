import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Clock, Calendar, User } from 'lucide-react'
import { blogPosts, getPostBySlug, getRelatedPosts } from '@/lib/data/blog'
import { generatePageSchema, siteUrl } from '@/lib/schema'
import { CTABand } from '@/components/CTABand'

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: 'Article Not Found | O3 Energy' }
  return {
    title: `${post.title} | O3 Energy`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [{ url: post.hero.src, width: 1600, height: 1000, alt: post.hero.alt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.hero.src],
    },
  }
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const related = getRelatedPosts(post.slug, 3)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.hero.src,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.title,
    },
    publisher: {
      '@type': 'Organization',
      name: 'O3 Energy',
      logo: { '@type': 'ImageObject', url: `${siteUrl}/logo.png` },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${post.slug}`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generatePageSchema(`/blog/${post.slug}`)) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <article className="pt-28 pb-20 bg-bg-cream min-h-[100dvh]">
        <div className="max-w-3xl mx-auto px-4">
          <Link
            href="/blog"
            className="inline-flex items-center text-text-2 hover:text-brand-orange mb-8 transition-colors font-semibold text-sm"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to all articles
          </Link>

          <header className="mb-10">
            <span className="text-eyebrow text-brand-orange mb-4 block">{post.category}</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-brand-primary tracking-tight leading-[1.1] mb-6 text-balance">
              {post.title}
            </h1>
            <p className="text-lg md:text-xl text-text-2 leading-relaxed mb-8 text-balance">{post.excerpt}</p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-text-2 pb-8 border-b border-border">
              <span className="inline-flex items-center gap-2">
                <User className="h-4 w-4 text-brand-orange" />
                <span className="font-semibold text-brand-primary">{post.author.name}</span>
                <span className="text-text-2/80">· {post.author.title}</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4 text-brand-orange" />
                {formatDate(post.publishedAt)}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-brand-orange" />
                {post.readingMinutes} min read
              </span>
            </div>
          </header>
        </div>

        <div className="max-w-5xl mx-auto px-4 mb-14">
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)]">
            <Image
              src={post.hero.src}
              alt={post.hero.alt}
              fill
              priority
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4">
          <div className="space-y-10 text-text-1">
            {post.body.map((section, i) => (
              <section key={i}>
                {section.heading && (
                  <h2 className="text-2xl md:text-3xl font-display font-semibold text-brand-primary tracking-tight mb-5 mt-2">
                    {section.heading}
                  </h2>
                )}
                <div className="space-y-5 text-lg leading-relaxed text-text-2">
                  {section.paragraphs.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-16 pt-10 border-t border-border">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-brand-orange/15 text-brand-orange flex items-center justify-center font-display font-bold text-xl shrink-0">
                {post.author.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>
              <div>
                <div className="font-display font-semibold text-brand-primary">{post.author.name}</div>
                <div className="text-sm text-text-2">{post.author.title}</div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="py-20 px-4 bg-white border-t border-border">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-12 gap-6 flex-wrap">
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-brand-primary tracking-tight">
                Keep reading
              </h2>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 font-semibold text-brand-primary hover:text-brand-orange transition-colors"
              >
                All articles <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group flex flex-col bg-bg-cream rounded-2xl border border-border overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={r.hero.src}
                      alt={r.hero.alt}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-brand-orange mb-3">
                      {r.category}
                    </div>
                    <h3 className="text-lg font-display font-semibold text-brand-primary tracking-tight mb-3 text-balance group-hover:text-brand-orange transition-colors">
                      {r.title}
                    </h3>
                    <p className="text-sm text-text-2 leading-relaxed line-clamp-3">{r.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand
        headline="Want to talk through your specific project?"
        subheadline="Articles cover the patterns. The math on your site needs a 30-minute call."
        ctaPrimary={{ label: 'Request a Consultation', href: '/contact' }}
        variant="dark"
      />
    </>
  )
}
