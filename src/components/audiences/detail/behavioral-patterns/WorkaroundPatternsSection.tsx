import { useTranslation } from 'react-i18next'
import { Lightbulb } from 'lucide-react'
import type { WorkaroundPattern } from '@/modules/audience/domain/entities/TopicBehavioralPattern.entity'

export interface WorkaroundPatternsSectionProps {
  patterns: WorkaroundPattern[]
}

const frequencyColors: Record<string, string> = {
  high: 'text-red-600 dark:text-red-400',
  moderate: 'text-yellow-600 dark:text-yellow-400',
  low: 'text-gray-500 dark:text-zinc-400',
}

export function WorkaroundPatternsSection({ patterns }: Readonly<WorkaroundPatternsSectionProps>) {
  const { t } = useTranslation('audiences')

  if (patterns.length === 0) return null

  return (
    <div className="pt-4 border-t border-gray-100 dark:border-zinc-800">
      <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-3">
        {t('topicDetail.workarounds')}
        <span className="ml-2 text-xs text-gray-500 dark:text-zinc-400">{patterns.length}</span>
      </h4>
      <div className="space-y-3">
        {patterns.map((pattern, i) => (
          <div key={i} className="p-3 rounded-lg bg-gray-50 dark:bg-zinc-800">
            <div className="flex items-start gap-2 mb-1">
              <Lightbulb className="w-3.5 h-3.5 text-yellow-500 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {pattern.problem}
                </p>
                <p className="text-xs text-gray-600 dark:text-zinc-300 leading-relaxed mt-1">
                  {pattern.workaround}
                </p>
              </div>
              <span className={`text-[10px] shrink-0 ${frequencyColors[pattern.frequency] ?? frequencyColors.low}`}>
                {t(`behavioralPatterns.frequency.${pattern.frequency}`)}
              </span>
            </div>
            <p className="text-[11px] text-gray-400 dark:text-zinc-500 leading-relaxed italic mt-2 ml-5.5">
              &ldquo;{pattern.evidence}&rdquo;
            </p>
            {pattern.communities.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1.5 ml-5.5">
                {pattern.communities.map((c) => (
                  <span key={c} className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-zinc-700 text-gray-600 dark:text-zinc-300">
                    {c}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
