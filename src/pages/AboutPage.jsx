import { Target, Users, Award, TrendingUp } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function AboutPage() {
  const { t } = useLanguage()

  const stats = [
    { icon: Users, value: '10K+', label: t('about.stats.clients') },
    { icon: Award, value: '50+', label: t('about.stats.awards') },
    { icon: TrendingUp, value: '99%', label: t('about.stats.successRate') },
    { icon: Target, value: '15+', label: t('about.stats.experience') },
  ]

  return (
    <div className="pt-16 min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('about.title')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-800 dark:to-gray-700">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-white dark:bg-gray-900 rounded-full mb-3 shadow-md">
                <stat.icon className="text-primary-700 dark:text-primary-400" size={28} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('about.mission')}</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{t('about.missionText')}</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('about.vision')}</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{t('about.visionText')}</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('about.whyChoose')}</h2>
          <ul className="space-y-4">
            {t('about.reasons').map((reason, index) => (
              <li key={index} className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-primary-600 dark:bg-primary-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700 dark:text-gray-300">{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
