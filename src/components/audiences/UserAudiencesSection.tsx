import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks'
import { AudienceCard, AddAudienceCard } from './AudienceCard'
import { gridClassName } from './audiences.types'
import type { AudienceDisplayItem, ViewMode } from './audiences.types'

export interface UserAudiencesSectionProps {
  audiences: readonly AudienceDisplayItem[]
  viewMode: ViewMode
  isLoading?: boolean
  onAddClick: () => void
  onSaveClick: (id: string) => void
  onShareClick: (id: string) => void
}

function AudienceCardSkeleton() {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="h-5 bg-gray-200 dark:bg-zinc-700 rounded w-2/5" />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-200 dark:bg-zinc-700 rounded-lg" />
          <div className="w-8 h-8 bg-gray-200 dark:bg-zinc-700 rounded-lg" />
        </div>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded w-16" />
        <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded w-20" />
        <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded w-24" />
      </div>
      <div className="flex items-center -space-x-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="w-8 h-8 rounded-full bg-gray-200 dark:bg-zinc-700 border-2 border-white dark:border-zinc-900"
          />
        ))}
      </div>
    </div>
  )
}

export function UserAudiencesSection({
  audiences,
  viewMode,
  isLoading,
  onAddClick,
  onSaveClick,
  onShareClick,
}: Readonly<UserAudiencesSectionProps>) {
  const sectionRef = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)
  const gsapCtxRef = useRef<gsap.Context | null>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const section = sectionRef.current
    if (!section || hasAnimated.current || prefersReducedMotion) return

    if (audiences.length === 0) return

    hasAnimated.current = true

    gsapCtxRef.current = gsap.context(() => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        }
      )

      const grid = section.querySelector('[data-user-grid]')
      if (grid) {
        gsap.fromTo(
          Array.from(grid.children),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.06,
            delay: 0.15,
            ease: 'power2.out',
            clearProps: 'transform',
          }
        )
      }
    }, section)
  }, [audiences.length, prefersReducedMotion])

  useEffect(() => {
    return () => {
      gsapCtxRef.current?.revert()
      hasAnimated.current = false
    }
  }, [])

  const { t } = useTranslation('audiences')

  if (!isLoading && audiences.length === 0) return null

  if (isLoading) {
    return (
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('page.yourAudiences')}
          </h2>
        </div>
        <div className={gridClassName(viewMode)}>
          {Array.from({ length: 3 }).map((_, i) => (
            <AudienceCardSkeleton key={i} />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} className="space-y-4" style={{ opacity: 0 }}>
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('page.yourAudiences')}
        </h2>
        <span className="text-lg text-gray-500 dark:text-zinc-400">
          {audiences.length}
        </span>
      </div>

      <div data-user-grid className={gridClassName(viewMode)}>
        {audiences.map((audience) => (
          <AudienceCard
            key={audience.id}
            id={audience.id}
            name={audience.name}
            subredditCount={audience.subredditCount}
            totalMembers={audience.totalMembers}
            weeklyGrowth={audience.weeklyGrowth}
            subreddits={audience.subreddits}
            type="user"
            onSaveClick={onSaveClick}
            onShareClick={onShareClick}
          />
        ))}
        <AddAudienceCard onClick={onAddClick} />
      </div>
    </section>
  )
}
