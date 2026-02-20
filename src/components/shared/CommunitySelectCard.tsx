import { useEffect, useRef } from 'react'
import { Users, TrendingUp } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { cn, formatCompactNumber } from '@/lib/utils'
import { useReducedMotion } from '@/hooks'
import { Avatar } from '@/components/ui/avatar'
import type { Community } from '@/modules/community/domain/entities/Community.entity'

export interface CommunitySelectCardProps {
  community: Community
  isSelected: boolean
  onToggle: (community: Community) => void
  index: number
}

export function CommunitySelectCard({
  community,
  isSelected,
  onToggle,
  index,
}: Readonly<CommunitySelectCardProps>) {
  const cardRef = useRef<HTMLButtonElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!cardRef.current || prefersReducedMotion) return

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        delay: index * 0.05,
        ease: 'power2.out',
      }
    )
  }, [index, prefersReducedMotion])

  const handleMouseEnter = () => {
    if (!cardRef.current || prefersReducedMotion) return
    gsap.to(cardRef.current, {
      y: -2,
      duration: 0.2,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    if (!cardRef.current || prefersReducedMotion) return
    gsap.to(cardRef.current, {
      y: 0,
      duration: 0.2,
      ease: 'power2.out',
    })
  }

  return (
    <button
      type="button"
      ref={cardRef}
      onClick={() => onToggle(community)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'cursor-pointer rounded-xl p-4 border-2 transition-colors duration-200 text-left w-full',
        'bg-gray-50 dark:bg-zinc-800/50',
        isSelected
          ? 'border-lime bg-lime/5 dark:bg-lime/10'
          : 'border-transparent hover:border-gray-200 dark:hover:border-zinc-700'
      )}
    >
      <div className="flex items-start gap-3 mb-3">
        <Avatar
          src={community.getIconUrl()}
          alt={community.getTitle()}
          fallback={community.getTitle().charAt(0)}
          size="sm"
          className="w-8 h-8"
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-gray-900 dark:text-white truncate">
            {community.getTitle()}
          </h4>
          {community.getCategory() && (
            <span className="text-xs text-gray-400 dark:text-zinc-500">
              {community.getCategory()}
            </span>
          )}
        </div>
      </div>

      <p className="text-xs text-gray-500 dark:text-zinc-400 mb-3 line-clamp-2">
        {community.getDescription()}
      </p>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-zinc-400">
        <div className="flex items-center gap-1">
          <Users className="w-3.5 h-3.5" />
          <span>{formatCompactNumber(community.getSubscribers())} members</span>
        </div>
        {community.getGrowthWeek() !== null && (
          <div
            className={cn(
              'flex items-center gap-1',
              community.getGrowthWeek()! >= 0
                ? 'text-success-light'
                : 'text-error-light'
            )}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{community.getGrowthWeek()!.toFixed(2)}%/wk</span>
          </div>
        )}
      </div>
    </button>
  )
}
