import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  Loader,
  MessageCircle,
  Phone,
  Clock,
  FileText,
  DollarSign,
  Calendar,
  CheckCircle2
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { publicService } from '../services/publicService'
import AppointmentBooking from '../components/AppointmentBooking'

export default function ServiceDetail() {
  const { id } = useParams()
  const { t, language } = useLanguage()
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showBooking, setShowBooking] = useState(false)

  useEffect(() => {
    fetchService()
  }, [id])

  const fetchService = async () => {
    try {
      const response = await publicService.getServices()
      const found = response.data?.find(s => s.id === parseInt(id))
      setService(found)
    } catch (error) {
      console.error('Error fetching service:', error)
    } finally {
      setLoading(false)
    }
  }

  const getLocalizedText = (item, field) => {
    if (!item) return ''
    const localized = item?.[`${field}_${language}`] || item?.[field]
    if (typeof localized === 'object' && localized !== null) {
      return localized[language] || localized.en || ''
    }
    return localized || ''
  }

  const handleWhatsAppClick = () => {
    const whatsappNumber = service.whatsapp || service.phone || '8828422213'
    const message = encodeURIComponent(
      `Hello, I would like to inquire about ${getLocalizedText(service, 'title')} service.`
    )
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800">
        <Loader className="animate-spin text-primary" size={40} />
      </div>
    )
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">{t('serviceDetail.notFound')}</h2>
          <Link to="/services" className="text-primary hover:underline">
            {t('serviceDetail.backToServices')}
          </Link>
        </div>
      </div>
    )
  }

  const renderDocuments = () => {
    const documents = service.documents
    if (!documents) return []

    let docList = []
    if (typeof documents === 'string') {
      try {
        const parsed = JSON.parse(documents)
        if (Array.isArray(parsed)) {
          docList = parsed
        } else if (typeof parsed === 'object') {
          docList = parsed[language] || parsed.en || []
        }
      } catch {
        docList = documents.split(',').map(d => d.trim()).filter(d => d)
      }
    } else if (Array.isArray(documents)) {
      docList = documents
    } else if (typeof documents === 'object' && documents !== null) {
      const localizedDocs = documents[language] || documents.en || documents
      if (Array.isArray(localizedDocs)) {
        docList = localizedDocs
      } else if (typeof localizedDocs === 'string') {
        docList = localizedDocs.split(',').map(d => d.trim()).filter(d => d)
      }
    }

    // Ensure we always return an array
    return Array.isArray(docList) ? docList : []
  }

  // Get documents list once
  const documentsList = renderDocuments()

  return (
    <div className="min-h-screen py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 max-w-6xl">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 font-semibold"
        >
          <ArrowLeft size={20} />
          {t('serviceDetail.backToServices')}
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 mb-6">
              {/* Service Header */}
              <div className="flex items-start gap-6 mb-6">
                {service.icon_url && (
                  <img
                    src={service.icon_url}
                    alt={getLocalizedText(service, 'title')}
                    className="w-20 h-20 rounded-lg"
                  />
                )}
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800 dark:text-white">
                    {getLocalizedText(service, 'title')}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    {getLocalizedText(service, 'description')}
                  </p>
                </div>
              </div>

              {/* Overview */}
              {service.overview && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-800 dark:text-white">
                    <FileText size={24} className="text-primary" />
                    {t('serviceDetail.overview')}
                  </h2>
                  <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                    {getLocalizedText(service, 'overview')}
                  </div>
                </div>
              )}

              {/* Required Documents */}
              {documentsList && documentsList.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-800 dark:text-white">
                    <FileText size={24} className="text-primary" />
                    {t('serviceDetail.requiredDocuments')}
                  </h2>
                  <ul className="space-y-3">
                    {documentsList.map((doc, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 size={20} className="text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Timeline */}
              {service.timeline && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-800 dark:text-white">
                    <Clock size={24} className="text-primary" />
                    {t('serviceDetail.processingTime')}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 text-lg">
                    {getLocalizedText(service, 'timeline')}
                  </p>
                </div>
              )}

              {/* Pricing */}
              {service.pricing && getLocalizedText(service, 'pricing') && (
                <div className="bg-blue-50 dark:bg-gray-800 rounded-lg p-6">
                  <h2 className="text-2xl font-bold mb-3 flex items-center gap-2 text-gray-800 dark:text-white">
                    <DollarSign size={24} className="text-primary" />
                    {t('serviceDetail.pricing')}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 text-lg">
                    {getLocalizedText(service, 'pricing')}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Contact & Booking */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">
                {t('serviceDetail.getStarted')}
              </h3>

              {/* WhatsApp Contact */}
              {(service.whatsapp || service.phone) && (
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-lg font-semibold flex items-center justify-center gap-3 transition mb-4 shadow-lg hover:shadow-xl"
                >
                  <MessageCircle size={20} />
                  {t('serviceDetail.contactWhatsApp')}
                </button>
              )}

              {/* Phone Contact */}
              {service.phone && (
                <a
                  href={`tel:${service.phone}`}
                  className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-4 rounded-lg font-semibold flex items-center justify-center gap-3 transition mb-4 shadow-lg hover:shadow-xl"
                >
                  <Phone size={20} />
                  {t('serviceDetail.callNow')}
                </a>
              )}

              {/* Book Appointment Button */}
              <button
                onClick={() => setShowBooking(!showBooking)}
                className="w-full bg-secondary hover:bg-secondary/90 text-white px-6 py-4 rounded-lg font-semibold flex items-center justify-center gap-3 transition shadow-lg hover:shadow-xl"
              >
                <Calendar size={20} />
                {t('serviceDetail.bookAppointment')}
              </button>

              {/* Contact Numbers Display */}
              {(service.whatsapp || service.phone) && (
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {t('serviceDetail.contactInfo')}
                  </p>
                  {service.phone && (
                    <div className="flex items-center gap-2 mb-2">
                      <Phone size={16} className="text-primary" />
                      <span className="text-gray-800 dark:text-white font-semibold">
                        {service.phone}
                      </span>
                    </div>
                  )}
                  {service.whatsapp && service.whatsapp !== service.phone && (
                    <div className="flex items-center gap-2">
                      <MessageCircle size={16} className="text-green-600" />
                      <span className="text-gray-800 dark:text-white font-semibold">
                        {service.whatsapp}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Appointment Booking Modal */}
        {showBooking && (
          <AppointmentBooking
            service={service}
            onClose={() => setShowBooking(false)}
          />
        )}
      </div>
    </div>
  )
}
