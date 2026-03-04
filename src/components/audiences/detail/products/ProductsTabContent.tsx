import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Package, AlertCircle, RefreshCw, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  useGetProductIntelligence,
  useTriggerProductIntelligence,
} from '@/modules/audience/application/hooks'
import { toast } from '@/hooks/useToast'
import { ProductsTable } from './ProductsTable'
import { ProductDetailPanel } from './ProductDetailPanel'
import type { ProductProfile } from '@/modules/audience/domain/entities/ProductProfile.entity'

export interface ProductsTabContentProps {
  audienceId: string
}

export function ProductsTabContent({ audienceId }: Readonly<ProductsTabContentProps>) {
  const { t } = useTranslation('audiences')
  const { data, isLoading } = useGetProductIntelligence(audienceId, true)
  const triggerMutation = useTriggerProductIntelligence()
  const [selectedProduct, setSelectedProduct] = useState<ProductProfile | null>(null)
  const [windowDropdownOpen, setWindowDropdownOpen] = useState(false)

  const status = data?.status ?? 'no_analysis'
  const products = data?.products ?? []
  const totalProducts = data?.totalProducts ?? 0

  const handleTrigger = (window: 'week' | 'month') => {
    setWindowDropdownOpen(false)
    triggerMutation.mutate({ audienceId, window }, {
      onError: () => {
        toast({ title: t('productIntelligence.failedTitle'), variant: 'destructive' })
      },
    })
  }

  const handleProductSelect = (product: ProductProfile) => {
    setSelectedProduct(product)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
            {t('productIntelligence.title')}
          </h3>
          <p className="text-xs text-gray-500 dark:text-zinc-400 mt-0.5">
            {t('productIntelligence.subtitle')}
          </p>
        </div>

        <div className="relative">
          <button
            onClick={() => setWindowDropdownOpen(!windowDropdownOpen)}
            disabled={triggerMutation.isPending || status === 'processing'}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg bg-lime text-black hover:bg-lime/90 transition-colors cursor-pointer disabled:opacity-50"
          >
            {(triggerMutation.isPending || status === 'processing') ? (
              <RefreshCw className={cn('w-3.5 h-3.5', 'animate-spin')} />
            ) : (
              <Package className="w-3.5 h-3.5" />
            )}
            {t('productIntelligence.analyzeProducts')}
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          {windowDropdownOpen && (
            <div>
              <button
                className="fixed inset-0 z-10"
                onClick={() => setWindowDropdownOpen(false)}
              />
              <div className="absolute right-0 top-full mt-1 z-20 bg-white dark:bg-zinc-800 rounded-lg shadow-lg border border-gray-200 dark:border-zinc-700 py-1 min-w-[140px]">
                <button
                  onClick={() => handleTrigger('week')}
                  className="cursor-pointer w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
                >
                  {t('productIntelligence.windowWeek')}
                </button>
                <button
                  onClick={() => handleTrigger('month')}
                  className="cursor-pointer w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
                >
                  {t('productIntelligence.windowMonth')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-lime border-t-transparent rounded-full animate-spin" />
        </div>
      ) : status === 'processing' ? (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 text-center border border-gray-100 dark:border-zinc-800">
          <div className="w-8 h-8 border-4 border-lime border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm font-medium text-gray-700 dark:text-zinc-300">
            {t('productIntelligence.processing')}
          </p>
          <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">
            {t('productIntelligence.processingHelp')}
          </p>
        </div>
      ) : status === 'failed' ? (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 text-center border border-red-200 dark:border-red-900/40">
          <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-3" />
          <p className="text-sm font-medium text-gray-700 dark:text-zinc-300">
            {t('productIntelligence.failedTitle')}
          </p>
          <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">
            {data?.errorMessage}
          </p>
        </div>
      ) : status === 'no_analysis' || products.length === 0 ? (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 text-center border border-gray-100 dark:border-zinc-800">
          <Package className="w-8 h-8 text-gray-300 dark:text-zinc-600 mx-auto mb-3" />
          <p className="text-sm font-medium text-gray-700 dark:text-zinc-300">
            {t('productIntelligence.noAnalysis')}
          </p>
          <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">
            {t('productIntelligence.noAnalysisDescription')}
          </p>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          <div className="w-full md:w-1/2">
            <ProductsTable
              products={products}
              totalCount={totalProducts}
              selectedProductId={selectedProduct?.getId() ?? null}
              onProductSelect={handleProductSelect}
            />
          </div>
          <div className="w-full md:w-1/2">
            <ProductDetailPanel
              product={selectedProduct}
              audienceId={audienceId}
            />
          </div>
        </div>
      )}
    </div>
  )
}
