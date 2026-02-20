import type { AuthUser } from '@/modules/auth/domain/entities/auth-user.entity'
import type { IAuthRepository } from '@/modules/auth/domain/repositories'
import type { IGetMeUseCase } from '@/modules/auth/domain/use-cases'

export class GetMeUseCase implements IGetMeUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(): Promise<AuthUser> {
    return this.authRepository.getMe()
  }
}
