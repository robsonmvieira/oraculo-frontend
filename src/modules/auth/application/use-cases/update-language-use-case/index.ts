import type { AuthUser } from '@/modules/auth/domain/entities/auth-user.entity'
import type { IAuthRepository } from '@/modules/auth/domain/repositories'
import type { IUpdateLanguageUseCase } from '@/modules/auth/domain/use-cases'

export class UpdateLanguageUseCase implements IUpdateLanguageUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(language: string): Promise<AuthUser> {
    return this.authRepository.updateLanguage(language)
  }
}
