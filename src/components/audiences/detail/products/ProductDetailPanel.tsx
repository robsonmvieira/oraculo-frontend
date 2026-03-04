import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { TrendingUp, TrendingDown, Minus, ThumbsUp, ThumbsDown, AlertTriangle, ArrowRightLeft, Quote, Briefcase, Users } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks'
import { useGetProductOpportunities } from '@/modules/audience/application/hooks'
import { OpportunitiesSection } from './OpportunitiesSection'
import type { ProductProfile } from '@/modules/audience/domain/entities/ProductProfile.entity'

export interface ProductDetailPanelProps {
  product: ProductProfile | null
  audienceId: string
}

const SENTIMENT_COLORS: Record<string, string> = {
  positive: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  negative: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  neutral: 'bg-gray-100 text-gray-600 dark:bg-zinc-700 dark:text-zinc-400',
  mixed: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
}

const TREND_CONFIG: Record<string, { icon: typeof TrendingUp; color: string }> = {
  rising: { icon: TrendingUp, color: 'text-green-500' },
  declining: { icon: TrendingDown, color: 'text-red-500' },
  stable: { icon: Minus, color: 'text-yellow-500' },
}

export function ProductDetailPanel({ product, audienceId }: Readonly<ProductDetailPanelProps>) {
  const { t } = useTranslation('audiences')
  const panelRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { data: opportunitiesResult } = useGetProductOpportunities(audienceId, !!product)

  const relatedOpportunities = (opportunitiesResult?.opportunities ?? []).filter((opp) =>
    opp.getRelatedProducts().some(
      (name) => product && name.toLowerCase() === product.getNormalizedName().toLowerCase()
    )
  )

  useEffect(() => {
    if (!panelRef.current || !product) return

    if (prefersReducedMotion) {
      gsap.set(panelRef.current, { opacity: 1, x: 0 })
    } else {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.35, ease: 'power3.out' }
      )
    }
  }, [prefersReducedMotion, product])

  if (!product) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[300px] bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-700">
        <p className="text-sm text-gray-400 dark:text-zinc-500">
          {t('productIntelligence.detail.selectProduct')}
        </p>
      </div>
    )
  }

  const trendConfig = TREND_CONFIG[product.getTrendDirection()] ?? TREND_CONFIG.stable
  const TrendIcon = trendConfig.icon
  const sentimentColor = SENTIMENT_COLORS[product.getSentimentLabel()] ?? SENTIMENT_COLORS.neutral

  return (
    <div
      ref={panelRef}
      className="flex-1 bg-white dark:bg-zinc-900 rounded-2xl p-5 md:p-6 max-h-[900px] overflow-y-auto border border-gray-200 dark:border-zinc-700"
    >
      <div className="mb-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {product.getProductName()}
          </h3>
          <div className={`flex items-center gap-1 ${trendConfig.color}`}>
            <TrendIcon className="w-4 h-4" />
            <span className="text-xs font-medium">
              {t(`productIntelligence.trend.${product.getTrendDirection()}`)}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-zinc-700 text-gray-600 dark:text-zinc-400">
            {t(`productIntelligence.category.${product.getCategory()}`)}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${sentimentColor}`}>
            {t(`productIntelligence.sentiment.${product.getSentimentLabel()}`)} ({product.getSentimentScore().toFixed(1)})
          </span>
          <span className="text-xs text-gray-500 dark:text-zinc-400">
            {product.getTotalMentions()} {t('productIntelligence.mentions')}
          </span>
        </div>
      </div>

      {product.getCommunities().length > 0 && (
        <DetailSection
          icon={<Users className="w-4 h-4 text-blue-500" />}
          title={t('productIntelligence.detail.communities')}
        >
          <div className="flex flex-wrap gap-1.5">
            {product.getCommunities().map((community) => (
              <span
                key={community}
                className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
              >
                r/{community}
              </span>
            ))}
          </div>
        </DetailSection>
      )}

      {product.getPositiveAspects().length > 0 && (
        <DetailSection
          icon={<ThumbsUp className="w-4 h-4 text-green-500" />}
          title={t('productIntelligence.detail.positiveAspects')}
        >
          <ul className="space-y-1">
            {product.getPositiveAspects().map((aspect, i) => (
              <li key={i} className="text-xs text-gray-600 dark:text-zinc-400 flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-green-500 mt-1.5 shrink-0" />
                {aspect}
              </li>
            ))}
          </ul>
        </DetailSection>
      )}

      {product.getNegativeAspects().length > 0 && (
        <DetailSection
          icon={<ThumbsDown className="w-4 h-4 text-red-500" />}
          title={t('productIntelligence.detail.negativeAspects')}
        >
          <ul className="space-y-1">
            {product.getNegativeAspects().map((aspect, i) => (
              <li key={i} className="text-xs text-gray-600 dark:text-zinc-400 flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-red-500 mt-1.5 shrink-0" />
                {aspect}
              </li>
            ))}
          </ul>
        </DetailSection>
      )}

      {product.getGaps().length > 0 && (
        <DetailSection
          icon={<AlertTriangle className="w-4 h-4 text-yellow-500" />}
          title={t('productIntelligence.detail.gaps')}
        >
          <ul className="space-y-1">
            {product.getGaps().map((gap, i) => (
              <li key={i} className="text-xs text-gray-600 dark:text-zinc-400 flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-yellow-500 mt-1.5 shrink-0" />
                {gap}
              </li>
            ))}
          </ul>
        </DetailSection>
      )}

      {product.getAlternatives().length > 0 && (
        <DetailSection
          icon={<ArrowRightLeft className="w-4 h-4 text-purple-500" />}
          title={t('productIntelligence.detail.alternatives')}
        >
          <div className="flex flex-wrap gap-1.5">
            {product.getAlternatives().map((alt) => {
              const altSentimentColor = SENTIMENT_COLORS[alt.sentimentLabel] ?? SENTIMENT_COLORS.neutral
              return (
                <span
                  key={alt.name}
                  className={`text-xs px-2 py-0.5 rounded-full ${altSentimentColor}`}
                >
                  {alt.name}
                </span>
              )
            })}
          </div>
        </DetailSection>
      )}

      {product.getUseCases().length > 0 && (
        <DetailSection
          icon={<Briefcase className="w-4 h-4 text-indigo-500" />}
          title={t('productIntelligence.detail.useCases')}
        >
          <ul className="space-y-1">
            {product.getUseCases().map((useCase, i) => (
              <li key={i} className="text-xs text-gray-600 dark:text-zinc-400 flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                {useCase}
              </li>
            ))}
          </ul>
        </DetailSection>
      )}

      {product.getEvidenceQuotes().length > 0 && (
        <DetailSection
          icon={<Quote className="w-4 h-4 text-gray-500 dark:text-zinc-400" />}
          title={t('productIntelligence.detail.evidenceQuotes')}
        >
          <div className="space-y-2">
            {product.getEvidenceQuotes().slice(0, 5).map((ev, i) => (
              <div key={i} className="bg-gray-50 dark:bg-zinc-800 rounded-lg p-3">
                <p className="text-xs italic text-gray-600 dark:text-zinc-400 line-clamp-3">
                  &ldquo;{ev.quote}&rdquo;
                </p>
                <div className="flex items-center gap-2 mt-1.5 text-[10px] text-gray-400 dark:text-zinc-500">
                  <span>r/{ev.sourceSubreddit}</span>
                  {ev.score > 0 && <span>{ev.score} pts</span>}
                </div>
              </div>
            ))}
          </div>
        </DetailSection>
      )}

      {relatedOpportunities.length > 0 && (
        <div className="mt-5 pt-5 border-t border-gray-200 dark:border-zinc-700">
          <OpportunitiesSection opportunities={relatedOpportunities} />
        </div>
      )}
    </div>
  )
}

function DetailSection({
  icon,
  title,
  children,
}: Readonly<{ icon: React.ReactNode; title: string; children: React.ReactNode }>) {
  return (
    <div className="mb-4">
      <h4 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-2">
        {icon}
        {title}
      </h4>
      {children}
    </div>
  )
}
