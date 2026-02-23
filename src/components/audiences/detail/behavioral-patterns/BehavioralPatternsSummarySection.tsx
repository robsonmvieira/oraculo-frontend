import { useTranslation } from 'react-i18next'

export interface BehavioralPatternsSummarySectionProps {
  summary: string
}

export function BehavioralPatternsSummarySection({ summary }: Readonly<BehavioralPatternsSummarySectionProps>) {
  const { t } = useTranslation('audiences')

  return (
    <div className="pt-4">
      <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-3">
        {t('behavioralPatterns.summary')}
      </h4>
      <p className="text-sm text-gray-600 dark:text-zinc-300 leading-relaxed">
        {summary}
      </p>
    </div>
  )
}
