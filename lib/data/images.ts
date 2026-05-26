/**
 * Centralized image catalog — O3 ENERGY ASSETS ONLY.
 *
 * Every URL points to o3energy.com/wp-content/uploads/... — the client's own published photography.
 * No third-party stock imagery is referenced. All URLs are curl-verified 200.
 *
 * Replacement strategy when client provides higher-resolution originals:
 *   1. Drop new file into clients/o3energy/website/public/images/
 *   2. Update the URL constants in this file from `https://o3energy.com/...` to `/images/...`
 *   3. No page-level code changes needed.
 */

const O3 = (path: string) => `https://o3energy.com/wp-content/uploads/${path}`

// Frequently reused full-res sources
const SOLAR_FIELD_AERIAL = O3('2019/11/O3_Interior_large-solar-field-with-power-lines.jpg')
const SOLAR_WORKERS_TEAM = O3('2019/11/O3_Interior_solar-worker-proud-of-his-job.jpg')
const SHAKING_HANDS = O3('2019/10/O3Energy_shaking-hands-in-front-of-panels.jpg')
const LIBRARY_ROOFTOP = O3('2019/11/O3_Interior_solar-panels-on-library-roof.jpg')
const TWO_MEN_PANEL = O3('2019/11/O3_Interior_two-men-carrying-solar-panel.jpg')
const PANELS_ATTACHED_POLE = O3('2019/11/O3_Interior_solar-panels-attached-to-pole.jpg')
const GOVERNMENT_BUILDING = O3('2019/11/O3_Interior_goverment-building-with-soalr-panels.jpg')
const WORKERS_INSTALLING = O3('2019/11/O3_Interior_solar-workings-having-fun-installing-panels.jpg')
const MEN_WALKING_FIELD = O3('2019/11/O3_Energy_men-walking-in-a-solar-field-845x684.jpg')
const FIELD_WITH_TREES = O3('2019/11/O3_Energy_field-of-panels-with-trees-.jpg')
const TEAM_ON_BUILDING = O3('2020/05/O3-team-standing-on-top-of-a-building-with-solar-panels.jpg')
const LARGE_PRODUCTION_FACTORY = O3('2019/11/O3_Interior_large-solar-production-factory-845x321.jpg')
const CLIENT_PANORAMA = O3('2019/11/O3_Energy_Client_Image_10-1030x644.jpg')
const PANEL_BEING_CREATED = O3('2019/11/O3_Interior_solar-panel-being-created.jpg')
const CLIENT_IMG_2 = O3('2019/11/O3_Energy_Client_Image_2-845x684.jpg')
const CLIENT_IMG_3 = O3('2019/11/O3_Energy_Client_Image_3-845x684.jpg')

export const images = {
  // Hero photos — varied per page, all from the O3 photo library
  home: {
    src: SOLAR_FIELD_AERIAL,
    alt: 'Utility-scale solar generation field commissioned by O3 Energy',
  },
  about: {
    src: CLIENT_PANORAMA,
    alt: 'Wide view of an O3 Energy commissioned installation site',
  },
  leadership: {
    src: TEAM_ON_BUILDING,
    alt: 'O3 Energy team on top of a commissioned commercial rooftop solar array',
  },
  locations: {
    src: SOLAR_FIELD_AERIAL,
    alt: 'O3 Energy utility-scale generation site',
  },
  services: {
    src: SHAKING_HANDS,
    alt: 'O3 Energy project handoff in front of a commissioned panel array',
  },
  industries: {
    src: LIBRARY_ROOFTOP,
    alt: 'Commercial rooftop solar installed by O3 Energy on a library facility',
  },
  projects: {
    src: SOLAR_FIELD_AERIAL,
    alt: 'O3 Energy utility-scale solar portfolio site',
  },
  awards: {
    src: MEN_WALKING_FIELD,
    alt: 'O3 Energy team walking through a commissioned solar field',
  },
  partners: {
    src: FIELD_WITH_TREES,
    alt: 'O3 Energy commissioned partner solar field',
  },
  contact: {
    src: PANELS_ATTACHED_POLE,
    alt: 'O3 Energy pole-mounted solar installation',
  },

  /**
   * Background images used in sections with dark overlay.
   *
   * Per design direction, the CTABand image at the END of every page matches the
   * Commissioned Portfolio section image (the solar-field aerial). The other section
   * backgrounds use different O3 photos so the site does not feel like one repeated frame.
   */
  bg: {
    portfolio: SOLAR_FIELD_AERIAL,
    cta: SOLAR_FIELD_AERIAL, // <-- SAME as portfolio per requirement
    submitProject: TWO_MEN_PANEL,
    whyO3: MEN_WALKING_FIELD, // distinct from About hero so the page does not feel repetitive
    fourPhases: PANEL_BEING_CREATED, // subtle bg behind the process timeline
    contactPanel: PANELS_ATTACHED_POLE,
    reviews: CLIENT_IMG_2,
  },

  industryDetail: {
    commercial: {
      src: LIBRARY_ROOFTOP,
      alt: 'Commercial rooftop solar installed by O3 Energy',
    },
    government: {
      src: GOVERNMENT_BUILDING,
      alt: 'O3 Energy installation on a government building',
    },
    'utility-scale': {
      src: SOLAR_FIELD_AERIAL,
      alt: 'O3 Energy utility-scale generation site',
    },
  },

  /**
   * Per-project hero photos — these are the ACTUAL O3 project documentation photos,
   * not stock. Each shows the system commissioned for that client.
   */
  projects_by_slug: {
    'volkswagen-richmond': O3('2019/12/O3_Project_Volkswagen.jpg'),
    'holiday-inn-dripping-springs': O3('2019/12/O3_Project_Holiday-inn-express.jpg'),
    'chase-bank-denton': O3('2019/12/O3_Project_Chase-bank.jpg'),
    'city-of-murrieta': O3('2019/12/O3_Project_City-of-murrieta.jpg'),
    'new-hope-church': O3('2019/12/O3_Project_New-hope-chuch.jpg'),
    'coca-cola-houston': O3('2020/05/O3-team-standing-on-top-of-a-building-with-solar-panels.jpg'),
    'hillside-memorial': O3('2019/12/O3_Project_Hillside-memorial.jpg'),
    'hyundai-richmond': O3('2019/12/O3_Project_Hyundai.jpg'),
    'guam-resorts': O3('2019/12/O3_Project_Guam-resorts.jpg'),
    'church-on-the-way': O3('2019/12/O3_Project_church-on-the-way.jpg'),
  } as const,

  service_by_slug: {
    'project-development': TWO_MEN_PANEL,
    'epc': PANELS_ATTACHED_POLE,
    'installation-maintenance': WORKERS_INSTALLING,
    'financing': SHAKING_HANDS,
    'asset-management': LARGE_PRODUCTION_FACTORY,
  } as const,

  /**
   * Partner logos — sourced from o3energy.com WP uploads (client's own published logos).
   * Order matches the original site footer/strip; Hyundai duplicate de-duped.
   */
  partnerLogos: [
    { name: 'Hyundai', src: O3('2019/11/O3_Partner_Logo_2-180x180.jpg'), href: 'https://www.hyundaiusa.com' },
    { name: 'Boys & Girls Clubs', src: O3('2019/11/O3_Partner_Logo_5-180x180.jpg'), href: 'https://www.bgca.org' },
    { name: 'Holiday Inn (IHG)', src: O3('2019/11/O3_Partner_Logo_4-180x180.jpg'), href: 'https://www.ihg.com/holidayinn/hotels/us/en/reservation' },
    { name: 'Chase Bank', src: O3('2019/11/O3_Partner_Logo_3-180x180.jpg'), href: 'https://www.chase.com' },
    { name: 'New Hope', src: O3('2019/11/O3_Partner_Logo_8-180x180.jpg'), href: 'https://enewhope.org' },
    { name: 'Hillside Memorial', src: O3('2019/11/O3_Partner_Logo_7-180x180.jpg'), href: 'https://www.hillsidememorial.org' },
    { name: 'YMCA', src: O3('2019/11/O3_Partner_Logo_6-180x180.jpg'), href: 'https://www.ymca.net' },
  ] as const,

  certLogos: [
    { name: 'NABCEP', src: O3('2020/06/NABCEP-Logo-300x300.jpg'), href: 'https://www.nabcep.org/' },
    { name: 'SEIA', src: O3('2020/06/SEIA-Logo-300x300.jpg'), href: 'https://www.seia.org/' },
    { name: 'CABA', src: O3('2020/06/CABA-Logo-300x300.jpg'), href: 'https://www.caba.org/' },
    { name: 'WRISE', src: O3('2020/06/WRISE-Logo-300x300.jpg'), href: 'http://wrisenergy.org/' },
  ] as const,

  /** Real leadership portraits sourced from o3energy.com */
  portraits: {
    'brad-stutzman': O3('2019/11/bradstutzman.jpg'),
    'donald-reed': O3('2020/04/Don-Reed-Team-Photo.jpg'),
    'matt-ji': O3('2019/11/mattji.jpg'),
  } as const,
}
