import { useTranslation } from 'react-i18next'
import { ThumbsUp, ThumbsDown } from 'lucide-react'
import type { SentimentDrivers } from '@/modules/audience/domain/entities/TopicSentiment.entity'

export interface SentimentDriversSectionProps {
  drivers: SentimentDrivers
}

const frequencyColors: Record<string, string> = {
  high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  low: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
}

export function SentimentDriversSection({ drivers }: Readonly<SentimentDriversSectionProps>) {
  const { t } = useTranslation('audiences')

  if (drivers.positive.length === 0 && drivers.negative.length === 0) return null

  return (
    <div className="pt-4 border-t border-gray-100 dark:border-zinc-800">
      <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-3">
        {t('topicDetail.sentimentDrivers')}
      </h4>

      {drivers.positive.length > 0 && (
        <div className="mb-3">
          <div className="flex items-center gap-1.5 mb-2">
            <ThumbsUp className="w-3 h-3 text-green-500" />
            <span className="text-xs font-medium text-green-600 dark:text-green-400">
              {t('topicDetail.positiveDrivers')}
            </span>
          </div>
          <div className="space-y-2">
            {drivers.positive.map((driver, i) => (
              <div key={i} className="p-3 rounded-lg bg-green-50 dark:bg-green-900/10">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {driver.driver}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${frequencyColors[driver.frequency] ?? frequencyColors.medium}`}>
                      {t(`topicSentiment.frequency.${driver.frequency}`)}
                    </span>
                    <span className="text-[10px] text-gray-500 dark:text-zinc-400">
                      {t('topicSentiment.mentions', { count: driver.mentions })}
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-gray-400 dark:text-zinc-500 leading-relaxed italic">
                  &ldquo;{driver.exampleQuote}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {drivers.negative.length > 0 && (
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <ThumbsDown className="w-3 h-3 text-red-500" />
            <span className="text-xs font-medium text-red-600 dark:text-red-400">
              {t('topicDetail.negativeDrivers')}
            </span>
          </div>
          <div className="space-y-2">
            {drivers.negative.map((driver, i) => (
              <div key={i} className="p-3 rounded-lg bg-red-50 dark:bg-red-900/10">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {driver.driver}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${frequencyColors[driver.frequency] ?? frequencyColors.medium}`}>
                      {t(`topicSentiment.frequency.${driver.frequency}`)}
                    </span>
                    <span className="text-[10px] text-gray-500 dark:text-zinc-400">
                      {t('topicSentiment.mentions', { count: driver.mentions })}
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-gray-400 dark:text-zinc-500 leading-relaxed italic">
                  &ldquo;{driver.exampleQuote}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
