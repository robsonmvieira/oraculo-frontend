import type { Audience } from "@/modules/audience/domain/entities/Audience.entity";
import type { IAudienceRepository } from "@/modules/audience/domain/repositories";
import type { IListUserAudiencesUseCase } from "@/modules/audience/domain/use-cases";

export class ListUserAudiencesUseCase implements IListUserAudiencesUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(): Promise<Audience[]> {
    return this.audienceRepository.listUserAudiences()
  }
}