import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useSettings } from '../hooks/useSettings'
import ThemeLanguageToggle from './ThemeLanguageToggle'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage()
  const { settings } = useSettings()
  const location = useLocation()

  const navLinks = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.services'), href: '/services' },
    { name: t('nav.appointments') || 'Appointments', href: '/appointments' },
    { name: t('nav.contact'), href: '/contact' },
  ]

  return (
    <nav className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg fixed w-full top-0 z-50 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 group">
              {settings.branding.logo ? (
                <img src={settings.branding.logo} alt={settings.general.site_name} className="h-10 w-auto group-hover:scale-105 transition-transform" />
              ) : (
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-400 dark:to-primary-500 bg-clip-text text-transparent group-hover:scale-105 transition-transform">{settings.general.site_name}</h1>
              )}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeLanguageToggle />
            <div className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 text-sm font-medium transition-all duration-300 relative group ${
                    location.pathname === link.href ? 'text-primary-600 dark:text-primary-400' : ''
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-primary-600 dark:bg-primary-400 transition-all duration-300 ${
                    location.pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
              ))}
              <Link
                to="/contact"
                className="bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-500 dark:to-primary-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
              >
                {t('nav.getStarted')}
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeLanguageToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 border-t dark:border-gray-800">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`block px-3 py-2 text-base font-medium ${
                  location.pathname === link.href
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-500 dark:to-primary-600 text-white block px-3 py-2 rounded-lg text-center font-medium"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.getStarted')}
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
