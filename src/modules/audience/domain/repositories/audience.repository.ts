import type { Audience } from "../entities/Audience.entity";
import type { AudienceTemplate } from "../entities/AudienceTemplate.entity";
import type { CreateAudienceParams, CreateAudienceResult } from "../use-cases/create-audience.use-case";

export interface IAudienceRepository {
  listGenericAudiences(): Promise<Audience[]>
  getAudienceById(id: string): Promise<Audience | null>
  fetchDefaultAudiences(): Promise<AudienceTemplate[]>
  getAudienceTemplateById(id: string): Promise<AudienceTemplate | null>
  createAudience(params: CreateAudienceParams): Promise<CreateAudienceResult>
}