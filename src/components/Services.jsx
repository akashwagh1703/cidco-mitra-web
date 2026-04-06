import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Loader, Home, FileText, Building2, UserPlus, RefreshCw, FileX, Gift, LandPlot } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { publicService } from '../services/publicService'
import AppointmentBooking from './AppointmentBooking'

export default function Services() {
  const { t, language } = useLanguage()
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedService, setSelectedService] = useState(null)
  const [showBooking, setShowBooking] = useState(false)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await publicService.getServices()
      setServices(response.data?.slice(0, 8) || [])
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setLoading(false)
    }
  }

  const getLocalizedText = (item, field) => {
    const localized = item?.[`${field}_${language}`] || item?.[field]
    if (typeof localized === 'object' && localized !== null) {
      return localized[language] || localized.en || ''
    }
    return localized || ''
  }

  // Icon mapping based on service type
  const getServiceIcon = (index) => {
    const icons = [Home, Gift, Building2, UserPlus, RefreshCw, FileText, FileX, LandPlot]
    const IconComponent = icons[index % icons.length]
    return IconComponent
  }

  const handleBookAppointment = (service) => {
    setSelectedService(service)
    setShowBooking(true)
  }

  if (loading) {
    return (
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <Loader className="animate-spin mx-auto text-primary" size={40} />
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white">
            {t('services.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Big Card Container */}
        <div className="max-w-7xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-200 dark:border-gray-700">
            {/* Services Grid - Compact Design */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service, index) => {
                const IconComponent = getServiceIcon(index)
                return (
                  <div 
                    key={service.id} 
                    onClick={() => handleBookAppointment(service)}
                    className="group cursor-pointer"
                  >
                    <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl p-4 border-2 border-gray-200 dark:border-gray-700 hover:border-primary hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-4">
                      {/* Icon */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                          {service.icon_url ? (
                            <img
                              src={service.icon_url}
                              alt={getLocalizedText(service, 'title')}
                              className="w-8 h-8"
                            />
                          ) : (
                            <IconComponent className="text-white" size={28} />
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        {/* Service Title */}
                        <h3 className="text-base font-bold mb-1 text-gray-800 dark:text-white group-hover:text-primary transition-colors">
                          {getLocalizedText(service, 'title')}
                        </h3>

                        {/* Service Description */}
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 md:line-clamp-2">
                          {getLocalizedText(service, 'description')}
                        </p>
                      </div>

                      {/* Arrow Icon */}
                      <Link
                        to={`/services/${service.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex-shrink-0"
                      >
                        <ArrowRight size={20} className="text-primary group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* View All Button */}
            {services.length > 0 && (
              <div className="text-center mt-8">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-3 rounded-lg font-semibold text-lg transition shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  {t('services.viewAll')}
                  <ArrowRight size={20} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Appointment Booking Modal */}
      {showBooking && selectedService && (
        <AppointmentBooking
          service={selectedService}
          onClose={() => {
            setShowBooking(false)
            setSelectedService(null)
          }}
        />
      )}
    </section>
  )
}
