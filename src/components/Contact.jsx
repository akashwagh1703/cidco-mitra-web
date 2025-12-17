import { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { publicService } from '../services/publicService'
import { useLanguage } from '../context/LanguageContext'
import { useSettings } from '../hooks/useSettings'

export default function Contact() {
  const { t } = useLanguage()
  const { settings } = useSettings()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' })
    }
  }

  const validate = () => {
    const newErrors = {}
    
    if (!formData.name || !formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }
    
    if (!formData.email || !formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (formData.phone && !/^[+]?[0-9]{10,15}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number'
    }
    
    if (!formData.message || !formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!validate()) return
    
    setLoading(true)
    
    try {
      const response = await publicService.submitContact(formData)
      if (response.success) {
        setSuccess(true)
        setFormData({ name: '', email: '', phone: '', message: '' })
        setErrors({})
        setTimeout(() => setSuccess(false), 5000)
      } else {
        setError(response.message || 'Failed to send message. Please try again.')
      }
    } catch (err) {
      console.error('Failed to submit:', err)
      setError(err.response?.data?.message || 'Failed to send message. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: Phone,
      title: t('contact.phone'),
      value: settings.general.contact_phone,
      link: `tel:${settings.general.contact_phone.replace(/\s/g, '')}`,
    },
    {
      icon: Mail,
      title: t('contact.email'),
      value: settings.general.contact_email,
      link: `mailto:${settings.general.contact_email}`,
    },
    {
      icon: MapPin,
      title: t('contact.address'),
      value: settings.general.address,
      link: '#',
    },
  ]

  return (
    <section id="contact" className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in-up">
          <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm uppercase tracking-wider">{t('contact.label')}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 mt-2">
            {t('contact.title')}
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="animate-slide-in-left">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-5">
              {t('contact.info')}
            </h3>
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  className="group flex items-start space-x-4 p-4 rounded-lg bg-white dark:bg-gray-800 hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex-shrink-0">
                    <div className="inline-flex items-center justify-center w-11 h-11 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg shadow-md group-hover:scale-110 transition-transform">
                      <info.icon className="text-white" size={20} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">{info.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-6 p-5 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-primary-100 dark:border-gray-700">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-sm">{t('contact.officeHours')}</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{t('contact.hours.weekday')}</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{t('contact.hours.saturday')}</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{t('contact.hours.sunday')}</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 md:p-8 border border-gray-100 dark:border-gray-700 animate-slide-in-right">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-5">
              {t('contact.form.title')}
            </h3>
            
            {success && (
              <div className="mb-5 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm animate-fade-in">
                {t('contact.form.success')}
              </div>
            )}

            {error && (
              <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm animate-fade-in">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('contact.form.name')} *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                    errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder={t('contact.form.namePlaceholder')}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('contact.form.email')} *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                    errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder={t('contact.form.emailPlaceholder')}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('contact.form.phone')}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                    errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder={t('contact.form.phonePlaceholder')}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('contact.form.message')} *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                    errors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder={t('contact.form.messagePlaceholder')}
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {loading ? t('contact.form.sending') : t('contact.form.send')}
                <Send className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
