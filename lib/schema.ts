import { Organization, WebSite, LocalBusiness, FAQPage, BreadcrumbList, ItemList, Service, Person, WithContext } from 'schema-dts'
import { BreadcrumbItem, FAQ, Office, Person as PersonType, Service as ServiceType } from './types'

export const siteUrl = 'https://o3energy.com'

export function organizationSchema(): WithContext<Organization> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'O3 Energy',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    sameAs: [
      'https://www.linkedin.com/company/o3-energy-corporation/',
      'https://twitter.com/o3energy',
      'https://www.facebook.com/o3energy',
    ],
  }
}

export function webSiteSchema(): WithContext<WebSite> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'O3 Energy',
    url: siteUrl,
    description: 'O3 Energy provides full-service commercial and utility-scale solar energy solutions across the US and Pacific Islands.',
  }
}

export function localBusinessSchema(office: Office): WithContext<LocalBusiness> {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `O3 Energy - ${office.city}`,
    image: `${siteUrl}/logo.png`,
    '@id': `${siteUrl}/locations#${office.slug}`,
    url: `${siteUrl}/locations`,
    telephone: '(888) 999-2902',
    address: {
      '@type': 'PostalAddress',
      streetAddress: office.fullAddress.split(',')[0],
      addressLocality: office.city,
      addressRegion: office.state || '',
      addressCountry: office.country || 'US',
    },
  }
}

export function faqPageSchema(faqs: FAQ[]): WithContext<FAQPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function breadcrumbSchema(items: BreadcrumbItem[]): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${siteUrl}${item.href}`,
    })),
  }
}

export function serviceSchema(service: ServiceType): WithContext<Service> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.shortDescription,
    provider: {
      '@type': 'Organization',
      name: 'O3 Energy',
    },
  }
}

export function generatePageSchema(path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: `${siteUrl}${path}`,
    publisher: {
      '@type': 'Organization',
      name: 'O3 Energy',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`
      }
    }
  }
}
