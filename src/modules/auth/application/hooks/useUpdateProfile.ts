import { useMutation } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IUpdateProfileUseCase, UpdateProfileInput } from '@/modules/auth/domain/use-cases'
import { useAuthStore } from '../store'
import { toast } from '@/hooks/useToast'

const updateProfileUseCase = container.get<IUpdateProfileUseCase>(TYPES.UpdateProfileUseCase)

export function useUpdateProfile() {
  const setUser = useAuthStore((state) => state.setUser)

  return useMutation({
    mutationFn: (input: UpdateProfileInput) => updateProfileUseCase.execute(input),
    onSuccess: (user) => {
      setUser(user)
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
        variant: 'success',
      })
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive',
      })
    },
  })
}
