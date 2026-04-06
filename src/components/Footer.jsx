import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { publicService } from '../services/publicService'

export default function Footer() {
  const { t, language } = useLanguage()
  const [services, setServices] = useState([])

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await publicService.getServices()
      setServices(response.data?.slice(0, 5) || [])
    } catch (error) {
      console.error('Error fetching services:', error)
    }
  }

  const getLocalizedText = (item, field) => {
    const localized = item?.[`${field}_${language}`] || item?.[field]
    if (typeof localized === 'object' && localized !== null) {
      return localized[language] || localized.en || ''
    }
    return localized || ''
  }

  const quickLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/services', label: t('nav.services') },
    { path: '/about', label: t('nav.about') },
    { path: '/contact', label: t('nav.contact') }
  ]

  const socialLinks = [
    { icon: Facebook, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Instagram, href: '#' },
    { icon: Linkedin, href: '#' }
  ]

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white py-12 pb-20 md:pb-12">
      <div className="container mx-auto px-4">
        {/* CIDCO Transfer Services Banner */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 mb-8 text-center">
          <h3 className="text-xl md:text-3xl font-bold mb-2">{t('footer.transferServices')}</h3>
          <p className="text-base md:text-lg opacity-90">{t('footer.transferTagline')}</p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="mb-4">
              <h3 className="text-2xl font-bold mb-1">C.I.D.C.O. Mitra</h3>
              {/* <h4 className="text-xl font-bold text-primary">C.I.D.C.O. Mitra</h4> */}
            </div>
            <p className="text-gray-400">{t('footer.description')}</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-gray-400 hover:text-primary transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.ourServices')}</h4>
            <ul className="space-y-2">
              {services.map(service => (
                <li key={service.id}>
                  <Link
                    to={`/services/${service.id}`}
                    className="text-gray-400 hover:text-primary transition"
                  >
                    {getLocalizedText(service, 'title')}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.followUs')}</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-gray-400 hover:text-primary transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Accordion Style */}
        <div className="md:hidden space-y-4 mb-8">
          {/* Brand */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-xl font-bold mb-1">सिडकोमित्र</h3>
            <h4 className="text-lg font-bold text-primary mb-2">C.I.D.C.O. Mitra</h4>
            <p className="text-gray-400 text-sm">{t('footer.description')}</p>
          </div>

          {/* Quick Links */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h4 className="text-base font-semibold mb-3">{t('footer.quickLinks')}</h4>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-gray-400 hover:text-primary transition text-sm py-1"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h4 className="text-base font-semibold mb-3">{t('footer.ourServices')}</h4>
            <div className="space-y-2">
              {services.slice(0, 5).map(service => (
                <Link
                  key={service.id}
                  to={`/services/${service.id}`}
                  className="block text-gray-400 hover:text-primary transition text-sm py-1"
                >
                  {getLocalizedText(service, 'title')}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h4 className="text-base font-semibold mb-3">{t('footer.followUs')}</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-gray-700 hover:bg-primary rounded-full flex items-center justify-center transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <div className="flex flex-wrap justify-center gap-4 mb-4 text-sm">
            <Link to="/privacy-policy" className="hover:text-primary transition">
              {t('footer.privacy')}
            </Link>
            <span>•</span>
            <Link to="/terms-of-service" className="hover:text-primary transition">
              {t('footer.terms')}
            </Link>
          </div>
          <p className="text-sm">&copy; {new Date().getFullYear()} C.I.D.C.O. Mitra. {t('footer.rights')}.</p>
        </div>
      </div>
    </footer>
  )
}
