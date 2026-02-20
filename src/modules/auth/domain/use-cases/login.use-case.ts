import type { AuthTokens } from '../entities/auth-tokens.entity'

export interface ILoginUseCase {
  execute(email: string, password: string): Promise<AuthTokens>
}
