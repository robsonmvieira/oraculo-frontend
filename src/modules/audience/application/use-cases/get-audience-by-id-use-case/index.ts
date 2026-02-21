import type { Audience } from '@/modules/audience/domain/entities/Audience.entity'
import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import type { IGetAudienceByIdUseCase } from '@/modules/audience/domain/use-cases'

export class GetAudienceByIdUseCase implements IGetAudienceByIdUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(id: string): Promise<Audience | null> {
    return this.audienceRepository.getAudienceById(id)
  }
}
