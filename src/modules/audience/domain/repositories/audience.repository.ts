import type { Audience } from "../entities/Audience.entity";
import type { AudienceTemplate } from "../entities/AudienceTemplate.entity";
import type { CreateAudienceParams, CreateAudienceResult } from "../use-cases/create-audience.use-case";
import type { UpdateAudienceParams, UpdateAudienceResult } from "../use-cases/update-audience.use-case";
import type { AddCommunityToAudienceParams } from "../use-cases/add-community-to-audience.use-case";
import type { RemoveCommunityFromAudienceParams } from "../use-cases/remove-community-from-audience.use-case";

export interface IAudienceRepository {
  listUserAudiences(): Promise<Audience[]>
  getAudienceById(id: string): Promise<Audience | null>
  fetchDefaultAudiences(): Promise<AudienceTemplate[]>
  getAudienceTemplateById(id: string): Promise<AudienceTemplate | null>
  createAudience(params: CreateAudienceParams): Promise<CreateAudienceResult>
  updateAudience(params: UpdateAudienceParams): Promise<UpdateAudienceResult>
  addCommunityToAudience(params: AddCommunityToAudienceParams): Promise<void>
  removeCommunityFromAudience(params: RemoveCommunityFromAudienceParams): Promise<void>
}