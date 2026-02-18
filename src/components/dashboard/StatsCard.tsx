import { useRef, useEffect, type ReactNode } from 'react'
import { ArrowUp, ArrowDown } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { cn } from '@/lib/utils'
import { useCountUp, useReducedMotion } from '@/hooks'

interface StatsCardProps {
  title: string
  value: number
  percentChange: number
  icon: ReactNode
  iconBgColor: string
  iconColor: string
  prefix?: string
  suffix?: string
  decimals?: number
}

export function StatsCard({
  title,
  value,
  percentChange,
  icon,
  iconBgColor,
  iconColor,
  prefix = '',
  suffix = '',
  decimals = 0,
}: StatsCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const displayValue = useCountUp(value, { prefix, decimals })

  const isPositive = percentChange >= 0
  const changeText = `${isPositive ? '+' : ''}${percentChange.toFixed(1)}%`

  useEffect(() => {
    if (!cardRef.current || prefersReducedMotion) return

    const handleMouseEnter = () => {
      gsap.to(cardRef.current, {
        y: -4,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
        duration: 0.25,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(cardRef.current, {
        y: 0,
        boxShadow: 'none',
        duration: 0.25,
        ease: 'power2.out',
      })
    }

    cardRef.current.addEventListener('mouseenter', handleMouseEnter)
    cardRef.current.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cardRef.current?.removeEventListener('mouseenter', handleMouseEnter)
      cardRef.current?.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [prefersReducedMotion])

  return (
    <div
      ref={cardRef}
      className="bg-white dark:bg-zinc-900 rounded-[1.875rem] p-6 border border-transparent transition-all duration-300 hover:border-gray-200 dark:hover:border-zinc-700"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {displayValue}{suffix}
          </div>
          <div className="text-sm text-gray-600 dark:text-zinc-400 mt-1">{title}</div>
        </div>
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: iconBgColor, color: iconColor }}
        >
          {icon}
        </div>
      </div>

      <div
        className={cn(
          'text-xs font-medium flex items-center gap-1',
          isPositive ? 'text-success-light' : 'text-error-light'
        )}
      >
        {isPositive ? (
          <ArrowUp className="w-3 h-3" />
        ) : (
          <ArrowDown className="w-3 h-3" />
        )}
        {changeText} from last month
      </div>
    </div>
  )
}
