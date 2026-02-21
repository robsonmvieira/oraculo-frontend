import { useState, type RefObject } from 'react'
import { Sparkles } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  TopicsTable,
  TopicDetailPanel,
  ThemesGrid,
  ThemeDetailPanel,
  SearchTabContent,
  SubredditsTabContent,
} from '@/components/audiences/detail'
import type { TopicDetail, ThemeDetail } from '@/components/audiences/detail'
import type { SimilarCommunity } from './SimilarCommunitiesGrid'
import type { SubredditDetail } from '@/data/audienceDetails'
import type { Keyword } from '@/modules/audience/domain/entities/Keyword.entity'
import type { Topic } from '@/modules/audience/domain/entities/Topic.entity'
import { themesGridData, themesDetailData } from '@/data/audienceDetailMocks'

export interface AudienceDetailTabsProps {
  contentRef: RefObject<HTMLDivElement | null>
  subredditsData: readonly SubredditDetail[]
  communitiesCount: number
  audienceName: string
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
}

export function AudienceDetailTabs({
  contentRef,
  subredditsData,
  communitiesCount,
  audienceName,
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
}: Readonly<AudienceDetailTabsProps>) {
  const [activeTab, setActiveTab] = useState('search')
  const [selectedTopic, setSelectedTopic] = useState<TopicDetail | null>(null)
  const [selectedTheme, setSelectedTheme] = useState<ThemeDetail | null>(null)

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
    }
  })

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList>
        <TabsTrigger value="search">
          Search
        </TabsTrigger>
        <TabsTrigger value="subreddits" count={communitiesCount}>
          Subreddits
        </TabsTrigger>
        <TabsTrigger value="topics" count={totalTopics}>
          Topics
        </TabsTrigger>
        <TabsTrigger value="themes">
          <Sparkles className="w-4 h-4" />
          Themes
        </TabsTrigger>
        <TabsTrigger value="ask">
          <Sparkles className="w-4 h-4" />
          Ask
        </TabsTrigger>
        <TabsTrigger value="products">
          <Sparkles className="w-4 h-4" />
          Products
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
        />
      </TabsContent>

      <TabsContent value="subreddits" className="mt-6">
        <SubredditsTabContent
          subredditsData={subredditsData}
          communitiesCount={communitiesCount}
          audienceName={audienceName}
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
                  })
                }
              }}
            />
            <div className="w-1/2 shrink-0">
              <TopicDetailPanel topic={selectedTopic} />
            </div>
          </div>
        )}
      </TabsContent>

      <TabsContent value="themes" className="mt-6">
        <div className="flex gap-6">
          <div className="flex-1">
            <ThemesGrid
              themes={themesGridData}
              selectedThemeId={selectedTheme?.id}
              onThemeSelect={(theme) => {
                const detailData = themesDetailData[theme.id]
                if (detailData) {
                  setSelectedTheme({
                    id: theme.id,
                    name: theme.name,
                    ...detailData,
                  })
                }
              }}
            />
          </div>
          <div className="w-1/2 shrink-0">
            <ThemeDetailPanel theme={selectedTheme} />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="ask" className="mt-6">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 text-center">
          <Sparkles className="w-8 h-8 text-lime mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            Ask AI
          </h3>
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            Coming soon - Ask questions about this audience
          </p>
        </div>
      </TabsContent>

      <TabsContent value="products" className="mt-6">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 text-center">
          <Sparkles className="w-8 h-8 text-lime mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            Products
          </h3>
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            Coming soon - Discover products relevant to this audience
          </p>
        </div>
      </TabsContent>
    </Tabs>
  )
}
