import type { HttpClient } from '@/modules/shared'
import { API_BASE_URL } from '@/modules/shared'
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
import type { GetThemeSummaryParams, GetThemeSummaryResult, ThemeSummaryStatus } from '../../domain/use-cases/get-theme-summary.use-case'
import type { RefreshThemeSummaryParams, RefreshThemeSummaryResult } from '../../domain/use-cases/refresh-theme-summary.use-case'
import type { GetThemePanelParams, GetThemePanelResult, ThemePanelStatus } from '../../domain/use-cases/get-theme-panel.use-case'
import type { RefreshThemePanelParams, RefreshThemePanelResult } from '../../domain/use-cases/refresh-theme-panel.use-case'
import type { GetContentSuggestionsParams, GetContentSuggestionsResult } from '../../domain/use-cases/get-content-suggestions.use-case'
import type { RefreshContentSuggestionsParams, RefreshContentSuggestionsResult } from '../../domain/use-cases/refresh-content-suggestions.use-case'
import type { GetContentSuggestionDetailParams, GetContentSuggestionDetailResult } from '../../domain/use-cases/get-content-suggestion-detail.use-case'
import type { SendContentSuggestionFeedbackParams, SendContentSuggestionFeedbackResult } from '../../domain/use-cases/send-content-suggestion-feedback.use-case'
import type { TriggerContentProductionParams, TriggerContentProductionResult } from '../../domain/use-cases/trigger-content-production.use-case'
import type { GetContentDraftsParams, GetContentDraftsResult } from '../../domain/use-cases/get-content-drafts.use-case'
import type { GetContentDraftDetailParams, GetContentDraftDetailResult } from '../../domain/use-cases/get-content-draft-detail.use-case'
import type { AskIntentParams, AskIntentResult } from '../../domain/use-cases/ask-intent.use-case'
import type { StreamTopicChatMessageParams, StreamTopicChatMessageCallbacks } from '../../domain/use-cases/stream-topic-chat-message.use-case'
import type { ExportTopicChatParams, ExportTopicChatResult } from '../../domain/use-cases/export-topic-chat.use-case'
import type { StartIntentChatParams, StartIntentChatResult } from '../../domain/use-cases/start-intent-chat.use-case'
import type { SendIntentChatMessageParams, SendIntentChatMessageResult } from '../../domain/use-cases/send-intent-chat-message.use-case'
import type { ListIntentChatConversationsParams, ListIntentChatConversationsResult } from '../../domain/use-cases/list-intent-chat-conversations.use-case'
import type { GetIntentChatMessagesParams, GetIntentChatMessagesResult } from '../../domain/use-cases/get-intent-chat-messages.use-case'
import type { ArchiveIntentChatParams, ArchiveIntentChatResult } from '../../domain/use-cases/archive-intent-chat.use-case'
import type { ExportIntentChatParams, ExportIntentChatResult } from '../../domain/use-cases/export-intent-chat.use-case'
import type { TopicChatContextQuality } from '../../domain/entities/TopicConversation.entity'
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
import { ThemeSummary } from '../../domain/entities/ThemeSummary.entity'
import type { EmotionalTone } from '../../domain/entities/ThemeSummary.entity'
import { ThemePanel } from '../../domain/entities/ThemePanel.entity'
import { ContentSuggestionAnalysis, ContentSuggestion } from '../../domain/entities/ContentSuggestion.entity'
import type { ContentSuggestionAnalysisStatus, ContentSuggestionPriority, ContentSuggestionFormat, ContentSuggestionTone, ContentSuggestionFeedbackStatus } from '../../domain/entities/ContentSuggestion.entity'
import { ContentDraft } from '../../domain/entities/ContentDraft.entity'
import { IntentAskResponse } from '../../domain/entities/IntentAskResponse.entity'
import { IntentConversation } from '../../domain/entities/IntentConversation.entity'
import { IntentConversationMessage } from '../../domain/entities/IntentConversationMessage.entity'
import type { ContentDraftPlatform, ContentDraftStatus } from '../../domain/entities/ContentDraft.entity'
import type { SemanticSearchParams, SemanticSearchUseCaseResult } from '../../domain/use-cases/semantic-search.use-case'
import type { GetYouTubeValidationParams, GetYouTubeValidationResult, YouTubeValidationStatus } from '../../domain/use-cases/get-youtube-validation.use-case'
import type { TriggerYouTubeValidationParams, TriggerYouTubeValidationResult } from '../../domain/use-cases/trigger-youtube-validation.use-case'
import type { GetYouTubeValidationVideosParams, GetYouTubeValidationVideosResult } from '../../domain/use-cases/get-youtube-validation-videos.use-case'
import { SemanticSearchResult } from '../../domain/entities/SemanticSearchResult.entity'
import { YouTubeValidation } from '../../domain/entities/YouTubeValidation.entity'
import { YouTubeCollectedVideo } from '../../domain/entities/YouTubeCollectedVideo.entity'
import type { GetProductIntelligenceParams, GetProductIntelligenceResult, ProductIntelligenceStatus } from '../../domain/use-cases/get-product-intelligence.use-case'
import type { TriggerProductIntelligenceParams, TriggerProductIntelligenceResult } from '../../domain/use-cases/trigger-product-intelligence.use-case'
import type { GetProductDetailParams, GetProductDetailResult } from '../../domain/use-cases/get-product-detail.use-case'
import type { GetProductOpportunitiesParams, GetProductOpportunitiesResult } from '../../domain/use-cases/get-product-opportunities.use-case'
import { ProductProfile } from '../../domain/entities/ProductProfile.entity'
import { ProductOpportunity } from '../../domain/entities/ProductOpportunity.entity'

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

interface IntentAskApiResponse {
  answer: string
  context_quality: string
  sources_used: string[]
  cached: boolean
  category: string
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

interface StartIntentChatApiResponse {
  conversation_id: string
  intent_category: string
  context_quality: string
  suggestion: string | null
}

interface SendIntentChatMessageApiResponse {
  answer: string
  context_quality: string
  message_id: string
  conversation_id: string
  suggestion: string | null
}

interface IntentConversationApiItem {
  conversation_id: string
  title: string
  intent_category: string
  context_quality: string
  is_active: boolean
  created_at: string
  updated_at: string
}

interface ListIntentChatConversationsApiResponse {
  conversations: IntentConversationApiItem[]
}

interface IntentConversationMessageApiItem {
  message_id: string
  role: string
  content: string
  context_quality: string | null
  created_at: string
}

interface GetIntentChatMessagesApiResponse {
  conversation_id: string
  title: string
  intent_category: string
  context_quality: string
  is_active: boolean
  messages: IntentConversationMessageApiItem[]
}

interface ArchiveIntentChatApiResponse {
  status: string
  conversation_id: string
}

interface ThemeAnalysisApiResponse {
  status: string
  analysis_id?: string
  completed_at?: string
  error_message?: string
  themes?: Array<{
    id: string
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
    pain_patterns?: Array<{
      name: string
      emoji: string
      post_count: number
      total_upvotes: number
      total_comments: number
      validation_score?: 'high' | 'medium' | 'low'
      suggested_coping?: string[]
      recommended_solutions?: string[]
      community_consensus?: 'strong' | 'moderate' | 'weak' | 'divided'
      submissions: Array<{
        title: string
        body: string
        subreddit: string
        score: number
        num_comments: number
        permalink: string
        top_comments?: Array<{ body: string; score: number; author: string }>
      }>
    }>
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
  title: string
  subreddit: string
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

interface ThemeSummaryApiResponse {
  status: string
  theme_id?: string
  narrative?: string
  highlights?: Array<{ title: string; subreddit: string; score: number; why_notable: string }>
  emotional_tone?: string
  tone_description?: string
  key_themes?: Array<{ theme: string; description: string }>
  intent_breakdown?: Record<string, number> | null
  week_differentiator?: string | null
  created_at?: string
}

interface RefreshThemeSummaryApiResponse {
  status: string
  theme_id: string
  summary_id?: string
  message?: string
}

interface ThemePanelApiResponse {
  status: string
  panel_id?: string
  subcategories?: {
    total: number
    items: Array<{ name: string; count: number; description: string }>
  }
  related_topics?: {
    total: number
    items: Array<{ name: string; count: number; topic_id: string | null }>
  }
  subreddit_distribution?: {
    total: number
    items: Array<{ name: string; post_count: number; avg_score: number }>
  }
  created_at?: string
}

interface RefreshThemePanelApiResponse {
  status: string
  theme_id: string
  panel_id?: string
  message?: string
}

interface ContentSuggestionAnalysisApiResponse {
  id: string
  audience_id?: string
  status: string
  modules_used: string[]
  model_used: string
  error_message?: string | null
  created_at: string
}

interface ContentSuggestionApiItem {
  id: string
  analysis_id: string
  rank: number
  priority: string
  title: string
  approach: string
  why_now: string
  evidence: Record<string, unknown>
  format: string
  format_rationale: string
  emotional_tone: string
  tone_rationale: string
  outline: Array<{ slide?: number; item?: number; content: string }>
  keywords: string[]
  research_notes: string
  image_prompt: string
  differentiation_notes: string
  accuracy_notes?: string
  source_topics: Array<{ topic_id?: string; topic_name: string; growth?: number; growth_percentage?: number }>
  source_modules: string[]
  feedback_status?: string | null
  feedback_at?: string | null
  image_url?: string | null
  created_at: string
}

interface GetContentSuggestionsApiResponse {
  status?: string
  analysis?: ContentSuggestionAnalysisApiResponse | null
  suggestions?: ContentSuggestionApiItem[]
  total?: number
  limit?: number
  offset?: number
}

interface RefreshContentSuggestionsApiResponse {
  status: string
  analysis_id: string
  message: string
  modules_found?: string[]
}

interface ContentSuggestionDetailApiResponse extends ContentSuggestionApiItem {}

interface SendContentSuggestionFeedbackApiResponse {
  suggestion_id: string
  feedback_status: string
  feedback_at: string
}

interface ContentDraftApiItem {
  id: string
  suggestion_id: string
  platform: string
  status: string
  hooks: Array<{ option: number; text: string }>
  full_draft: string
  narrative_arc: string
  cta: string
  platform_notes: string
  hashtags: string[]
  image_url: string | null
  image_aspect_ratio: string | null
  model_used: string
  error_message: string | null
  created_at: string
}

interface TriggerContentProductionApiResponse {
  status: string
  suggestion_id: string
  platforms: string[]
  message: string
}

interface GetContentDraftsApiResponse {
  suggestion_id: string
  drafts: ContentDraftApiItem[]
  total: number
}

interface SemanticSearchSubmissionApiItem {
  title: string
  body: string
  subreddit: string
  score: number
  num_comments: number
  permalink: string
  similarity: number
}

interface SemanticSearchPatternApiItem {
  name: string
  emoji: string
  description: string
  post_count: number
  total_upvotes: number
  total_comments: number
  submissions: SemanticSearchSubmissionApiItem[]
}

interface SemanticSearchApiResponse {
  answer: string
  patterns: SemanticSearchPatternApiItem[]
  total_posts_searched: number
  total_posts_matched: number
  pattern_count: number
  context_quality: string
  cached: boolean
  query: string
}

interface YouTubeValidationApiResponse {
  status: string
  validation_id?: string
  audience_id?: string
  completed_at?: string
  model_used?: string
  total_videos?: number
  total_comments?: number
  analysis_data?: {
    topics: Array<{
      topic_name: string
      traction_score: number
      sentiment_comparison: {
        reddit: string
        youtube: string
        alignment: string
        divergence?: string
      }
      content_gap: boolean
      content_gap_detail?: string
      content_saturated: boolean
      product_mentions: string[]
      audience_overlap_score: number
      opportunity_insights: string | string[]
    }>
    cross_platform_summary: {
      total_topics_with_traction: number
      avg_traction_score: number
      content_gaps_found: number
      key_findings: string[]
      best_opportunity: string
      biggest_divergence: string
    }
  }
  summary?: {
    topics_analyzed: number
    topics_with_youtube_traction: number
    content_gaps_found: number
    avg_traction_score: number
    total_videos_analyzed: number
    total_comments_analyzed: number
    headline?: string
    key_opportunities?: string[]
    risk_factors?: string[]
  }
  message?: string
}

interface TriggerYouTubeValidationApiResponse {
  status: string
  validation_id: string
  topics_count: number
  message?: string
}

interface YouTubeValidationVideosApiResponse {
  status: string
  validation_id: string
  topic_name: string
  videos_count: number
  videos: Array<{
    id: string
    video_id: string
    title: string
    channel_name: string
    views: number
    likes: number
    duration_seconds: number
    tags: string[]
    description: string
    comments_count: number
    has_transcript: boolean
    transcript_lang: string | null
    published_at: string
  }>
}

interface ProductIntelligenceApiResponse {
  status: string
  total_products?: number
  total_mentions?: number
  total_opportunities?: number
  error_message?: string
  products?: Array<{
    id: string
    product_name: string
    normalized_name?: string
    category: string
    total_mentions: number
    sentiment_score: number
    sentiment_label: string
    trend_direction: string
    communities?: string[]
    positive_aspects?: string[]
    negative_aspects?: string[]
    gaps?: string[]
    alternatives?: Array<{ name: string; sentiment_label: string }>
    evidence_quotes?: Array<{ quote: string; source_subreddit: string; score: number }>
    use_cases?: string[]
    created_at?: string
  }>
}

interface TriggerProductIntelligenceApiResponse {
  status: string
  analysis_id?: string
  message?: string
}

interface ProductDetailApiResponse {
  status: string
  product: {
    id: string
    product_name: string
    normalized_name?: string
    category: string
    total_mentions: number
    sentiment_score: number
    sentiment_label: string
    trend_direction: string
    communities?: string[]
    positive_aspects?: string[]
    negative_aspects?: string[]
    gaps?: string[]
    alternatives?: Array<{ name: string; sentiment_label: string }>
    evidence_quotes?: Array<{ quote: string; source_subreddit: string; score: number }>
    use_cases?: string[]
    created_at?: string
  } | null
}

interface ProductOpportunitiesApiResponse {
  status: string
  opportunities?: Array<{
    id: string
    opportunity_type: string
    title: string
    description: string
    opportunity_score: number
    demand_signals: number
    existing_solutions_count: number
    evidence?: Array<{ quote: string; subreddit: string; post_url: string }>
    related_products?: string[]
  }>
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
        id: t.id,
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
        painPatterns: (i.pain_patterns ?? []).map((pp) => ({
          name: pp.name,
          emoji: pp.emoji,
          postCount: pp.post_count,
          totalUpvotes: pp.total_upvotes,
          totalComments: pp.total_comments,
          validationScore: pp.validation_score,
          suggestedCoping: pp.suggested_coping,
          recommendedSolutions: pp.recommended_solutions,
          communityConsensus: pp.community_consensus,
          submissions: pp.submissions.map((s) => ({
            title: s.title,
            body: s.body,
            subreddit: s.subreddit,
            score: s.score,
            numComments: s.num_comments,
            permalink: s.permalink,
            topComments: s.top_comments?.map((c) => ({
              body: c.body,
              score: c.score,
              author: c.author,
            })),
          })),
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
      postTitle: p.title,
      postSubreddit: p.subreddit,
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

  async getThemeSummary(params: GetThemeSummaryParams): Promise<GetThemeSummaryResult> {
    const response = await this.httpClient.get<ThemeSummaryApiResponse>(
      `audiences/${params.audienceId}/themes/${params.themeId}/summary`
    )

    const status = response.status as ThemeSummaryStatus

    if (status !== 'ready' || !response.narrative) {
      return { status, data: null }
    }

    return {
      status,
      data: new ThemeSummary({
        themeId: response.theme_id ?? params.themeId,
        narrative: response.narrative,
        highlights: (response.highlights ?? []).map((h) => ({
          title: h.title,
          subreddit: h.subreddit,
          score: h.score,
          whyNotable: h.why_notable,
        })),
        emotionalTone: (response.emotional_tone ?? 'neutral') as EmotionalTone,
        toneDescription: response.tone_description ?? '',
        keyThemes: (response.key_themes ?? []).map((k) => ({
          theme: k.theme,
          description: k.description,
        })),
        intentBreakdown: response.intent_breakdown ?? null,
        weekDifferentiator: response.week_differentiator ?? null,
        createdAt: response.created_at ?? '',
      }),
    }
  }

  async refreshThemeSummary(params: RefreshThemeSummaryParams): Promise<RefreshThemeSummaryResult> {
    const response = await this.httpClient.post<RefreshThemeSummaryApiResponse>(
      `audiences/${params.audienceId}/themes/${params.themeId}/summary/refresh?window=${params.window}`,
      {}
    )

    return {
      status: response.status,
      themeId: response.theme_id,
      summaryId: response.summary_id,
    }
  }

  async getThemePanel(params: GetThemePanelParams): Promise<GetThemePanelResult> {
    const response = await this.httpClient.get<ThemePanelApiResponse>(
      `audiences/${params.audienceId}/themes/${params.themeId}/panel`
    )

    const status = response.status as ThemePanelStatus

    if (status !== 'ready' || !response.subcategories) {
      return { status, data: null }
    }

    return {
      status,
      data: new ThemePanel({
        id: response.panel_id ?? '',
        themeId: params.themeId,
        subcategories: (response.subcategories?.items ?? []).map((s) => ({
          name: s.name,
          count: s.count,
          description: s.description,
        })),
        relatedTopics: (response.related_topics?.items ?? []).map((t) => ({
          name: t.name,
          count: t.count,
          topicId: t.topic_id,
        })),
        subredditDistribution: (response.subreddit_distribution?.items ?? []).map((s) => ({
          name: s.name,
          postCount: s.post_count,
          avgScore: s.avg_score,
        })),
        createdAt: response.created_at ?? '',
      }),
    }
  }

  async refreshThemePanel(params: RefreshThemePanelParams): Promise<RefreshThemePanelResult> {
    const response = await this.httpClient.post<RefreshThemePanelApiResponse>(
      `audiences/${params.audienceId}/themes/${params.themeId}/panel/refresh?window=${params.window}`,
      {}
    )

    return {
      status: response.status,
      themeId: response.theme_id,
      panelId: response.panel_id,
    }
  }

  async getContentSuggestions(params: GetContentSuggestionsParams): Promise<GetContentSuggestionsResult> {
    const searchParams = new URLSearchParams()
    if (params.priority) searchParams.set('priority', params.priority)
    if (params.feedbackStatus) searchParams.set('feedback_status', params.feedbackStatus)
    if (params.limit) searchParams.set('limit', String(params.limit))
    if (params.offset) searchParams.set('offset', String(params.offset))

    const query = searchParams.toString()
    const suffix = query ? '?' + query : ''
    const url = `audiences/${params.audienceId}/content-suggestions` + suffix

    const response = await this.httpClient.get<GetContentSuggestionsApiResponse>(url)

    const status = (response.status ?? response.analysis?.status ?? 'no_analysis') as ContentSuggestionAnalysisStatus

    if (status !== 'ready' || !response.analysis) {
      return {
        status,
        analysis: null,
        suggestions: [],
        total: 0,
        limit: response.limit ?? params.limit ?? 10,
        offset: response.offset ?? params.offset ?? 0,
      }
    }

    return {
      status,
      analysis: new ContentSuggestionAnalysis({
        id: response.analysis.id,
        audienceId: response.analysis.audience_id ?? params.audienceId,
        status: response.analysis.status as ContentSuggestionAnalysisStatus,
        modulesUsed: response.analysis.modules_used ?? [],
        modelUsed: response.analysis.model_used ?? '',
        errorMessage: response.analysis.error_message ?? null,
        createdAt: response.analysis.created_at ?? '',
      }),
      suggestions: (response.suggestions ?? []).map((s) => this.mapContentSuggestion(s)),
      total: response.total ?? 0,
      limit: response.limit ?? params.limit ?? 10,
      offset: response.offset ?? params.offset ?? 0,
    }
  }

  async refreshContentSuggestions(params: RefreshContentSuggestionsParams): Promise<RefreshContentSuggestionsResult> {
    const response = await this.httpClient.post<RefreshContentSuggestionsApiResponse>(
      `audiences/${params.audienceId}/content-suggestions/refresh`,
      {}
    )

    return {
      status: response.status as 'processing' | 'already_exists',
      analysisId: response.analysis_id,
      message: response.message,
      modulesFound: response.modules_found,
    }
  }

  async getContentSuggestionDetail(params: GetContentSuggestionDetailParams): Promise<GetContentSuggestionDetailResult> {
    const response = await this.httpClient.get<ContentSuggestionDetailApiResponse>(
      `audiences/${params.audienceId}/content-suggestions/${params.suggestionId}`
    )

    return {
      suggestion: this.mapContentSuggestion(response),
    }
  }

  async sendContentSuggestionFeedback(params: SendContentSuggestionFeedbackParams): Promise<SendContentSuggestionFeedbackResult> {
    const response = await this.httpClient.post<SendContentSuggestionFeedbackApiResponse>(
      `audiences/${params.audienceId}/content-suggestions/${params.suggestionId}/feedback`,
      { status: params.status }
    )

    return {
      suggestionId: response.suggestion_id,
      feedbackStatus: response.feedback_status as ContentSuggestionFeedbackStatus,
      feedbackAt: response.feedback_at,
    }
  }

  private mapContentSuggestion(s: ContentSuggestionApiItem): ContentSuggestion {
    return new ContentSuggestion({
      id: s.id,
      analysisId: s.analysis_id,
      rank: s.rank,
      priority: s.priority as ContentSuggestionPriority,
      title: s.title,
      approach: s.approach,
      whyNow: s.why_now,
      evidence: s.evidence ?? {},
      format: s.format as ContentSuggestionFormat,
      formatRationale: s.format_rationale ?? '',
      emotionalTone: s.emotional_tone as ContentSuggestionTone,
      toneRationale: s.tone_rationale ?? '',
      outline: (s.outline ?? []).map((o) => ({
        slide: o.slide,
        item: o.item,
        content: o.content,
      })),
      keywords: s.keywords ?? [],
      researchNotes: s.research_notes ?? '',
      imagePrompt: s.image_prompt ?? '',
      differentiationNotes: s.differentiation_notes ?? '',
      accuracyNotes: s.accuracy_notes ?? '',
      sourceTopics: (s.source_topics ?? []).map((t) => ({
        topicId: t.topic_id ?? null,
        topicName: t.topic_name,
        growthPercentage: t.growth_percentage ?? t.growth ?? null,
      })),
      sourceModules: s.source_modules ?? [],
      feedbackStatus: (s.feedback_status as ContentSuggestionFeedbackStatus) ?? null,
      feedbackAt: s.feedback_at ?? null,
      imageUrl: s.image_url ?? null,
      createdAt: s.created_at ?? '',
    })
  }

  private mapContentDraft(d: ContentDraftApiItem): ContentDraft {
    return new ContentDraft({
      id: d.id,
      suggestionId: d.suggestion_id,
      platform: d.platform as ContentDraftPlatform,
      status: d.status as ContentDraftStatus,
      hooks: (d.hooks ?? []).map((h) => ({ option: h.option, text: h.text })),
      fullDraft: d.full_draft ?? '',
      narrativeArc: d.narrative_arc ?? '',
      cta: d.cta ?? '',
      platformNotes: d.platform_notes ?? '',
      hashtags: d.hashtags ?? [],
      imageUrl: d.image_url ?? null,
      imageAspectRatio: d.image_aspect_ratio ?? null,
      modelUsed: d.model_used ?? '',
      errorMessage: d.error_message ?? null,
      createdAt: d.created_at ?? '',
    })
  }

  async triggerContentProduction(params: TriggerContentProductionParams): Promise<TriggerContentProductionResult> {
    const response = await this.httpClient.post<TriggerContentProductionApiResponse>(
      `audiences/${params.audienceId}/content-suggestions/${params.suggestionId}/produce`,
      { target_platforms: params.targetPlatforms }
    )

    return {
      status: response.status as 'processing' | 'already_exists',
      suggestionId: response.suggestion_id,
      platforms: response.platforms,
      message: response.message,
    }
  }

  async getContentDrafts(params: GetContentDraftsParams): Promise<GetContentDraftsResult> {
    const response = await this.httpClient.get<GetContentDraftsApiResponse>(
      `audiences/${params.audienceId}/content-suggestions/${params.suggestionId}/drafts`
    )

    return {
      suggestionId: response.suggestion_id,
      drafts: (response.drafts ?? []).map((d) => this.mapContentDraft(d)),
      total: response.total ?? 0,
    }
  }

  async getContentDraftDetail(params: GetContentDraftDetailParams): Promise<GetContentDraftDetailResult> {
    const response = await this.httpClient.get<ContentDraftApiItem>(
      `audiences/${params.audienceId}/content-suggestions/${params.suggestionId}/drafts/${params.draftId}`
    )

    return {
      draft: this.mapContentDraft(response),
    }
  }

  async askIntent(params: AskIntentParams): Promise<AskIntentResult> {
    const response = await this.httpClient.post<IntentAskApiResponse>(
      `audiences/${params.audienceId}/themes/intents/${params.category}/ask`,
      { question: params.question }
    )

    return new IntentAskResponse({
      answer: response.answer,
      contextQuality: response.context_quality as 'rich' | 'limited',
      sourcesUsed: response.sources_used,
      cached: response.cached,
      category: response.category,
      suggestion: response.suggestion,
    })
  }

  async streamTopicChatMessage(
    params: StreamTopicChatMessageParams,
    callbacks: StreamTopicChatMessageCallbacks,
    signal?: AbortSignal,
  ): Promise<void> {
    const token = localStorage.getItem('access_token')
    const url = `${API_BASE_URL}/audiences/${params.audienceId}/topics/${params.topicId}/chat/${params.conversationId}/messages`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/event-stream',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ question: params.question }),
      signal,
    })

    if (!response.ok) {
      if (response.status === 429) {
        try {
          const body = await response.json()
          if (body?.error === 'rate_limit_exceeded') {
            callbacks.onError('rate_limit_exceeded')
            return
          }
        } catch {
          // fall through to generic error
        }
      }
      if (response.status === 400) {
        try {
          const body = await response.json()
          if (body?.error === 'message_limit_reached') {
            callbacks.onError('message_limit_reached')
            return
          }
        } catch {
          // fall through to generic error
        }
      }
      callbacks.onError(`HTTP ${response.status}`)
      return
    }

    const reader = response.body?.getReader()
    if (!reader) {
      callbacks.onError('No response body')
      return
    }

    const decoder = new TextDecoder()
    let buffer = ''

    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() ?? ''

        let currentEvent = ''

        for (const line of lines) {
          if (line.startsWith('event: ')) {
            currentEvent = line.slice(7).trim()
          } else if (line.startsWith('data: ')) {
            const data = line.slice(6)
            try {
              const parsed = JSON.parse(data)

              if (currentEvent === 'token') {
                callbacks.onToken(parsed.content)
              } else if (currentEvent === 'done') {
                callbacks.onDone({
                  answer: parsed.answer,
                  contextQuality: parsed.context_quality as TopicChatContextQuality,
                  messageId: parsed.message_id,
                  conversationId: parsed.conversation_id,
                  suggestion: parsed.suggestion,
                  followUpSuggestions: Array.isArray(parsed.follow_up_suggestions)
                    ? parsed.follow_up_suggestions
                    : [],
                })
              } else if (currentEvent === 'error') {
                callbacks.onError(parsed.error)
              }
            } catch {
              // skip malformed JSON lines
            }
            currentEvent = ''
          }
        }
      }
    } finally {
      reader.releaseLock()
    }
  }

  async exportTopicChat(params: ExportTopicChatParams): Promise<ExportTopicChatResult> {
    const token = localStorage.getItem('access_token')
    const url = `${API_BASE_URL}/audiences/${params.audienceId}/topics/${params.topicId}/chat/${params.conversationId}/export`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const blob = await response.blob()

    const disposition = response.headers.get('Content-Disposition') ?? ''
    const filenameMatch = /filename="?(.+?)"?$/.exec(disposition)
    const filename = filenameMatch?.[1] ?? `chat-export-${new Date().toISOString().slice(0, 10)}.md`

    return { blob, filename }
  }

  async startIntentChat(params: StartIntentChatParams): Promise<StartIntentChatResult> {
    const response = await this.httpClient.post<StartIntentChatApiResponse>(
      `audiences/${params.audienceId}/themes/intents/${params.category}/chat?window=${params.window}`
    )
    return {
      conversationId: response.conversation_id,
      intentCategory: response.intent_category,
      contextQuality: response.context_quality as 'rich' | 'limited',
      suggestion: response.suggestion,
    }
  }

  async sendIntentChatMessage(params: SendIntentChatMessageParams): Promise<SendIntentChatMessageResult> {
    const response = await this.httpClient.post<SendIntentChatMessageApiResponse>(
      `audiences/${params.audienceId}/themes/intents/${params.category}/chat/${params.conversationId}/messages?window=${params.window}`,
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

  async listIntentChatConversations(params: ListIntentChatConversationsParams): Promise<ListIntentChatConversationsResult> {
    const response = await this.httpClient.get<ListIntentChatConversationsApiResponse>(
      `audiences/${params.audienceId}/themes/intents/${params.category}/chat`
    )
    return {
      conversations: response.conversations.map((c) => new IntentConversation({
        conversationId: c.conversation_id,
        title: c.title,
        intentCategory: c.intent_category,
        contextQuality: c.context_quality as 'rich' | 'limited',
        isActive: c.is_active,
        createdAt: c.created_at,
        updatedAt: c.updated_at,
      })),
    }
  }

  async getIntentChatMessages(params: GetIntentChatMessagesParams): Promise<GetIntentChatMessagesResult> {
    const response = await this.httpClient.get<GetIntentChatMessagesApiResponse>(
      `audiences/${params.audienceId}/themes/intents/${params.category}/chat/${params.conversationId}/messages`
    )
    return {
      conversationId: response.conversation_id,
      title: response.title,
      intentCategory: response.intent_category,
      contextQuality: response.context_quality as 'rich' | 'limited',
      isActive: response.is_active,
      messages: response.messages.map((m) => new IntentConversationMessage({
        messageId: m.message_id,
        role: m.role as 'user' | 'assistant',
        content: m.content,
        contextQuality: m.context_quality as 'rich' | 'limited' | null,
        createdAt: m.created_at,
      })),
    }
  }

  async archiveIntentChat(params: ArchiveIntentChatParams): Promise<ArchiveIntentChatResult> {
    const response = await this.httpClient.delete<ArchiveIntentChatApiResponse>(
      `audiences/${params.audienceId}/themes/intents/${params.category}/chat/${params.conversationId}`
    )
    return {
      status: response.status,
      conversationId: response.conversation_id,
    }
  }

  async exportIntentChat(params: ExportIntentChatParams): Promise<ExportIntentChatResult> {
    const token = localStorage.getItem('access_token')
    const url = `${API_BASE_URL}/audiences/${params.audienceId}/themes/intents/${params.category}/chat/${params.conversationId}/export`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const blob = await response.blob()

    const disposition = response.headers.get('Content-Disposition') ?? ''
    const filenameMatch = /filename="?(.+?)"?$/.exec(disposition)
    const filename = filenameMatch?.[1] ?? `intent-chat-export-${new Date().toISOString().slice(0, 10)}.md`

    return { blob, filename }
  }

  async semanticSearch(params: SemanticSearchParams): Promise<SemanticSearchUseCaseResult> {
    const response = await this.httpClient.post<SemanticSearchApiResponse>(
      `audiences/${params.audienceId}/semantic-search`,
      { query: params.query }
    )

    return new SemanticSearchResult({
      answer: response.answer,
      patterns: response.patterns.map((p) => ({
        name: p.name,
        emoji: p.emoji,
        description: p.description,
        postCount: p.post_count,
        totalUpvotes: p.total_upvotes,
        totalComments: p.total_comments,
        submissions: p.submissions.map((s) => ({
          title: s.title,
          body: s.body,
          subreddit: s.subreddit,
          score: s.score,
          numComments: s.num_comments,
          permalink: s.permalink,
          similarity: s.similarity,
        })),
      })),
      totalPostsSearched: response.total_posts_searched,
      totalPostsMatched: response.total_posts_matched,
      patternCount: response.pattern_count,
      contextQuality: response.context_quality as 'rich' | 'limited',
      cached: response.cached,
      query: response.query,
    })
  }

  async getYouTubeValidation(params: GetYouTubeValidationParams): Promise<GetYouTubeValidationResult> {
    const response = await this.httpClient.get<YouTubeValidationApiResponse>(
      `audiences/${params.audienceId}/youtube-validation`
    )

    const status = response.status as YouTubeValidationStatus

    if (status !== 'ready' || !response.analysis_data) {
      return { status, data: null }
    }

    return {
      status,
      data: new YouTubeValidation({
        validationId: response.validation_id ?? '',
        audienceId: response.audience_id ?? params.audienceId,
        status: response.status,
        completedAt: response.completed_at ?? null,
        modelUsed: response.model_used ?? null,
        totalVideos: response.total_videos ?? 0,
        totalComments: response.total_comments ?? 0,
        analysisData: {
          topics: (response.analysis_data.topics ?? []).map((t) => {
            const insights = t.opportunity_insights
            return {
              topicName: t.topic_name,
              tractionScore: t.traction_score,
              sentimentComparison: {
                reddit: t.sentiment_comparison.reddit,
                youtube: t.sentiment_comparison.youtube,
                alignment: t.sentiment_comparison.alignment,
                divergence: t.sentiment_comparison.divergence ?? null,
              },
              contentGap: t.content_gap,
              contentGapDetail: t.content_gap_detail ?? null,
              contentSaturated: t.content_saturated,
              productMentions: t.product_mentions ?? [],
              audienceOverlapScore: t.audience_overlap_score,
              opportunityInsights: Array.isArray(insights) ? insights : insights ? [insights] : [],
            }
          }),
          crossPlatformSummary: {
            totalTopicsWithTraction: response.analysis_data.cross_platform_summary.total_topics_with_traction,
            avgTractionScore: response.analysis_data.cross_platform_summary.avg_traction_score,
            contentGapsFound: response.analysis_data.cross_platform_summary.content_gaps_found,
            keyFindings: response.analysis_data.cross_platform_summary.key_findings ?? [],
            bestOpportunity: response.analysis_data.cross_platform_summary.best_opportunity,
            biggestDivergence: response.analysis_data.cross_platform_summary.biggest_divergence,
          },
        },
        summary: response.summary ? {
          topicsAnalyzed: response.summary.topics_analyzed,
          topicsWithYoutubeTraction: response.summary.topics_with_youtube_traction,
          contentGapsFound: response.summary.content_gaps_found,
          avgTractionScore: response.summary.avg_traction_score,
          totalVideosAnalyzed: response.summary.total_videos_analyzed,
          totalCommentsAnalyzed: response.summary.total_comments_analyzed,
          headline: response.summary.headline ?? null,
          keyOpportunities: response.summary.key_opportunities ?? [],
          riskFactors: response.summary.risk_factors ?? [],
        } : null,
      }),
    }
  }

  async triggerYouTubeValidation(params: TriggerYouTubeValidationParams): Promise<TriggerYouTubeValidationResult> {
    const forceParam = params.force ? '?force=true' : ''
    const response = await this.httpClient.post<TriggerYouTubeValidationApiResponse>(
      `audiences/${params.audienceId}/youtube-validation${forceParam}`
    )
    return {
      status: response.status,
      validationId: response.validation_id,
      topicsCount: response.topics_count,
    }
  }

  async getYouTubeValidationVideos(params: GetYouTubeValidationVideosParams): Promise<GetYouTubeValidationVideosResult> {
    const response = await this.httpClient.get<YouTubeValidationVideosApiResponse>(
      `audiences/${params.audienceId}/youtube-validation/${encodeURIComponent(params.topicName)}/videos`
    )
    return {
      status: response.status,
      validationId: response.validation_id,
      topicName: response.topic_name,
      videosCount: response.videos_count,
      videos: (response.videos ?? []).map((v) => new YouTubeCollectedVideo({
        id: v.id,
        videoId: v.video_id,
        title: v.title,
        channelName: v.channel_name,
        views: v.views,
        likes: v.likes,
        durationSeconds: v.duration_seconds,
        tags: v.tags ?? [],
        description: v.description ?? '',
        commentsCount: v.comments_count,
        hasTranscript: v.has_transcript,
        transcriptLang: v.transcript_lang,
        publishedAt: v.published_at,
      })),
    }
  }

  async getProductIntelligence(params: GetProductIntelligenceParams): Promise<GetProductIntelligenceResult> {
    const searchParams = new URLSearchParams()
    if (params.sortBy) searchParams.set('sort_by', params.sortBy)
    if (params.category) searchParams.set('category', params.category)
    if (params.limit) searchParams.set('limit', String(params.limit))
    if (params.offset) searchParams.set('offset', String(params.offset))

    const queryString = searchParams.toString()
    const url = `audiences/${params.audienceId}/products${queryString ? `?${queryString}` : ''}`

    const response = await this.httpClient.get<ProductIntelligenceApiResponse>(url)
    const status = response.status as ProductIntelligenceStatus

    if (status !== 'ready' || !response.products) {
      return {
        status,
        totalProducts: 0,
        totalMentions: 0,
        totalOpportunities: 0,
        products: [],
        errorMessage: response.error_message,
      }
    }

    return {
      status,
      totalProducts: response.total_products ?? 0,
      totalMentions: response.total_mentions ?? 0,
      totalOpportunities: response.total_opportunities ?? 0,
      products: response.products.map((p) => new ProductProfile({
        id: p.id,
        productName: p.product_name,
        normalizedName: p.normalized_name ?? '',
        category: p.category,
        totalMentions: p.total_mentions,
        sentimentScore: p.sentiment_score,
        sentimentLabel: p.sentiment_label,
        trendDirection: p.trend_direction,
        communities: p.communities ?? [],
        positiveAspects: p.positive_aspects ?? [],
        negativeAspects: p.negative_aspects ?? [],
        gaps: p.gaps ?? [],
        alternatives: (p.alternatives ?? []).map((a) => ({
          name: a.name,
          sentimentLabel: a.sentiment_label,
        })),
        evidenceQuotes: (p.evidence_quotes ?? []).map((e) => ({
          quote: e.quote,
          sourceSubreddit: e.source_subreddit,
          score: e.score,
        })),
        useCases: p.use_cases ?? [],
        createdAt: p.created_at ?? null,
      })),
    }
  }

  async triggerProductIntelligence(params: TriggerProductIntelligenceParams): Promise<TriggerProductIntelligenceResult> {
    const response = await this.httpClient.post<TriggerProductIntelligenceApiResponse>(
      `audiences/${params.audienceId}/products/refresh?window=${params.window}`
    )
    return {
      status: response.status,
      analysisId: response.analysis_id ?? '',
      message: response.message,
    }
  }

  async getProductDetail(params: GetProductDetailParams): Promise<GetProductDetailResult> {
    const response = await this.httpClient.get<ProductDetailApiResponse>(
      `audiences/${params.audienceId}/products/${params.productId}`
    )

    const p = response.product
    if (!p) {
      return { product: null }
    }

    return {
      product: new ProductProfile({
        id: p.id,
        productName: p.product_name,
        normalizedName: p.normalized_name ?? '',
        category: p.category,
        totalMentions: p.total_mentions,
        sentimentScore: p.sentiment_score,
        sentimentLabel: p.sentiment_label,
        trendDirection: p.trend_direction,
        communities: p.communities ?? [],
        positiveAspects: p.positive_aspects ?? [],
        negativeAspects: p.negative_aspects ?? [],
        gaps: p.gaps ?? [],
        alternatives: (p.alternatives ?? []).map((a) => ({
          name: a.name,
          sentimentLabel: a.sentiment_label,
        })),
        evidenceQuotes: (p.evidence_quotes ?? []).map((e) => ({
          quote: e.quote,
          sourceSubreddit: e.source_subreddit,
          score: e.score,
        })),
        useCases: p.use_cases ?? [],
        createdAt: p.created_at ?? null,
      }),
    }
  }

  async getProductOpportunities(params: GetProductOpportunitiesParams): Promise<GetProductOpportunitiesResult> {
    const response = await this.httpClient.get<ProductOpportunitiesApiResponse>(
      `audiences/${params.audienceId}/products/opportunities`
    )

    if (response.status === 'no_analysis' || !response.opportunities) {
      return { status: response.status, opportunities: [] }
    }

    return {
      status: response.status,
      opportunities: response.opportunities.map((o) => new ProductOpportunity({
        id: o.id,
        opportunityType: o.opportunity_type,
        title: o.title,
        description: o.description,
        opportunityScore: o.opportunity_score,
        demandSignals: o.demand_signals,
        existingSolutionsCount: o.existing_solutions_count,
        evidence: (o.evidence ?? []).map((e) => ({
          quote: e.quote,
          subreddit: e.subreddit,
          postUrl: e.post_url,
        })),
        relatedProducts: o.related_products ?? [],
      })),
    }
  }
}