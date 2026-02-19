export const TYPES = {
  HttpClient: Symbol.for('HttpClient'),
  AudienceRepository: Symbol.for('AudienceRepository'),
  ListGenericAudiencesUseCase: Symbol.for('ListGenericAudiencesUseCase'),
  FetchDefaultAudiencesUseCase: Symbol.for('FetchDefaultAudiencesUseCase'),
  GetAudienceTemplateByIdUseCase: Symbol.for('GetAudienceTemplateByIdUseCase'),
} as const
