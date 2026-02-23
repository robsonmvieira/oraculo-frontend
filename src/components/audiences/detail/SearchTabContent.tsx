import { type RefObject } from 'react'
import { useTranslation } from 'react-i18next'
import { Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { SubredditsList } from './SubredditsList'
import { ThemesList } from './ThemesList'
import { TopicsList } from './TopicsList'
import { KeywordTags } from './KeywordTags'
import type { SubredditDetail } from '@/data/audienceDetails'
import type { Keyword } from '@/modules/audience/domain/entities/Keyword.entity'
import type { Topic } from '@/modules/audience/domain/entities/Topic.entity'

export interface SearchTabContentProps {
  contentRef: RefObject<HTMLDivElement | null>
  subredditsData: readonly SubredditDetail[]
  communitiesCount: number
  keywords: Keyword[]
  isLoadingKeywords: boolean
  isUserAudience: boolean
  onAddCommunity: () => void
  onSubredditClick: () => void
  topics: Topic[]
  totalTopics: number
  onTopicClick: () => void
}

export function SearchTabContent({
  contentRef,
  subredditsData,
  communitiesCount,
  keywords,
  isLoadingKeywords,
  isUserAudience,
  onAddCommunity,
  onSubredditClick,
  topics,
  totalTopics,
  onTopicClick,
}: Readonly<SearchTabContentProps>) {
  const { t } = useTranslation('audiences')

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            {t('search.keywordSearch')}
          </label>
          <Input
            icon
            placeholder={t('search.searchPlaceholder')}
            className="max-w-2xl"
          />
        </div>

        <KeywordTags keywords={keywords} isLoading={isLoadingKeywords} />
      </div>

      <div
        ref={contentRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {t('subreddits.title')}
              </h3>
              <span className="text-sm text-gray-500 dark:text-zinc-400">
                {communitiesCount}
              </span>
            </div>
            {isUserAudience && (
              <button
                className="cursor-pointer flex items-center gap-1 text-sm text-gray-500 dark:text-zinc-400 hover:text-lime transition-colors"
                onClick={onAddCommunity}
              >
                <Plus className="w-4 h-4" />
                {t('detail.add')}
              </button>
            )}
          </div>
          <SubredditsList
            subreddits={subredditsData}
            totalCount={communitiesCount}
            showHeader={false}
            onSubredditClick={onSubredditClick}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {t('themes.title')}
            </h3>
            <span className="text-sm text-gray-500 dark:text-zinc-400">
              0
            </span>
          </div>
          <ThemesList
            themes={[]}
            totalCount={0}
            showHeader={false}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {t('topics.title')}
            </h3>
            <span className="text-sm text-gray-500 dark:text-zinc-400">
              {totalTopics}
            </span>
          </div>
          <TopicsList
            topics={topics}
            totalCount={totalTopics}
            showHeader={false}
            onTopicClick={onTopicClick}
          />
        </div>
      </div>
    </div>
  )
}
