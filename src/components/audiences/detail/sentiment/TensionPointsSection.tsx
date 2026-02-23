import { useTranslation } from 'react-i18next'
import type { TensionPoint } from '@/modules/audience/domain/entities/TopicSentiment.entity'

export interface TensionPointsSectionProps {
  tensions: TensionPoint[]
}

const intensityColors: Record<string, string> = {
  high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  low: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
}

export function TensionPointsSection({ tensions }: Readonly<TensionPointsSectionProps>) {
  const { t } = useTranslation('audiences')

  if (tensions.length === 0) return null

  return (
    <div className="pt-4 border-t border-gray-100 dark:border-zinc-800">
      <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-3">
        {t('topicDetail.tensionPoints')}
        <span className="ml-2 text-xs text-gray-500 dark:text-zinc-400">{tensions.length}</span>
      </h4>
      <div className="space-y-2">
        {tensions.map((tension, i) => (
          <div key={i} className="p-3 rounded-lg bg-gray-50 dark:bg-zinc-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {tension.topic}
              </span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${intensityColors[tension.intensity] ?? intensityColors.medium}`}>
                {t(`topicSentiment.intensity.${tension.intensity}`)}
              </span>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-green-600 dark:text-green-400">{t('topicSentiment.forLabel')}</span>
                <span className="text-xs font-medium text-green-600 dark:text-green-400">{Math.round(tension.forRatio * 100)}%</span>
              </div>
              <div className="flex-1 flex h-2 rounded-full overflow-hidden bg-gray-200 dark:bg-zinc-700">
                <div className="bg-green-500" style={{ width: `${tension.forRatio * 100}%` }} />
                <div className="bg-red-500" style={{ width: `${tension.againstRatio * 100}%` }} />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs font-medium text-red-600 dark:text-red-400">{Math.round(tension.againstRatio * 100)}%</span>
                <span className="text-[10px] text-red-600 dark:text-red-400">{t('topicSentiment.againstLabel')}</span>
              </div>
            </div>
            <p className="text-[11px] text-gray-400 dark:text-zinc-500 leading-relaxed">
              {tension.summary}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
