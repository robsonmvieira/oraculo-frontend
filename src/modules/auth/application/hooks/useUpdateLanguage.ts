import { useMutation } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IUpdateLanguageUseCase } from '@/modules/auth/domain/use-cases'
import { useAuthStore } from '../store'
import { toast } from '@/hooks/useToast'

const updateLanguageUseCase = container.get<IUpdateLanguageUseCase>(TYPES.UpdateLanguageUseCase)

export function useUpdateLanguage() {
  const setUser = useAuthStore((state) => state.setUser)

  return useMutation({
    mutationFn: (language: string) => updateLanguageUseCase.execute(language),
    onSuccess: (user) => {
      setUser(user)
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
