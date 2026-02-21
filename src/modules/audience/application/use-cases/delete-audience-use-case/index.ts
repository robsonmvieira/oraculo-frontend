import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import type { IDeleteAudienceUseCase, DeleteAudienceParams, DeleteAudienceResult } from '@/modules/audience/domain/use-cases'

export class DeleteAudienceUseCase implements IDeleteAudienceUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: DeleteAudienceParams): Promise<DeleteAudienceResult> {
    return this.audienceRepository.deleteAudience(params)
  }
}
