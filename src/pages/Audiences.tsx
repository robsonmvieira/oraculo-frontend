import { useRef, useEffect, useState } from 'react'
import { Search, LayoutGrid, List } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks'
import { AudienceCard, AddAudienceCard } from '@/components/audiences'
import { SelectAudienceModal } from '@/components/shared'
import { useFetchDefaultAudiences, useCreateAudience, useListUserAudiences } from '@/modules/audience/application/hooks'
import { useCreateAudienceStore } from '@/modules/audience/application/store'

type SortOption = 'subreddits' | 'name'
type ViewMode = 'grid' | 'list'

const gridClassName = (viewMode: ViewMode) =>
  `grid gap-4 ${
    viewMode === 'grid'
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      : 'grid-cols-1'
  }`

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
      {/* Global Controls */}
      <div className="flex justify-end">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-zinc-400">
            <span>Sort</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-transparent border-none text-gray-900 dark:text-white font-medium cursor-pointer focus:ring-0 focus:outline-none"
            >
              <option value="name">Name</option>
              <option value="subreddits">Subreddits</option>
            </select>
          </div>

          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-zinc-400">
            <span>Display</span>
            <div className="flex items-center bg-gray-100 dark:bg-zinc-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-zinc-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-zinc-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-zinc-400">
            <span>Search</span>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Audience/Subreddit"
                className="w-48 pl-3 pr-8 py-1.5 bg-transparent border border-gray-200 dark:border-zinc-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-lime"
              />
              <Search className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Your Audiences Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Your Audiences
          </h2>
          <span className="text-lg text-gray-500 dark:text-zinc-400">
            {userAudiences.length}
          </span>
        </div>

        <div ref={userGridRef} className={gridClassName(viewMode)}>
          {userAudiences.map((audience) => (
            <AudienceCard
              key={audience.id}
              id={audience.id}
              name={audience.name}
              subredditCount={audience.subredditCount}
              totalMembers={audience.totalMembers}
              weeklyGrowth={audience.weeklyGrowth}
              subreddits={audience.subreddits}
              onSaveClick={handleSaveClick}
              onShareClick={handleShareClick}
            />
          ))}
          <AddAudienceCard onClick={openModal} />
        </div>

        {userAudiences.length === 0 && (
          <p className="text-gray-500 dark:text-zinc-400 text-sm">
            You haven't created any audiences yet. Start by creating your first one!
          </p>
        )}
      </section>

      {/* Find Audiences (Templates) Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Find Audiences
          </h2>
          <span className="text-lg text-gray-500 dark:text-zinc-400">
            {filteredTemplates.length}
          </span>
        </div>

        <div ref={templatesGridRef} className={gridClassName(viewMode)}>
          {filteredTemplates.map((audience) => (
            <AudienceCard
              key={audience.id}
              id={audience.id}
              name={audience.name}
              subredditCount={audience.subredditCount}
              totalMembers={audience.totalMembers}
              weeklyGrowth={audience.weeklyGrowth}
              subreddits={audience.subreddits}
              onSaveClick={handleSaveClick}
              onShareClick={handleShareClick}
            />
          ))}
        </div>

        {filteredTemplates.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-zinc-400">
              No audiences found matching "{searchQuery}"
            </p>
          </div>
        )}
      </section>

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
