import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, TrendingUp, Waypoints, Tag, Unplug } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks'
import { Avatar } from '@/components/ui/avatar'

export interface Subreddit {
  id: string
  name: string
  icon?: string
}

export type AudienceType = 'user' | 'template'

export interface AudienceCardProps {
  id: string
  name: string
  subredditCount: number
  totalMembers: number
  weeklyGrowth: number
  subreddits: readonly Subreddit[]
  type?: AudienceType
  onSaveClick?: (id: string) => void
  onShareClick?: (id: string) => void
}

function formatNumber(num: number): string {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(0)}K`
  }
  return num.toString()
}

export interface AddAudienceCardProps {
  onClick?: () => void
}

export function AddAudienceCard({ onClick }: Readonly<AddAudienceCardProps>) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer bg-transparent rounded-2xl p-6 border-2 border-dashed border-gray-300 dark:border-zinc-700 transition-all duration-300 hover:border-lime dark:hover:border-lime flex items-center justify-center min-h-[140px]"
    >
      <span className="text-lg font-bold text-gray-400 dark:text-zinc-500">Add new Audience</span>
    </button>
  )
}

export function AudienceCard({
  id,
  name,
  subredditCount,
  totalMembers,
  weeklyGrowth,
  subreddits,
  type = 'template',
  onSaveClick,
  onShareClick,
}: Readonly<AudienceCardProps>) {
  const navigate = useNavigate()
  const cardRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const displayedSubreddits = subreddits.slice(0, 5)
  const remainingCount = subreddits.length - displayedSubreddits.length

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
      className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-transparent transition-all duration-300 hover:border-gray-200 dark:hover:border-zinc-700 flex flex-col"
    >
      <div className="flex items-start justify-between mb-4">
        <button
          type="button"
          onClick={() => navigate(`/audiences/${id}${type === 'user' ? '?type=user' : ''}`)}
          className="text-lg font-bold text-gray-900 dark:text-white cursor-pointer hover:text-lime transition-colors text-left"
        >
          {name}
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onSaveClick?.(id)}
            className="cursor-pointer w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-lime hover:bg-lime/10 transition-colors duration-200"
            title="Save"
          >
            <Tag className="w-4 h-4" />
          </button>
          <button
            onClick={() => onShareClick?.(id)}
            className="cursor-pointer w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-lime hover:bg-lime/10 transition-colors duration-200"
            title="add to audience"
          >
            <Unplug className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-zinc-400 mb-4">
        <div className="flex items-center gap-1.5">
          <Waypoints className="w-4 h-4" />
          <span>{subredditCount} Subs</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Users className="w-4 h-4" />
          <span>{formatNumber(totalMembers)} Members</span>
        </div>
        <div className={cn(
          'flex items-center gap-1.5',
          weeklyGrowth >= 0 ? 'text-success-light' : 'text-error-light'
        )}>
          <TrendingUp className="w-4 h-4" />
          <span>{weeklyGrowth.toFixed(2)}% /wk</span>
        </div>
      </div>

      <div className="flex items-center -space-x-2 mt-auto">
        {displayedSubreddits.map((subreddit) => (
          <Avatar
            key={subreddit.id}
            src={subreddit.icon}
            alt={subreddit.name}
            fallback={subreddit.name.charAt(0)}
            size="sm"
            className="border-2 border-white dark:border-zinc-900"
          />
        ))}
        {remainingCount > 0 && (
          <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center text-xs font-medium text-gray-600 dark:text-zinc-400 border-2 border-white dark:border-zinc-900">
            +{remainingCount}
          </div>
        )}
      </div>
    </div>
  )
}
