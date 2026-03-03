import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Lightbulb, RefreshCw, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from '@/hooks/useToast'
import { useGetContentSuggestions, useRefreshContentSuggestions, useSendContentSuggestionFeedback } from '@/modules/audience/application/hooks'
import type { ContentSuggestion, ContentSuggestionPriority, ContentSuggestionFeedbackStatus } from '@/modules/audience/domain/entities/ContentSuggestion.entity'
import { ContentSuggestionCard } from './ContentSuggestionCard'
import { ContentSuggestionDrawer } from './ContentSuggestionDrawer'

export interface ContentSuggestionsTabContentProps {
  audienceId: string
}

const PRIORITIES: (ContentSuggestionPriority | undefined)[] = [undefined, 'high', 'medium', 'low']
const PAGE_SIZE = 10

export function ContentSuggestionsTabContent({ audienceId }: Readonly<ContentSuggestionsTabContentProps>) {
  const { t } = useTranslation('audiences')

  const [selectedPriority, setSelectedPriority] = useState<ContentSuggestionPriority | undefined>(undefined)
  const [selectedSuggestion, setSelectedSuggestion] = useState<ContentSuggestion | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [offset, setOffset] = useState(0)
  const [allSuggestions, setAllSuggestions] = useState<ContentSuggestion[]>([])
  const sentinelRef = useRef<HTMLDivElement>(null)

  const { data, isLoading } = useGetContentSuggestions(
    audienceId,
    { priority: selectedPriority, limit: PAGE_SIZE, offset },
  )

  const refreshMutation = useRefreshContentSuggestions()
  const feedbackMutation = useSendContentSuggestionFeedback()

  const status = data?.status ?? 'no_analysis'

  useEffect(() => {
    if (data?.suggestions && data.suggestions.length > 0) {
      setAllSuggestions((prev) => {
        if (offset === 0) return data.suggestions
        const existingIds = new Set(prev.map((s) => s.getId()))
        const newItems = data.suggestions.filter((s) => !existingIds.has(s.getId()))
        return [...prev, ...newItems]
      })
    } else if (offset === 0) {
      setAllSuggestions([])
    }
  }, [data?.suggestions, offset])

  useEffect(() => {
    setOffset(0)
    setAllSuggestions([])
  }, [selectedPriority])

  const hasMore = data ? offset + PAGE_SIZE < data.total : false

  useEffect(() => {
    if (!hasMore || isLoading || status !== 'ready') return

    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setOffset((prev) => prev + PAGE_SIZE)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasMore, isLoading, status])

  const handleRefresh = () => {
    refreshMutation.mutate({ audienceId }, {
      onSuccess: (result) => {
        if (result.status === 'already_exists') {
          toast({ title: t('contentSuggestions.alreadyExists'), variant: 'default' })
        }
      },
      onError: () => {
        toast({ title: t('contentSuggestions.failed'), variant: 'destructive' })
      },
    })
  }

  const handleFeedback = (suggestionId: string, feedbackStatus: ContentSuggestionFeedbackStatus) => {
    feedbackMutation.mutate({ audienceId, suggestionId, status: feedbackStatus }, {
      onSuccess: () => {
        toast({ title: t('contentSuggestions.feedback.sent'), variant: 'success' })
      },
      onError: () => {
        toast({ title: t('contentSuggestions.feedback.error'), variant: 'destructive' })
      },
    })
  }

  const handleSelect = (suggestion: ContentSuggestion) => {
    setSelectedSuggestion(suggestion)
    setDrawerOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {PRIORITIES.map((p) => {
          const key = p ?? 'all'
          const isActive = selectedPriority === p
          return (
            <button
              key={key}
              onClick={() => setSelectedPriority(p)}
              className={cn(
                'px-3 py-1.5 text-sm rounded-lg border transition-colors cursor-pointer',
                isActive
                  ? 'border-lime bg-lime/10 text-lime-700 dark:text-lime-300'
                  : 'border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-zinc-400 hover:border-gray-300 dark:hover:border-zinc-600'
              )}
            >
              {t(`contentSuggestions.priority.${key}`)}
            </button>
          )
        })}

        <div className="ml-auto flex items-center gap-2">
          {data?.analysis && (
            <span className="text-xs text-gray-400 dark:text-zinc-500">
              {t('contentSuggestions.modulesUsed')}: {data.analysis.getModulesUsed().length}
            </span>
          )}
          <button
            onClick={handleRefresh}
            disabled={refreshMutation.isPending || status === 'processing'}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg bg-lime text-black hover:bg-lime/90 transition-colors cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={cn('w-3.5 h-3.5', (refreshMutation.isPending || status === 'processing') && 'animate-spin')} />
            {status === 'no_analysis' ? t('contentSuggestions.generate') : t('contentSuggestions.regenerate')}
          </button>
        </div>
      </div>

      {(isLoading && offset === 0) ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-lime border-t-transparent rounded-full animate-spin" />
        </div>
      ) : status === 'processing' ? (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 text-center border border-gray-100 dark:border-zinc-800">
          <div className="w-8 h-8 border-4 border-lime border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm font-medium text-gray-700 dark:text-zinc-300">
            {t('contentSuggestions.processing')}
          </p>
          <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">
            {t('contentSuggestions.processingDescription')}
          </p>
        </div>
      ) : status === 'failed' ? (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 text-center border border-red-200 dark:border-red-900/40">
          <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-3" />
          <p className="text-sm font-medium text-gray-700 dark:text-zinc-300">
            {t('contentSuggestions.failed')}
          </p>
          <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">
            {t('contentSuggestions.failedDescription')}
          </p>
          <button
            onClick={handleRefresh}
            disabled={refreshMutation.isPending}
            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-lime text-black hover:bg-lime/90 transition-colors cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={cn('w-3.5 h-3.5', refreshMutation.isPending && 'animate-spin')} />
            {t('contentSuggestions.retry')}
          </button>
        </div>
      ) : status === 'no_analysis' || allSuggestions.length === 0 ? (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 text-center border border-gray-100 dark:border-zinc-800">
          <Lightbulb className="w-8 h-8 text-gray-300 dark:text-zinc-600 mx-auto mb-3" />
          <p className="text-sm font-medium text-gray-700 dark:text-zinc-300">
            {t('contentSuggestions.empty')}
          </p>
          <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">
            {t('contentSuggestions.emptyDescription')}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {allSuggestions.map((suggestion) => (
            <ContentSuggestionCard
              key={suggestion.getId()}
              suggestion={suggestion}
              onSelect={handleSelect}
              onFeedback={handleFeedback}
              isSendingFeedback={feedbackMutation.isPending}
            />
          ))}

          {hasMore && (
            <div ref={sentinelRef} className="flex items-center justify-center py-4">
              <div className="w-6 h-6 border-3 border-lime border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      )}

      <ContentSuggestionDrawer
        suggestion={selectedSuggestion}
        audienceId={audienceId}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onFeedback={handleFeedback}
        isSendingFeedback={feedbackMutation.isPending}
      />
    </div>
  )
}
