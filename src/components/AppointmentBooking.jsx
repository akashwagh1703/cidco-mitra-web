import { useState, useEffect, useRef } from 'react'
import { X, Calendar, Clock, User, Mail, Phone, MessageSquare, Loader, CheckCircle2 } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { publicService } from '../services/publicService'

export default function AppointmentBooking({ service, onClose }) {
  const { t, language } = useLanguage()
  const dialogRef = useRef(null)
  const previouslyFocused = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    appointment_date: '',
    appointment_time: '',
    message: '',
    website: ''
  })
  const [availableSlots, setAvailableSlots] = useState([])
  const [loading, setLoading] = useState(false)
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    previouslyFocused.current = document.activeElement
    const dialog = dialogRef.current
    const focusable = dialog?.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    focusable?.focus()

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }

      if (e.key !== 'Tab' || !dialog) return

      const focusables = Array.from(
        dialog.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]):not([tabindex="-1"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => el.offsetParent !== null || el === document.activeElement)

      if (focusables.length === 0) return

      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      previouslyFocused.current?.focus?.()
    }
  }, [onClose])

  useEffect(() => {
    if (formData.appointment_date && service?.id) {
      fetchAvailableSlots()
    }
  }, [formData.appointment_date, service?.id])

  const fetchAvailableSlots = async () => {
    setSlotsLoading(true)
    try {
      const response = await publicService.getAvailableSlots(
        service.id,
        formData.appointment_date
      )
      const slots = response.data || []
      setAvailableSlots(slots)
    } catch (err) {
      console.error('Error fetching slots:', err)
      setAvailableSlots([])
    } finally {
      setSlotsLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    const nextValue = name === 'phone'
      ? value.replace(/\D/g, '').slice(0, 10)
      : value
    setFormData(prev => ({
      ...prev,
      [name]: nextValue,
      ...(name === 'appointment_date' ? { appointment_time: '' } : {}),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (formData.website) {
      setSuccess(true)
      setLoading(false)
      setTimeout(() => {
        setSuccess(false)
        onClose()
      }, 1500)
      return
    }

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      setError(t('appointment.phoneInvalid'))
      setLoading(false)
      return
    }

    try {
      const { website, ...rest } = formData
      const appointmentData = {
        service_id: service.id,
        ...rest
      }

      await publicService.bookAppointment(appointmentData)
      setSuccess(true)

      setTimeout(() => {
        setSuccess(false)
        onClose()
      }, 3000)
    } catch (err) {
      const apiMessage = err?.response?.data?.message
      const fallbackMessage = typeof err?.message === 'string' ? err.message : null
      setError(apiMessage || fallbackMessage || t('appointment.errorMessage'))
    } finally {
      setLoading(false)
    }
  }

  const getMinDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  const getLocalizedText = (item, field) => {
    if (!item) return ''
    const localized = item?.[`${field}_${language}`] || item?.[field]
    if (typeof localized === 'object' && localized !== null) {
      return localized[language] || localized.en || ''
    }
    return localized || ''
  }

  const todayStr = new Date().toISOString().split('T')[0]
  const tomorrowDate = new Date()
  tomorrowDate.setDate(tomorrowDate.getDate() + 1)
  const tomorrowStr = tomorrowDate.toISOString().split('T')[0]

  if (success) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn"
        role="dialog"
        aria-modal="true"
        aria-labelledby="appointment-success-title"
      >
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-md w-full animate-scaleIn">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle2 size={40} className="text-white" />
            </div>
            <h3 id="appointment-success-title" className="text-3xl font-bold mb-3 text-gray-800 dark:text-white">
              {t('appointment.successTitle')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
              {t('appointment.successMessage')}
            </p>
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              {t('appointment.close')}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md overflow-y-auto animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="appointment-dialog-title"
    >
      <div
        ref={dialogRef}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 w-full max-w-2xl my-4 sm:my-8 max-h-[95vh] overflow-y-auto animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 id="appointment-dialog-title" className="text-2xl font-bold text-gray-800 dark:text-white">
              {t('appointment.title')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {getLocalizedText(service, 'title')}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('appointment.close')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Honeypot */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '-9999px',
              height: 0,
              overflow: 'hidden',
              opacity: 0,
            }}
          >
            <label htmlFor="appointment-website">Website</label>
            <input
              id="appointment-website"
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              <User size={16} className="inline mr-2" />
              {t('appointment.name')}
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
              placeholder={t('appointment.namePlaceholder')}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              <Mail size={16} className="inline mr-2" />
              {t('appointment.email')}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
              placeholder={t('appointment.emailPlaceholder')}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              <Phone size={16} className="inline mr-2" />
              {t('appointment.phone')}
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              inputMode="numeric"
              maxLength={10}
              minLength={10}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
              placeholder={t('appointment.phonePlaceholder')}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              <Calendar size={16} className="inline mr-2" />
              {t('appointment.date')} <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
              {t('appointment.selectPreferred')}
            </p>

            <div className="grid grid-cols-3 gap-2 mb-3">
              <button
                type="button"
                onClick={() => {
                  setFormData(prev => ({ ...prev, appointment_date: todayStr, appointment_time: '' }))
                }}
                className={`px-4 py-3 rounded-lg border-2 transition font-semibold text-sm ${
                  formData.appointment_date === todayStr
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:border-primary'
                }`}
              >
                {t('appointment.today')}
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormData(prev => ({ ...prev, appointment_date: tomorrowStr, appointment_time: '' }))
                }}
                className={`px-4 py-3 rounded-lg border-2 transition font-semibold text-sm ${
                  formData.appointment_date === tomorrowStr
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:border-primary'
                }`}
              >
                {t('appointment.tomorrow')}
              </button>
              <button
                type="button"
                onClick={() => document.getElementById('custom-date-input')?.showPicker?.()}
                className="px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-primary transition font-semibold text-sm"
              >
                {t('appointment.custom')}
              </button>
            </div>

            <input
              id="custom-date-input"
              type="date"
              name="appointment_date"
              value={formData.appointment_date}
              onChange={handleChange}
              min={getMinDate()}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white text-base"
            />
          </div>

          {formData.appointment_date && (
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                <Clock size={16} className="inline mr-2" />
                {t('appointment.timeSlot')} <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                {t('appointment.chooseTime')}
              </p>

              {slotsLoading ? (
                <div className="flex items-center justify-center py-6">
                  <Loader className="animate-spin text-primary" size={24} />
                </div>
              ) : availableSlots.length > 0 ? (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {availableSlots.map((slot, index) => {
                    const slotTime = typeof slot === 'string' ? slot : slot.time
                    const isAvailable = typeof slot === 'string' ? true : slot.available
                    const slotKey = typeof slot === 'string' ? slot : slot.time

                    if (!isAvailable) return null

                    const isSelected = formData.appointment_time === slotTime

                    const formatTime = (time) => {
                      const [hours, minutes] = time.split(':')
                      const h = parseInt(hours, 10)
                      const ampm = h >= 12 ? 'PM' : 'AM'
                      const h12 = h % 12 || 12
                      return `${h12}:${minutes} ${ampm}`
                    }

                    return (
                      <button
                        key={slotKey || index}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, appointment_time: slotTime }))}
                        className={`px-3 py-2.5 rounded-lg border-2 transition font-medium text-sm ${
                          isSelected
                            ? 'bg-primary text-white border-primary'
                            : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:border-primary'
                        }`}
                      >
                        {formatTime(slotTime)}
                      </button>
                    )
                  })}
                </div>
              ) : (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-lg p-3 text-center text-sm text-yellow-700 dark:text-yellow-400">
                  {t('appointment.noSlots')}
                </div>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              <MessageSquare size={16} className="inline mr-2" />
              {t('appointment.message')} ({t('appointment.optional')})
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white resize-none"
              placeholder={t('appointment.messagePlaceholder')}
            />
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              {t('appointment.cancel')}
            </button>
            <button
              type="submit"
              disabled={loading || !formData.appointment_time}
              className="flex-1 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  {t('appointment.submitting')}
                </>
              ) : (
                <>
                  <Calendar size={20} />
                  {t('appointment.submit')}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
