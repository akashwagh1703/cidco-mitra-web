import { useState, useEffect } from 'react'
import { publicService } from '../services/publicService'

export const useSettings = () => {
  const [settings, setSettings] = useState({
    general: {
      site_name: 'CIDCO Mitra',
      contact_email: 'info@cidcomitra.gov.in',
      contact_phone: '+91 1234567890',
      address: 'Mumbai, Maharashtra, India'
    },
    branding: {
      primary_color: '#ca8a04',
      secondary_color: '#64748b',
      font_family: 'Inter',
      logo: null,
      favicon: null
    },
    homepage: {
      hero_title: 'Welcome to CIDCO Mitra',
      hero_subtitle: 'Your trusted partner for urban development',
      hero_cta_text: 'Get Started',
      hero_cta_link: '/contact',
      about_title: 'About Us',
      about_description: 'We are committed to excellence',
      features: []
    },
    seo: {
      meta_title: 'CIDCO Mitra - Official Website',
      meta_description: 'CIDCO Mitra official website',
      meta_keywords: '',
      og_title: '',
      og_description: '',
      og_image: null
    }
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await publicService.getSettings()
      if (response.success && response.data) {
        const branding = response.data.branding || {}
        const apiUrl = import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:8000'
        setSettings(prev => ({
          general: { ...prev.general, ...response.data.general },
          branding: { 
            ...prev.branding, 
            ...branding,
            logo: branding.logo_url ? `${apiUrl}${branding.logo_url}` : null,
            favicon: branding.favicon_url ? `${apiUrl}${branding.favicon_url}` : null
          },
          homepage: { ...prev.homepage, ...response.data.homepage },
          seo: { ...prev.seo, ...response.data.seo }
        }))
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error)
    } finally {
      setLoading(false)
    }
  }

  return { settings, loading }
}
