import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { Badge } from '@/components/ui'
import { useReducedMotion } from '@/hooks'

interface InventoryItem {
  id: string
  productName: string
  productImage: string
  quantity: number
}

interface InventoryAlertsProps {
  items: InventoryItem[]
}

function getQuantityVariant(quantity: number): 'error' | 'warning' | 'success' {
  if (quantity <= 10) return 'error'
  if (quantity <= 25) return 'warning'
  return 'success'
}

export function InventoryAlerts({ items }: InventoryAlertsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const list = listRef.current
    if (!list || prefersReducedMotion) return

    const children = Array.from(list.children)

    gsap.fromTo(
      children,
      { x: 20, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.08,
        delay: 0.3,
        ease: 'power2.out',
        clearProps: 'all',
      }
    )
  }, [prefersReducedMotion])

  const handleItemHover = (e: React.MouseEvent<HTMLLIElement>) => {
    if (prefersReducedMotion) return
    gsap.to(e.currentTarget, {
      y: -2,
      duration: 0.2,
      ease: 'power2.out',
    })
    const badge = e.currentTarget.querySelector('.quantity-badge')
    if (badge) {
      gsap.to(badge, {
        scale: 1.1,
        duration: 0.2,
        ease: 'back.out(2)',
      })
    }
  }

  const handleItemLeave = (e: React.MouseEvent<HTMLLIElement>) => {
    if (prefersReducedMotion) return
    gsap.to(e.currentTarget, {
      y: 0,
      duration: 0.2,
      ease: 'power2.out',
    })
    const badge = e.currentTarget.querySelector('.quantity-badge')
    if (badge) {
      gsap.to(badge, {
        scale: 1,
        duration: 0.2,
        ease: 'power2.out',
      })
    }
  }

  return (
    <div
      ref={containerRef}
      className="bg-white dark:bg-zinc-900 rounded-[1.875rem] p-6 border border-transparent transition-all duration-300 hover:border-gray-200 dark:hover:border-zinc-700"
    >
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Inventory Alerts</h3>

      <ul ref={listRef} className="space-y-4">
        {items.map((item) => (
          <li
            key={item.id}
            onMouseEnter={handleItemHover}
            onMouseLeave={handleItemLeave}
            className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 dark:bg-zinc-800 transition-colors cursor-pointer"
          >
            <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-zinc-700 overflow-hidden flex-shrink-0">
              <img
                src={item.productImage}
                alt={item.productName}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {item.productName}
              </p>
              <p className="text-xs text-gray-500 dark:text-zinc-400">Low stock alert</p>
            </div>

            <Badge
              variant={getQuantityVariant(item.quantity)}
              size="sm"
              className="quantity-badge"
            >
              {item.quantity}
            </Badge>
          </li>
        ))}
      </ul>
    </div>
  )
}
