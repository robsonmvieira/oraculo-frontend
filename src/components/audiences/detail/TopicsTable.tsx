import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Search, ChevronDown, TrendingUp, TrendingDown, Minus, Loader2 } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'

export interface TopicTableItem {
  id: string
  name: string
  growth: number
  frequency: number
  frequencyUnit: 'day' | 'week' | 'mo'
  subreddits: string[]
  growthSource?: 'calculated' | 'estimated' | null
  growthTrend?: 'up' | 'stable' | 'down' | null
}

export interface TopicsTableProps {
  topics: readonly TopicTableItem[]
  totalCount: number
  selectedTopicId?: string | null
  onTopicSelect?: (topic: TopicTableItem) => void
  onLoadMore?: () => void
  hasMore?: boolean
  isLoadingMore?: boolean
}

import { SparkLine } from './SparkLine'

type SortOption = 'growth' | 'frequency' | 'name'

export function TopicsTable({
  topics,
  totalCount,
  selectedTopicId,
  onTopicSelect,
  onLoadMore,
  hasMore,
  isLoadingMore,
}: Readonly<TopicsTableProps>) {
  const { t } = useTranslation('audiences')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('growth')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const sentinel = sentinelRef.current
    const root = scrollContainerRef.current
    if (!sentinel || !root) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          onLoadMore?.()
        }
      },
      { root, threshold: 0.1 }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasMore, isLoadingMore, onLoadMore])

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'growth', label: t('topics.sortByGrowth') },
    { value: 'frequency', label: t('topics.sortByFrequency') },
    { value: 'name', label: t('topics.sortByName') },
  ]

  const filteredTopics = topics.filter((topic) =>
    topic.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const sortedTopics = [...filteredTopics].sort((a, b) => {
    switch (sortBy) {
      case 'growth':
        return b.growth - a.growth
      case 'frequency':
        return b.frequency - a.frequency
      case 'name':
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  useEffect(() => {
    if (!listRef.current || prefersReducedMotion) return

    const items = Array.from(listRef.current.children)
    gsap.fromTo(
      items,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.03,
        ease: 'power2.out',
      }
    )
  }, [prefersReducedMotion, sortBy, searchQuery])

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {t('topics.popularTopics')}
          </h3>
          <span className="text-sm text-gray-500 dark:text-zinc-400">
            {totalCount}
          </span>
        </div>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="cursor-pointer flex items-center gap-2 text-sm text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:hover:text-white transition-colors"
          >
            {t('topics.sortBy', { label: sortOptions.find((o) => o.value === sortBy)?.label })}
            <ChevronDown className="w-4 h-4" />
          </button>
          {isDropdownOpen && (
            <div>
              <button
                className="fixed inset-0 z-10"
                onClick={() => setIsDropdownOpen(false)}
              />
              <div className="absolute right-0 top-full mt-1 z-20 bg-white dark:bg-zinc-800 rounded-lg shadow-lg border border-gray-200 dark:border-zinc-700 py-1 min-w-[120px]">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value)
                      setIsDropdownOpen(false)
                    }}
                    className={`cursor-pointer w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors ${
                      sortBy === option.value
                        ? 'text-lime font-medium'
                        : 'text-gray-700 dark:text-zinc-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-zinc-500" />
          <input
            type="text"
            placeholder={t('topics.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-lime/50 focus:border-lime transition-colors"
          />
        </div>
      </div>

      <div ref={scrollContainerRef} className="max-h-[900px] overflow-y-auto">
        <div ref={listRef} className="space-y-2">
          {sortedTopics.map((topic) => {
            const trendColorMap = { down: 'text-red-500', stable: 'text-yellow-500', up: 'text-green-500' }
            const sparkColorMap = { down: '#ef4444', stable: '#eab308', up: '#4ade80' }
            const trendIconMap = { down: TrendingDown, stable: Minus, up: TrendingUp }
            const trendKey = topic.growthTrend ?? 'up'
            const trendColor = trendColorMap[trendKey] ?? 'text-green-500'
            const sparkColor = sparkColorMap[trendKey] ?? '#4ade80'
            const TrendIcon = trendIconMap[trendKey] ?? TrendingUp

            return (
            <button
              type="button"
              key={topic.id}
              onClick={() => onTopicSelect?.(topic)}
              className={`w-full text-left bg-white dark:bg-zinc-800 border rounded-xl p-4 transition-colors cursor-pointer ${
                selectedTopicId === topic.id
                  ? 'border-lime'
                  : 'border-gray-200 dark:border-zinc-700 hover:border-lime dark:hover:border-lime'
              }`}
            >
              <div className="flex items-center gap-4">
                <p className="font-semibold text-gray-900 dark:text-white truncate  shrink-0">
                  {topic.name}
                </p>

                <div className="flex items-center gap-4 flex-1 justify-end">
                  <div className="w-[70px] shrink-0">
                    <SparkLine growth={topic.growth} strokeColor={sparkColor} />
                  </div>

                  <div className={`flex items-center gap-1 text-sm font-medium w-20 shrink-0 ${trendColor}`}>
                    <TrendIcon className="w-4 h-4" />
                    <span>{topic.growth}%</span>
                    {topic.growthSource && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className={`text-[9px] px-1 py-0.5 rounded-full leading-none cursor-help ${
                            topic.growthSource === 'calculated'
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                              : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                          }`}>
                            {topic.growthSource === 'calculated' ? 'C' : 'E'}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          {topic.growthSource === 'calculated'
                            ? t('topicDetail.calculatedTooltip')
                            : t('topicDetail.estimatedTooltip')}
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>

                  <div className="text-sm text-right shrink-0 truncate mr-2">
                    <span className="text-lime font-semibold mr-2">
                      {topic.frequency} / {topic.frequencyUnit}
                    </span>
                    <span className="text-gray-500 dark:text-zinc-400 mr-2">{t('topics.in')}</span>
                    <span className="text-gray-700 dark:text-zinc-300">
                      {topic.subreddits.slice(0, 2).join(', ')}
                    </span>
                    {topic.subreddits.length > 2 && (
                      <span className="text-gray-400 dark:text-zinc-500">
                        {t('topics.andOthers', { count: topic.subreddits.length - 2 })}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
            )
          })}
        </div>

        {sortedTopics.length === 0 && (
          <div className="py-8 text-center text-gray-500 dark:text-zinc-400 bg-white dark:bg-zinc-800 rounded-xl border border-gray-200 dark:border-zinc-700">
            {t('topics.noTopicsFound')}
          </div>
        )}

        <div ref={sentinelRef}>
          {isLoadingMore && (
            <div className="flex justify-center py-4">
              <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
