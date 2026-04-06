import { useLanguage } from '../context/LanguageContext'
import { ArrowRight, Play } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      {/* Blue gradient overlay matching CIDCO design */}
      <div className="absolute inset-0 bg-gradient-to-br from-cidcoBlue/80 via-primary/70 to-cidcoDarkBlue/80 z-10" />

      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Crect fill='%230066CC' width='1920' height='1080'/%3E%3C/svg%3E"
      >
        <source src="/videos/hero-background.mp4" type="video/mp4" />
        {/* Fallback message if video doesn't load */}
        Your browser does not support the video tag.
      </video>

      <div className="relative z-20 container mx-auto px-4 text-center text-white animate-fade-in">
        {/* CIDCO Mitra Logo/Title */}
        <div className="mb-6">
          <h1 className="text-6xl md:text-7xl font-bold mb-2 tracking-tight">
            C.I.D.C.O. MITRA
          </h1>
          {/* <h2 className="text-4xl md:text-5xl font-bold mb-4">
            C.I.D.C.O. MITRA
          </h2> */}
        </div>

        {/* Tagline */}
        <div className="bg-white/10 backdrop-blur-md rounded-lg px-6 py-3 inline-block mb-8 border border-white/20">
          <p className="text-xl md:text-2xl font-semibold">
            {t('hero.tagline')}
          </p>
        </div>

        {/* Service Categories Title */}
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
