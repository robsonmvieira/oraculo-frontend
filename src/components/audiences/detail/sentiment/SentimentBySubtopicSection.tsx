import { useTranslation } from 'react-i18next'
import type { SentimentBySubtopic } from '@/modules/audience/domain/entities/TopicSentiment.entity'

export interface SentimentBySubtopicSectionProps {
  subtopics: SentimentBySubtopic[]
}

const sentimentColors: Record<string, string> = {
  positive: 'text-green-600 dark:text-green-400',
  negative: 'text-red-600 dark:text-red-400',
  neutral: 'text-gray-500 dark:text-zinc-400',
  mixed: 'text-yellow-600 dark:text-yellow-400',
}

export function SentimentBySubtopicSection({ subtopics }: Readonly<SentimentBySubtopicSectionProps>) {
  const { t } = useTranslation('audiences')

  if (subtopics.length === 0) return null

  return (
    <div className="pt-4 border-t border-gray-100 dark:border-zinc-800">
      <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-3">
        {t('topicDetail.sentimentBySubtopic')}
        <span className="ml-2 text-xs text-gray-500 dark:text-zinc-400">{subtopics.length}</span>
      </h4>
      <div className="space-y-2">
        {subtopics.map((subtopic, i) => (
          <div key={i} className="p-3 rounded-lg bg-gray-50 dark:bg-zinc-800">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {subtopic.subtopic}
              </span>
              <span className={`text-xs ${sentimentColors[subtopic.sentiment] ?? sentimentColors.neutral}`}>
                {t(`topicSentiment.score.${subtopic.sentiment}`)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-gray-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                <div className="h-full bg-lime rounded-full" style={{ width: `${subtopic.score * 100}%` }} />
              </div>
              <span className="text-[10px] text-gray-500 dark:text-zinc-400">{Math.round(subtopic.score * 100)}%</span>
            </div>
            <p className="text-[11px] text-gray-400 dark:text-zinc-500 mt-1">
              {subtopic.keyDriver}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
