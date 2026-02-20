import type { AuthUser } from '../entities/auth-user.entity'

export interface IGetMeUseCase {
  execute(): Promise<AuthUser>
}
