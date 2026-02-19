export const TYPES = {
  HttpClient: Symbol.for('HttpClient'),
  AudienceRepository: Symbol.for('AudienceRepository'),
  ListGenericAudiencesUseCase: Symbol.for('ListGenericAudiencesUseCase'),
  FetchDefaultAudiencesUseCase: Symbol.for('FetchDefaultAudiencesUseCase'),
  GetAudienceTemplateByIdUseCase: Symbol.for('GetAudienceTemplateByIdUseCase'),
  CommunityRepository: Symbol.for('CommunityRepository'),
  BrowseCommunitiesUseCase: Symbol.for('BrowseCommunitiesUseCase'),
} as const
