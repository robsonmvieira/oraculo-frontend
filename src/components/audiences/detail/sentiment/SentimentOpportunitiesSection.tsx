import { useTranslation } from 'react-i18next'
import type { SentimentOpportunity } from '@/modules/audience/domain/entities/TopicSentiment.entity'

export interface SentimentOpportunitiesSectionProps {
  opportunities: SentimentOpportunity[]
}

const confidenceColors: Record<string, string> = {
  high: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  low: 'bg-gray-100 text-gray-600 dark:bg-zinc-700 dark:text-zinc-300',
}

export function SentimentOpportunitiesSection({ opportunities }: Readonly<SentimentOpportunitiesSectionProps>) {
  const { t } = useTranslation('audiences')

  if (opportunities.length === 0) return null

  return (
    <div className="pt-4 border-t border-gray-100 dark:border-zinc-800">
      <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-3">
        {t('topicDetail.sentimentOpportunities')}
        <span className="ml-2 text-xs text-gray-500 dark:text-zinc-400">{opportunities.length}</span>
      </h4>
      <div className="space-y-2">
        {opportunities.map((opp, i) => (
          <div key={i} className="p-3 rounded-lg bg-gray-50 dark:bg-zinc-800">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {opp.opportunity}
              </span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${confidenceColors[opp.confidence] ?? confidenceColors.medium}`}>
                {t(`topicSentiment.confidence.${opp.confidence}`)}
              </span>
            </div>
            <p className="text-[11px] text-gray-500 dark:text-zinc-400 leading-relaxed mb-1">
              {opp.basedOn}
            </p>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-lime/10 text-lime dark:bg-lime/20">
              {opp.targetAudience}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
