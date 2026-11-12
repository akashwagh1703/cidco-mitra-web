import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const POSTER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Crect fill='%230066CC' width='1920' height='1080'/%3E%3C/svg%3E"

export default function Hero() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(media.matches)
    update()
    media.addEventListener?.('change', update)
    return () => media.removeEventListener?.('change', update)
  }, [])

  useEffect(() => {
    if (reducedMotion) return undefined

    let idleId
    let timeoutId
    let observer

    const enableVideo = () => setShouldLoadVideo(true)

    const scheduleIdle = () => {
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(enableVideo, { timeout: 2500 })
      } else {
        timeoutId = window.setTimeout(enableVideo, 1500)
      }
    }

    if ('IntersectionObserver' in window && sectionRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            scheduleIdle()
            observer.disconnect()
          }
        },
        { rootMargin: '100px' }
      )
      observer.observe(sectionRef.current)
    } else {
      scheduleIdle()
    }

    return () => {
      observer?.disconnect()
      if (idleId != null && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId)
      }
      if (timeoutId != null) window.clearTimeout(timeoutId)
    }
  }, [reducedMotion])

  useEffect(() => {
    if (!shouldLoadVideo || reducedMotion || !videoRef.current) return
    const video = videoRef.current
    const play = () => {
      video.play().catch(() => {})
    }
    if (video.readyState >= 2) {
      play()
    } else {
      video.addEventListener('loadeddata', play, { once: true })
    }
  }, [shouldLoadVideo, reducedMotion])

  return (
    <section
      ref={sectionRef}
      className="relative h-[600px] flex items-center justify-center overflow-hidden"
    >
      {/* Blue gradient overlay matching CIDCO design */}
      <div className="absolute inset-0 bg-gradient-to-br from-cidcoBlue/80 via-primary/70 to-cidcoDarkBlue/80 z-10" />

      {/* Static poster / gradient fallback (always present) */}
      <div
        className="absolute inset-0 w-full h-full bg-gradient-to-br from-cidcoBlue to-cidcoDarkBlue"
        style={{
          backgroundImage: `url("${POSTER}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        aria-hidden="true"
      />

      {/* Background Video — lazy-loaded, skipped for reduced motion */}
      {!reducedMotion && shouldLoadVideo && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={POSTER}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={`${import.meta.env.BASE_URL}videos/hero-background.mp4`} type="video/mp4" />
        </video>
      )}

      <div className="relative z-20 container mx-auto px-4 text-center text-white animate-fade-in">
        <div className="mb-6">
          <h1 className="text-6xl md:text-7xl font-bold mb-2 tracking-tight">
            C.I.D.C.O. MITRA
          </h1>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-lg px-6 py-3 inline-block mb-8 border border-white/20">
          <p className="text-xl md:text-2xl font-semibold">
            {t('hero.tagline')}
          </p>
        </div>

        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
          {t('hero.subtitle')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/services"
            className="bg-white hover:bg-gray-100 text-primary px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition shadow-lg"
          >
            {t('hero.getStarted')}
            <ArrowRight size={20} />
          </Link>
          <Link
            to="/contact"
            className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition border-2 border-white/50"
          >
            {t('hero.contactUs')}
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  )
}
