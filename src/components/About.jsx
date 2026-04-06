import { useLanguage } from '../context/LanguageContext'
import { Target, Users, Award, Heart } from 'lucide-react'

export default function About() {
  const { t } = useLanguage()

  const features = [
    { icon: Target, title: 'Mission', desc: 'Simplifying government services' },
    { icon: Users, title: 'Community', desc: 'Serving thousands of citizens' },
    { icon: Award, title: 'Excellence', desc: 'Quality service delivery' },
    { icon: Heart, title: 'Trust', desc: 'Your reliable partner' }
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">{t('about.title')}</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <feature.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
