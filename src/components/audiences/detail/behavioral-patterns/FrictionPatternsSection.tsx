import { useTranslation } from 'react-i18next'
import { AlertTriangle } from 'lucide-react'
import type { FrictionPattern } from '@/modules/audience/domain/entities/TopicBehavioralPattern.entity'

export interface FrictionPatternsSectionProps {
  patterns: FrictionPattern[]
}

const severityColors: Record<string, string> = {
  high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  low: 'bg-gray-100 text-gray-600 dark:bg-zinc-700 dark:text-zinc-300',
}

const categoryColors: Record<string, string> = {
  pricing: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  usability: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  performance: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  support: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
}

export function FrictionPatternsSection({ patterns }: Readonly<FrictionPatternsSectionProps>) {
  const { t } = useTranslation('audiences')

  if (patterns.length === 0) return null

  return (
    <div className="pt-4 border-t border-gray-100 dark:border-zinc-800">
      <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-3">
        {t('topicDetail.frictionPoints')}
        <span className="ml-2 text-xs text-gray-500 dark:text-zinc-400">{patterns.length}</span>
      </h4>
      <div className="space-y-3">
        {patterns.map((pattern, i) => (
          <div key={i} className="p-3 rounded-lg bg-gray-50 dark:bg-zinc-800">
            <div className="flex items-start gap-2 mb-2">
              <AlertTriangle className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
              <p className="text-sm text-gray-900 dark:text-white leading-relaxed flex-1">
                {pattern.friction}
              </p>
            </div>
            <div className="flex items-center gap-2 ml-5.5 mb-2">
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${categoryColors[pattern.category] ?? 'bg-gray-100 text-gray-600 dark:bg-zinc-700 dark:text-zinc-300'}`}>
                {t(`behavioralPatterns.category.${pattern.category}`)}
              </span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${severityColors[pattern.severity] ?? severityColors.low}`}>
                {t(`behavioralPatterns.severity.${pattern.severity}`)}
              </span>
            </div>
            {pattern.affectedTools.length > 0 && (
              <div className="flex flex-wrap gap-1 ml-5.5 mb-2">
                {pattern.affectedTools.map((tool) => (
                  <span key={tool} className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-zinc-700 text-gray-600 dark:text-zinc-300">
                    {tool}
                  </span>
                ))}
              </div>
            )}
            <p className="text-[11px] text-gray-400 dark:text-zinc-500 leading-relaxed italic ml-5.5">
              &ldquo;{pattern.evidence}&rdquo;
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
