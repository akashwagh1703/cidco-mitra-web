import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useSettings } from '../hooks/useSettings'
import { useState, useEffect } from 'react'

export default function Hero() {
  const { t } = useLanguage()
  const { settings } = useSettings()
  const navigate = useNavigate()
  const content = {
    title: settings.homepage.hero_title || t('hero.title'),
    subtitle: settings.homepage.hero_subtitle || t('hero.subtitle'),
    ctaText: settings.homepage.hero_cta_text || t('hero.getStarted'),
    ctaLink: settings.homepage.hero_cta_link || '/contact'
  }

  const slides = [
    { 
      id: 1, 
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920', 
      title: content.title,
      subtitle: content.subtitle,
      tag: t('hero.welcome')
    },
    { 
      id: 2, 
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920', 
      title: 'Smart City Planning',
      subtitle: 'Building sustainable and modern urban infrastructure for tomorrow',
      tag: 'Innovation'
    },
    { 
      id: 3, 
      image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1920', 
      title: 'Infrastructure Excellence',
      subtitle: 'Delivering world-class development projects across the region',
      tag: 'Development'
    }
  ]

  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image */}
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          
          {/* Content Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div
                className={`transition-all duration-700 delay-100 ${
                  index === currentSlide
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
              >
                <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  {slide.tag}
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6 drop-shadow-2xl">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-lg">
                  {slide.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => navigate(content.ctaLink)}
                    className="inline-flex items-center justify-center bg-primary-600 text-white px-8 py-4 rounded-lg hover:bg-primary-700 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold group"
                  >
                    {content.ctaText}
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                  </button>
                  <button
                    onClick={() => navigate('/about')}
                    className="inline-flex items-center justify-center bg-white/20 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-primary-600 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold"
                  >
                    {t('hero.learnMore')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all z-10"
      >
        <ChevronLeft className="text-white" size={28} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all z-10"
      >
        <ChevronRight className="text-white" size={28} />
      </button>
      
      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-white w-12'
                : 'bg-white/50 w-8 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
