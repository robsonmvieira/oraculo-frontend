import type { AuthTokens } from '@/modules/auth/domain/entities/auth-tokens.entity'
import type { IAuthRepository } from '@/modules/auth/domain/repositories'
import type { IRefreshTokenUseCase } from '@/modules/auth/domain/use-cases'

export class RefreshTokenUseCase implements IRefreshTokenUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(refreshToken: string): Promise<AuthTokens> {
    return this.authRepository.refreshToken(refreshToken)
  }
}
