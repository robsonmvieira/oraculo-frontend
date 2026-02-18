import type { AudienceTemplate } from "@/modules/audience/domain/entities/AudienceTemplate.entity";
import type { IAudienceRepository } from "@/modules/audience/domain/repositories";
import type { IFetchDefaultAudiencesUseCase } from "@/modules/audience/domain/use-cases";

export class FetchDefaultAudiencesUseCase implements IFetchDefaultAudiencesUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(): Promise<AudienceTemplate[]> {
    return this.audienceRepository.fetchDefaultAudiences()
  }
}
