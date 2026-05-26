import { Person } from '../types'
import { images } from './images'

const portrait = (slug: keyof typeof images.portraits, alt: string) => ({
  src: images.portraits[slug],
  alt,
  width: 600,
  height: 800,
})

export const peopleData: Person[] = [
  {
    slug: 'brad-stutzman',
    name: 'Brad Stutzman',
    title: 'Chief Executive Officer',
    bio: 'Brad founded O3 Energy in 2011 via The Stutzman Group after leading the start-up of Folium Energy, a renewable development firm. His background spans entrepreneurial start-ups, real estate, and renewable energy. He holds a BAAS from the University of North Texas.',
    education: 'BAAS, University of North Texas',
    linkedinUrl: 'https://www.linkedin.com/in/bradstutzman/',
    isFeatured: true,
    portrait: portrait('brad-stutzman', 'Brad Stutzman, Chief Executive Officer of O3 Energy'),
  },
  {
    slug: 'donald-reed',
    name: 'Donald Reed',
    title: 'Vice President, Construction',
    bio: '46 years of utility transmission, distribution, and substation construction. Previously CEO of FA Tucker (NYSE), VP of Specialty Projects at MasTec, founder of Power Partners (sold to MasTec, 3,500+ MW of wind farms built), and founder of Green Earth Developers (sold to CBDEF, 14+ MW of solar).',
    linkedinUrl: 'https://www.linkedin.com/in/donald-reed-79184537/',
    portrait: portrait('donald-reed', 'Donald Reed, Vice President of Construction at O3 Energy'),
  },
  {
    slug: 'matt-ji',
    name: 'Matt Ji',
    title: 'Financial Analyst & Asset Manager',
    bio: 'Matt manages financial modeling, performance reporting, and SREC monetization across the O3 Energy portfolio. He runs the financial side of long-tenured asset management contracts for commercial and utility-scale clients.',
    portrait: portrait('matt-ji', 'Matt Ji, Financial Analyst and Asset Manager at O3 Energy'),
  },
  {
    slug: 'chad-adams',
    name: 'Chad Adams',
    title: 'President, O3 Home Solar',
    bio: 'With over 25 years in business management, Chad leads residential solar operations under the O3 Home Solar brand.',
    portrait: null,
  },
  {
    slug: 'matt-giger',
    name: 'Matt Giger',
    title: 'President, Marianas',
    bio: '27 years of island business experience across Hawaii and Guam. Nominated Guam Executive of the Year 2009 to 2010. Leads O3 Energy operations across the Asia Pacific region.',
    portrait: null,
  },
  {
    slug: 'alejandro-velasco-padilla',
    name: 'Alejandro Velasco Padilla',
    title: 'President, Mexico',
    bio: 'Formerly of 440 Energy Solutions, where he led an energy-efficiency products portfolio. Alejandro now leads O3 Energy LATAM operations. Degree in International Trade, Monterrey Campus Chihuahua.',
    portrait: null,
  },
]
