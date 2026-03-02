import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronRight, ChevronDown, ArrowUp, MessageCircle, ExternalLink, Bookmark, FileText, RefreshCw, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { PainPattern } from '@/modules/audience/domain/entities/IntentCategory.entity'

export interface PainPatternsSectionProps {
  patterns: PainPattern[]
  onRefresh?: () => void
  isRefreshing?: boolean
}

function formatNumber(num: number): string {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(num >= 10000 ? 0 : 1).replace(/\.0$/, '')}k`
  }
  return num.toLocaleString()
}

function PainPatternCard({ pattern }: Readonly<{ pattern: PainPattern }>) {
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
            {!expanded && (
              <ul className="mt-2 space-y-0.5">
                {pattern.submissions.map((sub, i) => (
                  <li key={i} className="text-xs text-gray-500 dark:text-zinc-400 truncate">
                    - {sub.title}
                  </li>
                ))}
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
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 mt-4 pt-3 border-t border-gray-200 dark:border-zinc-700">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <Bookmark className="w-3.5 h-3.5" />
              {t('themes.painPatterns.bookmark', { count: pattern.submissions.length })}
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <FileText className="w-3.5 h-3.5" />
              {t('themes.painPatterns.browse', { count: pattern.submissions.length })}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export function PainPatternsSection({ patterns, onRefresh, isRefreshing }: Readonly<PainPatternsSectionProps>) {
  const { t } = useTranslation('audiences')

  if (patterns.length === 0) {
    return (
      <div className="mt-6 flex flex-col items-center gap-3 py-6">
        <p className="text-sm text-gray-500 dark:text-zinc-400">
          {t('themes.painPatterns.empty')}
        </p>
        {onRefresh && (
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={onRefresh}
            disabled={isRefreshing}
          >
            {isRefreshing
              ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
              : <RefreshCw className="w-3.5 h-3.5" />
            }
            {isRefreshing ? t('themes.painPatterns.generating') : t('themes.painPatterns.generate')}
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="mt-6">
      <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-3">
        {t('themes.painPatterns.title')}
        <span className="ml-2 text-xs text-gray-500 dark:text-zinc-400">{patterns.length}</span>
      </h4>
      <div className="space-y-2">
        {patterns.map((pattern, i) => (
          <PainPatternCard key={i} pattern={pattern} />
        ))}
      </div>
    </div>
  )
}
