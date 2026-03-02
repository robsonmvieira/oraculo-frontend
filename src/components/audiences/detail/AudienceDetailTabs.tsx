import { useState, type RefObject } from 'react'
import { useTranslation } from 'react-i18next'
import { Sparkles, Bell, Lightbulb } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import {
  TopicsTable,
  TopicDetailPanel,
  ThemesGrid,
  ThemeDetailPanel,
  SearchTabContent,
  SubredditsTabContent,
  AlertsTabContent,
} from '@/components/audiences/detail'
import { ContentSuggestionsTabContent } from './ContentSuggestionsTabContent'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import type { TopicDetail, ThemeDetail, ThemeGridItem } from '@/components/audiences/detail'
import type { SimilarCommunity } from './SimilarCommunitiesGrid'
import type { AudienceStats, RadarData } from './AboutAudiencePanel'
import type { SubredditDetail } from '@/data/audienceDetails'
import type { Keyword } from '@/modules/audience/domain/entities/Keyword.entity'
import type { Topic } from '@/modules/audience/domain/entities/Topic.entity'
import type { Theme } from '@/modules/audience/domain/entities/Theme.entity'
import { useGetAudienceThemes, useRefreshAudienceThemes, useGetAudienceIntents, useRefreshAudienceIntents } from '@/modules/audience/application/hooks'
import type { IntentCategory } from '@/modules/audience/domain/entities/IntentCategory.entity'
import { useAlertsSummary } from '@/modules/topic-alerts'

export interface AudienceDetailTabsProps {
  contentRef: RefObject<HTMLDivElement | null>
  subredditsData: readonly SubredditDetail[]
  communitiesCount: number
  audienceName: string
  audienceStats: AudienceStats
  radarData: RadarData
  keywords: Keyword[]
  isLoadingKeywords: boolean
  isUserAudience: boolean
  similarCommunities: SimilarCommunity[]
  isLoadingSuggestions: boolean
  onAddCommunity: () => void
  onAddToAudience?: (subredditName: string) => void
  onMarkNotRelevant?: (subredditName: string) => void
  topics: Topic[]
  totalTopics: number
  isLoadingTopics: boolean
  onLoadMoreTopics: () => void
  hasMoreTopics: boolean
  isLoadingMoreTopics: boolean
  audienceId: string
}

const SCORING_THEMES: ThemeGridItem[] = [
  { id: 'th1', name: 'Hot Discussions', description: 'Popular discussions this week', type: 'scoring' },
  { id: 'th2', name: 'Top Content', description: 'Best-performing content of past month', type: 'scoring' },
]

function mapScoringThemesToDetail(
  id: string,
  name: string,
  themes: Theme[],
  window: 'week' | 'month',
): ThemeDetail {
  const topTheme = themes[0]

  const subcategories = themes.map((theme) => ({
    name: theme.getName(),
    count: theme.getPostCount(),
  }))

  const keywordMap = new Map<string, number>()
  for (const theme of themes) {
    for (const kw of theme.getTopKeywords()) {
      keywordMap.set(kw.keyword, (keywordMap.get(kw.keyword) ?? 0) + kw.frequency)
    }
  }
  const topics = Array.from(keywordMap.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([keyword, count]) => ({ name: keyword, count }))

  const subredditMap = new Map<string, number>()
  for (const theme of themes) {
    for (const sub of theme.getTopSubreddits()) {
      subredditMap.set(sub.name, (subredditMap.get(sub.name) ?? 0) + sub.postCount)
    }
  }
  const subreddits = Array.from(subredditMap.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([subredditName, count]) => ({ name: subredditName, count }))

  const summaryThemes = themes.map((theme) => ({
    id: theme.getId(),
    name: theme.getName(),
  }))

  return {
    id,
    name,
    description: topTheme?.getSummary() ?? '',
    subcategories,
    topics,
    subreddits,
    summaryThemes,
    window,
  }
}

function translateWithFallback(t: (key: string) => string, prefix: string, value: string): string {
  const key = `${prefix}.${value}`
  const translated = t(key)
  return translated === key ? value : translated
}

function mapIntentToDetail(intent: IntentCategory, t: (key: string) => string): ThemeDetail {
  const subcategories = Object.entries(intent.getSubcategories()).map(([name, count]) => ({
    name: translateWithFallback(t, 'themes.intents.sentiments', name),
    count,
  }))
  const topics = Object.entries(intent.getTopicKeywords()).map(([name, count]) => ({
    name: translateWithFallback(t, 'themes.intents.keywords', name),
    count,
  }))

  return {
    id: intent.getCategory(),
    name: t(`themes.intents.${intent.getCategory()}`),
    description: intent.getDescription(),
    subcategories,
    topics,
    subreddits: intent.getTopSubreddits().map((s) => ({
      name: s.name,
      count: s.count,
    })),
    painPatterns: intent.getPainPatterns(),
  }
}

export function AudienceDetailTabs({
  contentRef,
  subredditsData,
  communitiesCount,
  audienceName,
  audienceStats,
  radarData,
  keywords,
  isLoadingKeywords,
  isUserAudience,
  similarCommunities,
  isLoadingSuggestions,
  onAddCommunity,
  onAddToAudience,
  onMarkNotRelevant,
  topics,
  totalTopics,
  isLoadingTopics,
  onLoadMoreTopics,
  hasMoreTopics,
  isLoadingMoreTopics,
  audienceId,
}: Readonly<AudienceDetailTabsProps>) {
  const { t } = useTranslation('audiences')
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [activeTab, setActiveTab] = useState('search')
  const [selectedTopic, setSelectedTopic] = useState<TopicDetail | null>(null)
  const [selectedTheme, setSelectedTheme] = useState<ThemeDetail | null>(null)
  const [selectedIntentCategory, setSelectedIntentCategory] = useState<string | null>(null)

  const { data: alertsSummary } = useAlertsSummary(audienceId)
  const alertsCount = alertsSummary?.total ?? 0

  const isThemesTab = activeTab === 'themes'

  const weekQuery = useGetAudienceThemes(audienceId, 'week', isThemesTab)
  const monthQuery = useGetAudienceThemes(audienceId, 'month', isThemesTab)
  const refreshMutation = useRefreshAudienceThemes()

  const intentsQuery = useGetAudienceIntents(audienceId, 'week', isThemesTab)
  const refreshIntentsMutation = useRefreshAudienceIntents()

  const intentsStatus = intentsQuery.data?.status ?? 'no_analysis'

  const intentsData = intentsQuery.data?.data
  const aiTaggedThemes: ThemeGridItem[] = intentsStatus === 'ready' && intentsData
    ? intentsData.map((intent) => ({
        id: intent.getCategory(),
        name: t(`themes.intents.${intent.getCategory()}`),
        description: t(`themes.intents.${intent.getCategory()}_desc`),
        count: intent.getPostCount(),
        type: 'ai-tagged' as const,
      }))
    : []

  const allThemes: ThemeGridItem[] = [
    ...SCORING_THEMES,
    ...aiTaggedThemes,
  ]

  const topicTableItems = topics.map((topic) => {
    const period = topic.getMentionPeriod()
    const frequencyUnit: 'day' | 'week' | 'mo' = period === 'month' ? 'mo' : period === 'week' ? 'week' : 'day'
    return {
      id: topic.getId(),
      name: topic.getName(),
      growth: topic.getGrowthPercentage(),
      frequency: topic.getMentionFrequency(),
      frequencyUnit,
      subreddits: topic.getCommunities().map((c) => c.name),
      growthSource: topic.getGrowthSource(),
      growthTrend: topic.getGrowthTrend(),
    }
  })

  const scoringNameKeys: Record<string, string> = {
    th1: 'themes.hotDiscussions',
    th2: 'themes.topContent',
  }

  const handleThemeSelect = (theme: { id: string; name: string; type: string }) => {
    if (theme.type === 'scoring') {
      const window = theme.id === 'th1' ? 'week' as const : 'month' as const
      const query = window === 'week' ? weekQuery : monthQuery
      const translatedName = scoringNameKeys[theme.id] ? t(scoringNameKeys[theme.id]) : theme.name

      if (query.data?.status === 'ready' && query.data.data) {
        setSelectedTheme(mapScoringThemesToDetail(theme.id, translatedName, query.data.data, window))
        setSelectedIntentCategory(null)
      } else if (query.data?.status === 'no_analysis' || query.data?.status === 'failed') {
        refreshMutation.mutate({ audienceId, window })
      }
    } else {
      const intent = intentsQuery.data?.data?.find((i) => i.getCategory() === theme.id)
      if (intent) {
        setSelectedTheme(mapIntentToDetail(intent, t))
        setSelectedIntentCategory(intent.getCategory())
      }
    }
  }

  const handleRefreshIntents = () => {
    refreshIntentsMutation.mutate({ audienceId, window: 'week' })
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList>
        <TabsTrigger value="search">
          {t('tabs.search')}
        </TabsTrigger>
        <TabsTrigger value="subreddits" count={communitiesCount}>
          {t('tabs.subreddits')}
        </TabsTrigger>
        <TabsTrigger value="topics" count={totalTopics}>
          {t('tabs.topics')}
        </TabsTrigger>
        <TabsTrigger value="themes">
          <Sparkles className="w-4 h-4" />
          {t('tabs.themes')}
        </TabsTrigger>
        <TabsTrigger value="alerts" count={alertsCount > 0 ? alertsCount : undefined}>
          <Bell className="w-4 h-4" />
          {t('tabs.alerts')}
        </TabsTrigger>
        <TabsTrigger value="content">
          <Lightbulb className="w-4 h-4" />
          {t('tabs.content')}
        </TabsTrigger>
        <TabsTrigger value="ask">
          <Sparkles className="w-4 h-4" />
          {t('tabs.ask')}
        </TabsTrigger>
        <TabsTrigger value="products">
          <Sparkles className="w-4 h-4" />
          {t('tabs.products')}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="search" className="mt-6">
        <SearchTabContent
          contentRef={contentRef}
          subredditsData={subredditsData}
          communitiesCount={communitiesCount}
          keywords={keywords}
          isLoadingKeywords={isLoadingKeywords}
          isUserAudience={isUserAudience}
          onAddCommunity={onAddCommunity}
          onSubredditClick={() => setActiveTab('subreddits')}
          topics={topics}
          totalTopics={totalTopics}
          onTopicClick={() => setActiveTab('topics')}
        />
      </TabsContent>

      <TabsContent value="subreddits" className="mt-6">
        <SubredditsTabContent
          subredditsData={subredditsData}
          communitiesCount={communitiesCount}
          audienceName={audienceName}
          audienceStats={audienceStats}
          radarData={radarData}
          similarCommunities={similarCommunities}
          isLoadingSuggestions={isLoadingSuggestions}
          onAddToAudience={onAddToAudience}
          onMarkNotRelevant={onMarkNotRelevant}
        />
      </TabsContent>

      <TabsContent value="topics" className="mt-6">
        {isLoadingTopics ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-lime border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="flex gap-6">
            <TopicsTable
              topics={topicTableItems}
              totalCount={totalTopics}
              selectedTopicId={selectedTopic?.id}
              onLoadMore={onLoadMoreTopics}
              hasMore={hasMoreTopics}
              isLoadingMore={isLoadingMoreTopics}
              onTopicSelect={(topic) => {
                const fullTopic = topics.find((t) => t.getId() === topic.id)
                if (fullTopic) {
                  const period = fullTopic.getMentionPeriod()
                  const frequencyUnit: 'day' | 'week' | 'mo' = period === 'month' ? 'mo' : period === 'week' ? 'week' : 'day'
                  setSelectedTopic({
                    id: fullTopic.getId(),
                    name: fullTopic.getName(),
                    frequency: fullTopic.getMentionFrequency(),
                    frequencyUnit,
                    growth: fullTopic.getGrowthPercentage(),
                    description: fullTopic.getDescription(),
                    subreddits: fullTopic.getCommunities().map((c) => ({
                      name: c.name,
                      postCount: c.postCount,
                    })),
                    growthSource: fullTopic.getGrowthSource(),
                    growthTrend: fullTopic.getGrowthTrend(),
                  })
                }
              }}
            />
            {isDesktop ? (
              <div className="w-1/2 shrink-0">
                <TopicDetailPanel topic={selectedTopic} audienceId={audienceId} />
              </div>
            ) : (
              <Sheet open={!!selectedTopic} onOpenChange={(open) => { if (!open) setSelectedTopic(null) }}>
                <SheetContent side="right" className="sm:max-w-lg overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>{selectedTopic?.name}</SheetTitle>
                    <SheetDescription>{selectedTopic?.description}</SheetDescription>
                  </SheetHeader>
                  <div className="px-4">
                    <TopicDetailPanel topic={selectedTopic} audienceId={audienceId} embedded />
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        )}
      </TabsContent>

      <TabsContent value="themes" className="mt-6">
        <div className="flex gap-6">
          <div className="flex-1">
            <ThemesGrid
              themes={allThemes}
              selectedThemeId={selectedTheme?.id}
              onThemeSelect={handleThemeSelect}
              intentsStatus={intentsStatus}
              onRefreshIntents={handleRefreshIntents}
              isRefreshing={refreshIntentsMutation.isPending}
            />
          </div>
          {isDesktop ? (
            <div className="w-1/2 shrink-0">
              <ThemeDetailPanel
                theme={selectedTheme}
                audienceId={audienceId}
                intentCategory={selectedIntentCategory}
              />
            </div>
          ) : (
            <Sheet open={!!selectedTheme} onOpenChange={(open) => { if (!open) setSelectedTheme(null) }}>
              <SheetContent side="right" className="sm:max-w-lg overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>{selectedTheme?.name}</SheetTitle>
                  <SheetDescription>{selectedTheme?.description}</SheetDescription>
                </SheetHeader>
                <div className="px-4">
                  <ThemeDetailPanel
                    theme={selectedTheme}
                    audienceId={audienceId}
                    intentCategory={selectedIntentCategory}
                    embedded
                  />
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </TabsContent>

      <TabsContent value="alerts" className="mt-6">
        <AlertsTabContent audienceId={audienceId} />
      </TabsContent>

      <TabsContent value="content" className="mt-6">
        <ContentSuggestionsTabContent audienceId={audienceId} />
      </TabsContent>

      <TabsContent value="ask" className="mt-6">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 text-center">
          <Sparkles className="w-8 h-8 text-lime mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            {t('tabs.askAI')}
          </h3>
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            {t('tabs.askComingSoon')}
          </p>
        </div>
      </TabsContent>

      <TabsContent value="products" className="mt-6">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 text-center">
          <Sparkles className="w-8 h-8 text-lime mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            {t('tabs.products')}
          </h3>
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            {t('tabs.productsComingSoon')}
          </p>
        </div>
      </TabsContent>
    </Tabs>
  )
}
