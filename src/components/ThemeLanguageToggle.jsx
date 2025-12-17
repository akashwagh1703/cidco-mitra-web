import { Sun, Moon, Globe } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'
import { useState } from 'react'

export default function ThemeLanguageToggle() {
  const { theme, toggleTheme } = useTheme()
  const { language, changeLanguage } = useLanguage()
  const [showLangMenu, setShowLangMenu] = useState(false)

  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'mr', name: 'Marathi', native: 'मराठी' },
    { code: 'hi', name: 'Hindi', native: 'हिंदी' },
  ]

  return (
    <div className="flex items-center gap-2">
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="Toggle theme"
      >
        {theme === 'light' ? (
          <Moon size={20} className="text-gray-700 dark:text-gray-300" />
        ) : (
          <Sun size={20} className="text-gray-300" />
        )}
      </button>

      {/* Language Toggle */}
      <div className="relative">
        <button
          onClick={() => setShowLangMenu(!showLangMenu)}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-1"
          aria-label="Change language"
        >
          <Globe size={20} className="text-gray-700 dark:text-gray-300" />
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300 uppercase">
            {language}
          </span>
        </button>

        {showLangMenu && (
          <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  changeLanguage(lang.code)
                  setShowLangMenu(false)
                }}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  language === lang.code
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {lang.native}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
