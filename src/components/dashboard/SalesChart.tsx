import { useEffect, useRef } from 'react'
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from 'recharts'
import { ChevronDown } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks'

interface SalesData {
  day: string
  netIncome: number
  totalSales: number
  totalRevenue: number
}

interface SalesChartProps {
  data: SalesData[]
}

export function SalesChart({ data }: SalesChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Sales Performance</h3>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500" />
              <span className="text-xs text-gray-500 dark:text-zinc-400">Net income</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-lime" />
              <span className="text-xs text-gray-500 dark:text-zinc-400">Total sales</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-zinc-600" />
              <span className="text-xs text-gray-500 dark:text-zinc-400">Total revenue</span>
            </div>
          </div>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 text-sm font-medium text-gray-600 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
          This Week
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis
              dataKey="day"
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
              labelStyle={{ fontWeight: 'bold', color: '#101828' }}
              formatter={(value) => [`$${Number(value).toLocaleString()}`, '']}
            />
            <Area
              type="monotone"
              dataKey="netIncome"
              stroke="#a855f7"
              fill="url(#colorRevenue)"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="totalSales"
              stroke="#c3f53c"
              strokeWidth={2}
              dot={{ fill: '#c3f53c', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            <Line
              type="monotone"
              dataKey="totalRevenue"
              stroke="#d1d5db"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
