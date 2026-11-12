import { useLanguage } from '../context/LanguageContext'
import SEO from '../components/SEO'
import { Target, Users, Award, Heart, Eye, Lightbulb } from 'lucide-react'

export default function AboutPage() {
  const { t } = useLanguage()

  const values = [
    { icon: Target, titleKey: 'about.missionTitle', descKey: 'about.missionDesc' },
    { icon: Eye, titleKey: 'about.visionTitle', descKey: 'about.visionDesc' },
    { icon: Lightbulb, titleKey: 'about.innovationTitle', descKey: 'about.innovationDesc' },
    { icon: Users, titleKey: 'about.communityTitle', descKey: 'about.communityDesc' },
    { icon: Award, titleKey: 'about.excellenceTitle', descKey: 'about.excellenceDesc' },
    { icon: Heart, titleKey: 'about.trustTitle', descKey: 'about.trustDesc' },
  ]

  return (
    <div className="min-h-screen">
      <SEO
        title={t('seo.aboutTitle')}
        description={t('seo.aboutDescription')}
        path="/about"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ]}
      />
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">{t('about.title')}</h1>
          <p className="text-xl max-w-3xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 hover:shadow-xl transition"
              >
                <value.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-3">{t(value.titleKey)}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t(value.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-bold mb-8 text-center">{t('about.ourStory')}</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg mb-4">{t('about.storyP1')}</p>
            <p className="text-lg mb-4">{t('about.storyP2')}</p>
            <p className="text-lg">{t('about.storyP3')}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
