import { Helmet } from 'react-helmet-async'
import { useLanguage } from '../context/LanguageContext'

export default function SEO({ 
  title, 
  description, 
  keywords,
  image = '/og-image.jpg',
  url = window.location.href
}) {
  const { language } = useLanguage()
  
  const siteName = 'C.I.D.C.O. Mitra'
  const fullTitle = title ? `${title} | ${siteName}` : siteName

  return (
    <Helmet>
      <html lang={language} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional */}
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />
    </Helmet>
  )
}
