import type { Audience } from "../entities/Audience.entity";
import type { AudienceTemplate } from "../entities/AudienceTemplate.entity";

export interface IAudienceRepository {
  listGenericAudiences(): Promise<Audience[]>
  getAudienceById(id: string): Promise<Audience | null>
  fetchDefaultAudiences(): Promise<AudienceTemplate[]>
}