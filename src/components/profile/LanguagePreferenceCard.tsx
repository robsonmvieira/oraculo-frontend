import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Globe, ChevronDown } from 'lucide-react'
import { Card } from '@/components/ui'
import { useUpdateLanguage } from '@/modules/auth'
import type { AuthUser } from '@/modules/auth'
import { ChangeLanguageModal } from './ChangeLanguageModal'

const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'pt-BR', label: 'Português (Brasil)' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'it', label: 'Italiano' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'zh', label: '中文' },
] as const

interface LanguagePreferenceCardProps {
  user: AuthUser
}

export function LanguagePreferenceCard({ user }: Readonly<LanguagePreferenceCardProps>) {
  const { t } = useTranslation('profile')
  const currentLanguageCode = user.getPreferredLanguage() || 'en'
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [pendingLanguage, setPendingLanguage] = useState<{ code: string; label: string } | null>(null)

  const { mutate: updateLanguage, isPending } = useUpdateLanguage()

  const currentLanguage = SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguageCode) || SUPPORTED_LANGUAGES[0]

  const handleSelect = (language: typeof SUPPORTED_LANGUAGES[number]) => {
    setIsDropdownOpen(false)
    if (language.code === currentLanguageCode) return
    setPendingLanguage(language)
  }

  const handleConfirm = () => {
    if (!pendingLanguage) return
    updateLanguage(pendingLanguage.code, {
      onSuccess: () => {
        setPendingLanguage(null)
      },
    })
  }

  const handleCancel = () => {
    setPendingLanguage(null)
  }

  return (
    <>
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-gray-500 dark:text-zinc-400" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{t('language.title')}</h3>
          </div>
        </div>

        <p className="text-sm text-gray-500 dark:text-zinc-400 mb-4">
          {t('language.description')}
        </p>

        <div className="relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="cursor-pointer w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-gray-900 dark:text-white hover:border-lime dark:hover:border-lime transition-colors duration-300 focus:outline-none focus:border-lime"
          >
            <span>{currentLanguage.label}</span>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsDropdownOpen(false)}
              />
              <ul className="absolute z-20 mt-2 w-full rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-lg overflow-hidden">
                {SUPPORTED_LANGUAGES.map((language) => (
                  <li key={language.code}>
                    <button
                      type="button"
                      onClick={() => handleSelect(language)}
                      className={`cursor-pointer w-full text-left px-4 py-2.5 text-sm transition-colors duration-150 ${
                        language.code === currentLanguageCode
                          ? 'bg-lime/10 text-green-700 dark:text-lime font-medium'
                          : 'text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-700'
                      }`}
                    >
                      {language.label}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </Card>

      <ChangeLanguageModal
        isOpen={!!pendingLanguage}
        isPending={isPending}
        targetLanguageLabel={pendingLanguage?.label || ''}
        onClose={handleCancel}
        onConfirm={handleConfirm}
      />
    </>
  )
}
