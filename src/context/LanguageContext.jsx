import { createContext, useContext, useState, useEffect } from 'react'
import en from '../locales/en.json'
import mr from '../locales/mr.json'
import hi from '../locales/hi.json'

const translations = { en, mr, hi }

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'mr'
  })

  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  const t = (key) => {
    const keys = key.split('.')
    let value = translations[language]
    for (const k of keys) {
      value = value?.[k]
    }
    return value || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
