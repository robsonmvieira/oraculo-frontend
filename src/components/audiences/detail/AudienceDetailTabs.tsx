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
import { themesGridData, themesDetailData, topicsData } from '@/data/audienceDetailMocks'

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
}: Readonly<AudienceDetailTabsProps>) {
  const [activeTab, setActiveTab] = useState('search')
  const [selectedTopic, setSelectedTopic] = useState<TopicDetail | null>(null)
  const [selectedTheme, setSelectedTheme] = useState<ThemeDetail | null>(null)

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList>
        <TabsTrigger value="search">
          Search
        </TabsTrigger>
        <TabsTrigger value="subreddits" count={communitiesCount}>
          Subreddits
        </TabsTrigger>
        <TabsTrigger value="topics" count={200}>
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
        <div className="flex gap-6">
          <TopicsTable
            topics={topicsData}
            totalCount={200}
            selectedTopicId={selectedTopic?.id}
            onTopicSelect={(topic) => {
              const fullTopic = topicsData.find((t) => t.id === topic.id)
              if (fullTopic) {
                setSelectedTopic({
                  id: fullTopic.id,
                  name: fullTopic.name,
                  frequency: fullTopic.frequency,
                  frequencyUnit: fullTopic.frequencyUnit,
                  growth: fullTopic.growth,
                  description: fullTopic.description,
                  subreddits: fullTopic.subredditCounts,
                })
              }
            }}
          />
          <div className="w-1/2 shrink-0">
            <TopicDetailPanel topic={selectedTopic} />
          </div>
        </div>
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
