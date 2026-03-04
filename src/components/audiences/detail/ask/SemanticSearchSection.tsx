import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Search, Loader2, AlertCircle, ChevronRight, ChevronDown, ArrowUp, MessageCircle, ExternalLink, Zap, Database, Target } from 'lucide-react'
import { Button } from '@/components/ui'
import { Badge } from '@/components/ui/badge'
import { useSemanticSearch } from '@/modules/audience/application/hooks'
import type { SemanticSearchResult } from '@/modules/audience/domain/entities/SemanticSearchResult.entity'
import type { SemanticSearchPattern } from '@/modules/audience/domain/entities/SemanticSearchResult.entity'

interface SemanticSearchSectionProps {
  audienceId: string
}

function formatNumber(num: number): string {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(num >= 10000 ? 0 : 1).replace(/\.0$/, '')}k`
  }
  return num.toLocaleString()
}

function SemanticPatternCard({ pattern }: Readonly<{ pattern: SemanticSearchPattern }>) {
  const { t } = useTranslation('audiences')
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="rounded-lg bg-gray-50 dark:bg-zinc-800 overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-4 hover:bg-gray-100 dark:hover:bg-zinc-750 transition-colors"
      >
        <div className="flex items-start gap-3">
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              {pattern.postCount}
            </span>
            {expanded
              ? <ChevronDown className="w-4 h-4 text-gray-400 dark:text-zinc-500" />
              : <ChevronRight className="w-4 h-4 text-gray-400 dark:text-zinc-500" />
            }
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h5 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                <span className="mr-1.5">{pattern.emoji}</span>
                {pattern.name}
              </h5>
              <div className="flex items-center gap-3 shrink-0 text-xs text-gray-500 dark:text-zinc-400">
                <span className="flex items-center gap-1">
                  <ArrowUp className="w-3 h-3" />
                  {formatNumber(pattern.totalUpvotes)}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="w-3 h-3" />
                  {formatNumber(pattern.totalComments)}
                </span>
              </div>
            </div>
            {pattern.description && (
              <p className="mt-1 text-xs text-gray-500 dark:text-zinc-400 line-clamp-2">
                {pattern.description}
              </p>
            )}
            {!expanded && (
              <ul className="mt-2 space-y-0.5">
                {pattern.submissions.slice(0, 3).map((sub, i) => (
                  <li key={i} className="text-xs text-gray-500 dark:text-zinc-400 truncate">
                    - {sub.title}
                  </li>
                ))}
                {pattern.submissions.length > 3 && (
                  <li className="text-xs text-gray-400 dark:text-zinc-500">
                    +{pattern.submissions.length - 3} more
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4">
          <div className="border-t border-gray-200 dark:border-zinc-700 pt-4 space-y-4">
            {pattern.submissions.map((sub, i) => (
              <div key={i}>
                <h6 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                  {sub.title}
                </h6>
                {sub.body && (
                  <p className="text-xs text-gray-600 dark:text-zinc-300 leading-relaxed mb-2 line-clamp-3">
                    {sub.body}
                  </p>
                )}
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-zinc-400">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <ArrowUp className="w-3 h-3" />
                      {sub.score}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      {sub.numComments}
                    </span>
                    <span>{sub.subreddit}</span>
                    {sub.permalink && (
                      <a
                        href={`https://reddit.com${sub.permalink}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:hover:text-zinc-300 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <span className="text-[10px] text-gray-400 dark:text-zinc-500">
                    {t('semanticSearch.similarity', { value: Math.round(sub.similarity * 100) })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function SemanticSearchSection({ audienceId }: Readonly<SemanticSearchSectionProps>) {
  const { t } = useTranslation('audiences')
  const [query, setQuery] = useState('')
  const [lastResult, setLastResult] = useState<SemanticSearchResult | null>(null)
  const semanticSearch = useSemanticSearch()

  const trimmedQuery = query.trim()
  const isValid = trimmedQuery.length >= 3

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid || semanticSearch.isPending) return

    semanticSearch.mutate(
      { audienceId, query: trimmedQuery },
      {
        onSuccess: (data) => {
          setLastResult(data)
        },
      }
    )
  }

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
        {t('semanticSearch.title')}
      </h3>
      <p className="text-sm text-gray-500 dark:text-zinc-400 mb-4">
        {t('semanticSearch.subtitle')}
      </p>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('semanticSearch.placeholder')}
          maxLength={500}
          disabled={semanticSearch.isPending}
          className="flex-1 h-9 px-3 text-sm rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-lime focus:border-transparent disabled:opacity-50"
        />
        <Button
          type="submit"
          variant="primary"
          size="sm"
          disabled={!isValid || semanticSearch.isPending}
          className="gap-1.5"
        >
          {semanticSearch.isPending ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Search className="w-3.5 h-3.5" />
          )}
          {semanticSearch.isPending ? t('semanticSearch.searching') : t('semanticSearch.send')}
        </Button>
      </form>

      {trimmedQuery.length > 0 && trimmedQuery.length < 3 && (
        <p className="text-xs text-amber-500 mb-3">
          {t('semanticSearch.minLength')}
        </p>
      )}

      {semanticSearch.isError && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 mb-4">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
          <p className="text-sm text-red-600 dark:text-red-400">
            {t('semanticSearch.error')}
          </p>
        </div>
      )}

      {semanticSearch.isPending && (
        <div className="flex flex-col items-center gap-3 py-8">
          <Loader2 className="w-6 h-6 animate-spin text-lime" />
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            {t('semanticSearch.searching')}
          </p>
        </div>
      )}

      {lastResult && !semanticSearch.isPending && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="neutral" size="sm" className="gap-1">
              <Database className="w-3 h-3" />
              {t('semanticSearch.postsSearched', { count: lastResult.getTotalPostsSearched() })}
            </Badge>
            <Badge variant="neutral" size="sm" className="gap-1">
              <Target className="w-3 h-3" />
              {t('semanticSearch.postsMatched', { count: lastResult.getTotalPostsMatched() })}
            </Badge>
            <Badge
              variant={lastResult.getContextQuality() === 'rich' ? 'success' : 'warning'}
              size="sm"
            >
              {lastResult.getContextQuality() === 'rich'
                ? t('semanticSearch.contextRich')
                : t('semanticSearch.contextLimited')}
            </Badge>
            {lastResult.isCached() && (
              <Badge variant="info" size="sm" className="gap-1">
                <Zap className="w-3 h-3" />
                {t('semanticSearch.cached')}
              </Badge>
            )}
          </div>

          <div className="p-4 rounded-lg bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-700">
            <h4 className="text-xs font-medium text-gray-500 dark:text-zinc-400 mb-2">
              {t('semanticSearch.answer')}
            </h4>
            <p className="text-sm text-gray-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
              {lastResult.getAnswer()}
            </p>
          </div>

          {lastResult.getPatterns().length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-3">
                {t('semanticSearch.patterns')}
                <span className="ml-2 text-xs text-gray-500 dark:text-zinc-400">
                  {lastResult.getPatternCount()}
                </span>
              </h4>
              <div className="space-y-2">
                {lastResult.getPatterns().map((pattern, i) => (
                  <SemanticPatternCard key={i} pattern={pattern} />
                ))}
              </div>
            </div>
          )}

          {lastResult.getPatterns().length === 0 && (
            <p className="text-sm text-gray-500 dark:text-zinc-400 text-center py-4">
              {t('semanticSearch.noResults')}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
