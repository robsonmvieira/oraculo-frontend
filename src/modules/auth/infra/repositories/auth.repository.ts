import type { HttpClient } from '@/modules/shared'
import { AuthTokens } from '../../domain/entities/auth-tokens.entity'
import { AuthUser } from '../../domain/entities/auth-user.entity'
import type { IAuthRepository } from '../../domain/repositories/auth.repository'
import type { UpdateProfileInput } from '../../domain/use-cases/update-profile.use-case'

interface AuthTokensResponse {
  access_token: string
  refresh_token: string
  token_type: string
}

interface AuthUserResponse {
  id: string
  email: string
  full_name: string
  is_active: boolean
  is_superuser: boolean
  bio?: string | null
  locale?: string | null
  phone_number?: string | null
  preferred_language?: string | null
}

export class AuthRepository implements IAuthRepository {
  constructor(private readonly httpClient: HttpClient) {}

  async login(email: string, password: string): Promise<AuthTokens> {
    const response = await this.httpClient.post<AuthTokensResponse>('auth/login', {
      email,
      password,
    })
    return new AuthTokens(response)
  }

  async register(email: string, password: string, fullName: string): Promise<AuthUser> {
    const response = await this.httpClient.post<AuthUserResponse>('auth/register', {
      email,
      password,
      full_name: fullName,
    })
    return new AuthUser(response)
  }

  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    const response = await this.httpClient.post<AuthTokensResponse>('auth/refresh', {
      refresh_token: refreshToken,
    })
    return new AuthTokens(response)
  }

  async getMe(): Promise<AuthUser> {
    const response = await this.httpClient.get<AuthUserResponse>('auth/me')
    return new AuthUser(response)
  }

  async updateProfile(input: UpdateProfileInput): Promise<AuthUser> {
    const response = await this.httpClient.patch<AuthUserResponse>('auth/me/profile', input)
    return new AuthUser(response)
  }

  async updateLanguage(language: string): Promise<AuthUser> {
    const response = await this.httpClient.patch<AuthUserResponse>('auth/me/language', {
      preferred_language: language,
    })
    return new AuthUser(response)
  }
}
