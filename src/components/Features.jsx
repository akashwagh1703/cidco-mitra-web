import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { publicService } from '../services/publicService'
import { TrendingUp, Users, CheckCircle } from 'lucide-react'

export default function Features() {
  const { t } = useLanguage()
  const [stats, setStats] = useState({ services: 0, users: 0, satisfaction: 0 })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await publicService.getStats()
      if (response.data) {
        setStats({
          services: response.data.total_services || 0,
          users: response.data.total_users || 0,
          satisfaction: response.data.satisfaction_rate || 95
        })
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const features = [
    { icon: TrendingUp, value: stats.services, label: t('stats.services'), suffix: '+' },
    { icon: Users, value: stats.users, label: t('stats.users'), suffix: '+' },
    { icon: CheckCircle, value: stats.satisfaction, label: t('stats.satisfaction'), suffix: '%' }
  ]

  return (
    <section className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">{t('features.title')}</h2>
          <p className="text-white/90 text-lg">{t('features.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <feature.icon className="w-12 h-12 mx-auto mb-4" />
              <div className="text-5xl font-bold mb-2">
                {feature.value}{feature.suffix}
              </div>
              <div className="text-xl">{feature.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
