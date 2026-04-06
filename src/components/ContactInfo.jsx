import { Phone } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function ContactInfo() {
  const { t } = useLanguage()

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary to-secondary rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="text-center">
            <h3 className="text-white text-2xl md:text-3xl font-bold mb-4">
              {t('contactInfo.title')}
            </h3>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                <Phone className="text-white" size={32} />
              </div>
              <a
                href="tel:8828422213"
                className="text-white text-3xl md:text-4xl font-bold hover:text-gray-100 transition"
              >
                8828422213
              </a>
            </div>
            <p className="text-white/90 text-lg">
              {t('contactInfo.subtitle')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
