import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { LanguageProvider } from './context/LanguageContext'
import Header from './components/Header'
import Footer from './components/Footer'
import InstallPrompt from './components/InstallPrompt'
import Home from './pages/Home'
import ServicesPage from './pages/ServicesPage'
import ServiceDetail from './pages/ServiceDetail'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import NotFound from './pages/NotFound'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter 
        basename="/"
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:id" element={<ServiceDetail />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <InstallPrompt />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  )
}

export default App
