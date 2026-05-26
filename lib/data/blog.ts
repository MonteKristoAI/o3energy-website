import type { MediaProps } from '../types'
import { images } from './images'

export interface BlogAuthor {
  name: string
  title: string
}

export interface BlogSection {
  heading?: string
  paragraphs: string[]
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: 'Insights' | 'Industry' | 'Field Notes' | 'Policy'
  publishedAt: string // ISO 8601
  readingMinutes: number
  author: BlogAuthor
  hero: MediaProps
  body: BlogSection[]
}

const heroFor = (key: keyof typeof images.projects_by_slug, alt: string): MediaProps => ({
  src: images.projects_by_slug[key],
  alt,
  width: 1600,
  height: 1000,
})

export const blogPosts: BlogPost[] = [
  {
    slug: 'commercial-solar-payback-texas-2026',
    title: 'Commercial solar payback in Texas is now under six years. Here is the math.',
    excerpt:
      'Demand charges, the 30% federal Investment Tax Credit, and ERCOT rate volatility have collapsed the payback window for Texas commercial sites between 100 kW and 2 MW. We walk through a 750 kW retail rooftop deal from start to finish.',
    category: 'Insights',
    publishedAt: '2026-04-22',
    readingMinutes: 7,
    author: { name: 'Brad Stutzman', title: 'CEO, O3 Energy' },
    hero: heroFor('volkswagen-richmond', 'Commercial rooftop solar installation in Texas'),
    body: [
      {
        paragraphs: [
          'Five years ago a Texas commercial solar project at 750 kW penciled out at eight to nine years before payback. That number used to scare half the buyers we sat with. It is not the number anymore.',
          'Three things shifted at the same time. The federal Investment Tax Credit moved to 30% under the Inflation Reduction Act and stays there through 2032. ERCOT demand charges in the 4CP window now drive 35 to 45 percent of a typical commercial bill in Houston, Dallas, and San Antonio. And the spread between fixed PPA pricing and grid retail rates widened roughly 18 cents per kWh in the worst summer hours.',
        ],
      },
      {
        heading: 'A working example: 750 kW retail rooftop in Dallas-Fort Worth',
        paragraphs: [
          'Site: a single-story 95,000 sq ft distribution center on a 2020-build TPO roof. The buyer pays a blended 11.4 cents per kWh on the energy side and another $14.10 per kW on monthly demand. Annual electric spend lands at $312,000.',
          'A 750 kW DC rooftop system at this latitude produces roughly 1,100,000 kWh per year. After the 30% ITC and accelerated depreciation, the net out-of-pocket installed cost sits around $1.05 million. Annual savings, accounting for both the energy offset and the demand reduction during the 4CP window, run between $178,000 and $204,000 depending on how aggressively the inverter setpoints are tuned.',
          'Payback lands at 5.4 to 5.9 years. The system is warrantied for 25.',
        ],
      },
      {
        heading: 'What changes the math',
        paragraphs: [
          'Three variables move the payback window more than anything else: the buyer\'s pre-solar demand charge exposure, whether the project takes the ITC as cash or transfers it, and how much of the production is consumed onsite versus exported.',
          'If your site has flat 24/7 load (cold storage, light manufacturing, water treatment) the demand-charge offset is smaller because your peak coincides with the grid peak less precisely. If your site is daytime-heavy (offices, retail, distribution), the demand offset is the single biggest line item in your savings calculation.',
        ],
      },
      {
        heading: 'When solar still does not work',
        paragraphs: [
          'Buildings with sub-10-year remaining roof life. Sites where structural engineering kills the PSF budget before you even price the modules. Tenants on leases shorter than seven years without a landlord willing to take the system at end of term. We turn down projects in each of these buckets every quarter.',
          'If your site falls into one of those, the answer is probably ground-mount on adjacent land or a battery-only project sized to the demand peaks alone. We can model both during a consultation call.',
        ],
      },
    ],
  },
  {
    slug: 'utility-scale-interconnection-queue-reality',
    title: 'The interconnection queue is the project. Everything else is execution.',
    excerpt:
      'Utility-scale developers spend two thirds of their early project budget on a queue position that may or may not survive cluster restudies. We explain how O3 evaluates queue positions before signing on, and what we look for in a viable site.',
    category: 'Industry',
    publishedAt: '2026-03-14',
    readingMinutes: 9,
    author: { name: 'Brad Stutzman', title: 'CEO, O3 Energy' },
    hero: heroFor('city-of-murrieta', 'Utility-scale solar generation site'),
    body: [
      {
        paragraphs: [
          'Every utility-scale developer learns the same lesson the expensive way: the interconnection queue is not a formality at the end of a development cycle. It is the development cycle. The civil engineering, the land lease, the offtake, the modules and racking selections — all of it follows queue feasibility, not the other way around.',
          'When O3 evaluates an early-stage utility-scale opportunity, we look at queue dynamics before we look at insolation, before we look at land cost, before we look at offtake interest. If the queue position does not survive a typical cluster restudy, none of the other variables matter.',
        ],
      },
      {
        heading: 'The four signals we screen for',
        paragraphs: [
          'First, queue depth at the target point of interconnection. We pull the most recent ISO cluster study and count megawatts ahead in the same cluster window. If the cumulative MW is greater than four times the substation capacity headroom, we discount the project heavily even before reviewing the site.',
          'Second, the network upgrade allocation history at that POI. Some substations have absorbed three or four cluster windows of upgrade costs and the marginal next-project allocation is now low. Others are clean and the next project triggers a $40 million transmission rebuild that gets allocated to whichever developer happens to be at the front of the line. Read the prior cluster reports.',
          'Third, the prior withdrawal rate inside the cluster window. If 35 to 50 percent of the projects that entered the same window have since withdrawn, your project moves up the queue naturally without spending money. If the withdrawal rate is under 15 percent, every project in front of you is real and your timeline is the timeline of the slowest one.',
          'Fourth, the ISO\'s current queue reform proceedings. PJM, MISO, and ERCOT are all in different stages of moving from serial to cluster study and from first-come to readiness-based scoring. A project that is viable under one reform regime may not be viable six months later. Read the docket.',
        ],
      },
      {
        heading: 'What a viable site looks like before we sign development services',
        paragraphs: [
          'A site we will take to a cluster study has: a contiguous land position of at least 1.2 acres per MWdc, fee-simple ownership or a control agreement with a buyout option, a queue position no deeper than the third cluster window from clean upgrade allocation, and a transmission distance to the nearest substation of less than 0.6 miles for projects under 75 MW.',
          'If three of those four hold, we will run a 90-day pre-application screen. If only two hold, we will tell the developer to find a better site. There is no version of solar development where good engineering compensates for a bad queue position.',
        ],
      },
      {
        heading: 'The 2026 outlook',
        paragraphs: [
          'Both ERCOT and MISO are tightening readiness requirements through the second half of 2026. Projects that cannot demonstrate site control, offtake LOI, and financial commitment will lose queue position automatically. This is bad news for speculative developers and good news for capitalized developers with real sites. The queue is finally going to do what it was supposed to do.',
        ],
      },
    ],
  },
  {
    slug: 'asset-management-when-the-warranty-ends',
    title: 'What happens to a solar asset in year 11, after the workmanship warranty ends.',
    excerpt:
      'The first decade of a commercial solar asset is covered. The second decade is where owners discover whether they bought a fire-and-forget system or a 25-year liability. We walk through the failure modes that show up between years 11 and 18.',
    category: 'Field Notes',
    publishedAt: '2026-02-08',
    readingMinutes: 6,
    author: { name: 'Brad Stutzman', title: 'CEO, O3 Energy' },
    hero: heroFor('coca-cola-houston', 'Solar operations and maintenance technicians on a commercial rooftop'),
    body: [
      {
        paragraphs: [
          'A 10-year workmanship warranty on a commercial solar system is industry standard. Module performance warranties run 25 years. The gap between those two numbers — the 15 years where the system is still producing but the installer is no longer on the hook for labor — is where most owners discover the real cost of solar ownership.',
          'We manage roughly 80 megawatts of post-warranty commercial assets across Texas and California. The failure modes are predictable. The cost of catching them late is not.',
        ],
      },
      {
        heading: 'Year 11 to year 14: the racking and grounding window',
        paragraphs: [
          'Galvanized steel racking degrades faster in coastal humidity than the manufacturers\' marketing materials suggest. We start finding rust at clamp interfaces and grounding lugs around month 130. None of it is catastrophic. All of it compounds. A clamp that has lost 40 percent of its torque retention will let a module shift by 8 to 12 millimeters under a typical thunderstorm gust. Eventually one of those modules cracks at the frame and the system has a hot spot.',
          'The fix is cheap if you catch it on annual inspection. Re-torque every clamp. Replace any with visible corrosion. Re-bond any grounding lug with elevated resistance. Total cost on a 500 kW system: roughly $4,500 every other year. Cost of ignoring it: one to three module replacements per year at $480 installed per module, plus a 1.2 to 2.4 percent annual production loss.',
        ],
      },
      {
        heading: 'Year 13 to year 16: the inverter window',
        paragraphs: [
          'String inverters from the 2012 to 2016 vintage are now hitting their second capacitor refresh cycle. Capacitors are consumables. They dry out. Most owners do not know this and only find out when an inverter trips offline and stays there for six weeks while they argue with the OEM about whether the unit is still supported.',
          'The right answer is to budget capacitor refreshes proactively at year 12 and year 18. The OEM service price is roughly $2,200 per 50 kW inverter. A field swap before failure costs less than a forced shutdown after failure by a factor of roughly four when you account for lost production.',
        ],
      },
      {
        heading: 'Year 15 onward: the data and monitoring window',
        paragraphs: [
          'Monitoring systems installed before 2018 are now mostly orphaned. The cellular modems use 3G networks that are dark in the US. The cloud portals are end-of-life. We routinely replace the entire data acquisition layer on assets between years 13 and 17 just to keep the owner able to verify the system is actually producing.',
          'This is the single most overlooked O&M cost in commercial solar. If you cannot see the data, you cannot manage the asset, and the system will quietly underperform for years before someone notices the utility bill is higher than it should be.',
        ],
      },
    ],
  },
  {
    slug: 'tax-exempt-ppa-structures-for-municipalities',
    title: 'Tax-exempt PPA structures: how cities and school districts capture the ITC they cannot claim.',
    excerpt:
      'Cities, school districts, and non-profits cannot use the federal Investment Tax Credit directly. The PPA structure exists to let them capture the value of that credit through the per-kWh rate. We unpack how the math actually works.',
    category: 'Policy',
    publishedAt: '2026-01-19',
    readingMinutes: 8,
    author: { name: 'Brad Stutzman', title: 'CEO, O3 Energy' },
    hero: heroFor('new-hope-church', 'Solar PPA installation on a tax-exempt institutional building'),
    body: [
      {
        paragraphs: [
          'A municipality cannot claim a federal tax credit. Neither can a school district, a non-profit hospital, or a religious organization. This is the central problem in tax-exempt solar finance and it is the reason the third-party PPA structure exists.',
          'A PPA — power purchase agreement — moves the asset ownership to a taxable investor who claims the ITC and the depreciation, then sells the energy back to the tax-exempt customer at a fixed per-kWh rate that is lower than the utility retail rate. The customer captures the value of the tax credit they could not claim themselves, expressed as a lower energy rate.',
        ],
      },
      {
        heading: 'Where the value comes from',
        paragraphs: [
          'On a 500 kW project, the ITC at 30% on a $1.25 million installed system is $375,000. Accelerated depreciation, claimed through the five-year MACRS schedule, drops another $250,000 to $290,000 of after-tax value depending on the investor\'s marginal rate. Combined, the tax-side value is roughly half the installed system cost.',
          'In a well-structured PPA, between 60% and 75% of that tax-side value flows to the customer through the rate. The investor keeps the remaining 25 to 40 percent as their return.',
        ],
      },
      {
        heading: 'The buyout clause is where most deals fail',
        paragraphs: [
          'The fair market value buyout at year 6 (the IRS recapture threshold) is the most-negotiated clause in any tax-exempt PPA. Investors want a number high enough to preserve their return. Customers want a number low enough to make the asset affordable to acquire.',
          'A defensible FMV at year 6 lands between 50 and 60 percent of original installed cost for a well-performing system. Higher than that and the customer should be prepared to extend the PPA through year 15. Lower than that and the investor will not sign.',
        ],
      },
      {
        heading: 'What we have seen work in Texas school districts',
        paragraphs: [
          'School districts have unique constraints: voter-approved bond capacity, limited operating budget flexibility, and statutory caps on energy spending in some ISD charters. We have structured PPAs around all three.',
          'The pattern that works most often: a 20-year PPA at a fixed rate roughly 22% below the current utility rate, with a year-7 buyout option set at 55% of installed cost, financed through an energy services performance contract that does not count against bond capacity. The district saves money in year one, owns the asset outright in year seven, and continues to save through year 25.',
        ],
      },
    ],
  },
]

export const sortedBlogPosts = [...blogPosts].sort(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
)

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

export function getFeaturedPost(): BlogPost {
  return sortedBlogPosts[0]
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  return sortedBlogPosts.filter((p) => p.slug !== slug).slice(0, limit)
}
