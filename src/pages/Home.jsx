import Hero from '../components/Hero'
import Services from '../components/Services'
import Contact from '../components/Contact'
import SEO from '../components/SEO'
import { useLanguage } from '../context/LanguageContext'
import { useSettings } from '../context/SettingsContext'
import { ShieldCheck, Users, Award } from 'lucide-react'

export default function Home() {
  const { t } = useLanguage()
  const { settings } = useSettings()

  const stats = [
    {
      icon: ShieldCheck,
      value: settings?.stats?.services_count || t('trust.servicesValue'),
      label: t('trust.servicesLabel'),
    },
    {
      icon: Users,
      value: settings?.stats?.clients_count || t('trust.clientsValue'),
      label: t('trust.clientsLabel'),
    },
    {
      icon: Award,
      value: settings?.stats?.satisfaction || t('trust.satisfactionValue'),
      label: t('trust.satisfactionLabel'),
    },
  ]

  return (
    <>
      <SEO
        title={t('seo.homeTitle')}
        description={t('seo.homeDescription')}
        keywords="CIDCO Mitra, CIDCO transfer, CIDCO documentation, Navi Mumbai, CBD Belapur, Transfer Services"
        path="/"
        includeBusinessSchema
        breadcrumbs={[{ name: 'Home', path: '/' }]}
      />
      <Hero />
      <Services />

      <section className="py-14 bg-gradient-to-r from-cidcoDarkBlue via-primary to-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">{t('trust.title')}</h2>
            <p className="text-white/90 text-lg">{t('trust.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/15 mb-4">
                  <stat.icon size={28} />
                </div>
                <p className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</p>
                <p className="text-white/85 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </>
  )
}
