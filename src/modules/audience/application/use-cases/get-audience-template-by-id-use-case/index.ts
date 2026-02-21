import type { AudienceTemplate } from '@/modules/audience/domain/entities/AudienceTemplate.entity'
import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import type { IGetAudienceTemplateByIdUseCase } from '@/modules/audience/domain/use-cases'

export class GetAudienceTemplateByIdUseCase implements IGetAudienceTemplateByIdUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(id: string): Promise<AudienceTemplate | null> {
    return this.audienceRepository.getAudienceTemplateById(id)
  }
}
