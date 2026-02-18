import { useRef, useEffect, useState } from 'react'
import { Search, LayoutGrid, List } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks'
import { AudienceCard, AddAudienceCard } from '@/components/audiences'
import { SelectAudienceModal } from '@/components/shared'
import { audiences } from '@/data/audiences'

type SortOption = 'growth' | 'members' | 'subreddits' | 'name'
type ViewMode = 'grid' | 'list'

import { useFetchDefaultAudiences } from '@/modules/audience/application/hooks'

export function Audiences() {
  const gridRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('growth')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data: templates, isLoading, error } = useFetchDefaultAudiences()
  
  useEffect(() => {
    if (templates) {
      console.log(templates)
    }
    if (error) {
      console.error(error)
    }
    if (isLoading) {
      console.log('Loading...')
    }
  }, [templates, error, isLoading])

  const filteredAudiences = audiences
    .filter((audience) =>
      audience.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'growth':
          return b.weeklyGrowth - a.weeklyGrowth
        case 'members':
          return b.totalMembers - a.totalMembers
        case 'subreddits':
          return b.subredditCount - a.subredditCount
        case 'name':
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

  useEffect(() => {
    const grid = gridRef.current
    if (!grid || prefersReducedMotion) return

    const children = Array.from(grid.children)

    gsap.fromTo(
      children,
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
  }, [prefersReducedMotion, filteredAudiences])

  const handleSaveClick = (id: string) => {
    console.log('Save clicked for audience:', id)
  }

  const handleShareClick = (id: string) => {
    console.log('Share clicked for audience:', id)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Your Saved Audiences
          </h2>
          <span className="text-lg text-gray-500 dark:text-zinc-400">
            {filteredAudiences.length}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-zinc-400">
            <span>Sort</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-transparent border-none text-gray-900 dark:text-white font-medium cursor-pointer focus:ring-0 focus:outline-none"
            >
              <option value="growth">Growth</option>
              <option value="members">Members</option>
              <option value="subreddits">Subreddits</option>
              <option value="name">Name</option>
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

      <div
        ref={gridRef}
        className={`grid gap-4 ${
          viewMode === 'grid'
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            : 'grid-cols-1'
        }`}
      >
        {filteredAudiences.map((audience) => (
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
        <AddAudienceCard onClick={() => setIsModalOpen(true)} />
      </div>

      {filteredAudiences.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-zinc-400">
            No audiences found matching "{searchQuery}"
          </p>
        </div>
      )}

      <SelectAudienceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        audiences={audiences}
        onCreateAudience={(name, selectedAudiences) => {
          console.log('Creating audience:', name, selectedAudiences)
          setIsModalOpen(false)
        }}
      />
    </div>
  )
}

export default Audiences
