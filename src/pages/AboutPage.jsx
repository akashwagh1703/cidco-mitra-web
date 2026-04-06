import { useLanguage } from '../context/LanguageContext'
import { Target, Users, Award, Heart, Eye, Lightbulb } from 'lucide-react'

export default function AboutPage() {
  const { t } = useLanguage()

  const values = [
    { icon: Target, title: 'Our Mission', desc: 'To simplify and streamline government services for all citizens' },
    { icon: Eye, title: 'Our Vision', desc: 'A future where government services are accessible to everyone' },
    { icon: Lightbulb, title: 'Innovation', desc: 'Leveraging technology to improve service delivery' },
    { icon: Users, title: 'Community First', desc: 'Putting citizens at the heart of everything we do' },
    { icon: Award, title: 'Excellence', desc: 'Committed to delivering quality services' },
    { icon: Heart, title: 'Trust', desc: 'Building lasting relationships with our community' }
  ]

  return (
    <div className="min-h-screen">
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
                <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-bold mb-8 text-center">Our Story</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg mb-4">
              C.I.D.C.O. Mitra was established with a vision to bridge the gap between government services and citizens. 
              We understand that accessing government services can be challenging, and we're here to make it easier.
            </p>
            <p className="text-lg mb-4">
              Our platform provides a comprehensive range of services, from documentation assistance to application 
              processing, all designed to save you time and effort. We work closely with government departments to 
              ensure smooth and efficient service delivery.
            </p>
            <p className="text-lg">
              With a team of dedicated professionals and a commitment to excellence, we continue to serve thousands 
              of citizens, helping them navigate government processes with ease and confidence.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
