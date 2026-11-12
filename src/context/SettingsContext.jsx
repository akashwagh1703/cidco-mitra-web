import { createContext, useContext, useEffect, useState } from 'react'
import { publicService } from '../services/publicService'

const SettingsContext = createContext({
  settings: null,
  loading: true,
})

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    const loadSettings = async () => {
      try {
        const response = await publicService.getSettings()
        if (!cancelled) {
          setSettings(response.data || response)
        }
      } catch (error) {
        console.error('Error loading settings:', error)
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadSettings()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <SettingsContext.Provider value={{ settings, loading }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  return useContext(SettingsContext)
}
