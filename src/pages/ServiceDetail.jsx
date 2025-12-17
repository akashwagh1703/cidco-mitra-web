import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Phone, MessageCircle, Calendar, FileText, Clock, DollarSign, Info } from 'lucide-react'
import { publicService } from '../services/publicService'
import { useLanguage } from '../context/LanguageContext'
import AppointmentBooking from '../components/AppointmentBooking'
import ScheduleViewer from '../components/ScheduleViewer'

export default function ServiceDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { language } = useLanguage()
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showBooking, setShowBooking] = useState(false)

  useEffect(() => {
    fetchService()
  }, [id])

  const fetchService = async () => {
    try {
      const response = await publicService.getServices()
      if (response.success) {
        const found = response.data.find(s => s.id === parseInt(id))
        setService(found)
      }
    } catch (error) {
      console.error('Failed to fetch service:', error)
    } finally {
      setLoading(false)
    }
  }

  const getText = (field) => {
    if (!field) return ''
    return field[language] || field.en || field
  }

  const handleCall = () => {
    if (service?.phone) window.location.href = `tel:${service.phone}`
  }

  const handleWhatsApp = () => {
    if (service?.whatsapp) window.open(`https://wa.me/${service.whatsapp.replace(/[^0-9]/g, '')}`, '_blank')
  }

  const handleAppointment = (e) => {
    e.preventDefault()
    // Always open modal on service detail page
    setShowBooking(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Service Not Found</h2>
          <button onClick={() => navigate('/')} className="text-primary-600 hover:underline">Go Back</button>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 pb-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={() => navigate('/')} className="flex items-center text-primary-600 dark:text-primary-400 hover:underline mb-6">
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{getText(service.title)}</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">{getText(service.description)}</p>

          {getText(service.overview) && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Info className="text-primary-600" size={20} />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Overview</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{getText(service.overview)}</p>
            </div>
          )}

          {getText(service.pricing) && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="text-primary-600" size={20} />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Pricing</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{getText(service.pricing)}</p>
            </div>
          )}

          {getText(service.documents) && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="text-primary-600" size={20} />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Required Documents</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{getText(service.documents)}</p>
            </div>
          )}

          {getText(service.timeline) && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="text-primary-600" size={20} />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Process Timeline</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{getText(service.timeline)}</p>
            </div>
          )}

          {/* Schedule & Appointment Section */}
          <div className="mb-8 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 rounded-lg p-6 border border-primary-200 dark:border-gray-600">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {language === 'en' ? 'Schedule & Appointments' : language === 'mr' ? 'वेळापत्रक आणि भेटी' : 'शेड्यूल और अपॉइंटमेंट'}
              </h2>
              <button 
                onClick={handleAppointment}
                className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
              >
                <Calendar size={16} />
                {language === 'en' ? 'Book Now' : language === 'mr' ? 'आता बुक करा' : 'अभी बुक करें'}
              </button>
            </div>
            <ScheduleViewer serviceId={service.id} />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 flex items-center gap-2">
              <Info size={14} />
              {language === 'en' ? 'Click "Book Now" to select a specific date and time slot' : 
               language === 'mr' ? 'विशिष्ट तारीख आणि वेळ निवडण्यासाठी "आता बुक करा" वर क्लिक करा' : 
               'विशिष्ट तिथि और समय स्लॉट चुनने के लिए "अभी बुक करें" पर क्लिक करें'}
            </p>
          </div>

          <div className="border-t pt-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {language === 'en' ? 'Get Expert Assistance' : language === 'mr' ? 'तज्ञ सहाय्य मिळवा' : 'विशेषज्ञ सहायता प्राप्त करें'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {service.phone && (
                <button onClick={handleCall} className="flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors">
                  <Phone size={20} />
                  Call Now
                </button>
              )}
              {service.whatsapp && (
                <button onClick={handleWhatsApp} className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                  <MessageCircle size={20} />
                  WhatsApp
                </button>
              )}
              <button onClick={handleAppointment} className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                <Calendar size={20} />
                {language === 'en' ? 'Book Appointment' : language === 'mr' ? 'भेट बुक करा' : 'अपॉइंटमेंट बुक करें'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {showBooking && (
        <AppointmentBooking
          service={service}
          onClose={() => setShowBooking(false)}
        />
      )}
    </div>
  )
}
