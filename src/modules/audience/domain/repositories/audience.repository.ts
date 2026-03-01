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
import type { GetTopicDeepDiveParams, GetTopicDeepDiveResult } from "../use-cases/get-topic-deep-dive.use-case";
import type { TriggerTopicDeepDiveParams, TriggerTopicDeepDiveResult } from "../use-cases/trigger-topic-deep-dive.use-case";
import type { GetTopicBehavioralPatternsParams, GetTopicBehavioralPatternsResult } from "../use-cases/get-topic-behavioral-patterns.use-case";
import type { TriggerTopicBehavioralPatternsParams, TriggerTopicBehavioralPatternsResult } from "../use-cases/trigger-topic-behavioral-patterns.use-case";
import type { GetTopicSentimentParams, GetTopicSentimentResult } from "../use-cases/get-topic-sentiment.use-case";
import type { TriggerTopicSentimentParams, TriggerTopicSentimentResult } from "../use-cases/trigger-topic-sentiment.use-case";
import type { AskTopicParams, AskTopicResult } from "../use-cases/ask-topic.use-case";
import type { StartTopicChatParams, StartTopicChatResult } from "../use-cases/start-topic-chat.use-case";
import type { SendTopicChatMessageParams, SendTopicChatMessageResult } from "../use-cases/send-topic-chat-message.use-case";
import type { ListTopicChatConversationsParams, ListTopicChatConversationsResult } from "../use-cases/list-topic-chat-conversations.use-case";
import type { GetTopicChatMessagesParams, GetTopicChatMessagesResult } from "../use-cases/get-topic-chat-messages.use-case";
import type { ArchiveTopicChatParams, ArchiveTopicChatResult } from "../use-cases/archive-topic-chat.use-case";
import type { GetTopicGrowthHistoryParams, GetTopicGrowthHistoryResult } from "../use-cases/get-topic-growth-history.use-case";
import type { GetAudienceThemesParams, GetAudienceThemesResult } from "../use-cases/get-audience-themes.use-case";
import type { RefreshAudienceThemesParams, RefreshAudienceThemesResult } from "../use-cases/refresh-audience-themes.use-case";
import type { GetAudienceIntentsParams, GetAudienceIntentsResult } from "../use-cases/get-audience-intents.use-case";
import type { RefreshAudienceIntentsParams, RefreshAudienceIntentsResult } from "../use-cases/refresh-audience-intents.use-case";
import type { GetIntentPostsParams, GetIntentPostsResult } from "../use-cases/get-intent-posts.use-case";
import type { GetThemeSummaryParams, GetThemeSummaryResult } from "../use-cases/get-theme-summary.use-case";
import type { RefreshThemeSummaryParams, RefreshThemeSummaryResult } from "../use-cases/refresh-theme-summary.use-case";

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
  getTopicDeepDive(params: GetTopicDeepDiveParams): Promise<GetTopicDeepDiveResult>
  triggerTopicDeepDive(params: TriggerTopicDeepDiveParams): Promise<TriggerTopicDeepDiveResult>
  getTopicBehavioralPatterns(params: GetTopicBehavioralPatternsParams): Promise<GetTopicBehavioralPatternsResult>
  triggerTopicBehavioralPatterns(params: TriggerTopicBehavioralPatternsParams): Promise<TriggerTopicBehavioralPatternsResult>
  getTopicSentiment(params: GetTopicSentimentParams): Promise<GetTopicSentimentResult>
  triggerTopicSentiment(params: TriggerTopicSentimentParams): Promise<TriggerTopicSentimentResult>
  askTopic(params: AskTopicParams): Promise<AskTopicResult>
  startTopicChat(params: StartTopicChatParams): Promise<StartTopicChatResult>
  sendTopicChatMessage(params: SendTopicChatMessageParams): Promise<SendTopicChatMessageResult>
  listTopicChatConversations(params: ListTopicChatConversationsParams): Promise<ListTopicChatConversationsResult>
  getTopicChatMessages(params: GetTopicChatMessagesParams): Promise<GetTopicChatMessagesResult>
  archiveTopicChat(params: ArchiveTopicChatParams): Promise<ArchiveTopicChatResult>
  getTopicGrowthHistory(params: GetTopicGrowthHistoryParams): Promise<GetTopicGrowthHistoryResult>
  getAudienceThemes(params: GetAudienceThemesParams): Promise<GetAudienceThemesResult>
  refreshAudienceThemes(params: RefreshAudienceThemesParams): Promise<RefreshAudienceThemesResult>
  getAudienceIntents(params: GetAudienceIntentsParams): Promise<GetAudienceIntentsResult>
  refreshAudienceIntents(params: RefreshAudienceIntentsParams): Promise<RefreshAudienceIntentsResult>
  getIntentPosts(params: GetIntentPostsParams): Promise<GetIntentPostsResult>
  getThemeSummary(params: GetThemeSummaryParams): Promise<GetThemeSummaryResult>
  refreshThemeSummary(params: RefreshThemeSummaryParams): Promise<RefreshThemeSummaryResult>
}