import { Link } from 'react-router-dom'
import { Home, Search } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function NotFound() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 px-4">
      <div className="text-center max-w-lg">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <Search className="w-20 h-20 text-gray-400 mx-auto mb-4" />
        </div>
        <h2 className="text-3xl font-bold mb-4">{t('notFound.title')}</h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
          {t('notFound.message')}
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/"
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition"
          >
            <Home size={20} />
            {t('notFound.goHome')}
          </Link>
          <Link
            to="/services"
            className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-8 py-3 rounded-lg font-semibold transition"
          >
            {t('notFound.viewServices')}
          </Link>
        </div>
      </div>
    </div>
  )
}
