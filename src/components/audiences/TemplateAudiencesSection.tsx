import type { RefObject } from 'react'
import { AudienceCard, AddAudienceCard } from './AudienceCard'
import { gridClassName } from './audiences.types'
import type { AudienceDisplayItem, ViewMode } from './audiences.types'

export interface TemplateAudiencesSectionProps {
  audiences: readonly AudienceDisplayItem[]
  viewMode: ViewMode
  searchQuery: string
  onSaveClick: (id: string) => void
  onShareClick: (id: string) => void
  gridRef?: RefObject<HTMLDivElement | null>
  showAddCard?: boolean
  onAddClick?: () => void
}

export function TemplateAudiencesSection({
  audiences,
  viewMode,
  searchQuery,
  onSaveClick,
  onShareClick,
  gridRef,
  showAddCard,
  onAddClick,
}: Readonly<TemplateAudiencesSectionProps>) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Find Audiences
        </h2>
        <span className="text-lg text-gray-500 dark:text-zinc-400">
          {audiences.length}
        </span>
      </div>

      <div ref={gridRef} className={gridClassName(viewMode)}>
        {showAddCard && <AddAudienceCard onClick={onAddClick} />}
        {audiences.map((audience) => (
          <AudienceCard
            key={audience.id}
            id={audience.id}
            name={audience.name}
            subredditCount={audience.subredditCount}
            totalMembers={audience.totalMembers}
            weeklyGrowth={audience.weeklyGrowth}
            subreddits={audience.subreddits}
            onSaveClick={onSaveClick}
            onShareClick={onShareClick}
          />
        ))}
      </div>

      {audiences.length === 0 && searchQuery && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-zinc-400">
            No audiences found matching "{searchQuery}"
          </p>
        </div>
      )}
    </section>
  )
}
