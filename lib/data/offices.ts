import { Office } from '../types'

/**
 * Office addresses verified from o3energy.com /about-us/locations (firecrawl 2026-05-13).
 * Do NOT edit without re-verification.
 */
export const officesData: Office[] = [
  {
    slug: 'dallas-hq',
    city: 'Dallas',
    state: 'TX',
    country: 'USA',
    fullAddress: '325 N St Paul Street, Suite 4550, Dallas, TX 75201',
    googleMapsUrl: 'https://maps.google.com/?q=325+N+St+Paul+Street+Suite+4550+Dallas+TX+75201',
    type: 'hq',
    description: 'Headquarters. Sales, engineering, and project finance.',
  },
  {
    slug: 'san-francisco',
    city: 'San Francisco',
    state: 'CA',
    country: 'USA',
    fullAddress: '71 Stevenson St., Suite 400, San Francisco, CA 94105',
    googleMapsUrl: 'https://maps.google.com/?q=71+Stevenson+St+Suite+400+San+Francisco+CA+94105',
    type: 'regional',
    description: 'West Coast project operations and commercial development.',
  },
  {
    slug: 'mexico',
    city: 'Lagos de Moreno',
    state: 'Jalisco',
    country: 'Mexico',
    fullAddress: 'Fray Alfonso 578, El Refugio, Lagos de Moreno, Jalisco 47400',
    googleMapsUrl: 'https://maps.google.com/?q=Fray+Alfonso+578+Lagos+de+Moreno+Jalisco+47400',
    type: 'regional',
    description: 'Latin America gateway and regional operations.',
  },
  {
    slug: 'guam',
    city: 'Tamuning',
    territory: 'Guam',
    country: 'USA',
    fullAddress: '127 Chalan Pasaheru, Tamuning, GU 96913',
    googleMapsUrl: 'https://maps.google.com/?q=127+Chalan+Pasaheru+Tamuning+Guam+96913',
    type: 'regional',
    description: 'Pacific Islands operations. Federal and resort project base.',
  },
]
