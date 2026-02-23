import { useTranslation } from 'react-i18next'
import type { EmotionalMapEntry } from '@/modules/audience/domain/entities/TopicSentiment.entity'

export interface EmotionalMapSectionProps {
  entries: EmotionalMapEntry[]
}

const intensityColors: Record<string, string> = {
  high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  low: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
}

export function EmotionalMapSection({ entries }: Readonly<EmotionalMapSectionProps>) {
  const { t } = useTranslation('audiences')

  if (entries.length === 0) return null

  return (
    <div className="pt-4 border-t border-gray-100 dark:border-zinc-800">
      <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-3">
        {t('topicDetail.emotionalMap')}
        <span className="ml-2 text-xs text-gray-500 dark:text-zinc-400">{entries.length}</span>
      </h4>
      <div className="space-y-2">
        {entries.map((entry, i) => (
          <div key={i} className="p-3 rounded-lg bg-gray-50 dark:bg-zinc-800">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                {entry.emotion}
              </span>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${intensityColors[entry.intensity] ?? intensityColors.medium}`}>
                  {t(`topicSentiment.intensity.${entry.intensity}`)}
                </span>
                <span className="text-xs text-gray-500 dark:text-zinc-400">
                  {Math.round(entry.percentage * 100)}%
                </span>
              </div>
            </div>
            <p className="text-[11px] text-gray-400 dark:text-zinc-500 leading-relaxed italic">
              &ldquo;{entry.example}&rdquo;
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
