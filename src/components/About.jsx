import { useState, useEffect } from 'react'
import { Target, Users, Award, TrendingUp } from 'lucide-react'
import { publicService } from '../services/publicService'
import { useLanguage } from '../context/LanguageContext'
import { useSettings } from '../hooks/useSettings'

export default function About() {
  const { t } = useLanguage()
  const { settings } = useSettings()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState([
    { icon: Users, value: '10K+', label: t('about.stats.clients') },
    { icon: Award, value: '50+', label: t('about.stats.awards') },
    { icon: TrendingUp, value: '99%', label: t('about.stats.successRate') },
    { icon: Target, value: '15+', label: t('about.stats.experience') },
  ])

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await publicService.getStats()
      if (response.success) {
        setStats([
          { icon: Users, value: `${response.data.total_clients}+`, label: t('about.stats.clients') },
          { icon: Award, value: `${response.data.awards_won}+`, label: t('about.stats.awards') },
          { icon: TrendingUp, value: `${response.data.success_rate}%`, label: t('about.stats.successRate') },
          { icon: Target, value: `${response.data.years_experience}+`, label: t('about.stats.experience') },
        ])
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="about" className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in-up">
          <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm uppercase tracking-wider">{t('about.label')}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 mt-2">
            {t('about.title')}
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center p-6 rounded-xl bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-white dark:bg-gray-900 rounded-full mb-3 shadow-md">
                <stat.icon className="text-primary-600 dark:text-primary-400" size={28} />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* About Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="animate-slide-in-left">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              {settings.homepage.about_title || t('about.mission')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-5 text-sm leading-relaxed">
              {settings.homepage.about_description || t('about.missionText')}
            </p>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              {t('about.vision')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {t('about.visionText')}
            </p>
          </div>
          <div className="bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 shadow-lg animate-slide-in-right">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('about.whyChoose')}</h3>
            <ul className="space-y-3">
              {t('about.reasons').map((item, index) => (
                <li key={index} className="flex items-start group">
                  <div className="flex-shrink-0 w-5 h-5 bg-primary-600 dark:bg-primary-500 rounded-full flex items-center justify-center mr-3 mt-0.5 group-hover:scale-110 transition-transform">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
