import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useLanguage } from '../context/LanguageContext'
import { publicService } from '../services/publicService'
import { Send, Loader, MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react'

export default function Contact() {
  const { t } = useLanguage()
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

  const onSubmit = async (data) => {
    try {
      await publicService.submitLead(data)
      toast.success(t('contact.success'))
      reset()
    } catch (error) {
      toast.error(t('contact.error'))
    }
  }

  const contactDetails = [
    {
      icon: MapPin,
      title: t('contact.address'),
      value: 'Shop No. 34A, First Floor, Prabhat Center, Sector-1A, CBD Belapur, Navi Mumbai 400614',
      link: null
    },
    {
      icon: Phone,
      title: t('contact.phone'),
      value: '8828422213',
      link: 'tel:8828422213'
    },
    {
      icon: Mail,
      title: t('contact.email'),
      value: 'cidcomitra@gmail.com',
      link: 'mailto:cidcomitra@gmail.com'
    },
    {
      icon: Clock,
      title: t('contact.hours'),
      value: t('contact.hoursValue'),
      link: null
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-primary/10 rounded-lg px-6 py-2 mb-4">
            <p className="text-primary font-semibold text-sm uppercase tracking-wide">
              {t('contact.getInTouch')}
            </p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('contact.title')}</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div>
            <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 text-white mb-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-6">{t('contact.contactInfo')}</h3>
              <div className="space-y-6">
                {contactDetails.map((detail, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 flex-shrink-0">
                      <detail.icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{detail.title}</h4>
                      {detail.link ? (
                        <a
                          href={detail.link}
                          className="text-white/90 hover:text-white transition"
                        >
                          {detail.value}
                        </a>
                      ) : (
                        <p className="text-white/90">{detail.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map or Additional Info */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold mb-4">{t('contact.whyContactUs')}</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{t('contact.reason1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{t('contact.reason2')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{t('contact.reason3')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{t('contact.reason4')}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold mb-6">{t('contact.sendMessage')}</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
                    {t('contact.name')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('name', { required: t('contact.nameRequired') })}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    placeholder={t('contact.namePlaceholder')}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
                    {t('contact.email')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    {...register('email', { 
                      required: t('contact.emailRequired'),
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: t('contact.emailInvalid')
                      }
                    })}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    placeholder={t('contact.emailPlaceholder')}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
                    {t('contact.phone')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    {...register('phone', { 
                      required: t('contact.phoneRequired'),
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: t('contact.phoneInvalid')
                      }
                    })}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    placeholder={t('contact.phonePlaceholder')}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
                    {t('contact.message')} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows="5"
                    {...register('message', { required: t('contact.messageRequired') })}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition resize-none"
                    placeholder={t('contact.messagePlaceholder')}
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-3 transition disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="animate-spin" size={20} />
                      {t('contact.sending')}
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      {t('contact.submit')}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
