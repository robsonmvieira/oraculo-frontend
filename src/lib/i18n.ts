import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import enCommon from '@/locales/en/common.json'
import enAuth from '@/locales/en/auth.json'
import enLayout from '@/locales/en/layout.json'
import enDashboard from '@/locales/en/dashboard.json'
import enAudiences from '@/locales/en/audiences.json'
import enProfile from '@/locales/en/profile.json'
import enLanding from '@/locales/en/landing.json'

import ptBRCommon from '@/locales/pt-BR/common.json'
import ptBRAuth from '@/locales/pt-BR/auth.json'
import ptBRLayout from '@/locales/pt-BR/layout.json'
import ptBRDashboard from '@/locales/pt-BR/dashboard.json'
import ptBRAudiences from '@/locales/pt-BR/audiences.json'
import ptBRProfile from '@/locales/pt-BR/profile.json'
import ptBRLanding from '@/locales/pt-BR/landing.json'

export const defaultNS = 'common'

export const resources = {
  en: {
    common: enCommon,
    auth: enAuth,
    layout: enLayout,
    dashboard: enDashboard,
    audiences: enAudiences,
    profile: enProfile,
    landing: enLanding,
  },
  'pt-BR': {
    common: ptBRCommon,
    auth: ptBRAuth,
    layout: ptBRLayout,
    dashboard: ptBRDashboard,
    audiences: ptBRAudiences,
    profile: ptBRProfile,
    landing: ptBRLanding,
  },
} as const

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    defaultNS,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },
  })

export default i18n
