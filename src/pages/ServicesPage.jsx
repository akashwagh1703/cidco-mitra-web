import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Building2, Calendar } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { publicService } from '../services/publicService'

export default function ServicesPage() {
  const { language } = useLanguage()
  const navigate = useNavigate()
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await publicService.getServices()
      if (response.success) {
        setServices(response.data.filter(s => s.status))
      }
    } catch (error) {
      console.error('Failed to fetch services:', error)
    } finally {
      setLoading(false)
    }
  }

  const getText = (field) => {
    if (!field) return ''
    return field[language] || field.en || field
  }

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {language === 'en' ? 'Our Services' : language === 'mr' ? 'आमच्या सेवा' : 'हमारी सेवाएं'}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {language === 'en' ? 'Comprehensive range of services for your needs' : language === 'mr' ? 'तुमच्या गरजांसाठी सेवांची व्यापक श्रेणी' : 'आपकी आवश्यकताओं के लिए सेवाओं की व्यापक श्रृंखला'}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              {language === 'en' ? 'No services available' : language === 'mr' ? 'कोणत्याही सेवा उपलब्ध नाहीत' : 'कोई सेवा उपलब्ध नहीं'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="group bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700 cursor-pointer"
                onClick={() => navigate(`/services/${service.id}`)}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <Building2 className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors">
                  {getText(service.title)}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 line-clamp-3">
                  {getText(service.description)}
                </p>
                <button className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium hover:gap-3 transition-all">
                  <Calendar size={18} />
                  {language === 'en' ? 'Book Appointment' : language === 'mr' ? 'भेट बुक करा' : 'अपॉइंटमेंट बुक करें'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
