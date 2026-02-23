import { useTranslation } from 'react-i18next'
import type { TopicSentiment } from '@/modules/audience/domain/entities/TopicDeepDive.entity'

export interface DeepDiveSentimentSectionProps {
  sentiment: TopicSentiment
}

const overallColors: Record<string, string> = {
  positive: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  negative: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  neutral: 'bg-gray-100 text-gray-600 dark:bg-zinc-700 dark:text-zinc-300',
  mixed: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
}

const highlightDot: Record<string, string> = {
  positive: 'bg-green-500',
  negative: 'bg-red-500',
  neutral: 'bg-gray-400',
}

export function DeepDiveSentimentSection({ sentiment }: Readonly<DeepDiveSentimentSectionProps>) {
  const { t } = useTranslation('audiences')

  return (
    <div className="pt-4 border-t border-gray-100 dark:border-zinc-800">
      <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-3">
        {t('deepDive.sentiment')}
      </h4>

      <div className="mb-3">
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${overallColors[sentiment.overall] ?? overallColors.neutral}`}>
          {t(`deepDive.sentimentLabel.${sentiment.overall}`)}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 dark:text-zinc-400 w-16">{t('deepDive.positive')}</span>
          <div className="flex-1 h-2 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full transition-all"
              style={{ width: `${Math.round(sentiment.positiveRatio * 100)}%` }}
            />
          </div>
          <span className="text-xs text-gray-500 dark:text-zinc-400 w-10 text-right">
            {Math.round(sentiment.positiveRatio * 100)}%
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 dark:text-zinc-400 w-16">{t('deepDive.negative')}</span>
          <div className="flex-1 h-2 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-red-500 rounded-full transition-all"
              style={{ width: `${Math.round(sentiment.negativeRatio * 100)}%` }}
            />
          </div>
          <span className="text-xs text-gray-500 dark:text-zinc-400 w-10 text-right">
            {Math.round(sentiment.negativeRatio * 100)}%
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 dark:text-zinc-400 w-16">{t('deepDive.neutral')}</span>
          <div className="flex-1 h-2 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-400 rounded-full transition-all"
              style={{ width: `${Math.round(sentiment.neutralRatio * 100)}%` }}
            />
          </div>
          <span className="text-xs text-gray-500 dark:text-zinc-400 w-10 text-right">
            {Math.round(sentiment.neutralRatio * 100)}%
          </span>
        </div>
      </div>

      {sentiment.highlights.length > 0 && (
        <div className="space-y-2">
          <span className="text-xs font-medium text-gray-700 dark:text-zinc-300">{t('deepDive.highlights')}</span>
          {sentiment.highlights.map((h, i) => (
            <div key={i} className="flex items-start gap-2 pl-1">
              <div className={`w-2 h-2 rounded-full shrink-0 mt-1.5 ${highlightDot[h.sentiment] ?? highlightDot.neutral}`} />
              <div>
                <p className="text-xs text-gray-600 dark:text-zinc-300 leading-relaxed">
                  &ldquo;{h.text}&rdquo;
                </p>
                <span className="text-[10px] text-gray-400 dark:text-zinc-500">
                  {h.source}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
