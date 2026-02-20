import type { AuthTokens } from '../entities/auth-tokens.entity'
import type { AuthUser } from '../entities/auth-user.entity'

export interface IAuthRepository {
  login(email: string, password: string): Promise<AuthTokens>
  register(email: string, password: string, fullName: string): Promise<AuthUser>
  refreshToken(refreshToken: string): Promise<AuthTokens>
  getMe(): Promise<AuthUser>
}
