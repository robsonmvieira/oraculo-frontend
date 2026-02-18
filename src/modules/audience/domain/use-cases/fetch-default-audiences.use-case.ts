import type { AudienceTemplate } from '../entities/AudienceTemplate.entity'

export interface IFetchDefaultAudiencesUseCase {
  execute(): Promise<AudienceTemplate[]>
}
