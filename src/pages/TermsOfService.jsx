import { useLanguage } from '../context/LanguageContext'
import { FileText } from 'lucide-react'

export default function TermsOfService() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 md:p-12">
          <div className="flex items-center gap-4 mb-8">
            <FileText className="w-12 h-12 text-primary" />
            <h1 className="text-4xl font-bold">{t('terms.title')}</h1>
          </div>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{t('terms.section1Title')}</h2>
              <p>{t('terms.section1Content')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{t('terms.section2Title')}</h2>
              <p>{t('terms.section2Content')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{t('terms.section3Title')}</h2>
              <p>{t('terms.section3Content')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{t('terms.section4Title')}</h2>
              <p>{t('terms.section4Content')}</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
