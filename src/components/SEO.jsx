import { Helmet } from 'react-helmet-async'
import { useLanguage } from '../context/LanguageContext'
import { useSettings } from '../context/SettingsContext'
import {
  SITE_URL,
  SITE_DEFAULTS,
  DEFAULT_OG_IMAGE,
  OG_IMAGE_WIDTH,
  OG_IMAGE_HEIGHT,
  absoluteUrl,
  absoluteImage,
  buildLocalBusinessSchema,
  buildWebSiteSchema,
  buildBreadcrumbSchema,
  buildServiceSchema,
} from '../config/seo'
import { normalizeTenDigitPhone, FALLBACK_PHONE } from '../utils/phone'

/**
 * Professional SEO + Open Graph + Twitter + JSON-LD.
 *
 * @param {object} props
 * @param {string} [props.title]
 * @param {string} [props.description]
 * @param {string} [props.keywords]
 * @param {string} [props.image]
 * @param {string} [props.path] - route path e.g. /about (preferred over window.location for SSR/crawlers)
 * @param {string} [props.url]
 * @param {'website'|'article'|'profile'} [props.type]
 * @param {boolean} [props.noindex]
 * @param {Array<{name:string,path:string}>} [props.breadcrumbs]
 * @param {object} [props.service] - { name, description, url, image } for Service schema
 * @param {boolean} [props.includeBusinessSchema] - LocalBusiness on home / contact
 */
export default function SEO({
  title,
  description,
  keywords,
  image,
  path,
  url,
  type = 'website',
  noindex = false,
  breadcrumbs,
  service,
  includeBusinessSchema = false,
}) {
  const { language } = useLanguage()
  const { settings } = useSettings()

  const siteName = settings?.general?.site_name || SITE_DEFAULTS.siteName
  const seoFromSettings = settings?.seo || {}
  const general = settings?.general || {}

  const seoDescription =
    description ||
    seoFromSettings.meta_description ||
    seoFromSettings.og_description ||
    SITE_DEFAULTS.description

  const pageTitle = title || seoFromSettings.meta_title || SITE_DEFAULTS.title
  const fullTitle = title
    ? (title.includes(siteName) ? title : `${title} | ${siteName}`)
    : pageTitle

  const canonical = absoluteUrl(url || path || (typeof window !== 'undefined' ? window.location.pathname : '/'))
  const ogImage = absoluteImage(
    image ||
      (seoFromSettings.og_image_url
        ? seoFromSettings.og_image_url
        : seoFromSettings.og_image
          ? absoluteImage(seoFromSettings.og_image.startsWith('http') ? seoFromSettings.og_image : `/storage/${seoFromSettings.og_image}`)
          : DEFAULT_OG_IMAGE)
  )

  const kw = keywords || seoFromSettings.meta_keywords || SITE_DEFAULTS.keywords
  const ogTitle = seoFromSettings.og_title && !title ? seoFromSettings.og_title : fullTitle
  const ogDescription = seoFromSettings.og_description && !description
    ? seoFromSettings.og_description
    : seoDescription

  const phone = normalizeTenDigitPhone(general.contact_phone, FALLBACK_PHONE)
  const email = general.contact_email || SITE_DEFAULTS.email
  const localeMap = { en: 'en_IN', mr: 'mr_IN', hi: 'hi_IN' }
  const ogLocale = localeMap[language] || SITE_DEFAULTS.locale

  const schemas = []
  if (includeBusinessSchema) {
    schemas.push(
      buildLocalBusinessSchema({
        siteName,
        description: seoDescription,
        phone,
        email,
        image: ogImage,
      }),
      buildWebSiteSchema(siteName)
    )
  }
  if (breadcrumbs?.length) {
    schemas.push(buildBreadcrumbSchema(breadcrumbs))
  }
  if (service?.name) {
    schemas.push(
      buildServiceSchema({
        name: service.name,
        description: service.description || seoDescription,
        url: service.url || path || canonical,
        image: service.image || ogImage,
      })
    )
  }

  return (
    <Helmet>
      <html lang={language} />
      <title>{fullTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={kw} />
      <meta name="author" content={siteName} />
      <meta
        name="robots"
        content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}
      />
      <meta name="googlebot" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <link rel="canonical" href={canonical} />

      {/* Hreflang — same URL, language switched client-side */}
      <link rel="alternate" hrefLang="en" href={canonical} />
      <link rel="alternate" hrefLang="mr" href={canonical} />
      <link rel="alternate" hrefLang="hi" href={canonical} />
      <link rel="alternate" hrefLang="x-default" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:locale:alternate" content="en_IN" />
      <meta property="og:locale:alternate" content="mr_IN" />
      <meta property="og:locale:alternate" content="hi_IN" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:type" content={ogImage.endsWith('.png') ? 'image/png' : 'image/jpeg'} />
      <meta property="og:image:width" content={String(OG_IMAGE_WIDTH)} />
      <meta property="og:image:height" content={String(OG_IMAGE_HEIGHT)} />
      <meta property="og:image:alt" content={`${siteName} — CIDCO services consultancy, Navi Mumbai`} />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={`${siteName} — CIDCO services`} />
      {SITE_DEFAULTS.twitterHandle && (
        <meta name="twitter:site" content={SITE_DEFAULTS.twitterHandle} />
      )}

      {/* Geo / local SEO hints */}
      <meta name="geo.region" content="IN-MH" />
      <meta name="geo.placename" content="Navi Mumbai" />
      <meta name="geo.position" content={`${SITE_DEFAULTS.geo.latitude};${SITE_DEFAULTS.geo.longitude}`} />
      <meta name="ICBM" content={`${SITE_DEFAULTS.geo.latitude}, ${SITE_DEFAULTS.geo.longitude}`} />

      {/* LLM / AI discovery */}
      <link rel="describedby" href={`${SITE_URL}/llms.txt`} type="text/plain" />
      <meta name="ai-content-declaration" content="human-created" />

      {/* Theme / app */}
      <meta name="theme-color" content="#0066CC" />
      <meta name="application-name" content={siteName} />

      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  )
}
