import { useTranslation } from 'react-i18next'
import { Wrench } from 'lucide-react'
import type { ToolPattern } from '@/modules/audience/domain/entities/TopicBehavioralPattern.entity'

export interface ToolPatternsSectionProps {
  patterns: ToolPattern[]
}

const satisfactionColors: Record<string, string> = {
  positive: 'text-green-600 dark:text-green-400',
  negative: 'text-red-600 dark:text-red-400',
  mixed: 'text-yellow-600 dark:text-yellow-400',
  neutral: 'text-gray-500 dark:text-zinc-400',
}

export function ToolPatternsSection({ patterns }: Readonly<ToolPatternsSectionProps>) {
  const { t } = useTranslation('audiences')

  if (patterns.length === 0) return null

  return (
    <div className="pt-4 border-t border-gray-100 dark:border-zinc-800">
      <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-3">
        {t('topicDetail.toolPatterns')}
        <span className="ml-2 text-xs text-gray-500 dark:text-zinc-400">{patterns.length}</span>
      </h4>
      <div className="space-y-3">
        {patterns.map((pattern, i) => (
          <div key={i} className="p-3 rounded-lg bg-gray-50 dark:bg-zinc-800">
            <div className="flex items-center gap-2 mb-1">
              <Wrench className="w-3.5 h-3.5 text-gray-400 dark:text-zinc-500" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {pattern.tool}
              </span>
              <span className={`text-xs ml-auto ${satisfactionColors[pattern.satisfaction] ?? satisfactionColors.neutral}`}>
                {t(`behavioralPatterns.sentiment.${pattern.satisfaction}`)}
              </span>
            </div>
            <p className="text-xs text-gray-600 dark:text-zinc-300 leading-relaxed mb-2">
              {pattern.useCase}
            </p>
            {pattern.painPoints.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {pattern.painPoints.map((point, j) => (
                  <span key={j} className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400">
                    {point}
                  </span>
                ))}
              </div>
            )}
            <p className="text-[11px] text-gray-400 dark:text-zinc-500 leading-relaxed italic">
              &ldquo;{pattern.evidence}&rdquo;
            </p>
            {pattern.communities.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1.5">
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
