import { Container } from 'inversify'
import { TYPES } from './types'
import { KyHttpClient, type HttpClient } from '../http'
import { AudienceRepository } from '@/modules/audience/infra/repositories'
import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import { ListUserAudiencesUseCase, FetchDefaultAudiencesUseCase, GetAudienceTemplateByIdUseCase, CreateAudienceUseCase, GetAudienceByIdUseCase, UpdateAudienceUseCase, AddCommunityToAudienceUseCase, RemoveCommunityFromAudienceUseCase, GetAudienceSuggestionsUseCase, DeleteAudienceUseCase, GetAudienceKeywordsUseCase, MarkCommunityNotRelevantUseCase, GetAudienceTopicsUseCase, GetTopicDeepDiveUseCase, TriggerTopicDeepDiveUseCase, GetTopicBehavioralPatternsUseCase, TriggerTopicBehavioralPatternsUseCase, GetTopicSentimentUseCase, TriggerTopicSentimentUseCase, AskTopicUseCase, StartTopicChatUseCase, SendTopicChatMessageUseCase, ListTopicChatConversationsUseCase, GetTopicChatMessagesUseCase, ArchiveTopicChatUseCase } from '@/modules/audience/application/use-cases'
import type { IListUserAudiencesUseCase, IFetchDefaultAudiencesUseCase, IGetAudienceTemplateByIdUseCase, ICreateAudienceUseCase, IGetAudienceByIdUseCase, IUpdateAudienceUseCase, IAddCommunityToAudienceUseCase, IRemoveCommunityFromAudienceUseCase, IGetAudienceSuggestionsUseCase, IDeleteAudienceUseCase, IGetAudienceKeywordsUseCase, IMarkCommunityNotRelevantUseCase, IGetAudienceTopicsUseCase, IGetTopicDeepDiveUseCase, ITriggerTopicDeepDiveUseCase, IGetTopicBehavioralPatternsUseCase, ITriggerTopicBehavioralPatternsUseCase, IGetTopicSentimentUseCase, ITriggerTopicSentimentUseCase, IAskTopicUseCase, IStartTopicChatUseCase, ISendTopicChatMessageUseCase, IListTopicChatConversationsUseCase, IGetTopicChatMessagesUseCase, IArchiveTopicChatUseCase } from '@/modules/audience/domain/use-cases'
import { CommunityRepository } from '@/modules/community/infra/repositories'
import type { ICommunityRepository } from '@/modules/community/domain/repositories'
import { BrowseCommunitiesUseCase } from '@/modules/community/application/use-cases'
import type { IBrowseCommunitiesUseCase } from '@/modules/community/domain/use-cases'
import { AuthRepository } from '@/modules/auth/infra/repositories'
import type { IAuthRepository } from '@/modules/auth/domain/repositories'
import { LoginUseCase, RegisterUseCase, RefreshTokenUseCase, GetMeUseCase, UpdateProfileUseCase, UpdateLanguageUseCase } from '@/modules/auth/application/use-cases'
import type { ILoginUseCase, IRegisterUseCase, IRefreshTokenUseCase, IGetMeUseCase, IUpdateProfileUseCase, IUpdateLanguageUseCase } from '@/modules/auth/domain/use-cases'
import { NotificationRepository } from '@/modules/notifications/infra/repositories'
import type { INotificationRepository } from '@/modules/notifications/domain/repositories'
import { ListNotificationsUseCase, GetUnreadCountUseCase, MarkNotificationReadUseCase, MarkAllReadUseCase } from '@/modules/notifications/application/use-cases'
import type { IListNotificationsUseCase, IGetUnreadCountUseCase, IMarkNotificationReadUseCase, IMarkAllReadUseCase } from '@/modules/notifications/domain/use-cases'

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

container.bind<IUpdateAudienceUseCase>(TYPES.UpdateAudienceUseCase).toDynamicValue(() => {
  const audienceRepository = container.get<IAudienceRepository>(TYPES.AudienceRepository)
  return new UpdateAudienceUseCase(audienceRepository)
}).inSingletonScope()

container.bind<IAddCommunityToAudienceUseCase>(TYPES.AddCommunityToAudienceUseCase).toDynamicValue(() => {
  const audienceRepository = container.get<IAudienceRepository>(TYPES.AudienceRepository)
  return new AddCommunityToAudienceUseCase(audienceRepository)
}).inSingletonScope()

container.bind<IRemoveCommunityFromAudienceUseCase>(TYPES.RemoveCommunityFromAudienceUseCase).toDynamicValue(() => {
  const audienceRepository = container.get<IAudienceRepository>(TYPES.AudienceRepository)
  return new RemoveCommunityFromAudienceUseCase(audienceRepository)
}).inSingletonScope()

container.bind<IGetAudienceSuggestionsUseCase>(TYPES.GetAudienceSuggestionsUseCase).toDynamicValue(() => {
  const audienceRepository = container.get<IAudienceRepository>(TYPES.AudienceRepository)
  return new GetAudienceSuggestionsUseCase(audienceRepository)
}).inSingletonScope()

container.bind<IDeleteAudienceUseCase>(TYPES.DeleteAudienceUseCase).toDynamicValue(() => {
  const audienceRepository = container.get<IAudienceRepository>(TYPES.AudienceRepository)
  return new DeleteAudienceUseCase(audienceRepository)
}).inSingletonScope()

container.bind<IGetAudienceKeywordsUseCase>(TYPES.GetAudienceKeywordsUseCase).toDynamicValue(() => {
  const audienceRepository = container.get<IAudienceRepository>(TYPES.AudienceRepository)
  return new GetAudienceKeywordsUseCase(audienceRepository)
}).inSingletonScope()

container.bind<IMarkCommunityNotRelevantUseCase>(TYPES.MarkCommunityNotRelevantUseCase).toDynamicValue(() => {
  const audienceRepository = container.get<IAudienceRepository>(TYPES.AudienceRepository)
  return new MarkCommunityNotRelevantUseCase(audienceRepository)
}).inSingletonScope()

container.bind<IGetAudienceTopicsUseCase>(TYPES.GetAudienceTopicsUseCase).toDynamicValue(() => {
  const audienceRepository = container.get<IAudienceRepository>(TYPES.AudienceRepository)
  return new GetAudienceTopicsUseCase(audienceRepository)
}).inSingletonScope()

container.bind<IGetTopicDeepDiveUseCase>(TYPES.GetTopicDeepDiveUseCase).toDynamicValue(() => {
  const audienceRepository = container.get<IAudienceRepository>(TYPES.AudienceRepository)
  return new GetTopicDeepDiveUseCase(audienceRepository)
}).inSingletonScope()

container.bind<ITriggerTopicDeepDiveUseCase>(TYPES.TriggerTopicDeepDiveUseCase).toDynamicValue(() => {
  const audienceRepository = container.get<IAudienceRepository>(TYPES.AudienceRepository)
  return new TriggerTopicDeepDiveUseCase(audienceRepository)
}).inSingletonScope()

container.bind<IGetTopicBehavioralPatternsUseCase>(TYPES.GetTopicBehavioralPatternsUseCase).toDynamicValue(() => {
  const audienceRepository = container.get<IAudienceRepository>(TYPES.AudienceRepository)
  return new GetTopicBehavioralPatternsUseCase(audienceRepository)
}).inSingletonScope()

container.bind<ITriggerTopicBehavioralPatternsUseCase>(TYPES.TriggerTopicBehavioralPatternsUseCase).toDynamicValue(() => {
  const audienceRepository = container.get<IAudienceRepository>(TYPES.AudienceRepository)
  return new TriggerTopicBehavioralPatternsUseCase(audienceRepository)
}).inSingletonScope()

container.bind<IGetTopicSentimentUseCase>(TYPES.GetTopicSentimentUseCase).toDynamicValue(() => {
  const audienceRepository = container.get<IAudienceRepository>(TYPES.AudienceRepository)
  return new GetTopicSentimentUseCase(audienceRepository)
}).inSingletonScope()

container.bind<ITriggerTopicSentimentUseCase>(TYPES.TriggerTopicSentimentUseCase).toDynamicValue(() => {
  const audienceRepository = container.get<IAudienceRepository>(TYPES.AudienceRepository)
  return new TriggerTopicSentimentUseCase(audienceRepository)
}).inSingletonScope()

container.bind<IAskTopicUseCase>(TYPES.AskTopicUseCase).toDynamicValue(() => {
  const audienceRepository = container.get<IAudienceRepository>(TYPES.AudienceRepository)
  return new AskTopicUseCase(audienceRepository)
}).inSingletonScope()

container.bind<IStartTopicChatUseCase>(TYPES.StartTopicChatUseCase).toDynamicValue(() => {
  const audienceRepository = container.get<IAudienceRepository>(TYPES.AudienceRepository)
  return new StartTopicChatUseCase(audienceRepository)
}).inSingletonScope()

container.bind<ISendTopicChatMessageUseCase>(TYPES.SendTopicChatMessageUseCase).toDynamicValue(() => {
  const audienceRepository = container.get<IAudienceRepository>(TYPES.AudienceRepository)
  return new SendTopicChatMessageUseCase(audienceRepository)
}).inSingletonScope()

container.bind<IListTopicChatConversationsUseCase>(TYPES.ListTopicChatConversationsUseCase).toDynamicValue(() => {
  const audienceRepository = container.get<IAudienceRepository>(TYPES.AudienceRepository)
  return new ListTopicChatConversationsUseCase(audienceRepository)
}).inSingletonScope()

container.bind<IGetTopicChatMessagesUseCase>(TYPES.GetTopicChatMessagesUseCase).toDynamicValue(() => {
  const audienceRepository = container.get<IAudienceRepository>(TYPES.AudienceRepository)
  return new GetTopicChatMessagesUseCase(audienceRepository)
}).inSingletonScope()

container.bind<IArchiveTopicChatUseCase>(TYPES.ArchiveTopicChatUseCase).toDynamicValue(() => {
  const audienceRepository = container.get<IAudienceRepository>(TYPES.AudienceRepository)
  return new ArchiveTopicChatUseCase(audienceRepository)
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

container.bind<IUpdateProfileUseCase>(TYPES.UpdateProfileUseCase).toDynamicValue(() => {
  const authRepository = container.get<IAuthRepository>(TYPES.AuthRepository)
  return new UpdateProfileUseCase(authRepository)
}).inSingletonScope()

container.bind<IUpdateLanguageUseCase>(TYPES.UpdateLanguageUseCase).toDynamicValue(() => {
  const authRepository = container.get<IAuthRepository>(TYPES.AuthRepository)
  return new UpdateLanguageUseCase(authRepository)
}).inSingletonScope()

container.bind<INotificationRepository>(TYPES.NotificationRepository).toDynamicValue(() => {
  const httpClient = container.get<HttpClient>(TYPES.HttpClient)
  return new NotificationRepository(httpClient)
}).inSingletonScope()

container.bind<IListNotificationsUseCase>(TYPES.ListNotificationsUseCase).toDynamicValue(() => {
  const notificationRepository = container.get<INotificationRepository>(TYPES.NotificationRepository)
  return new ListNotificationsUseCase(notificationRepository)
}).inSingletonScope()

container.bind<IGetUnreadCountUseCase>(TYPES.GetUnreadCountUseCase).toDynamicValue(() => {
  const notificationRepository = container.get<INotificationRepository>(TYPES.NotificationRepository)
  return new GetUnreadCountUseCase(notificationRepository)
}).inSingletonScope()

container.bind<IMarkNotificationReadUseCase>(TYPES.MarkNotificationReadUseCase).toDynamicValue(() => {
  const notificationRepository = container.get<INotificationRepository>(TYPES.NotificationRepository)
  return new MarkNotificationReadUseCase(notificationRepository)
}).inSingletonScope()

container.bind<IMarkAllReadUseCase>(TYPES.MarkAllReadUseCase).toDynamicValue(() => {
  const notificationRepository = container.get<INotificationRepository>(TYPES.NotificationRepository)
  return new MarkAllReadUseCase(notificationRepository)
}).inSingletonScope()

export { container }
