import Contact from '../components/Contact'
import { MapPin, Phone, Mail } from 'lucide-react'

export default function ContactPage() {
  const contactInfo = [
    { icon: MapPin, title: 'Address', value: 'Shop No. 34A, First Floor, Prabhat Center, Sector-1A, CBD Belapur, Navi Mumbai 400614' },
    { icon: Phone, title: 'Phone', value: '8828422213' },
    { icon: Mail, title: 'Email', value: 'cidcomitra@gmail.com' }
  ]

  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {contactInfo.map((info, index) => (
              <div key={index} className="text-center">
                <info.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">{info.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{info.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </div>
  )
}
