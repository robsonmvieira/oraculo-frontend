import { useTranslation } from 'react-i18next'
import type { OverallSentiment } from '@/modules/audience/domain/entities/TopicSentiment.entity'

export interface SentimentOverallSectionProps {
  overall: OverallSentiment
}

const scoreColors: Record<string, string> = {
  positive: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  negative: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  neutral: 'bg-gray-100 text-gray-600 dark:bg-zinc-700 dark:text-zinc-300',
  mixed: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
}

export function SentimentOverallSection({ overall }: Readonly<SentimentOverallSectionProps>) {
  const { t } = useTranslation('audiences')

  return (
    <div className="pt-4 border-t border-gray-100 dark:border-zinc-800">
      <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-3">
        {t('topicDetail.overallSentiment')}
      </h4>
      <div className="p-3 rounded-lg bg-gray-50 dark:bg-zinc-800">
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${scoreColors[overall.score] ?? scoreColors.neutral}`}>
            {t(`topicSentiment.score.${overall.score}`)}
          </span>
        </div>
        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-green-600 dark:text-green-400">{t('topicSentiment.score.positive')}</span>
              <span className="text-gray-500 dark:text-zinc-400">{Math.round(overall.positiveRatio * 100)}%</span>
            </div>
            <div className="h-1.5 bg-gray-200 dark:bg-zinc-700 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: `${overall.positiveRatio * 100}%` }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-red-600 dark:text-red-400">{t('topicSentiment.score.negative')}</span>
              <span className="text-gray-500 dark:text-zinc-400">{Math.round(overall.negativeRatio * 100)}%</span>
            </div>
            <div className="h-1.5 bg-gray-200 dark:bg-zinc-700 rounded-full overflow-hidden">
              <div className="h-full bg-red-500 rounded-full" style={{ width: `${overall.negativeRatio * 100}%` }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-500 dark:text-zinc-400">{t('topicSentiment.score.neutral')}</span>
              <span className="text-gray-500 dark:text-zinc-400">{Math.round(overall.neutralRatio * 100)}%</span>
            </div>
            <div className="h-1.5 bg-gray-200 dark:bg-zinc-700 rounded-full overflow-hidden">
              <div className="h-full bg-gray-400 dark:bg-zinc-500 rounded-full" style={{ width: `${overall.neutralRatio * 100}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
