import { useTranslation } from 'react-i18next'
import { BarChart3, TrendingUp, Lightbulb, AlertTriangle, Rocket } from 'lucide-react'
import type { ValidationSummary, CrossPlatformSummary } from '@/modules/audience/domain/entities/YouTubeValidation.entity'

export interface CrossPlatformSummarySectionProps {
  summary: ValidationSummary
  crossPlatform: CrossPlatformSummary
}

export function CrossPlatformSummarySection({ summary, crossPlatform }: Readonly<CrossPlatformSummarySectionProps>) {
  const { t } = useTranslation('audiences')

  const metrics = [
    { label: t('youtubeValidation.summary.topicsAnalyzed'), value: summary.topicsAnalyzed },
    { label: t('youtubeValidation.summary.topicsWithTraction'), value: summary.topicsWithYoutubeTraction },
    { label: t('youtubeValidation.summary.contentGaps'), value: summary.contentGapsFound },
    { label: t('youtubeValidation.summary.avgTraction'), value: `${summary.avgTractionScore.toFixed(1)}/10` },
    { label: t('youtubeValidation.summary.videosAnalyzed'), value: summary.totalVideosAnalyzed },
    { label: t('youtubeValidation.summary.commentsAnalyzed'), value: summary.totalCommentsAnalyzed },
  ]

  return (
    <div className="border border-gray-200 dark:border-zinc-700 rounded-xl overflow-hidden">
      <div className="p-4">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2 mb-4">
          <BarChart3 className="w-4 h-4 text-lime" />
          {t('youtubeValidation.summary.title')}
        </h4>

        {/* Headline */}
        {summary.headline && (
          <p className="text-sm text-gray-700 dark:text-zinc-300 mb-4 font-medium">
            {summary.headline}
          </p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="bg-gray-50 dark:bg-zinc-800 rounded-lg p-3 text-center">
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{metric.value}</p>
              <p className="text-xs text-gray-500 dark:text-zinc-400 mt-0.5">{metric.label}</p>
            </div>
          ))}
        </div>

        {crossPlatform.keyFindings.length > 0 && (
          <div className="mt-4 space-y-2">
            <h5 className="text-xs font-medium text-gray-700 dark:text-zinc-300 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-lime" />
              {t('youtubeValidation.summary.keyFindings')}
            </h5>
            <ul className="space-y-1">
              {crossPlatform.keyFindings.map((finding) => (
                <li key={finding} className="text-xs text-gray-600 dark:text-zinc-400 pl-5 relative before:content-['•'] before:absolute before:left-1.5 before:text-gray-400 dark:before:text-zinc-500">
                  {finding}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {crossPlatform.bestOpportunity && (
            <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 rounded-lg p-3">
              <p className="text-xs font-medium text-green-700 dark:text-green-400 flex items-center gap-1.5 mb-1">
                <TrendingUp className="w-3.5 h-3.5" />
                {t('youtubeValidation.summary.bestOpportunity')}
              </p>
              <p className="text-xs text-green-600 dark:text-green-300">{crossPlatform.bestOpportunity}</p>
            </div>
          )}

          {crossPlatform.biggestDivergence && (
            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-lg p-3">
              <p className="text-xs font-medium text-amber-700 dark:text-amber-400 flex items-center gap-1.5 mb-1">
                <BarChart3 className="w-3.5 h-3.5" />
                {t('youtubeValidation.summary.biggestDivergence')}
              </p>
              <p className="text-xs text-amber-600 dark:text-amber-300">{crossPlatform.biggestDivergence}</p>
            </div>
          )}
        </div>

        {/* Key Opportunities */}
        {summary.keyOpportunities.length > 0 && (
          <div className="mt-4 space-y-2">
            <h5 className="text-xs font-medium text-gray-700 dark:text-zinc-300 flex items-center gap-1.5">
              <Rocket className="w-3.5 h-3.5 text-green-500" />
              {t('youtubeValidation.summary.keyOpportunities')}
            </h5>
            <ul className="space-y-1">
              {summary.keyOpportunities.map((opp) => (
                <li key={opp} className="text-xs text-gray-600 dark:text-zinc-400 pl-5 relative before:content-['•'] before:absolute before:left-1.5 before:text-green-400">
                  {opp}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Risk Factors */}
        {summary.riskFactors.length > 0 && (
          <div className="mt-4 space-y-2">
            <h5 className="text-xs font-medium text-gray-700 dark:text-zinc-300 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
              {t('youtubeValidation.summary.riskFactors')}
            </h5>
            <ul className="space-y-1">
              {summary.riskFactors.map((risk) => (
                <li key={risk} className="text-xs text-gray-600 dark:text-zinc-400 pl-5 relative before:content-['•'] before:absolute before:left-1.5 before:text-red-400">
                  {risk}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
