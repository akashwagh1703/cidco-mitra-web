import { Shield, Zap, HeartHandshake, Clock } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function Features() {
  const { t } = useLanguage()
  const icons = [Shield, Zap, HeartHandshake, Clock]
  const features = t('features.items').map((item, index) => ({
    icon: icons[index],
    ...item
  }))

  return (
    <section id="features" className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in-up">
          <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm uppercase tracking-wider">{t('features.label')}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 mt-2">
            {t('features.title')}
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group flex items-start space-x-4 p-6 rounded-xl bg-gradient-to-br from-gray-50 to-primary-50 dark:from-gray-800 dark:to-gray-700 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg shadow-md group-hover:scale-110 transition-transform">
                  <feature.icon className="text-white" size={22} />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
