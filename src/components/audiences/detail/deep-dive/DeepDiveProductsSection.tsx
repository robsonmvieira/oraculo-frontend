import { Package } from 'lucide-react'
import type { MentionedProduct } from '@/modules/audience/domain/entities/TopicDeepDive.entity'

export interface DeepDiveProductsSectionProps {
  products: MentionedProduct[]
}

const sentimentColors: Record<string, string> = {
  positive: 'text-green-600 dark:text-green-400',
  negative: 'text-red-600 dark:text-red-400',
  neutral: 'text-gray-500 dark:text-zinc-400',
  mixed: 'text-yellow-600 dark:text-yellow-400',
}

export function DeepDiveProductsSection({ products }: Readonly<DeepDiveProductsSectionProps>) {
  if (products.length === 0) return null

  return (
    <div className="pt-4 border-t border-gray-100 dark:border-zinc-800">
      <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-3">
        Mentioned Products
        <span className="ml-2 text-xs text-gray-500 dark:text-zinc-400">{products.length}</span>
      </h4>
      <div className="space-y-3">
        {products.map((product) => (
          <div
            key={product.name}
            className="p-3 rounded-lg bg-gray-50 dark:bg-zinc-800"
          >
            <div className="flex items-center gap-2 mb-1">
              <Package className="w-3.5 h-3.5 text-gray-400 dark:text-zinc-500" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {product.name}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-zinc-700 text-gray-600 dark:text-zinc-300">
                {product.category}
              </span>
              <span className={`text-xs ml-auto ${sentimentColors[product.sentiment] ?? sentimentColors.neutral}`}>
                {product.sentiment}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-600 dark:text-zinc-300 leading-relaxed flex-1">
                {product.context}
              </p>
              <span className="text-[10px] text-gray-400 dark:text-zinc-500 ml-2 shrink-0">
                {product.mentionCount}x
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
