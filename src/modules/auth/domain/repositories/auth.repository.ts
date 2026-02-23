import type { AuthTokens } from '../entities/auth-tokens.entity'
import type { AuthUser } from '../entities/auth-user.entity'
import type { UpdateProfileInput } from '../use-cases/update-profile.use-case'

export interface IAuthRepository {
  login(email: string, password: string): Promise<AuthTokens>
  register(email: string, password: string, fullName: string): Promise<AuthUser>
  refreshToken(refreshToken: string): Promise<AuthTokens>
  getMe(): Promise<AuthUser>
  updateProfile(input: UpdateProfileInput): Promise<AuthUser>
  updateLanguage(language: string): Promise<AuthUser>
}
