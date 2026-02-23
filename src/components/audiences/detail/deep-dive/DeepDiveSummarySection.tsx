import { useTranslation } from 'react-i18next'

export interface DeepDiveSummarySectionProps {
  summary: string
}

export function DeepDiveSummarySection({ summary }: Readonly<DeepDiveSummarySectionProps>) {
  const { t } = useTranslation('audiences')

  return (
    <div className="pt-4">
      <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-3">
        {t('deepDive.summary')}
      </h4>
      <p className="text-sm text-gray-600 dark:text-zinc-300 leading-relaxed">
        {summary}
      </p>
    </div>
  )
}
