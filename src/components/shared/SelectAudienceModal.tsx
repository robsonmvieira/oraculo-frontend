import { useState, useEffect, useRef } from 'react'
import { Users, TrendingUp, Globe, Loader2 } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks'
import { Modal } from './Modal'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { useBrowseCommunities } from '@/modules/community/application/hooks'
import type { Community } from '@/modules/community/domain/entities/Community.entity'

export interface SelectAudienceModalProps {
  isOpen: boolean
  onClose: () => void
  onCreateAudience: (name: string, selectedCommunityNames: string[]) => void
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

interface CommunitySelectCardProps {
  community: Community
  isSelected: boolean
  onToggle: (name: string) => void
  index: number
}

function CommunitySelectCard({
  community,
  isSelected,
  onToggle,
  index,
}: Readonly<CommunitySelectCardProps>) {
  const cardRef = useRef<HTMLDivElement>(null)
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
    <div
      ref={cardRef}
      onClick={() => onToggle(community.getName())}
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
          <span>{formatNumber(community.getSubscribers())} members</span>
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
    </div>
  )
}

export function SelectAudienceModal({
  isOpen,
  onClose,
  onCreateAudience,
  isLoading = false,
}: Readonly<SelectAudienceModalProps>) {
  const [audienceName, setAudienceName] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCommunities, setSelectedCommunities] = useState<string[]>([])

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingCommunities,
  } = useBrowseCommunities()

  const allCommunities = data?.pages.flatMap((page) => page.communities) ?? []

  const filteredCommunities = allCommunities.filter(
    (community) =>
      community.getTitle().toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.getName().toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.getCategory().toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleClose = () => {
    setAudienceName('')
    setSearchQuery('')
    setSelectedCommunities([])
    onClose()
  }

  const handleToggleCommunity = (name: string) => {
    setSelectedCommunities((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    )
  }

  const handleSubmit = () => {
    if (audienceName.trim()) {
      onCreateAudience(audienceName.trim(), selectedCommunities)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="New Audience - Select Communities"
      icon={<Globe className="w-5 h-5" />}
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
              disabled={isLoading || selectedCommunities.length === 0}
              variant="primary"
              size="md"
            >
              {isLoading ? 'Creating...' : 'Create Audience'}
            </Button>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wide">
              Browse and select communities for your audience
            </p>
            <Input
              icon
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search communities..."
              className="w-64"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto pr-2">
          {isLoadingCommunities ? (
            <div className="col-span-full flex justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
          ) : (
            <>
              {filteredCommunities.map((community, index) => (
                <CommunitySelectCard
                  key={community.getName()}
                  community={community}
                  isSelected={selectedCommunities.includes(
                    community.getName()
                  )}
                  onToggle={handleToggleCommunity}
                  index={index}
                />
              ))}
              {filteredCommunities.length === 0 && (
                <div className="col-span-full text-center py-12 text-gray-500 dark:text-zinc-400">
                  No communities found matching "{searchQuery}"
                </div>
              )}
            </>
          )}
        </div>

        {hasNextPage && !searchQuery && (
          <div className="mt-4 flex justify-center">
            <Button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              variant="outline"
              size="sm"
            >
              {isFetchingNextPage ? 'Loading...' : 'Load More Communities'}
            </Button>
          </div>
        )}

        {selectedCommunities.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-zinc-800">
            <p className="text-sm text-gray-600 dark:text-zinc-400">
              <span className="font-semibold text-lime">
                {selectedCommunities.length}
              </span>{' '}
              communit{selectedCommunities.length !== 1 ? 'ies' : 'y'} selected
            </p>
          </div>
        )}
      </div>
    </Modal>
  )
}
