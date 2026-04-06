import Hero from '../components/Hero'
import Services from '../components/Services'
import Contact from '../components/Contact'
import SEO from '../components/SEO'
import { useLanguage } from '../context/LanguageContext'

export default function Home() {
  const { t } = useLanguage()
  
  return (
    <>
      <SEO 
        title={t('seo.homeTitle')}
        description={t('seo.homeDescription')}
        keywords="CIDCO, Mitra, Government Services, Navi Mumbai, Transfer Services"
      />
      <Hero />
      <Services />
      <Contact />
    </>
  )
}
