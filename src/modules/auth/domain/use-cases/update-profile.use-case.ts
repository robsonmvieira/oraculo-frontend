import type { AuthUser } from '../entities/auth-user.entity'

export interface UpdateProfileInput {
  bio?: string
  locale?: string
  phone_number?: string
}

export interface IUpdateProfileUseCase {
  execute(input: UpdateProfileInput): Promise<AuthUser>
}
