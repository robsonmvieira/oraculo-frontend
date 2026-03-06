import { useTranslation } from 'react-i18next'
import { Grid3x3 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { TopicAnalysis } from '@/modules/audience/domain/entities/YouTubeValidation.entity'

export interface DecisionMatrixSectionProps {
  topics: TopicAnalysis[]
}

type ActionLevel = 'ideal' | 'differentiate' | 'avoid' | 'niche' | 'no_traction'

function getActionLevel(topic: TopicAnalysis): ActionLevel {
  const highTraction = topic.tractionScore >= 7
  const lowTraction = topic.tractionScore < 4

  if (highTraction && topic.contentGap && !topic.contentSaturated) return 'ideal'
  if (highTraction && !topic.contentGap && !topic.contentSaturated) return 'differentiate'
  if (highTraction && topic.contentSaturated) return 'avoid'
  if (lowTraction && topic.contentGap) return 'niche'
  return 'no_traction'
}

const actionVariants: Record<ActionLevel, 'success' | 'warning' | 'error' | 'neutral'> = {
  ideal: 'success',
  differentiate: 'warning',
  avoid: 'error',
  niche: 'neutral',
  no_traction: 'neutral',
}

function tractionVariant(score: number): 'success' | 'warning' | 'error' {
  if (score >= 7) return 'success'
  if (score >= 4) return 'warning'
  return 'error'
}

export function DecisionMatrixSection({ topics }: Readonly<DecisionMatrixSectionProps>) {
  const { t } = useTranslation('audiences')

  return (
    <div className="border border-gray-200 dark:border-zinc-700 rounded-xl overflow-hidden">
      <div className="p-4">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2 mb-4">
          <Grid3x3 className="w-4 h-4 text-lime" />
          {t('youtubeValidation.decisionMatrix.title')}
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-200 dark:border-zinc-700">
                <th className="text-left py-2 pr-3 font-medium text-gray-500 dark:text-zinc-400">
                  {t('youtubeValidation.decisionMatrix.topic')}
                </th>
                <th className="text-center py-2 px-3 font-medium text-gray-500 dark:text-zinc-400">
                  {t('youtubeValidation.decisionMatrix.traction')}
                </th>
                <th className="text-center py-2 px-3 font-medium text-gray-500 dark:text-zinc-400">
                  {t('youtubeValidation.decisionMatrix.gap')}
                </th>
                <th className="text-center py-2 px-3 font-medium text-gray-500 dark:text-zinc-400">
                  {t('youtubeValidation.decisionMatrix.saturated')}
                </th>
                <th className="text-left py-2 pl-3 font-medium text-gray-500 dark:text-zinc-400">
                  {t('youtubeValidation.decisionMatrix.action')}
                </th>
              </tr>
            </thead>
            <tbody>
              {topics.map((topic) => {
                const action = getActionLevel(topic)
                return (
                  <tr key={topic.topicName} className="border-b border-gray-100 dark:border-zinc-800 last:border-b-0">
                    <td className="py-2.5 pr-3 font-medium text-gray-900 dark:text-white max-w-[200px] truncate">
                      {topic.topicName}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <Badge variant={tractionVariant(topic.tractionScore)} size="sm">
                        {topic.tractionScore.toFixed(1)}
                      </Badge>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <Badge variant={topic.contentGap ? 'warning' : 'neutral'} size="sm">
                        {topic.contentGap
                          ? t('youtubeValidation.decisionMatrix.yes')
                          : t('youtubeValidation.decisionMatrix.no')
                        }
                      </Badge>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <Badge variant={topic.contentSaturated ? 'error' : 'neutral'} size="sm">
                        {topic.contentSaturated
                          ? t('youtubeValidation.decisionMatrix.yes')
                          : t('youtubeValidation.decisionMatrix.no')
                        }
                      </Badge>
                    </td>
                    <td className="py-2.5 pl-3">
                      <Badge variant={actionVariants[action]} size="sm">
                        {t(`youtubeValidation.decisionMatrix.actions.${action}`)}
                      </Badge>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
