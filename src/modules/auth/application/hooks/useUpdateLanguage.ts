import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { container, TYPES } from '@/modules/shared'
import type { IUpdateLanguageUseCase } from '@/modules/auth/domain/use-cases'
import { useAuthStore } from '../store'
import { toast } from '@/hooks/useToast'

const updateLanguageUseCase = container.get<IUpdateLanguageUseCase>(TYPES.UpdateLanguageUseCase)

export function useUpdateLanguage() {
  const setUser = useAuthStore((state) => state.setUser)
  const { i18n } = useTranslation()

  return useMutation({
    mutationFn: (language: string) => updateLanguageUseCase.execute(language),
    onSuccess: (user) => {
      setUser(user)
      const lang = user.getPreferredLanguage()
      if (lang) {
        i18n.changeLanguage(lang)
      }
      toast({
        title: 'Language updated',
        description: 'Your analysis language has been updated successfully.',
        variant: 'success',
      })
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to update language. Please try again.',
        variant: 'destructive',
      })
    },
  })
}
