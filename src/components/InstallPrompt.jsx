import { useState, useEffect } from 'react'
import { X, Download, Smartphone } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const { t } = useLanguage()

  useEffect(() => {
    // Check if user has already dismissed the prompt
    const hasSeenPrompt = localStorage.getItem('pwa-install-prompt-dismissed')
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

    // Don't show if already dismissed, already installed, or not on mobile
    if (hasSeenPrompt || isStandalone || !isMobile) {
      return
    }

    // For Android Chrome - wait for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      // Show prompt after 3 seconds
      setTimeout(() => {
        setShowPrompt(true)
      }, 3000)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    // For iOS Safari - show custom prompt immediately after 3 seconds
    if (isIOS) {
      setTimeout(() => {
        setShowPrompt(true)
      }, 3000)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // For Android Chrome
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice

      if (outcome === 'accepted') {
        console.log('User accepted the install prompt')
      }

      setDeferredPrompt(null)
      setShowPrompt(false)
      localStorage.setItem('pwa-install-prompt-dismissed', 'true')
    } else {
      // For iOS - just close the prompt (they need to use Share button)
      setShowPrompt(false)
      localStorage.setItem('pwa-install-prompt-dismissed', 'true')
    }
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    localStorage.setItem('pwa-install-prompt-dismissed', 'true')
  }

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)

  if (!showPrompt) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-[9998] animate-fade-in"
        onClick={handleDismiss}
      />

      {/* Popup */}
      <div className="fixed bottom-0 left-0 right-0 z-[9999] animate-slideUp">
        <div className="bg-white dark:bg-gray-800 rounded-t-3xl shadow-2xl max-w-md mx-auto">
          {/* Close Button */}
          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-6 pb-8">
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-2">
              {t('installPrompt.title') || 'Install C.I.D.C.O. Mitra App'}
            </h3>

            {/* Description */}
            <p className="text-center text-gray-600 dark:text-gray-300 mb-6 text-sm">
              {t('installPrompt.description') || 'Get quick access to CIDCO services. Install our app for a better experience with offline access.'}
            </p>

            {/* iOS Instructions */}
            {isIOS && (
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-4 text-sm">
                <p className="text-blue-800 dark:text-blue-200 font-medium mb-2">
                  {t('installPrompt.iosTitle') || 'How to Install on iPhone/iPad:'}
                </p>
                <ol className="text-blue-700 dark:text-blue-300 space-y-1 list-decimal list-inside">
                  <li>{t('installPrompt.iosStep1') || 'Tap the Share button'}
                    <span className="inline-flex items-center mx-1 px-2 py-0.5 bg-white dark:bg-gray-700 rounded">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16 5l-1.42 1.42-1.59-1.59V16h-1.98V4.83L9.42 6.42 8 5l4-4 4 4zm4 5v11c0 1.1-.9 2-2 2H6c-1.11 0-2-.9-2-2V10c0-1.11.89-2 2-2h3v2H6v11h12V10h-3V8h3c1.1 0 2 .89 2 2z"/>
                      </svg>
                    </span>
                  </li>
                  <li>{t('installPrompt.iosStep2') || 'Select "Add to Home Screen"'}</li>
                  <li>{t('installPrompt.iosStep3') || 'Tap "Add" to install'}</li>
                </ol>
              </div>
            )}

            {/* Benefits */}
            <div className="space-y-2 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 dark:text-green-400 text-xs">✓</span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {t('installPrompt.benefit1') || 'Works offline - Access services anytime'}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 dark:text-green-400 text-xs">✓</span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {t('installPrompt.benefit2') || 'Faster loading - Save data and time'}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 dark:text-green-400 text-xs">✓</span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {t('installPrompt.benefit3') || 'Home screen access - One tap to open'}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {!isIOS && (
                <button
                  onClick={handleInstallClick}
                  className="flex-1 bg-gradient-to-r from-primary to-secondary text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  {t('installPrompt.install') || 'Install App'}
                </button>
              )}
              <button
                onClick={handleDismiss}
                className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold py-3 px-6 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {t('installPrompt.later') || 'Maybe Later'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
