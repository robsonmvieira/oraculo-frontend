import { useState, useEffect, useRef } from 'react'
import { Users, TrendingUp, Waypoints, Copy } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks'
import { Modal } from './Modal'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'

export interface Subreddit {
  id: string
  name: string
  icon?: string
}

export interface Audience {
  id: string
  name: string
  subredditCount: number
  totalMembers: number
  weeklyGrowth: number
  subreddits: readonly Subreddit[]
}

export interface SelectAudienceModalProps {
  isOpen: boolean
  onClose: () => void
  audiences: readonly Audience[]
  onCreateAudience: (name: string, selectedAudiences: string[]) => void
  isLoading?: boolean
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

interface AudienceSelectCardProps {
  audience: Audience
  isSelected: boolean
  onToggle: (id: string) => void
  index: number
}

function AudienceSelectCard({
  audience,
  isSelected,
  onToggle,
  index,
}: Readonly<AudienceSelectCardProps>) {
  const cardRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const displayedSubreddits = audience.subreddits.slice(0, 5)
  const remainingCount = audience.subreddits.length - displayedSubreddits.length

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
    <div
      ref={cardRef}
      onClick={() => onToggle(audience.id)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'cursor-pointer rounded-xl p-4 border-2 transition-colors duration-200',
        'bg-gray-50 dark:bg-zinc-800/50',
        isSelected
          ? 'border-lime bg-lime/5 dark:bg-lime/10'
          : 'border-transparent hover:border-gray-200 dark:hover:border-zinc-700'
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-bold text-gray-900 dark:text-white">
          {audience.name}
        </h4>
        <button
          onClick={(e) => {
            e.stopPropagation()
          }}
          className="cursor-pointer w-7 h-7 rounded-md flex items-center justify-center text-gray-400 hover:text-lime hover:bg-lime/10 transition-colors duration-200"
          title="Copy"
        >
          <Copy className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-zinc-400 mb-3">
        <div className="flex items-center gap-1">
          <Waypoints className="w-3.5 h-3.5" />
          <span>{audience.subredditCount} Subs</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="w-3.5 h-3.5" />
          <span>{formatNumber(audience.totalMembers)} Users</span>
        </div>
        <div
          className={cn(
            'flex items-center gap-1',
            audience.weeklyGrowth >= 0 ? 'text-success-light' : 'text-error-light'
          )}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>{audience.weeklyGrowth.toFixed(2)}%/mo</span>
        </div>
      </div>

      <div className="flex items-center -space-x-1.5">
        {displayedSubreddits.map((subreddit) => (
          <Avatar
            key={subreddit.id}
            src={subreddit.icon}
            alt={subreddit.name}
            fallback={subreddit.name.charAt(0)}
            size="sm"
            className="border-2 border-gray-50 dark:border-zinc-800 w-7 h-7"
          />
        ))}
        {remainingCount > 0 && (
          <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-zinc-700 flex items-center justify-center text-[10px] font-medium text-gray-600 dark:text-zinc-400 border-2 border-gray-50 dark:border-zinc-800">
            +{remainingCount}
          </div>
        )}
      </div>
    </div>
  )
}

export function SelectAudienceModal({
  isOpen,
  onClose,
  audiences,
  onCreateAudience,
  isLoading = false,
}: Readonly<SelectAudienceModalProps>) {
  const [audienceName, setAudienceName] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedAudiences, setSelectedAudiences] = useState<string[]>([])

  useEffect(() => {
    if (!isOpen) {
      setAudienceName('')
      setSearchQuery('')
      setSelectedAudiences([])
    }
  }, [isOpen])

  const filteredAudiences = audiences.filter((audience) =>
    audience.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleToggleAudience = (id: string) => {
    setSelectedAudiences((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    )
  }

  const handleSubmit = () => {
    if (audienceName.trim()) {
      onCreateAudience(audienceName.trim(), selectedAudiences)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="New Audience - Select Subreddits"
      icon={<Users className="w-5 h-5" />}
      size="xl"
    >
      <div className="p-6">
        <div className="mb-6">
          <label className="block text-xs font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wide mb-2">
            Name your custom audience
          </label>
          <div className="flex gap-3">
            <Input
              value={audienceName}
              onChange={(e) => setAudienceName(e.target.value)}
              placeholder='Pick a short name, like "Digital Marketers" or "Movie-Goers"'
              className="flex-1"
            />
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              variant="primary"
              size="md"
            >
              {isLoading ? 'Creating...' : 'Find Communities'}
            </Button>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wide">
              No audience in mind? Explore a curated one, or browse{' '}
              <button className="text-lime hover:underline cursor-pointer uppercase">
                Trending Subreddits
              </button>
              .
            </p>
            <Input
              icon
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search audiences..."
              className="w-64"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto pr-2">
          {filteredAudiences.map((audience, index) => (
            <AudienceSelectCard
              key={audience.id}
              audience={audience}
              isSelected={selectedAudiences.includes(audience.id)}
              onToggle={handleToggleAudience}
              index={index}
            />
          ))}
          {filteredAudiences.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500 dark:text-zinc-400">
              No audiences found matching "{searchQuery}"
            </div>
          )}
        </div>

        {selectedAudiences.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-zinc-800">
            <p className="text-sm text-gray-600 dark:text-zinc-400">
              <span className="font-semibold text-lime">
                {selectedAudiences.length}
              </span>{' '}
              audience{selectedAudiences.length !== 1 ? 's' : ''} selected
            </p>
          </div>
        )}
      </div>
    </Modal>
  )
}
