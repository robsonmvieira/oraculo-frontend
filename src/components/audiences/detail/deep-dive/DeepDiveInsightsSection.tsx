import { useTranslation } from 'react-i18next'
import { Lightbulb } from 'lucide-react'
import type { ActionableInsight } from '@/modules/audience/domain/entities/TopicDeepDive.entity'

export interface DeepDiveInsightsSectionProps {
  insights: ActionableInsight[]
}

const typeColors: Record<string, string> = {
  opportunity: 'bg-lime/20 text-lime-700 dark:text-lime',
  gap: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  risk: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  trend: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
}

const confidenceColors: Record<string, string> = {
  high: 'text-green-600 dark:text-green-400',
  medium: 'text-yellow-600 dark:text-yellow-400',
  low: 'text-gray-500 dark:text-zinc-400',
}

export function DeepDiveInsightsSection({ insights }: Readonly<DeepDiveInsightsSectionProps>) {
  const { t } = useTranslation('audiences')

  if (insights.length === 0) return null

  return (
    <div className="pt-4 border-t border-gray-100 dark:border-zinc-800">
      <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-3">
        {t('deepDive.actionableInsights')}
        <span className="ml-2 text-xs text-gray-500 dark:text-zinc-400">{insights.length}</span>
      </h4>
      <div className="space-y-3">
        {insights.map((item, i) => (
          <div key={i} className="flex gap-2">
            <Lightbulb className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-gray-900 dark:text-white leading-relaxed mb-1">
                {item.insight}
              </p>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${typeColors[item.type] ?? typeColors.trend}`}>
                  {t(`deepDive.insightType.${item.type}`)}
                </span>
                <span className={`text-[10px] ${confidenceColors[item.confidence] ?? confidenceColors.low}`}>
                  {t('deepDive.confidence', { level: t(`deepDive.severity.${item.confidence}`) })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
