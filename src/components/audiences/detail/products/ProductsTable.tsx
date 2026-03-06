import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Search, ChevronDown, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks'
import type { ProductProfile } from '@/modules/audience/domain/entities/ProductProfile.entity'

export interface ProductsTableProps {
  products: readonly ProductProfile[]
  totalCount: number
  selectedProductId?: string | null
  onProductSelect?: (product: ProductProfile) => void
}

type SortOption = 'mentions' | 'sentiment' | 'name'

const CATEGORIES = ['tool', 'service', 'brand', 'platform', 'saas', 'physical_product'] as const

export function ProductsTable({
  products,
  totalCount,
  selectedProductId,
  onProductSelect,
}: Readonly<ProductsTableProps>) {
  const { t } = useTranslation('audiences')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('mentions')
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'mentions', label: t('productIntelligence.sortMentions') },
    { value: 'sentiment', label: t('productIntelligence.sortSentiment') },
    { value: 'name', label: t('productIntelligence.sortName') },
  ]

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.getProductName().toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !categoryFilter || product.getCategory() === categoryFilter
    return matchesSearch && matchesCategory
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'mentions':
        return b.getTotalMentions() - a.getTotalMentions()
      case 'sentiment':
        return (b.getSentimentScore() ?? 0) - (a.getSentimentScore() ?? 0)
      case 'name':
        return a.getProductName().localeCompare(b.getProductName())
      default:
        return 0
    }
  })

  useEffect(() => {
    if (!listRef.current || prefersReducedMotion) return

    const items = Array.from(listRef.current.children)
    gsap.fromTo(
      items,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.03,
        ease: 'power2.out',
      }
    )
  }, [prefersReducedMotion, sortBy, searchQuery, categoryFilter])

  const sentimentColorMap: Record<string, string> = {
    positive: 'bg-green-500',
    negative: 'bg-red-500',
    neutral: 'bg-gray-400',
    mixed: 'bg-yellow-500',
  }

  const trendIconMap: Record<string, typeof TrendingUp> = {
    rising: TrendingUp,
    declining: TrendingDown,
    stable: Minus,
  }

  const trendColorMap: Record<string, string> = {
    rising: 'text-green-500',
    declining: 'text-red-500',
    stable: 'text-yellow-500',
  }

  return (
    <div className="flex-1 min-w-0 px-1 md:px-0">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm md:text-base font-semibold text-gray-900 dark:text-white">
            {t('productIntelligence.totalProducts')}
          </h3>
          <span className="text-sm text-gray-500 dark:text-zinc-400">
            {totalCount}
          </span>
        </div>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="cursor-pointer flex items-center gap-2 text-sm text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:hover:text-white transition-colors"
          >
            {t('productIntelligence.sortBy')}: {sortOptions.find((o) => o.value === sortBy)?.label}
            <ChevronDown className="w-4 h-4" />
          </button>
          {isDropdownOpen && (
            <div>
              <button
                className="fixed inset-0 z-10"
                onClick={() => setIsDropdownOpen(false)}
              />
              <div className="absolute right-0 top-full mt-1 z-20 bg-white dark:bg-zinc-800 rounded-lg shadow-lg border border-gray-200 dark:border-zinc-700 py-1 min-w-[120px]">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value)
                      setIsDropdownOpen(false)
                    }}
                    className={`cursor-pointer w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors ${
                      sortBy === option.value
                        ? 'text-lime font-medium'
                        : 'text-gray-700 dark:text-zinc-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-zinc-500" />
          <input
            type="text"
            placeholder={t('productIntelligence.searchProducts')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 md:py-2.5 text-sm md:text-base bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-lime/50 focus:border-lime transition-colors"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        <button
          onClick={() => setCategoryFilter(null)}
          className={`cursor-pointer px-2.5 py-1 text-xs rounded-full transition-colors ${
            !categoryFilter
              ? 'bg-lime text-black font-medium'
              : 'bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 hover:bg-gray-200 dark:hover:bg-zinc-700'
          }`}
        >
          {t('productIntelligence.allCategories')}
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(categoryFilter === cat ? null : cat)}
            className={`cursor-pointer px-2.5 py-1 text-xs rounded-full transition-colors ${
              categoryFilter === cat
                ? 'bg-lime text-black font-medium'
                : 'bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 hover:bg-gray-200 dark:hover:bg-zinc-700'
            }`}
          >
            {t(`productIntelligence.category.${cat}`)}
          </button>
        ))}
      </div>

      <div className="max-h-[600px] overflow-y-auto">
        <div ref={listRef} className="space-y-2">
          {sortedProducts.map((product) => {
            const TrendIcon = trendIconMap[product.getTrendDirection()] ?? Minus
            const trendColor = trendColorMap[product.getTrendDirection()] ?? 'text-yellow-500'
            const sentimentColor = sentimentColorMap[product.getSentimentLabel()] ?? 'bg-gray-400'

            const score = product.getSentimentScore() ?? 0
            const sentimentPercent = ((score + 1) / 2) * 100

            return (
              <button
                type="button"
                key={product.getId()}
                onClick={() => onProductSelect?.(product)}
                className={`w-full text-left bg-white dark:bg-zinc-800 border rounded-xl p-3 md:p-4 transition-colors cursor-pointer ${
                  selectedProductId === product.getId()
                    ? 'border-lime'
                    : 'border-gray-200 dark:border-zinc-700 hover:border-lime dark:hover:border-lime'
                }`}
              >
                <div className="flex items-center gap-2 md:gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm md:text-base font-semibold text-gray-900 dark:text-white truncate">
                      {product.getProductName()}
                    </p>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-zinc-700 text-gray-500 dark:text-zinc-400">
                      {t(`productIntelligence.category.${product.getCategory()}`)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 md:gap-4 shrink-0">
                    <span className="text-sm font-semibold text-lime w-12 text-right">
                      {product.getTotalMentions()}
                    </span>

                    <div className="hidden md:flex items-center gap-1.5 w-24">
                      <div className="flex-1 h-2 rounded-full bg-gray-200 dark:bg-zinc-700 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${sentimentColor}`}
                          style={{ width: `${sentimentPercent}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-gray-500 dark:text-zinc-400 w-8 text-right">
                        {score.toFixed(1)}
                      </span>
                    </div>

                    <div className={`flex items-center gap-0.5 ${trendColor} w-12 justify-end`}>
                      <TrendIcon className="w-3.5 h-3.5" />
                      <span className="text-xs font-medium hidden lg:inline">
                        {t(`productIntelligence.trend.${product.getTrendDirection()}`)}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {sortedProducts.length === 0 && (
          <div className="py-8 text-center text-gray-500 dark:text-zinc-400 bg-white dark:bg-zinc-800 rounded-xl border border-gray-200 dark:border-zinc-700">
            {t('productIntelligence.detail.noData')}
          </div>
        )}
      </div>
    </div>
  )
}
