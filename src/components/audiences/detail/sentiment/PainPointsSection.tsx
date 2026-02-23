import { useTranslation } from 'react-i18next'
import type { PainPoint } from '@/modules/audience/domain/entities/TopicSentiment.entity'

export interface PainPointsSectionProps {
  pains: PainPoint[]
}

const severityColors: Record<string, string> = {
  high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  low: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
}

export function PainPointsSection({ pains }: Readonly<PainPointsSectionProps>) {
  const { t } = useTranslation('audiences')

  if (pains.length === 0) return null

  return (
    <div className="pt-4 border-t border-gray-100 dark:border-zinc-800">
      <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-3">
        {t('topicDetail.painPoints')}
        <span className="ml-2 text-xs text-gray-500 dark:text-zinc-400">{pains.length}</span>
      </h4>
      <div className="space-y-2">
        {pains.map((pain, i) => (
          <div key={i} className="p-3 rounded-lg bg-gray-50 dark:bg-zinc-800">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {pain.pain}
              </span>
              <div className="flex items-center gap-1.5">
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${severityColors[pain.severity] ?? severityColors.medium}`}>
                  {t(`topicSentiment.severity.${pain.severity}`)}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-zinc-700 text-gray-600 dark:text-zinc-300">
                  {t(`topicSentiment.frequency.${pain.frequency}`)}
                </span>
              </div>
            </div>
            <p className="text-[11px] text-gray-400 dark:text-zinc-500 leading-relaxed italic mb-1.5">
              &ldquo;{pain.verbatim}&rdquo;
            </p>
            {pain.communities.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {pain.communities.map((c) => (
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
