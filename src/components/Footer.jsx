import { useState, useEffect } from 'react'
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useSettings } from '../hooks/useSettings'
import { publicService } from '../services/publicService'

export default function Footer() {
  const { t, language } = useLanguage()
  const { settings } = useSettings()
  const [services, setServices] = useState([])
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await publicService.getServices()
      if (response.success) {
        setServices(response.data.filter(s => s.status).slice(0, 6))
      }
    } catch (error) {
      console.error('Failed to fetch services:', error)
    }
  }

  const getText = (field) => {
    if (!field) return ''
    return field[language] || field.en || field
  }

  const footerLinks = {
    company: [
      { name: t('nav.about'), href: '/about' },
      { name: t('nav.services'), href: '/services' },
      { name: t('nav.contact'), href: '/contact' },
      { name: t('nav.home'), href: '/' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '/terms-of-service' },
      { name: 'Cookie Policy', href: '/cookie-policy' },
      { name: 'Disclaimer', href: '/disclaimer' },
    ],
  }

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ]

  return (
    <footer className="bg-gray-900 dark:bg-black text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            {settings.branding.logo ? (
              <img src={settings.branding.logo} alt={settings.general.site_name} className="h-10 w-auto mb-4" />
            ) : (
              <h3 className="text-2xl font-bold mb-4">{settings.general.site_name}</h3>
            )}
            <p className="text-gray-400 dark:text-gray-500 mb-4">
              {t('footer.description')}
            </p>
            <div className="space-y-2">
              <a href={`tel:${settings.general.contact_phone}`} className="flex items-center text-gray-400 dark:text-gray-500 hover:text-white transition-colors">
                <Phone size={16} className="mr-2" />
                {settings.general.contact_phone}
              </a>
              <a href={`mailto:${settings.general.contact_email}`} className="flex items-center text-gray-400 dark:text-gray-500 hover:text-white transition-colors">
                <Mail size={16} className="mr-2" />
                {settings.general.contact_email}
              </a>
              <p className="flex items-start text-gray-400 dark:text-gray-500">
                <MapPin size={16} className="mr-2 mt-1 flex-shrink-0" />
                {settings.general.address}
              </p>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.company')}</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 dark:text-gray-500 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.services')}</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services/${service.id}`}
                    className="text-gray-400 dark:text-gray-500 hover:text-white transition-colors"
                  >
                    {getText(service.title)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.legal')}</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 dark:text-gray-500 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="border-t border-gray-800 dark:border-gray-900 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 dark:text-gray-500 text-sm mb-4 md:mb-0">
              © {currentYear} {t('footer.copyright')}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-gray-800 dark:bg-gray-900 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
