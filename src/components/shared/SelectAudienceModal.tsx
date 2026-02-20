import { useState, useEffect, useRef } from 'react'
import { Globe, Loader2 } from 'lucide-react'
import { useDebounce } from '@/hooks'
import { Modal } from './Modal'
import { CommunitySelectCard } from './CommunitySelectCard'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useBrowseCommunities } from '@/modules/community/application/hooks'
import { useCreateAudienceStore } from '@/modules/audience/application/store'
import type { Community } from '@/modules/community/domain/entities/Community.entity'

export interface SelectAudienceModalProps {
  onCreateAudience: (name: string, selectedCommunityNames: string[]) => void
  isLoading?: boolean
}

export function SelectAudienceModal({
  onCreateAudience,
  isLoading = false,
}: Readonly<SelectAudienceModalProps>) {
  const {
    audienceName,
    selectedCommunities,
    isModalOpen,
    setAudienceName,
    toggleCommunity,
    closeModal,
    getSelectedNames,
  } = useCreateAudienceStore()

  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearch = useDebounce(searchQuery, 300)

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingCommunities,
  } = useBrowseCommunities(debouncedSearch || undefined)

  const communities = data?.pages.flatMap((page) => page.communities) ?? []

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sentinel = sentinelRef.current
    const root = scrollContainerRef.current
    if (!sentinel || !root) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { root, threshold: 0.1 }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  const handleClose = () => {
    setSearchQuery('')
    closeModal()
  }

  const handleToggleCommunity = (community: Community) => {
    toggleCommunity(community)
  }

  const handleSubmit = () => {
    if (audienceName.trim()) {
      onCreateAudience(audienceName.trim(), getSelectedNames())
    }
  }

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handleClose}
      title="New Audience - Select Communities"
      icon={<Globe className="w-5 h-5" />}
      size="xl"
    >
      <div className="p-6">
        <div className="mb-6">
          <label htmlFor="audienceName" className="block text-xs font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wide mb-2">
            Name your custom audience
          </label>
          <div className="flex gap-3">
            <Input
              id="audienceName"
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

        <div ref={scrollContainerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto pr-2">
          {isLoadingCommunities ? (
            <div className="col-span-full flex justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
          ) : (
            <>
              {communities.map((community, index) => (
                <CommunitySelectCard
                  key={community.getName()}
                  community={community}
                  isSelected={selectedCommunities.some(
                    (c) => c.getName() === community.getName()
                  )}
                  onToggle={handleToggleCommunity}
                  index={index}
                />
              ))}
              {communities.length === 0 && !isFetchingNextPage && (
                <div className="col-span-full text-center py-12 text-gray-500 dark:text-zinc-400">
                  No communities found matching "{searchQuery}"
                </div>
              )}
              <div ref={sentinelRef} className="col-span-full">
                {isFetchingNextPage && (
                  <div className="flex justify-center py-4">
                    <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                  </div>
                )}
              </div>
            </>
          )}
        </div>

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
