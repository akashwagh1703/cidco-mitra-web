export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://cidcomitra.com').replace(/\/$/, '')

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`
export const OG_IMAGE_WIDTH = 1200
export const OG_IMAGE_HEIGHT = 630

export const SITE_DEFAULTS = {
  siteName: 'C.I.D.C.O. Mitra',
  title: 'C.I.D.C.O. Mitra — CIDCO Transfer & Documentation Services | Navi Mumbai',
  description:
    'Independent consultancy in CBD Belapur, Navi Mumbai for CIDCO property transfer, agreement, documentation and related services. Book appointments online.',
  keywords:
    'CIDCO Mitra, CIDCO transfer, CIDCO documentation, Navi Mumbai, CBD Belapur, property transfer, agreement for sale, CIDCO services',
  locale: 'en_IN',
  twitterHandle: '',
  phone: '8828422213',
  email: 'cidcomitra@gmail.com',
  address: {
    street: 'Shop No. 34A, First Floor, Prabhat Center, Sector-1A, CBD Belapur',
    locality: 'Navi Mumbai',
    region: 'Maharashtra',
    postalCode: '400614',
    country: 'IN',
  },
  geo: {
    latitude: '19.0237',
    longitude: '73.0404',
  },
}

export function absoluteUrl(pathOrUrl = '/') {
  if (!pathOrUrl) return SITE_URL
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl
  const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`
  return `${SITE_URL}${path}`
}

export function absoluteImage(image) {
  if (!image) return DEFAULT_OG_IMAGE
  if (/^https?:\/\//i.test(image)) return image
  if (image.startsWith('/')) return `${SITE_URL}${image}`
  return `${SITE_URL}/${image}`
}

export function buildLocalBusinessSchema({ siteName, description, phone, email, address, geo, image } = {}) {
  const addr = address || SITE_DEFAULTS.address
  const g = geo || SITE_DEFAULTS.geo
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': `${SITE_URL}/#organization`,
    name: siteName || SITE_DEFAULTS.siteName,
    alternateName: ['CIDCO Mitra', 'CIDCO MITRA'],
    description: description || SITE_DEFAULTS.description,
    url: SITE_URL,
    logo: absoluteUrl('/icon-512x512.png'),
    image: absoluteImage(image),
    telephone: `+91${phone || SITE_DEFAULTS.phone}`,
    email: email || SITE_DEFAULTS.email,
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: addr.street,
      addressLocality: addr.locality,
      addressRegion: addr.region,
      postalCode: addr.postalCode,
      addressCountry: addr.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: g.latitude,
      longitude: g.longitude,
    },
    areaServed: [
      { '@type': 'City', name: 'Navi Mumbai' },
      { '@type': 'AdministrativeArea', name: 'Maharashtra' },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '10:00',
        closes: '19:00',
      },
    ],
    sameAs: [],
    additionalProperty: {
      '@type': 'PropertyValue',
      name: 'AffiliationDisclaimer',
      value:
        'Independent private consultancy. Not affiliated with CIDCO Corporation or any government entity.',
    },
  }
}

export function buildWebSiteSchema(siteName) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: siteName || SITE_DEFAULTS.siteName,
    url: SITE_URL,
    inLanguage: ['en', 'mr', 'hi'],
    publisher: { '@id': `${SITE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/services?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}

export function buildBreadcrumbSchema(items = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function buildServiceSchema({ name, description, url, image }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: absoluteUrl(url),
    image: absoluteImage(image),
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: { '@type': 'City', name: 'Navi Mumbai' },
    serviceType: 'CIDCO documentation and transfer consultancy',
  }
}
