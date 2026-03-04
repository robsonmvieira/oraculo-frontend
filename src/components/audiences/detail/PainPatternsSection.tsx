import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronRight, ChevronDown, ArrowUp, MessageCircle, ExternalLink, Bookmark, FileText, RefreshCw, Loader2, Lightbulb, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { PainPattern, SubmissionTopComment } from '@/modules/audience/domain/entities/IntentCategory.entity'

export interface PainPatternsSectionProps {
  patterns: PainPattern[]
  intentCategory?: string | null
  onRefresh?: () => void
  isRefreshing?: boolean
}

function formatNumber(num: number): string {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(num >= 10000 ? 0 : 1).replace(/\.0$/, '')}k`
  }
  return num.toLocaleString()
}

const validationBadgeVariant = {
  high: 'success',
  medium: 'warning',
  low: 'neutral',
} as const

const consensusBadgeVariant = {
  strong: 'success',
  moderate: 'info',
  weak: 'neutral',
  divided: 'warning',
} as const

function SubmissionComments({ comments }: Readonly<{ comments: SubmissionTopComment[] }>) {
  const { t } = useTranslation('audiences')
  const [showComments, setShowComments] = useState(false)

  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          setShowComments(!showComments)
        }}
        className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
      >
        <MessageCircle className="w-3 h-3" />
        {showComments
          ? t('themes.painPatterns.hideComments')
          : t('themes.painPatterns.showComments', { count: comments.length })
        }
        {showComments
          ? <ChevronDown className="w-3 h-3" />
          : <ChevronRight className="w-3 h-3" />
        }
      </button>
      {showComments && (
        <div className="mt-2 space-y-2 pl-3 border-l-2 border-gray-200 dark:border-zinc-700">
          {comments.map((comment, idx) => (
            <div key={idx} className="text-xs">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-medium text-gray-700 dark:text-zinc-300">
                  u/{comment.author}
                </span>
                <span className="flex items-center gap-0.5 text-gray-400 dark:text-zinc-500">
                  <ArrowUp className="w-2.5 h-2.5" />
                  {comment.score}
                </span>
              </div>
              <p className="text-gray-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
                {comment.body}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
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
              <div className="flex items-center gap-2 min-w-0">
                <h5 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  <span className="mr-1.5">{pattern.emoji}</span>
                  {pattern.name}
                </h5>
                {pattern.validationScore && (
                  <Badge variant={validationBadgeVariant[pattern.validationScore]} size="sm">
                    {t(`themes.painPatterns.validation${pattern.validationScore.charAt(0).toUpperCase()}${pattern.validationScore.slice(1)}`)}
                  </Badge>
                )}
                {pattern.communityConsensus && (
                  <Badge variant={consensusBadgeVariant[pattern.communityConsensus]} size="sm">
                    {t(`themes.painPatterns.consensus${pattern.communityConsensus.charAt(0).toUpperCase()}${pattern.communityConsensus.slice(1)}`)}
                  </Badge>
                )}
              </div>
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
          {pattern.suggestedCoping && pattern.suggestedCoping.length > 0 && (
            <div className="mb-4 pb-3 border-b border-gray-200 dark:border-zinc-700">
              <h6 className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-zinc-300 mb-2">
                <Lightbulb className="w-3.5 h-3.5" />
                {t('themes.painPatterns.communitySuggests')}
              </h6>
              <ul className="space-y-1">
                {pattern.suggestedCoping.map((suggestion, idx) => (
                  <li key={idx} className="text-xs text-gray-600 dark:text-zinc-400 flex items-start gap-1.5">
                    <span className="text-gray-400 mt-0.5">-</span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {pattern.recommendedSolutions && pattern.recommendedSolutions.length > 0 && (
            <div className="mb-4 pb-3 border-b border-gray-200 dark:border-zinc-700">
              <h6 className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-zinc-300 mb-2">
                <Star className="w-3.5 h-3.5" />
                {t('themes.painPatterns.recommendedByCommunity')}
              </h6>
              <div className="flex flex-wrap gap-1.5">
                {pattern.recommendedSolutions.map((solution, idx) => (
                  <Badge key={idx} variant="lime" size="sm">
                    {solution}
                  </Badge>
                ))}
              </div>
            </div>
          )}

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
                {sub.topComments && sub.topComments.length > 0 && (
                  <SubmissionComments comments={sub.topComments} />
                )}
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
