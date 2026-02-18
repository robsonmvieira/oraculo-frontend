import type { Audience } from "@/modules/audience/domain/entities/Audience.entity";
import type { IAudienceRepository } from "@/modules/audience/domain/repositories";
import type { IListGenericAudiencesUseCase } from "@/modules/audience/domain/use-cases";

export class ListGenericAudiencesUseCases implements IListGenericAudiencesUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(): Promise<Audience[]> {
    return this.audienceRepository.listGenericAudiences()
  }
}