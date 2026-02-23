import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Flame,
  Trophy,
  HelpCircle,
  Frown,
  Lightbulb,
  Megaphone,
} from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks'
import type { Theme } from '@/data/audienceDetails'

export interface ThemesListProps {
  themes: readonly Theme[]
  totalCount: number
  showHeader?: boolean
}

const themeIcons: Record<string, typeof Flame> = {
  'Hot Discussions': Flame,
  'Top Content': Trophy,
  'Advice Requests': HelpCircle,
  'Pain & Anger': Frown,
  'Solution Requests': Lightbulb,
  'Self-Promotion': Megaphone,
}

export function ThemesList({ themes, totalCount, showHeader = true }: Readonly<ThemesListProps>) {
  const { t } = useTranslation('audiences')
  const listRef = useRef<HTMLUListElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const displayedThemes = themes.slice(0, 6)
  const remainingCount = totalCount - displayedThemes.length

  useEffect(() => {
    if (!listRef.current || prefersReducedMotion) return

    const items = Array.from(listRef.current.children)
    gsap.fromTo(
      items,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power2.out',
      }
    )
  }, [prefersReducedMotion, themes])

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 cursor-pointer hover:border-gray-200 dark:hover:border-zinc-700 border border-transparent transition-colors h-full flex flex-col">
      {showHeader && (
        <div className="flex items-center gap-2 mb-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">{t('themes.title')}</h3>
          <span className="text-sm text-gray-500 dark:text-zinc-400">
            {totalCount}
          </span>
        </div>
      )}

      <ul ref={listRef} className="space-y-1 flex-1">
        {displayedThemes.map((theme) => {
          const Icon = themeIcons[theme.name] ?? Flame
          return (
            <li
              key={theme.id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-zinc-800 flex items-center justify-center">
                <Icon className="w-4 h-4 text-gray-500 dark:text-zinc-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 dark:text-white text-sm">
                  {theme.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-zinc-400 truncate">
                  {theme.description}
                </p>
              </div>
            </li>
          )
        })}
      </ul>

      {remainingCount > 0 && (
        <button className="cursor-pointer w-full mt-3 py-2 text-sm text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:hover:text-zinc-300 transition-colors">
          {t('themes.showMore', { count: remainingCount })}
        </button>
      )}
    </div>
  )
}
