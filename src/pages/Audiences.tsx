import { useRef, useEffect, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks'
import { AudiencesToolbar, UserAudiencesSection, TemplateAudiencesSection } from '@/components/audiences'
import type { SortOption, ViewMode } from '@/components/audiences'
import { SelectAudienceModal } from '@/components/shared'
import { useFetchDefaultAudiences, useCreateAudience, useListUserAudiences } from '@/modules/audience/application/hooks'
import { useCreateAudienceStore } from '@/modules/audience/application/store'

export function Audiences() {
  const userGridRef = useRef<HTMLDivElement>(null)
  const templatesGridRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('name')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const { openModal, closeModal } = useCreateAudienceStore()
  const createAudienceMutation = useCreateAudience()

  const { data: userAudiencesData } = useListUserAudiences()
  const { data: templates } = useFetchDefaultAudiences()

  const userAudiences = (userAudiencesData ?? []).map((audience) => ({
    id: audience.getId(),
    name: audience.getName(),
    subredditCount: audience.getTotalSubs(),
    totalMembers: audience.getTotalMembers(),
    weeklyGrowth: audience.getGrowthWeek() ?? 0,
    subreddits: audience.getCommunities().map((c) => ({
      id: c.id,
      name: `r/${c.display.display_name}`,
      icon: c.display.community_icon,
    })),
  }))

  const templateAudiences = (templates ?? []).map((template) => ({
    id: template.getId(),
    name: template.getName(),
    subredditCount: template.getCommunitiesCount(),
    totalMembers: template.getTotalSubscribers() ?? 0,
    weeklyGrowth: 0,
    subreddits: template.getCommunities().map((community, index) => ({
      id: `${template.getId()}-${index}`,
      name: `r/${community.name}`,
    })),
  }))

  const filteredTemplates = templateAudiences
    .filter((audience) =>
      audience.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'subreddits':
          return b.subredditCount - a.subredditCount
        case 'name':
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

  useEffect(() => {
    if (prefersReducedMotion) return

    const animate = (grid: HTMLDivElement | null) => {
      if (!grid) return
      gsap.fromTo(
        Array.from(grid.children),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power2.out',
          clearProps: 'all',
        }
      )
    }

    animate(userGridRef.current)
    animate(templatesGridRef.current)
  }, [prefersReducedMotion, userAudiences, filteredTemplates])

  const handleSaveClick = (id: string) => {
    console.log('Save clicked for audience:', id)
  }

  const handleShareClick = (id: string) => {
    console.log('Share clicked for audience:', id)
  }

  return (
    <div className="space-y-6">
      <AudiencesToolbar
        sortBy={sortBy}
        onSortChange={setSortBy}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <UserAudiencesSection
        audiences={userAudiences}
        viewMode={viewMode}
        onAddClick={openModal}
        onSaveClick={handleSaveClick}
        onShareClick={handleShareClick}
        gridRef={userGridRef}
      />

      <TemplateAudiencesSection
        audiences={filteredTemplates}
        viewMode={viewMode}
        searchQuery={searchQuery}
        onSaveClick={handleSaveClick}
        onShareClick={handleShareClick}
        gridRef={templatesGridRef}
      />

      <SelectAudienceModal
        onCreateAudience={(name, selectedCommunityNames) => {
          createAudienceMutation.mutate(
            {
              name,
              description: '',
              subreddit_names: selectedCommunityNames,
            },
            {
              onSuccess: () => {
                closeModal()
              },
            }
          )
        }}
        isLoading={createAudienceMutation.isPending}
      />
    </div>
  )
}

export default Audiences
