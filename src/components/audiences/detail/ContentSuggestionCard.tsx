import { useTranslation } from 'react-i18next'
import { ArrowUpRight, ThumbsUp, ThumbsDown, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ContentSuggestion, ContentSuggestionFeedbackStatus } from '@/modules/audience/domain/entities/ContentSuggestion.entity'

export interface ContentSuggestionCardProps {
  suggestion: ContentSuggestion
  onSelect: (suggestion: ContentSuggestion) => void
  onFeedback: (suggestionId: string, status: ContentSuggestionFeedbackStatus) => void
  isSendingFeedback?: boolean
}

const priorityConfig: Record<string, { bgClass: string; textClass: string }> = {
  high: {
    bgClass: 'bg-red-100 dark:bg-red-900/40',
    textClass: 'text-red-700 dark:text-red-300',
  },
  medium: {
    bgClass: 'bg-orange-100 dark:bg-orange-900/40',
    textClass: 'text-orange-700 dark:text-orange-300',
  },
  low: {
    bgClass: 'bg-blue-100 dark:bg-blue-900/40',
    textClass: 'text-blue-700 dark:text-blue-300',
  },
}

export function ContentSuggestionCard({ suggestion, onSelect, onFeedback, isSendingFeedback }: Readonly<ContentSuggestionCardProps>) {
  const { t } = useTranslation('audiences')

  const priority = priorityConfig[suggestion.getPriority()] ?? priorityConfig.medium
  const currentFeedback = suggestion.getFeedbackStatus()

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-700 p-5 transition-colors hover:border-lime/50 dark:hover:border-lime/30">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-gray-400 dark:text-zinc-500">
            {t('contentSuggestions.rank', { rank: suggestion.getRank() })}
          </span>
          <span
            className={cn(
              'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
              priority.bgClass,
              priority.textClass
            )}
          >
            {t(`contentSuggestions.priority.${suggestion.getPriority()}`)}
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400">
            {t(`contentSuggestions.format.${suggestion.getFormat()}`)}
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300">
            {t(`contentSuggestions.tone.${suggestion.getEmotionalTone()}`)}
          </span>
        </div>

        <button
          onClick={() => onSelect(suggestion)}
          className="flex items-center gap-1 text-xs font-medium text-lime-600 dark:text-lime-400 hover:text-lime-700 dark:hover:text-lime-300 transition-colors flex-shrink-0 cursor-pointer"
        >
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <button
        onClick={() => onSelect(suggestion)}
        className="block w-full text-left mt-3 cursor-pointer"
      >
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white leading-snug">
          {suggestion.getTitle()}
        </h4>
        <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1.5 line-clamp-2">
          {suggestion.getApproach()}
        </p>
      </button>

      {suggestion.getSourceTopics().length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {suggestion.getSourceTopics().map((topic, i) => (
            <span
              key={topic.topicId ?? i}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-lime/10 text-lime-700 dark:text-lime-300"
            >
              {topic.topicName}
              {topic.growthPercentage != null && (
                <span className="text-lime-600 dark:text-lime-400 font-medium">
                  +{topic.growthPercentage}%
                </span>
              )}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-zinc-800">
        <span className="text-xs text-gray-400 dark:text-zinc-500 mr-auto">
          {t('contentSuggestions.feedback.title')}
        </span>
        <FeedbackButton
          status="useful"
          icon={ThumbsUp}
          label={t('contentSuggestions.feedback.useful')}
          isActive={currentFeedback === 'useful'}
          disabled={isSendingFeedback}
          onClick={() => onFeedback(suggestion.getId(), 'useful')}
        />
        <FeedbackButton
          status="not_useful"
          icon={ThumbsDown}
          label={t('contentSuggestions.feedback.not_useful')}
          isActive={currentFeedback === 'not_useful'}
          disabled={isSendingFeedback}
          onClick={() => onFeedback(suggestion.getId(), 'not_useful')}
        />
        <FeedbackButton
          status="used"
          icon={CheckCircle2}
          label={t('contentSuggestions.feedback.used')}
          isActive={currentFeedback === 'used'}
          disabled={isSendingFeedback}
          onClick={() => onFeedback(suggestion.getId(), 'used')}
        />
      </div>
    </div>
  )
}

function FeedbackButton({
  icon: Icon,
  label,
  isActive,
  disabled,
  onClick,
}: Readonly<{
  status: string
  icon: React.ElementType
  label: string
  isActive: boolean
  disabled?: boolean
  onClick: () => void
}>) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer disabled:opacity-50',
        isActive
          ? 'bg-lime/20 text-lime-700 dark:text-lime-300'
          : 'text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:hover:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800'
      )}
    >
      <Icon className="w-3.5 h-3.5" />
      {label}
    </button>
  )
}
