import type { Audience } from "../entities/Audience.entity";
import type { AudienceTemplate } from "../entities/AudienceTemplate.entity";
import type { CreateAudienceParams, CreateAudienceResult } from "../use-cases/create-audience.use-case";
import type { UpdateAudienceParams, UpdateAudienceResult } from "../use-cases/update-audience.use-case";
import type { AddCommunityToAudienceParams } from "../use-cases/add-community-to-audience.use-case";
import type { RemoveCommunityFromAudienceParams } from "../use-cases/remove-community-from-audience.use-case";
import type { GetAudienceSuggestionsParams, GetAudienceSuggestionsResult } from "../use-cases/get-audience-suggestions.use-case";
import type { DeleteAudienceParams, DeleteAudienceResult } from "../use-cases/delete-audience.use-case";
import type { GetAudienceKeywordsParams, GetAudienceKeywordsResult } from "../use-cases/get-audience-keywords.use-case";
import type { MarkCommunityNotRelevantParams } from "../use-cases/mark-community-not-relevant.use-case";
import type { GetAudienceTopicsParams, GetAudienceTopicsResult } from "../use-cases/get-audience-topics.use-case";

export interface IAudienceRepository {
  listUserAudiences(): Promise<Audience[]>
  getAudienceById(id: string): Promise<Audience | null>
  fetchDefaultAudiences(): Promise<AudienceTemplate[]>
  getAudienceTemplateById(id: string): Promise<AudienceTemplate | null>
  createAudience(params: CreateAudienceParams): Promise<CreateAudienceResult>
  updateAudience(params: UpdateAudienceParams): Promise<UpdateAudienceResult>
  addCommunityToAudience(params: AddCommunityToAudienceParams): Promise<void>
  removeCommunityFromAudience(params: RemoveCommunityFromAudienceParams): Promise<void>
  getAudienceSuggestions(params: GetAudienceSuggestionsParams): Promise<GetAudienceSuggestionsResult>
  deleteAudience(params: DeleteAudienceParams): Promise<DeleteAudienceResult>
  getAudienceKeywords(params: GetAudienceKeywordsParams): Promise<GetAudienceKeywordsResult>
  markCommunityNotRelevant(params: MarkCommunityNotRelevantParams): Promise<void>
  getAudienceTopics(params: GetAudienceTopicsParams): Promise<GetAudienceTopicsResult>
}