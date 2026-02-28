import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Flame,
  Trophy,
  HelpCircle,
  Frown,
  Lightbulb,
  Megaphone,
  MessageSquare,
  Newspaper,
  Bookmark,
  RefreshCw,
  Loader2,
} from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks'
import { Button } from '@/components/ui/button'
import type { IntentAnalysisStatus } from '@/modules/audience/domain/use-cases'

export interface ThemeGridItem {
  id: string
  name: string
  description: string
  count?: number
  type: 'scoring' | 'ai-tagged'
}

export interface ThemesGridProps {
  themes: readonly ThemeGridItem[]
  selectedThemeId?: string | null
  onThemeSelect?: (theme: ThemeGridItem) => void
  intentsStatus?: IntentAnalysisStatus
  onRefreshIntents?: () => void
  isRefreshing?: boolean
}

const themeIcons: Record<string, typeof Flame> = {
  'Hot Discussions': Flame,
  'Top Content': Trophy,
  'Advice Requests': HelpCircle,
  'Pain & Anger': Frown,
  'Solution Requests': Lightbulb,
  'Self-Promotion': Megaphone,
  Ideas: MessageSquare,
  News: Newspaper,
}

const scoringI18nKeys: Record<string, { name: string; description: string }> = {
  th1: { name: 'themes.hotDiscussions', description: 'themes.weekDescription' },
  th2: { name: 'themes.topContent', description: 'themes.monthDescription' },
}

export function ThemesGrid({
  themes,
  selectedThemeId,
  onThemeSelect,
  intentsStatus,
  onRefreshIntents,
  isRefreshing,
}: Readonly<ThemesGridProps>) {
  const { t } = useTranslation('audiences')
  const scoringRef = useRef<HTMLDivElement>(null)
  const aiTaggedRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const scoringThemes = themes.filter((t) => t.type === 'scoring')
  const aiTaggedThemes = themes.filter((t) => t.type === 'ai-tagged')
  const displayedAiThemes = aiTaggedThemes.slice(0, 6)
  const remainingCount = aiTaggedThemes.length - displayedAiThemes.length

  useEffect(() => {
    if (prefersReducedMotion) return

    if (scoringRef.current) {
      const items = Array.from(scoringRef.current.children)
      gsap.fromTo(
        items,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.out',
        }
      )
    }

    if (aiTaggedRef.current) {
      const items = Array.from(aiTaggedRef.current.children)
      gsap.fromTo(
        items,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.out',
          delay: 0.2,
        }
      )
    }
  }, [prefersReducedMotion, themes])

  return (
    <div className="space-y-6">
      {/* Scoring themes */}
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
          {t('themes.scoringThemes')}
        </h3>
        <div ref={scoringRef} className="grid grid-cols-2 gap-4">
          {scoringThemes.map((theme) => {
            const Icon = themeIcons[theme.name] ?? Flame
            const i18nKeys = scoringI18nKeys[theme.id]
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => onThemeSelect?.(theme)}
                className={`text-left p-4 rounded-xl transition-colors cursor-pointer bg-white dark:bg-zinc-800 border ${
                  selectedThemeId === theme.id
                    ? 'border-lime'
                    : 'border-transparent hover:border-gray-200 dark:hover:border-zinc-700'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-zinc-700 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-gray-500 dark:text-zinc-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {i18nKeys ? t(i18nKeys.name) : theme.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-zinc-400">
                      {i18nKeys ? t(i18nKeys.description) : theme.description}
                    </p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* AI-tagged themes */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {t('themes.aiTaggedThemes')}
          </h3>
          {intentsStatus === 'no_analysis' && (
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={onRefreshIntents}
              disabled={isRefreshing}
            >
              {isRefreshing ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <RefreshCw className="w-3.5 h-3.5" />
              )}
              {t('themes.generate')}
            </Button>
          )}
          {intentsStatus === 'failed' && (
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 text-red-500"
              onClick={onRefreshIntents}
              disabled={isRefreshing}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              {t('themes.failed')}
            </Button>
          )}
        </div>

        {intentsStatus === 'processing' && (
          <div className="flex items-center gap-3 py-8 justify-center text-gray-500 dark:text-zinc-400">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm">{t('themes.processing')}</span>
          </div>
        )}

        {intentsStatus === 'ready' && displayedAiThemes.length > 0 && (
          <>
            <div ref={aiTaggedRef} className="grid grid-cols-2 gap-4">
              {displayedAiThemes.map((theme) => {
                const Icon = themeIcons[theme.name] ?? MessageSquare
                return (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => onThemeSelect?.(theme)}
                    className={`text-left p-4 rounded-xl transition-colors cursor-pointer bg-white dark:bg-zinc-800 border ${
                      selectedThemeId === theme.id
                        ? 'border-lime'
                        : 'border-transparent hover:border-gray-200 dark:hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-zinc-700 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-gray-500 dark:text-zinc-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {theme.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-zinc-400">
                          {theme.count !== undefined && (
                            <span className="font-semibold text-gray-700 dark:text-zinc-200">
                              {theme.count}{' '}
                            </span>
                          )}
                          {theme.description}
                        </p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
            {remainingCount > 0 && (
              <button className="cursor-pointer w-full mt-4 py-2 text-sm text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:hover:text-zinc-300 transition-colors">
                {t('themes.showMore', { count: remainingCount })}
              </button>
            )}
          </>
        )}
      </div>

      {/* Your Bookmarks */}
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
          {t('themes.yourBookmarks')}
        </h3>
        <div className="flex items-center gap-2 text-gray-500 dark:text-zinc-400">
          <Bookmark className="w-4 h-4" />
          <span className="text-sm">{t('themes.noBookmarks')}</span>
        </div>
      </div>
    </div>
  )
}
