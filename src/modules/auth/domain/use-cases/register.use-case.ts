import type { AuthUser } from '../entities/auth-user.entity'

export interface IRegisterUseCase {
  execute(email: string, password: string, fullName: string): Promise<AuthUser>
}
