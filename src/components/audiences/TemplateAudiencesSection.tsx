import type { RefObject } from 'react'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation('audiences')

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('page.findAudiences')}
        </h2>
        <span className="text-lg text-gray-500 dark:text-zinc-400">
          {audiences.length}
        </span>
      </div>

      <div ref={gridRef} className={gridClassName(viewMode)}>
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
        {showAddCard && <AddAudienceCard onClick={onAddClick} />}
      </div>

      {audiences.length === 0 && searchQuery && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-zinc-400">
            {t('page.noAudiencesFound', { query: searchQuery })}
          </p>
        </div>
      )}
    </section>
  )
}
