import { Container } from 'inversify'
import { TYPES } from './types'
import { KyHttpClient, type HttpClient } from '../http'
import { AudienceRepository } from '@/modules/audience/infra/repositories'
import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import { ListGenericAudiencesUseCases, FetchDefaultAudiencesUseCase, GetAudienceTemplateByIdUseCase } from '@/modules/audience/application/use-cases'
import type { IListGenericAudiencesUseCase, IFetchDefaultAudiencesUseCase, IGetAudienceTemplateByIdUseCase } from '@/modules/audience/domain/use-cases'

const container = new Container()

container.bind<HttpClient>(TYPES.HttpClient).toDynamicValue(() => new KyHttpClient()).inSingletonScope()

container.bind<IAudienceRepository>(TYPES.AudienceRepository).toDynamicValue(() => {
  const httpClient = container.get<HttpClient>(TYPES.HttpClient)
  return new AudienceRepository(httpClient)
}).inSingletonScope()

container.bind<IListGenericAudiencesUseCase>(TYPES.ListGenericAudiencesUseCase).toDynamicValue(() => {
  const audienceRepository = container.get<IAudienceRepository>(TYPES.AudienceRepository)
  return new ListGenericAudiencesUseCases(audienceRepository)
}).inSingletonScope()

container.bind<IFetchDefaultAudiencesUseCase>(TYPES.FetchDefaultAudiencesUseCase).toDynamicValue(() => {
  const audienceRepository = container.get<IAudienceRepository>(TYPES.AudienceRepository)
  return new FetchDefaultAudiencesUseCase(audienceRepository)
}).inSingletonScope()

container.bind<IGetAudienceTemplateByIdUseCase>(TYPES.GetAudienceTemplateByIdUseCase).toDynamicValue(() => {
  const audienceRepository = container.get<IAudienceRepository>(TYPES.AudienceRepository)
  return new GetAudienceTemplateByIdUseCase(audienceRepository)
}).inSingletonScope()

export { container }
