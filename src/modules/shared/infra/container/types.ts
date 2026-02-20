export const TYPES = {
  HttpClient: Symbol.for('HttpClient'),
  AudienceRepository: Symbol.for('AudienceRepository'),
  ListGenericAudiencesUseCase: Symbol.for('ListGenericAudiencesUseCase'),
  FetchDefaultAudiencesUseCase: Symbol.for('FetchDefaultAudiencesUseCase'),
  GetAudienceTemplateByIdUseCase: Symbol.for('GetAudienceTemplateByIdUseCase'),
  CommunityRepository: Symbol.for('CommunityRepository'),
  BrowseCommunitiesUseCase: Symbol.for('BrowseCommunitiesUseCase'),
  AuthRepository: Symbol.for('AuthRepository'),
  LoginUseCase: Symbol.for('LoginUseCase'),
  RegisterUseCase: Symbol.for('RegisterUseCase'),
  RefreshTokenUseCase: Symbol.for('RefreshTokenUseCase'),
  GetMeUseCase: Symbol.for('GetMeUseCase'),
} as const
