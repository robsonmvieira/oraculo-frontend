import type { AuthUser } from '../entities/auth-user.entity'

export interface IUpdateLanguageUseCase {
  execute(language: string): Promise<AuthUser>
}
