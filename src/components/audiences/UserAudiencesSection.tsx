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
  onAddClick: () => void
  onSaveClick: (id: string) => void
  onShareClick: (id: string) => void
}

export function UserAudiencesSection({
  audiences,
  viewMode,
  onAddClick,
  onSaveClick,
  onShareClick,
}: Readonly<UserAudiencesSectionProps>) {
  const sectionRef = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const section = sectionRef.current
    if (!section || hasAnimated.current || prefersReducedMotion) return

    if (audiences.length === 0) return

    hasAnimated.current = true

    const ctx = gsap.context(() => {
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

    return () => ctx.revert()
  }, [audiences.length, prefersReducedMotion])

  useEffect(() => {
    return () => {
      hasAnimated.current = false
    }
  }, [])

  const { t } = useTranslation('audiences')

  if (audiences.length === 0) return null

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
