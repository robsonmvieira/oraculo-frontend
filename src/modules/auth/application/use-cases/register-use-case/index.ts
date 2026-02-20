import type { AuthUser } from '@/modules/auth/domain/entities/auth-user.entity'
import type { IAuthRepository } from '@/modules/auth/domain/repositories'
import type { IRegisterUseCase } from '@/modules/auth/domain/use-cases'

export class RegisterUseCase implements IRegisterUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(email: string, password: string, fullName: string): Promise<AuthUser> {
    return this.authRepository.register(email, password, fullName)
  }
}
