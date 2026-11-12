import Contact from '../components/Contact'
import SEO from '../components/SEO'
import { MapPin, Phone, Mail } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useSettings } from '../context/SettingsContext'
import { normalizeTenDigitPhone, FALLBACK_PHONE } from '../utils/phone'

const FALLBACK_ADDRESS =
  'Shop No. 34A, First Floor, Prabhat Center, Sector-1A, CBD Belapur, Navi Mumbai 400614'
const FALLBACK_EMAIL = 'cidcomitra@gmail.com'

export default function ContactPage() {
  const { t } = useLanguage()
  const { settings } = useSettings()
  const general = settings?.general || {}

  const contactInfo = [
    {
      icon: MapPin,
      title: t('contact.address'),
      value: general.address || FALLBACK_ADDRESS,
    },
    {
      icon: Phone,
      title: t('contact.phone'),
      value: normalizeTenDigitPhone(general.contact_phone, FALLBACK_PHONE),
    },
    {
      icon: Mail,
      title: t('contact.email'),
      value: general.contact_email || FALLBACK_EMAIL,
    },
  ]

  return (
    <div className="min-h-screen">
      <SEO
        title={t('seo.contactTitle')}
        description={t('seo.contactDescription')}
        path="/contact"
        includeBusinessSchema
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ]}
      />
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">{t('contact.title')}</h1>
          <p className="text-xl max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {contactInfo.map((info, index) => (
              <div key={index} className="text-center">
                <info.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">{info.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{info.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </div>
  )
}
