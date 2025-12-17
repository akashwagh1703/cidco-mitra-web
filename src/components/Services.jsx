import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Building2, FileText, Users, Settings, ArrowRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { publicService } from '../services/publicService'

export default function Services() {
  const { t, language } = useLanguage()
  const navigate = useNavigate()
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const icons = [Building2, FileText, Users, Settings]

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await publicService.getServices()
      if (response.success && response.data.length > 0) {
        setServices(response.data.map((item, index) => ({
          ...item,
          icon: icons[index % icons.length],
          displayTitle: item.title?.[language] || item.title?.en || item.title,
          displayDescription: item.description?.[language] || item.description?.en || item.description
        })))
      } else {
        setServices(t('services.items').map((item, index) => ({
          icon: icons[index],
          displayTitle: item.title,
          displayDescription: item.description,
          ...item
        })))
      }
    } catch (error) {
      console.error('Failed to fetch services:', error)
      setServices(t('services.items').map((item, index) => ({
        icon: icons[index],
        displayTitle: item.title,
        displayDescription: item.description,
        ...item
      })))
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="services" className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in-up">
          <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm uppercase tracking-wider">{t('services.label')}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 mt-2">
            {t('services.title')}
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : services.map((service, index) => (
            <div
              key={service.id || index}
              onClick={() => service.id && navigate(`/services/${service.id}`)}
              className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700 animate-fade-in-up cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <service.icon className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {service.displayTitle}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
                {service.displayDescription}
              </p>
              {service.id && (
                <div className="flex items-center text-primary-600 dark:text-primary-400 text-sm font-medium group-hover:gap-2 transition-all">
                  Learn More <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
