import { Container } from 'inversify'
import { TYPES } from './types'
import { KyHttpClient, type HttpClient } from '../http'
import { AudienceRepository } from '@/modules/audience/infra/repositories'
import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import { ListUserAudiencesUseCase, FetchDefaultAudiencesUseCase, GetAudienceTemplateByIdUseCase, CreateAudienceUseCase, GetAudienceByIdUseCase } from '@/modules/audience/application/use-cases'
import type { IListUserAudiencesUseCase, IFetchDefaultAudiencesUseCase, IGetAudienceTemplateByIdUseCase, ICreateAudienceUseCase, IGetAudienceByIdUseCase } from '@/modules/audience/domain/use-cases'
import { CommunityRepository } from '@/modules/community/infra/repositories'
import type { ICommunityRepository } from '@/modules/community/domain/repositories'
import { BrowseCommunitiesUseCase } from '@/modules/community/application/use-cases'
import type { IBrowseCommunitiesUseCase } from '@/modules/community/domain/use-cases'
import { AuthRepository } from '@/modules/auth/infra/repositories'
import type { IAuthRepository } from '@/modules/auth/domain/repositories'
import { LoginUseCase, RegisterUseCase, RefreshTokenUseCase, GetMeUseCase } from '@/modules/auth/application/use-cases'
import type { ILoginUseCase, IRegisterUseCase, IRefreshTokenUseCase, IGetMeUseCase } from '@/modules/auth/domain/use-cases'

const container = new Container()

container.bind<HttpClient>(TYPES.HttpClient).toDynamicValue(() => new KyHttpClient()).inSingletonScope()

container.bind<IAudienceRepository>(TYPES.AudienceRepository).toDynamicValue(() => {
  const httpClient = container.get<HttpClient>(TYPES.HttpClient)
  return new AudienceRepository(httpClient)
}).inSingletonScope()

container.bind<IListUserAudiencesUseCase>(TYPES.ListUserAudiencesUseCase).toDynamicValue(() => {
  const audienceRepository = container.get<IAudienceRepository>(TYPES.AudienceRepository)
  return new ListUserAudiencesUseCase(audienceRepository)
}).inSingletonScope()

container.bind<IFetchDefaultAudiencesUseCase>(TYPES.FetchDefaultAudiencesUseCase).toDynamicValue(() => {
  const audienceRepository = container.get<IAudienceRepository>(TYPES.AudienceRepository)
  return new FetchDefaultAudiencesUseCase(audienceRepository)
}).inSingletonScope()

container.bind<IGetAudienceTemplateByIdUseCase>(TYPES.GetAudienceTemplateByIdUseCase).toDynamicValue(() => {
  const audienceRepository = container.get<IAudienceRepository>(TYPES.AudienceRepository)
  return new GetAudienceTemplateByIdUseCase(audienceRepository)
}).inSingletonScope()

container.bind<ICreateAudienceUseCase>(TYPES.CreateAudienceUseCase).toDynamicValue(() => {
  const audienceRepository = container.get<IAudienceRepository>(TYPES.AudienceRepository)
  return new CreateAudienceUseCase(audienceRepository)
}).inSingletonScope()

container.bind<IGetAudienceByIdUseCase>(TYPES.GetAudienceByIdUseCase).toDynamicValue(() => {
  const audienceRepository = container.get<IAudienceRepository>(TYPES.AudienceRepository)
  return new GetAudienceByIdUseCase(audienceRepository)
}).inSingletonScope()

container.bind<ICommunityRepository>(TYPES.CommunityRepository).toDynamicValue(() => {
  const httpClient = container.get<HttpClient>(TYPES.HttpClient)
  return new CommunityRepository(httpClient)
}).inSingletonScope()

container.bind<IBrowseCommunitiesUseCase>(TYPES.BrowseCommunitiesUseCase).toDynamicValue(() => {
  const communityRepository = container.get<ICommunityRepository>(TYPES.CommunityRepository)
  return new BrowseCommunitiesUseCase(communityRepository)
}).inSingletonScope()

container.bind<IAuthRepository>(TYPES.AuthRepository).toDynamicValue(() => {
  const httpClient = container.get<HttpClient>(TYPES.HttpClient)
  return new AuthRepository(httpClient)
}).inSingletonScope()

container.bind<ILoginUseCase>(TYPES.LoginUseCase).toDynamicValue(() => {
  const authRepository = container.get<IAuthRepository>(TYPES.AuthRepository)
  return new LoginUseCase(authRepository)
}).inSingletonScope()

container.bind<IRegisterUseCase>(TYPES.RegisterUseCase).toDynamicValue(() => {
  const authRepository = container.get<IAuthRepository>(TYPES.AuthRepository)
  return new RegisterUseCase(authRepository)
}).inSingletonScope()

container.bind<IRefreshTokenUseCase>(TYPES.RefreshTokenUseCase).toDynamicValue(() => {
  const authRepository = container.get<IAuthRepository>(TYPES.AuthRepository)
  return new RefreshTokenUseCase(authRepository)
}).inSingletonScope()

container.bind<IGetMeUseCase>(TYPES.GetMeUseCase).toDynamicValue(() => {
  const authRepository = container.get<IAuthRepository>(TYPES.AuthRepository)
  return new GetMeUseCase(authRepository)
}).inSingletonScope()

export { container }
