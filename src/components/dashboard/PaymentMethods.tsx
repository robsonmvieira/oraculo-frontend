import { useEffect, useRef } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { gsap } from '@/lib/gsap'
import { useCountUp, useReducedMotion } from '@/hooks'

interface PaymentData {
  name: string
  value: number
  color: string
}

interface PaymentMethodsProps {
  data: PaymentData[]
  total: number
}

export function PaymentMethods({ data, total }: PaymentMethodsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const displayTotal = useCountUp(total, { decimals: 2 })

  useEffect(() => {
    const container = containerRef.current
    if (!container || prefersReducedMotion) return

    gsap.fromTo(
      container,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.2,
        ease: 'power2.out',
        clearProps: 'all',
      }
    )
  }, [prefersReducedMotion])

  return (
    <div
      ref={containerRef}
      className="bg-white dark:bg-zinc-900 rounded-[1.875rem] p-6 border border-transparent transition-all duration-300 hover:border-gray-200 dark:hover:border-zinc-700"
    >
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Payment Methods</h3>

      <div className="relative h-[200px] mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{displayTotal}</div>
            <div className="text-xs text-gray-500 dark:text-zinc-400">Total</div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-gray-600 dark:text-zinc-400">{item.name}</span>
            </div>
            <span className="text-sm font-bold text-gray-900 dark:text-white">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
