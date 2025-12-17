import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import { ErrorBoundary } from 'react-error-boundary'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import ServiceDetail from './pages/ServiceDetail'
import AppointmentsPage from './pages/AppointmentsPage'
import ContactPage from './pages/ContactPage'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import CookiePolicy from './pages/CookiePolicy'
import Disclaimer from './pages/Disclaimer'
import NotFound from './pages/NotFound'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
import { queryClient } from './config/queryClient'
import { useSettings } from './hooks/useSettings'

function AppContent() {
  const { settings } = useSettings()
  
  return (
    <>
      <Helmet>
        <title>{settings.seo.meta_title}</title>
        <meta name="description" content={settings.seo.meta_description} />
        {settings.seo.meta_keywords && <meta name="keywords" content={settings.seo.meta_keywords} />}
        {settings.seo.og_title && <meta property="og:title" content={settings.seo.og_title} />}
        {settings.seo.og_description && <meta property="og:description" content={settings.seo.og_description} />}
        {settings.seo.og_image && <meta property="og:image" content={settings.seo.og_image} />}
      </Helmet>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </>
  )
}

function ErrorFallback({ error }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 dark:text-red-400 mb-4">Oops! Something went wrong</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{error.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Reload Page
        </button>
      </div>
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <LanguageProvider>
              <BrowserRouter>
                <AppContent />
              </BrowserRouter>
            </LanguageProvider>
          </ThemeProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#fff',
                color: '#363636',
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  )
}

export default App
