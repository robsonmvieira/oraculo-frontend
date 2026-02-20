import type { AuthTokens } from '../entities/auth-tokens.entity'

export interface IRefreshTokenUseCase {
  execute(refreshToken: string): Promise<AuthTokens>
}
