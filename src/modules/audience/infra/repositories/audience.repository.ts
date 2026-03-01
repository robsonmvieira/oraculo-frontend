import type { HttpClient } from '@/modules/shared'
import { Audience } from '../../domain/entities/Audience.entity'
import { AudienceTemplate } from '../../domain/entities/AudienceTemplate.entity'
import type { IAudienceRepository } from '../../domain/repositories/audience.repository'
import type { CreateAudienceParams, CreateAudienceResult } from '../../domain/use-cases/create-audience.use-case'
import type { UpdateAudienceParams, UpdateAudienceResult } from '../../domain/use-cases/update-audience.use-case'
import type { AddCommunityToAudienceParams } from '../../domain/use-cases/add-community-to-audience.use-case'
import type { RemoveCommunityFromAudienceParams } from '../../domain/use-cases/remove-community-from-audience.use-case'
import type { GetAudienceSuggestionsParams, GetAudienceSuggestionsResult } from '../../domain/use-cases/get-audience-suggestions.use-case'
import type { DeleteAudienceParams, DeleteAudienceResult } from '../../domain/use-cases/delete-audience.use-case'
import type { GetAudienceKeywordsParams, GetAudienceKeywordsResult } from '../../domain/use-cases/get-audience-keywords.use-case'
import type { MarkCommunityNotRelevantParams } from '../../domain/use-cases/mark-community-not-relevant.use-case'
import type { GetAudienceTopicsParams, GetAudienceTopicsResult } from '../../domain/use-cases/get-audience-topics.use-case'
import type { GetTopicDeepDiveParams, GetTopicDeepDiveResult, TopicDeepDiveStatus } from '../../domain/use-cases/get-topic-deep-dive.use-case'
import type { TriggerTopicDeepDiveParams, TriggerTopicDeepDiveResult } from '../../domain/use-cases/trigger-topic-deep-dive.use-case'
import type { GetTopicBehavioralPatternsParams, GetTopicBehavioralPatternsResult, TopicBehavioralPatternsStatus } from '../../domain/use-cases/get-topic-behavioral-patterns.use-case'
import type { TriggerTopicBehavioralPatternsParams, TriggerTopicBehavioralPatternsResult } from '../../domain/use-cases/trigger-topic-behavioral-patterns.use-case'
import type { GetTopicSentimentParams, GetTopicSentimentResult, TopicSentimentStatus } from '../../domain/use-cases/get-topic-sentiment.use-case'
import type { TriggerTopicSentimentParams, TriggerTopicSentimentResult } from '../../domain/use-cases/trigger-topic-sentiment.use-case'
import type { AskTopicParams, AskTopicResult } from '../../domain/use-cases/ask-topic.use-case'
import type { StartTopicChatParams, StartTopicChatResult } from '../../domain/use-cases/start-topic-chat.use-case'
import type { SendTopicChatMessageParams, SendTopicChatMessageResult } from '../../domain/use-cases/send-topic-chat-message.use-case'
import type { ListTopicChatConversationsParams, ListTopicChatConversationsResult } from '../../domain/use-cases/list-topic-chat-conversations.use-case'
import type { GetTopicChatMessagesParams, GetTopicChatMessagesResult } from '../../domain/use-cases/get-topic-chat-messages.use-case'
import type { ArchiveTopicChatParams, ArchiveTopicChatResult } from '../../domain/use-cases/archive-topic-chat.use-case'
import type { GetTopicGrowthHistoryParams, GetTopicGrowthHistoryResult } from '../../domain/use-cases/get-topic-growth-history.use-case'
import type { GetAudienceThemesParams, GetAudienceThemesResult, ThemeAnalysisStatus } from '../../domain/use-cases/get-audience-themes.use-case'
import type { RefreshAudienceThemesParams, RefreshAudienceThemesResult } from '../../domain/use-cases/refresh-audience-themes.use-case'
import type { GetAudienceIntentsParams, GetAudienceIntentsResult, IntentAnalysisStatus } from '../../domain/use-cases/get-audience-intents.use-case'
import type { RefreshAudienceIntentsParams, RefreshAudienceIntentsResult } from '../../domain/use-cases/refresh-audience-intents.use-case'
import type { GetIntentPostsParams, GetIntentPostsResult } from '../../domain/use-cases/get-intent-posts.use-case'
import { Keyword } from '../../domain/entities/Keyword.entity'
import { Topic } from '../../domain/entities/Topic.entity'
import { TopicDeepDive } from '../../domain/entities/TopicDeepDive.entity'
import { TopicBehavioralPattern } from '../../domain/entities/TopicBehavioralPattern.entity'
import { TopicSentiment } from '../../domain/entities/TopicSentiment.entity'
import { TopicAskResponse } from '../../domain/entities/TopicAskResponse.entity'
import { TopicConversation } from '../../domain/entities/TopicConversation.entity'
import { TopicConversationMessage } from '../../domain/entities/TopicConversationMessage.entity'
import { TopicGrowthHistory } from '../../domain/entities/TopicGrowthHistory.entity'
import { Theme } from '../../domain/entities/Theme.entity'
import { IntentCategory } from '../../domain/entities/IntentCategory.entity'
import { IntentPost } from '../../domain/entities/IntentPost.entity'

interface AudienceTemplateResponse {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  category: string
  display_order: number
  communities: string[]
  communities_count: number
  total_subscribers: number
  subscribers_loaded: number
}

interface AudienceTemplatesApiResponse {
  templates: AudienceTemplateResponse[]
}

interface UserAudienceListResponse {
  audience_id: string
  name: string
  description: string
  total_subs: number
  total_members: number
  growth_week: number | null
  growth_month?: number | null
  communities: Array<{
    subreddit_name: string
    icon_url: string
    subscribers: number
  }>
}


interface AudienceSuggestionApiItem {
  subreddit_name: string
  title: string
  description: string
  subscribers: number
  size_tag: string | null
  activity_tag: string | null
  growth_week: number | null
  relevance_score: number
  relevance_reason: string
}

interface AudienceKeywordApiItem {
  id: string
  keyword: string
  category: string
  relevance_score: number
  rank: number
}

interface AudienceKeywordsApiResponse {
  status: string
  analysis_id: string
  total_keywords: number
  completed_at: string
  keywords: AudienceKeywordApiItem[]
}

interface TopicGrowthSnapshotApiItem {
  mention_frequency: number
  post_count: number
  growth_percentage: number
  growth_source: 'calculated' | 'estimated'
  snapshot_date: string
}

interface TopicGrowthHistoryApiResponse {
  topic_id: string
  topic_name: string
  current: TopicGrowthSnapshotApiItem
  history: TopicGrowthSnapshotApiItem[]
  trend: 'up' | 'stable' | 'down' | null
  total_snapshots: number
}

interface AudienceTopicCommunityApiItem {
  name: string
  post_count: number
}

interface AudienceTopicApiItem {
  id: string
  name: string
  description: string
  growth_percentage: number
  mention_frequency: number
  mention_period: string
  post_count: number
  communities: AudienceTopicCommunityApiItem[]
  rank: number
  growth_source: 'calculated' | 'estimated' | null
  growth_trend: 'up' | 'stable' | 'down' | null
}

interface AudienceTopicsApiResponse {
  status: string
  analysis_id: string
  total_topics: number
  completed_at: string
  topics: AudienceTopicApiItem[]
}

interface AudienceSuggestionsApiResponse {
  audience_id: string
  audience_name: string
  audience_theme: string
  suggestions: AudienceSuggestionApiItem[]
  total_found: number
  filtered_by_feedback: number
}

interface TopicDeepDiveApiResponse {
  status: string
  analysis_id?: string
  topic_id?: string
  topic_name?: string
  completed_at?: string
  summary?: string
  subtopics?: Array<{ name: string; description: string; post_count: number }>
  common_questions?: Array<{ question: string; frequency: string; example_context: string }>
  mentioned_products?: Array<{ name: string; category: string; sentiment: string; mention_count: number; context: string }>
  representative_posts?: Array<{ title: string; subreddit: string; score: number; permalink: string; excerpt: string }>
  actionable_insights?: Array<{ insight: string; type: string; confidence: string }>
  message?: string
}

interface TriggerDeepDiveApiResponse {
  status: string
  analysis_id: string
  message?: string
}

interface TopicBehavioralPatternsApiResponse {
  status: string
  analysis_id?: string
  topic_id?: string
  topic_name?: string
  completed_at?: string
  summary?: string
  tool_patterns?: Array<{
    tool: string
    use_case: string
    satisfaction: string
    pain_points: string[]
    evidence: string
    communities: string[]
  }>
  workaround_patterns?: Array<{
    problem: string
    workaround: string
    frequency: string
    evidence: string
    communities: string[]
  }>
  friction_patterns?: Array<{
    friction: string
    category: string
    severity: string
    affected_tools: string[]
    evidence: string
  }>
  shift_patterns?: Array<{
    from: string
    to: string
    reason: string
    stage: string
    evidence: string
  }>
  demand_signals?: Array<{
    signal: string
    signal_type: string
    frequency: string
    communities: string[]
    evidence: string
  }>
  message?: string
}

interface TriggerBehavioralPatternsApiResponse {
  status: string
  analysis_id: string
  message?: string
}

interface TopicSentimentApiResponse {
  status: string
  analysis_id?: string
  topic_id?: string
  topic_name?: string
  completed_at?: string
  overall_sentiment?: {
    score: string
    positive_ratio: number
    negative_ratio: number
    neutral_ratio: number
  }
  emotional_map?: Array<{
    emotion: string
    intensity: string
    percentage: number
    example: string
  }>
  sentiment_by_community?: Array<{
    community: string
    positive: number
    negative: number
    neutral: number
    dominant_emotion: string
  }>
  sentiment_by_subtopic?: Array<{
    subtopic: string
    sentiment: string
    score: number
    key_driver: string
  }>
  sentiment_drivers?: {
    positive: Array<{
      driver: string
      frequency: string
      mentions: number
      example_quote: string
    }>
    negative: Array<{
      driver: string
      frequency: string
      mentions: number
      example_quote: string
    }>
  }
  tension_points?: Array<{
    topic: string
    for_ratio: number
    against_ratio: number
    intensity: string
    summary: string
  }>
  pain_points?: Array<{
    pain: string
    severity: string
    frequency: string
    communities: string[]
    verbatim: string
  }>
  sentiment_opportunities?: Array<{
    opportunity: string
    based_on: string
    confidence: string
    target_audience: string
  }>
  message?: string
}

interface TriggerSentimentApiResponse {
  status: string
  analysis_id: string
  message?: string
}

interface TopicAskApiResponse {
  answer: string
  context_quality: string
  sources_used: string[]
  cached: boolean
  topic_name: string
  suggestion: string | null
}

interface StartTopicChatApiResponse {
  conversation_id: string
  topic_name: string
  context_quality: string
  suggestion: string | null
}

interface SendTopicChatMessageApiResponse {
  answer: string
  context_quality: string
  message_id: string
  conversation_id: string
  suggestion: string | null
}

interface TopicConversationApiItem {
  conversation_id: string
  title: string
  context_quality: string
  is_active: boolean
  created_at: string
  updated_at: string
}

interface ListTopicChatConversationsApiResponse {
  conversations: TopicConversationApiItem[]
}

interface TopicConversationMessageApiItem {
  message_id: string
  role: string
  content: string
  context_quality: string | null
  created_at: string
}

interface GetTopicChatMessagesApiResponse {
  conversation_id: string
  title: string
  context_quality: string
  is_active: boolean
  messages: TopicConversationMessageApiItem[]
}

interface ArchiveTopicChatApiResponse {
  status: string
  conversation_id: string
}

interface ThemeAnalysisApiResponse {
  status: string
  analysis_id?: string
  completed_at?: string
  error_message?: string
  themes?: Array<{
    name: string
    summary: string
    post_count: number
    avg_score: number
    avg_comments: number
    engagement_score: number
    rank: number
    top_subreddits: Array<{ name: string; post_count: number; avg_score: number }>
    top_keywords: Array<{ keyword: string; frequency: number }>
    representative_posts: Array<{ title: string; subreddit: string; score: number; permalink: string }>
  }>
}

interface RefreshThemeApiResponse {
  status: string
  analysis_id: string
  message?: string
}

interface IntentAnalysisApiResponse {
  status: string
  analysis_id?: string
  audience_id?: string
  time_window?: string
  completed_at?: string
  total_posts_classified?: number
  error_message?: string
  intents?: Array<{
    category: string
    label: string
    icon: string
    post_count: number
    percentage: number
    description: string
    subcategories: Record<string, number>
    topic_keywords: Record<string, number>
    top_subreddits: Array<{ name: string; count: number }>
    sample_posts: Array<{ title: string; subreddit: string; score: number }>
    rank: number
  }>
  message?: string
}

interface RefreshIntentApiResponse {
  status: string
  analysis_id: string
  message?: string
}

interface IntentPostApiItem {
  post_reddit_id: string
  post_title: string
  post_subreddit: string
  primary_intent: string
  secondary_intent: string | null
  confidence: string
}

interface IntentPostsApiResponse {
  posts: IntentPostApiItem[]
  total: number
  limit: number
  offset: number
}

export class AudienceRepository implements IAudienceRepository {
  constructor(private readonly httpClient: HttpClient) {}

  async fetchDefaultAudiences(): Promise<AudienceTemplate[]> {
    const response = await this.httpClient.get<AudienceTemplatesApiResponse>('audience-templates')
    return response.templates.map((data) => new AudienceTemplate(data))
  }

  async listUserAudiences(): Promise<Audience[]> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await this.httpClient.get<any>('audiences')
    const items: UserAudienceListResponse[] = Array.isArray(response) ? response : response.audiences ?? []
    return items.map((data) => new Audience({
      id: data.audience_id,
      name: data.name,
      description: data.description,
      total_subs: data.total_subs,
      total_members: data.total_members,
      growth_week: data.growth_week,
      growth_month: data.growth_month,
      communities: data.communities.map((c) => ({
        id: c.subreddit_name,
        display: {
          display_name: c.subreddit_name,
          subscribers: c.subscribers,
          community_icon: c.icon_url,
          public_description: '',
          primary_color: '',
          over18: false,
        },
        related_terms: [],
        related_communities: [],
        related_communities_status: 'ready' as const,
        growth_week: null,
        growth_month: null,
      })),
    }))
  }

  async getAudienceById(id: string): Promise<Audience | null> {
    try {
      const response = await this.httpClient.get<UserAudienceListResponse>(`audiences/${id}`)
      return new Audience({
        id: response.audience_id,
        name: response.name,
        description: response.description,
        total_subs: response.total_subs,
        total_members: response.total_members,
        growth_week: response.growth_week,
        growth_month: response.growth_month,
        communities: response.communities.map((c) => ({
          id: c.subreddit_name,
          display: {
            display_name: c.subreddit_name,
            subscribers: c.subscribers,
            community_icon: c.icon_url,
            public_description: '',
            primary_color: '',
            over18: false,
          },
          related_terms: [],
          related_communities: [],
          related_communities_status: 'ready' as const,
          growth_week: null,
          growth_month: null,
        })),
      })
    } catch {
      return null
    }
  }

  async getAudienceTemplateById(id: string): Promise<AudienceTemplate | null> {
    try {
      const response = await this.httpClient.get<AudienceTemplateResponse>(`audience-templates/${id}`)
      return new AudienceTemplate(response)
    } catch {
      return null
    }
  }

  async createAudience(params: CreateAudienceParams): Promise<CreateAudienceResult> {
    return this.httpClient.post<CreateAudienceResult>('audiences', params)
  }

  async updateAudience(params: UpdateAudienceParams): Promise<UpdateAudienceResult> {
    const { audienceId, ...body } = params
    return this.httpClient.put<UpdateAudienceResult>(`audiences/${audienceId}`, body)
  }

  async addCommunityToAudience(params: AddCommunityToAudienceParams): Promise<void> {
    await this.httpClient.post(`audiences/${params.audienceId}/communities`, {
      subreddit_name: params.subreddit_name,
    })
  }

  async removeCommunityFromAudience(params: RemoveCommunityFromAudienceParams): Promise<void> {
    await this.httpClient.delete(`audiences/${params.audienceId}/communities/${params.subreddit_name}`)
  }

  async deleteAudience(params: DeleteAudienceParams): Promise<DeleteAudienceResult> {
    return this.httpClient.delete<DeleteAudienceResult>(`audiences/${params.audienceId}`)
  }

  async getAudienceKeywords(params: GetAudienceKeywordsParams): Promise<GetAudienceKeywordsResult> {
    const response = await this.httpClient.get<AudienceKeywordsApiResponse>(
      `audiences/${params.audienceId}/keywords`
    )
    return {
      status: response.status,
      analysisId: response.analysis_id,
      totalKeywords: response.total_keywords,
      completedAt: response.completed_at,
      keywords: response.keywords.map((k) => new Keyword({
        id: k.id,
        keyword: k.keyword,
        category: k.category,
        relevanceScore: k.relevance_score,
        rank: k.rank,
      })),
    }
  }

  async getAudienceSuggestions(params: GetAudienceSuggestionsParams): Promise<GetAudienceSuggestionsResult> {
    const response = await this.httpClient.get<AudienceSuggestionsApiResponse>(
      `audiences/${params.audienceId}/suggestions`
    )
    return {
      audienceId: response.audience_id,
      audienceName: response.audience_name,
      audienceTheme: response.audience_theme,
      suggestions: response.suggestions.map((s) => ({
        subredditName: s.subreddit_name,
        title: s.title,
        description: s.description,
        subscribers: s.subscribers,
        sizeTag: s.size_tag,
        activityTag: s.activity_tag,
        growthWeek: s.growth_week,
        relevanceScore: s.relevance_score,
        relevanceReason: s.relevance_reason,
      })),
      totalFound: response.total_found,
      filteredByFeedback: response.filtered_by_feedback,
    }
  }

  async markCommunityNotRelevant(params: MarkCommunityNotRelevantParams): Promise<void> {
    await this.httpClient.post('feedback/community', {
      subreddit_name: params.subredditName,
      feedback: 'not_relevant',
      context_type: 'audience',
      context_id: params.audienceId,
    })
  }

  async getAudienceTopics(params: GetAudienceTopicsParams): Promise<GetAudienceTopicsResult> {
    const limit = params.limit ?? 200
    const offset = params.offset ?? 0
    const response = await this.httpClient.get<AudienceTopicsApiResponse>(
      `audiences/${params.audienceId}/topics?limit=${limit}&offset=${offset}`
    )
    const topics = response.topics.map((t) => new Topic({
      id: t.id,
      name: t.name,
      description: t.description,
      growthPercentage: t.growth_percentage,
      mentionFrequency: t.mention_frequency,
      mentionPeriod: t.mention_period,
      postCount: t.post_count,
      communities: t.communities.map((c) => ({
        name: c.name,
        postCount: c.post_count,
      })),
      rank: t.rank,
      growthSource: t.growth_source ?? null,
      growthTrend: t.growth_trend ?? null,
    }))
    return {
      status: response.status,
      analysisId: response.analysis_id,
      totalTopics: response.total_topics,
      completedAt: response.completed_at,
      topics,
      limit,
      offset,
      hasMore: offset + topics.length < response.total_topics,
    }
  }

  async getTopicDeepDive(params: GetTopicDeepDiveParams): Promise<GetTopicDeepDiveResult> {
    const response = await this.httpClient.get<TopicDeepDiveApiResponse>(
      `audiences/${params.audienceId}/topics/${params.topicId}/deep-dive`
    )

    const status = response.status as TopicDeepDiveStatus

    if (status !== 'ready' || !response.summary) {
      return { status, data: null }
    }

    return {
      status,
      data: new TopicDeepDive({
        analysisId: response.analysis_id ?? '',
        topicId: response.topic_id ?? params.topicId,
        topicName: response.topic_name ?? '',
        completedAt: response.completed_at ?? '',
        summary: response.summary,
        subtopics: (response.subtopics ?? []).map((s) => ({
          name: s.name,
          description: s.description,
          postCount: s.post_count,
        })),
        commonQuestions: (response.common_questions ?? []).map((q) => ({
          question: q.question,
          frequency: q.frequency as 'high' | 'medium' | 'low',
          exampleContext: q.example_context,
        })),
        mentionedProducts: (response.mentioned_products ?? []).map((p) => ({
          name: p.name,
          category: p.category,
          sentiment: p.sentiment,
          mentionCount: p.mention_count,
          context: p.context,
        })),
        representativePosts: (response.representative_posts ?? []).map((p) => ({
          title: p.title,
          subreddit: p.subreddit,
          score: p.score,
          permalink: p.permalink,
          excerpt: p.excerpt,
        })),
        actionableInsights: (response.actionable_insights ?? []).map((i) => ({
          insight: i.insight,
          type: i.type as 'opportunity' | 'gap' | 'risk' | 'trend',
          confidence: i.confidence as 'high' | 'medium' | 'low',
        })),
      }),
    }
  }

  async triggerTopicDeepDive(params: TriggerTopicDeepDiveParams): Promise<TriggerTopicDeepDiveResult> {
    const response = await this.httpClient.post<TriggerDeepDiveApiResponse>(
      `audiences/${params.audienceId}/topics/${params.topicId}/deep-dive/refresh`
    )
    return {
      status: response.status,
      analysisId: response.analysis_id,
    }
  }

  async getTopicBehavioralPatterns(params: GetTopicBehavioralPatternsParams): Promise<GetTopicBehavioralPatternsResult> {
    const response = await this.httpClient.get<TopicBehavioralPatternsApiResponse>(
      `audiences/${params.audienceId}/topics/${params.topicId}/behavioral-patterns`
    )

    const status = response.status as TopicBehavioralPatternsStatus

    if (status !== 'ready' || !response.summary) {
      return { status, data: null }
    }

    return {
      status,
      data: new TopicBehavioralPattern({
        analysisId: response.analysis_id ?? '',
        topicId: response.topic_id ?? params.topicId,
        topicName: response.topic_name ?? '',
        completedAt: response.completed_at ?? '',
        summary: response.summary,
        toolPatterns: (response.tool_patterns ?? []).map((t) => ({
          tool: t.tool,
          useCase: t.use_case,
          satisfaction: t.satisfaction,
          painPoints: t.pain_points,
          evidence: t.evidence,
          communities: t.communities,
        })),
        workaroundPatterns: (response.workaround_patterns ?? []).map((w) => ({
          problem: w.problem,
          workaround: w.workaround,
          frequency: w.frequency,
          evidence: w.evidence,
          communities: w.communities,
        })),
        frictionPatterns: (response.friction_patterns ?? []).map((f) => ({
          friction: f.friction,
          category: f.category,
          severity: f.severity,
          affectedTools: f.affected_tools,
          evidence: f.evidence,
        })),
        shiftPatterns: (response.shift_patterns ?? []).map((s) => ({
          from: s.from,
          to: s.to,
          reason: s.reason,
          stage: s.stage,
          evidence: s.evidence,
        })),
        demandSignals: (response.demand_signals ?? []).map((d) => ({
          signal: d.signal,
          signalType: d.signal_type,
          frequency: d.frequency,
          communities: d.communities,
          evidence: d.evidence,
        })),
      }),
    }
  }

  async triggerTopicBehavioralPatterns(params: TriggerTopicBehavioralPatternsParams): Promise<TriggerTopicBehavioralPatternsResult> {
    const response = await this.httpClient.post<TriggerBehavioralPatternsApiResponse>(
      `audiences/${params.audienceId}/topics/${params.topicId}/behavioral-patterns/refresh`
    )
    return {
      status: response.status,
      analysisId: response.analysis_id,
    }
  }

  async getTopicSentiment(params: GetTopicSentimentParams): Promise<GetTopicSentimentResult> {
    const response = await this.httpClient.get<TopicSentimentApiResponse>(
      `audiences/${params.audienceId}/topics/${params.topicId}/sentiment`
    )

    const status = response.status as TopicSentimentStatus

    if (status !== 'ready' || !response.overall_sentiment) {
      return { status, data: null }
    }

    return {
      status,
      data: new TopicSentiment({
        analysisId: response.analysis_id ?? '',
        topicId: response.topic_id ?? params.topicId,
        topicName: response.topic_name ?? '',
        completedAt: response.completed_at ?? '',
        overallSentiment: {
          score: response.overall_sentiment.score,
          positiveRatio: response.overall_sentiment.positive_ratio,
          negativeRatio: response.overall_sentiment.negative_ratio,
          neutralRatio: response.overall_sentiment.neutral_ratio,
        },
        emotionalMap: (response.emotional_map ?? []).map((e) => ({
          emotion: e.emotion,
          intensity: e.intensity,
          percentage: e.percentage,
          example: e.example,
        })),
        sentimentByCommunity: (response.sentiment_by_community ?? []).map((c) => ({
          community: c.community,
          positive: c.positive,
          negative: c.negative,
          neutral: c.neutral,
          dominantEmotion: c.dominant_emotion,
        })),
        sentimentBySubtopic: (response.sentiment_by_subtopic ?? []).map((s) => ({
          subtopic: s.subtopic,
          sentiment: s.sentiment,
          score: s.score,
          keyDriver: s.key_driver,
        })),
        sentimentDrivers: {
          positive: (response.sentiment_drivers?.positive ?? []).map((d) => ({
            driver: d.driver,
            frequency: d.frequency,
            mentions: d.mentions,
            exampleQuote: d.example_quote,
          })),
          negative: (response.sentiment_drivers?.negative ?? []).map((d) => ({
            driver: d.driver,
            frequency: d.frequency,
            mentions: d.mentions,
            exampleQuote: d.example_quote,
          })),
        },
        tensionPoints: (response.tension_points ?? []).map((t) => ({
          topic: t.topic,
          forRatio: t.for_ratio,
          againstRatio: t.against_ratio,
          intensity: t.intensity,
          summary: t.summary,
        })),
        painPoints: (response.pain_points ?? []).map((p) => ({
          pain: p.pain,
          severity: p.severity,
          frequency: p.frequency,
          communities: p.communities,
          verbatim: p.verbatim,
        })),
        sentimentOpportunities: (response.sentiment_opportunities ?? []).map((o) => ({
          opportunity: o.opportunity,
          basedOn: o.based_on,
          confidence: o.confidence,
          targetAudience: o.target_audience,
        })),
      }),
    }
  }

  async triggerTopicSentiment(params: TriggerTopicSentimentParams): Promise<TriggerTopicSentimentResult> {
    const response = await this.httpClient.post<TriggerSentimentApiResponse>(
      `audiences/${params.audienceId}/topics/${params.topicId}/sentiment/refresh`
    )
    return {
      status: response.status,
      analysisId: response.analysis_id,
    }
  }

  async askTopic(params: AskTopicParams): Promise<AskTopicResult> {
    const response = await this.httpClient.post<TopicAskApiResponse>(
      `audiences/${params.audienceId}/topics/${params.topicId}/ask`,
      { question: params.question }
    )

    return new TopicAskResponse({
      answer: response.answer,
      contextQuality: response.context_quality as 'rich' | 'limited',
      sourcesUsed: response.sources_used,
      cached: response.cached,
      topicName: response.topic_name,
      suggestion: response.suggestion,
    })
  }

  async startTopicChat(params: StartTopicChatParams): Promise<StartTopicChatResult> {
    const response = await this.httpClient.post<StartTopicChatApiResponse>(
      `audiences/${params.audienceId}/topics/${params.topicId}/chat`
    )
    return {
      conversationId: response.conversation_id,
      topicName: response.topic_name,
      contextQuality: response.context_quality as 'rich' | 'limited',
      suggestion: response.suggestion,
    }
  }

  async sendTopicChatMessage(params: SendTopicChatMessageParams): Promise<SendTopicChatMessageResult> {
    const response = await this.httpClient.post<SendTopicChatMessageApiResponse>(
      `audiences/${params.audienceId}/topics/${params.topicId}/chat/${params.conversationId}/messages`,
      { question: params.question }
    )
    return {
      answer: response.answer,
      contextQuality: response.context_quality as 'rich' | 'limited',
      messageId: response.message_id,
      conversationId: response.conversation_id,
      suggestion: response.suggestion,
    }
  }

  async listTopicChatConversations(params: ListTopicChatConversationsParams): Promise<ListTopicChatConversationsResult> {
    const response = await this.httpClient.get<ListTopicChatConversationsApiResponse>(
      `audiences/${params.audienceId}/topics/${params.topicId}/chat`
    )
    return {
      conversations: response.conversations.map((c) => new TopicConversation({
        conversationId: c.conversation_id,
        title: c.title,
        contextQuality: c.context_quality as 'rich' | 'limited',
        isActive: c.is_active,
        createdAt: c.created_at,
        updatedAt: c.updated_at,
      })),
    }
  }

  async getTopicChatMessages(params: GetTopicChatMessagesParams): Promise<GetTopicChatMessagesResult> {
    const response = await this.httpClient.get<GetTopicChatMessagesApiResponse>(
      `audiences/${params.audienceId}/topics/${params.topicId}/chat/${params.conversationId}/messages`
    )
    return {
      conversationId: response.conversation_id,
      title: response.title,
      contextQuality: response.context_quality as 'rich' | 'limited',
      isActive: response.is_active,
      messages: response.messages.map((m) => new TopicConversationMessage({
        messageId: m.message_id,
        role: m.role as 'user' | 'assistant',
        content: m.content,
        contextQuality: m.context_quality as 'rich' | 'limited' | null,
        createdAt: m.created_at,
      })),
    }
  }

  async archiveTopicChat(params: ArchiveTopicChatParams): Promise<ArchiveTopicChatResult> {
    const response = await this.httpClient.delete<ArchiveTopicChatApiResponse>(
      `audiences/${params.audienceId}/topics/${params.topicId}/chat/${params.conversationId}`
    )
    return {
      status: response.status,
      conversationId: response.conversation_id,
    }
  }

  async getTopicGrowthHistory(params: GetTopicGrowthHistoryParams): Promise<GetTopicGrowthHistoryResult> {
    const response = await this.httpClient.get<TopicGrowthHistoryApiResponse>(
      `audiences/${params.audienceId}/topics/${params.topicId}/growth-history`
    )

    if (!response.current) {
      return { data: null }
    }

    const mapSnapshot = (s: TopicGrowthSnapshotApiItem) => ({
      mentionFrequency: s.mention_frequency,
      postCount: s.post_count,
      growthPercentage: s.growth_percentage,
      growthSource: s.growth_source,
      snapshotDate: s.snapshot_date,
    })

    return {
      data: new TopicGrowthHistory({
        topicId: response.topic_id,
        topicName: response.topic_name,
        current: mapSnapshot(response.current),
        history: (response.history ?? []).map(mapSnapshot),
        trend: response.trend,
        totalSnapshots: response.total_snapshots,
      }),
    }
  }

  async getAudienceThemes(params: GetAudienceThemesParams): Promise<GetAudienceThemesResult> {
    const response = await this.httpClient.get<ThemeAnalysisApiResponse>(
      `audiences/${params.audienceId}/themes?window=${params.window}`
    )

    const status = response.status as ThemeAnalysisStatus

    if (status !== 'ready' || !response.themes) {
      return { status, data: null }
    }

    return {
      status,
      data: response.themes.map((t) => new Theme({
        name: t.name,
        summary: t.summary,
        postCount: t.post_count,
        avgScore: t.avg_score,
        avgComments: t.avg_comments,
        engagementScore: t.engagement_score,
        rank: t.rank,
        topSubreddits: (t.top_subreddits ?? []).map((s) => ({
          name: s.name,
          postCount: s.post_count,
          avgScore: s.avg_score,
        })),
        topKeywords: (t.top_keywords ?? []).map((k) => ({
          keyword: k.keyword,
          frequency: k.frequency,
        })),
        representativePosts: (t.representative_posts ?? []).map((p) => ({
          title: p.title,
          subreddit: p.subreddit,
          score: p.score,
          permalink: p.permalink,
        })),
      })),
    }
  }

  async refreshAudienceThemes(params: RefreshAudienceThemesParams): Promise<RefreshAudienceThemesResult> {
    const response = await this.httpClient.post<RefreshThemeApiResponse>(
      `audiences/${params.audienceId}/themes/refresh?window=${params.window}`
    )
    return {
      status: response.status,
      analysisId: response.analysis_id,
    }
  }

  async getAudienceIntents(params: GetAudienceIntentsParams): Promise<GetAudienceIntentsResult> {
    const response = await this.httpClient.get<IntentAnalysisApiResponse>(
      `audiences/${params.audienceId}/themes/intents?window=${params.window}`
    )

    const status = response.status as IntentAnalysisStatus

    if (status !== 'ready' || !response.intents) {
      return { status, analysisId: response.analysis_id ?? null, totalPostsClassified: null, data: null }
    }

    return {
      status,
      analysisId: response.analysis_id ?? null,
      totalPostsClassified: response.total_posts_classified ?? null,
      data: response.intents.map((i) => new IntentCategory({
        category: i.category,
        label: i.label,
        icon: i.icon,
        postCount: i.post_count,
        percentage: i.percentage,
        description: i.description,
        subcategories: i.subcategories ?? {},
        topicKeywords: i.topic_keywords ?? {},
        topSubreddits: (i.top_subreddits ?? []).map((s) => ({
          name: s.name,
          count: s.count,
        })),
        samplePosts: (i.sample_posts ?? []).map((p) => ({
          title: p.title,
          subreddit: p.subreddit,
          score: p.score,
        })),
        rank: i.rank,
      })),
    }
  }

  async refreshAudienceIntents(params: RefreshAudienceIntentsParams): Promise<RefreshAudienceIntentsResult> {
    const response = await this.httpClient.post<RefreshIntentApiResponse>(
      `audiences/${params.audienceId}/themes/intents/refresh?window=${params.window}`
    )
    return {
      status: response.status,
      analysisId: response.analysis_id,
    }
  }

  async getIntentPosts(params: GetIntentPostsParams): Promise<GetIntentPostsResult> {
    const limit = params.limit ?? 20
    const offset = params.offset ?? 0
    const response = await this.httpClient.get<IntentPostsApiResponse>(
      `audiences/${params.audienceId}/themes/intents/${params.category}/posts?window=${params.window}&limit=${limit}&offset=${offset}`
    )
    const posts = response.posts.map((p) => new IntentPost({
      postRedditId: p.post_reddit_id,
      postTitle: p.post_title,
      postSubreddit: p.post_subreddit,
      primaryIntent: p.primary_intent,
      secondaryIntent: p.secondary_intent,
      confidence: p.confidence,
    }))
    return {
      posts,
      total: response.total,
      limit: response.limit,
      offset: response.offset,
      hasMore: offset + posts.length < response.total,
    }
  }
}