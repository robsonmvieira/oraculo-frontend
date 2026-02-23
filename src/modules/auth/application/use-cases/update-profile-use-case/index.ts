import type { AuthUser } from '@/modules/auth/domain/entities/auth-user.entity'
import type { IAuthRepository } from '@/modules/auth/domain/repositories'
import type { IUpdateProfileUseCase, UpdateProfileInput } from '@/modules/auth/domain/use-cases'

export class UpdateProfileUseCase implements IUpdateProfileUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(input: UpdateProfileInput): Promise<AuthUser> {
    return this.authRepository.updateProfile(input)
  }
}
