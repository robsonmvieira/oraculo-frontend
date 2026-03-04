import { useTranslation } from 'react-i18next'
import { Lightbulb, Quote } from 'lucide-react'
import type { ProductOpportunity } from '@/modules/audience/domain/entities/ProductOpportunity.entity'

export interface OpportunitiesSectionProps {
  opportunities: readonly ProductOpportunity[]
}

const TYPE_COLORS: Record<string, string> = {
  unmet_need: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  improvement: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  new_market: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  integration: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
}

export function OpportunitiesSection({ opportunities }: Readonly<OpportunitiesSectionProps>) {
  const { t } = useTranslation('audiences')

  if (opportunities.length === 0) return null

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
        <Lightbulb className="w-4 h-4 text-lime" />
        {t('productIntelligence.detail.opportunities')}
      </h4>

      {opportunities.map((opp) => {
        const typeColor = TYPE_COLORS[opp.getOpportunityType()] ?? 'bg-gray-100 text-gray-700 dark:bg-zinc-700 dark:text-zinc-300'

        return (
          <div
            key={opp.getId()}
            className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl p-4 space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${typeColor}`}>
                    {t(`productIntelligence.opportunityType.${opp.getOpportunityType()}`)}
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {opp.getTitle()}
                </p>
              </div>
              <div className="shrink-0 flex items-center gap-1">
                <div className="w-16 h-2 rounded-full bg-gray-200 dark:bg-zinc-700 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-lime"
                    style={{ width: `${opp.getOpportunityScore()}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-lime w-8 text-right">
                  {opp.getOpportunityScore()}
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-600 dark:text-zinc-400">
              {opp.getDescription()}
            </p>

            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-zinc-400">
              <span>
                {t('productIntelligence.demandSignals')}: <strong className="text-gray-700 dark:text-zinc-300">{opp.getDemandSignals()}</strong>
              </span>
              <span>
                {t('productIntelligence.existingSolutions')}: <strong className="text-gray-700 dark:text-zinc-300">{opp.getExistingSolutionsCount()}</strong>
              </span>
            </div>

            {opp.getEvidence().length > 0 && (
              <div className="space-y-1.5">
                {opp.getEvidence().slice(0, 2).map((ev, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-gray-500 dark:text-zinc-400">
                    <Quote className="w-3 h-3 mt-0.5 shrink-0 text-gray-400 dark:text-zinc-500" />
                    <p className="italic line-clamp-2">{ev.quote}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
