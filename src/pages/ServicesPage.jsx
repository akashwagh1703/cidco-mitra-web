import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Loader, Search, Home, Gift, Building2, UserPlus, RefreshCw, FileText, FileX, LandPlot, Calendar, MessageCircle } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { publicService } from '../services/publicService'
import AppointmentBooking from '../components/AppointmentBooking'

export default function ServicesPage() {
  const { t, language } = useLanguage()
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedService, setSelectedService] = useState(null)
  const [showBooking, setShowBooking] = useState(false)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await publicService.getServices()
      setServices(response.data || [])
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

  const filteredServices = services.filter(service =>
    getLocalizedText(service, 'title').toLowerCase().includes(search.toLowerCase())
  )

  const getServiceIcon = (index) => {
    const icons = [Home, Gift, Building2, UserPlus, RefreshCw, FileText, FileX, LandPlot]
    const IconComponent = icons[index % icons.length]
    return IconComponent
  }

  const handleWhatsAppClick = (service, e) => {
    e.preventDefault()
    e.stopPropagation()
    const whatsappNumber = service.whatsapp || service.phone || '918828422213'
    const message = encodeURIComponent(
      `Hello, I would like to inquire about ${getLocalizedText(service, 'title')} service.`
    )
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank')
  }

  const handleBookAppointment = (service, e) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedService(service)
    setShowBooking(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="animate-spin" size={40} />
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20 bg-gradient-to-b from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {t('services.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-xl mb-10 max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>

          {/* Enhanced Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-xl"></div>
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-gray-200 dark:border-gray-700">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-primary" size={24} />
              <input
                type="text"
                placeholder="Search for services..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-16 pr-6 py-5 bg-transparent text-lg rounded-2xl focus:outline-none dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Services Count Badge */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            <div className="bg-white dark:bg-gray-800 rounded-full px-6 py-3 shadow-md border border-gray-200 dark:border-gray-700">
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                {filteredServices.length} {filteredServices.length === 1 ? 'Service' : 'Services'} Available
              </span>
            </div>
          </div>
        </div>

        {/* Enhanced Big Card Container */}
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl"></div>
            
            <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-10 border-2 border-gray-200 dark:border-gray-700">
              {/* Services Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredServices.map((service, index) => {
                  const IconComponent = getServiceIcon(index)
                  return (
                    <div key={service.id} className="group">
                      <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700 hover:border-primary hover:shadow-2xl transition-all duration-300 overflow-hidden">
                        {/* Gradient Overlay on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Content */}
                        <div className="relative">
                          {/* Top Section */}
                          <div className="flex items-start gap-4 mb-6">
                            {/* Icon */}
                            <div className="flex-shrink-0">
                              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                {service.icon_url ? (
                                  <img
                                    src={service.icon_url}
                                    alt={getLocalizedText(service, 'title')}
                                    className="w-10 h-10"
                                  />
                                ) : (
                                  <IconComponent className="text-white" size={32} />
                                )}
                              </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white group-hover:text-primary transition-colors">
                                {getLocalizedText(service, 'title')}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
                                {getLocalizedText(service, 'description')}
                              </p>
                            </div>

                            {/* Arrow Link */}
                            <Link
                              to={`/services/${service.id}`}
                              className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                            >
                              <ArrowRight size={20} />
                            </Link>
                          </div>

                          {/* Divider */}
                          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent mb-6"></div>

                          {/* Action Buttons */}
                          <div className="grid grid-cols-2 gap-3">
                            <button
                              onClick={(e) => handleBookAppointment(service, e)}
                              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-4 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                            >
                              <Calendar size={18} />
                              Book Now
                            </button>
                            <button
                              onClick={(e) => handleWhatsAppClick(service, e)}
                              className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                            >
                              <MessageCircle size={18} />
                              WhatsApp
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* No Results */}
              {filteredServices.length === 0 && (
                <div className="text-center py-20">
                  <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search size={40} className="text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">No services found</h3>
                  <p className="text-gray-600 dark:text-gray-400">Try adjusting your search terms</p>
                </div>
              )}
            </div>
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
    </div>
  )
}
