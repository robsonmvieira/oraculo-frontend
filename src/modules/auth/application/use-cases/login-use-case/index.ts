import type { AuthTokens } from '@/modules/auth/domain/entities/auth-tokens.entity'
import type { IAuthRepository } from '@/modules/auth/domain/repositories'
import type { ILoginUseCase } from '@/modules/auth/domain/use-cases'

export class LoginUseCase implements ILoginUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(email: string, password: string): Promise<AuthTokens> {
    return this.authRepository.login(email, password)
  }
}
