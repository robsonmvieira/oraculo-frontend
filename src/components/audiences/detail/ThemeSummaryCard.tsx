import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown, ChevronRight, Loader2, Sparkles, Star, Tag, TrendingUp, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useGetThemeSummary } from '@/modules/audience/application/hooks/useGetThemeSummary'
import { useRefreshThemeSummary } from '@/modules/audience/application/hooks/useRefreshThemeSummary'
import type { ThemeAnalysisWindow } from '@/modules/audience/domain/use-cases'
import type { EmotionalTone } from '@/modules/audience/domain/entities/ThemeSummary.entity'

const TONE_COLORS: Record<EmotionalTone, string> = {
  positive: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  mixed: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  tense: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  neutral: 'bg-gray-100 text-gray-700 dark:bg-zinc-700 dark:text-zinc-300',
  celebratory: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
  concerned: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  supportive: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
}

export interface ThemeSummaryCardProps {
  audienceId: string
  themeId: string
  themeName: string
  window: ThemeAnalysisWindow
  enabled: boolean
}

export function ThemeSummaryCard({ audienceId, themeId, themeName, window, enabled }: Readonly<ThemeSummaryCardProps>) {
  const { t } = useTranslation('audiences')
  const [isExpanded, setIsExpanded] = useState(true)
  const [narrativeExpanded, setNarrativeExpanded] = useState(true)
  const [highlightsExpanded, setHighlightsExpanded] = useState(false)
  const [keyThemesExpanded, setKeyThemesExpanded] = useState(false)

  const summaryQuery = useGetThemeSummary(audienceId, themeId, enabled)
  const refreshMutation = useRefreshThemeSummary()

  const summary = summaryQuery.data?.data
  const status = summaryQuery.data?.status
  const isLoading = summaryQuery.isLoading
  const isGenerating = refreshMutation.isPending

  const handleGenerate = () => {
    refreshMutation.mutate({ audienceId, themeId, window })
  }

  if (isLoading) {
    return (
      <div className="border border-gray-200 dark:border-zinc-700 rounded-xl p-4">
        <div className="flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
          <span className="text-sm text-gray-500 dark:text-zinc-400">{themeName}</span>
        </div>
      </div>
    )
  }

  if (!summary || status === 'no_summary') {
    return (
      <div className="border border-gray-200 dark:border-zinc-700 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700 dark:text-zinc-300">{themeName}</span>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Sparkles className="w-3.5 h-3.5" />
            )}
            {isGenerating ? t('themes.summary.generating') : t('themes.summary.generate')}
          </Button>
        </div>
        <p className="text-xs text-gray-400 dark:text-zinc-500 mt-2">
          {t('themes.summary.noSummary')}
        </p>
      </div>
    )
  }

  const emotionalTone = summary.getEmotionalTone()
  const toneColorClass = TONE_COLORS[emotionalTone] ?? TONE_COLORS.neutral

  return (
    <div className="border border-gray-200 dark:border-zinc-700 rounded-xl overflow-hidden">
      {/* Header */}
      <button
        type="button"
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-400" />
          )}
          <span className="text-sm font-medium text-gray-900 dark:text-white">{themeName}</span>
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${toneColorClass}`}>
            {t(`themes.summary.emotionalTone.${emotionalTone}`)}
          </span>
        </div>
        <span className="text-xs text-gray-400 dark:text-zinc-500">
          {summary.getToneDescription()}
        </span>
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-3">
          {/* Narrative */}
          <CollapsibleSection
            title={t('themes.summary.narrative')}
            icon={<Sparkles className="w-3.5 h-3.5" />}
            isExpanded={narrativeExpanded}
            onToggle={() => setNarrativeExpanded(!narrativeExpanded)}
          >
            <div className="text-sm text-gray-600 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
              {summary.getNarrative()}
            </div>
          </CollapsibleSection>

          {/* Key Themes */}
          {summary.getKeyThemes().length > 0 && (
            <CollapsibleSection
              title={t('themes.summary.keyThemes')}
              icon={<Tag className="w-3.5 h-3.5" />}
              count={summary.getKeyThemes().length}
              isExpanded={keyThemesExpanded}
              onToggle={() => setKeyThemesExpanded(!keyThemesExpanded)}
            >
              <div className="flex flex-wrap gap-2">
                {summary.getKeyThemes().map((kt) => (
                  <div
                    key={kt.theme}
                    className="group relative inline-flex items-center px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-zinc-800 text-xs font-medium text-gray-700 dark:text-zinc-300"
                  >
                    {kt.theme}
                    <div className="hidden group-hover:block absolute bottom-full left-0 mb-1 px-2 py-1 rounded bg-gray-900 dark:bg-zinc-700 text-white text-xs whitespace-nowrap z-10">
                      {kt.description}
                    </div>
                  </div>
                ))}
              </div>
            </CollapsibleSection>
          )}

          {/* Highlights */}
          {summary.getHighlights().length > 0 && (
            <CollapsibleSection
              title={t('themes.summary.highlights')}
              icon={<Star className="w-3.5 h-3.5" />}
              count={summary.getHighlights().length}
              isExpanded={highlightsExpanded}
              onToggle={() => setHighlightsExpanded(!highlightsExpanded)}
            >
              <ul className="space-y-2">
                {summary.getHighlights().map((h) => (
                  <li key={h.title} className="py-2 px-3 rounded-lg bg-gray-50 dark:bg-zinc-800">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{h.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500 dark:text-zinc-400">r/{h.subreddit}</span>
                      <span className="text-xs text-gray-400 dark:text-zinc-500">{h.score} pts</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1 italic">
                      {t('themes.summary.whyNotable')}: {h.whyNotable}
                    </p>
                  </li>
                ))}
              </ul>
            </CollapsibleSection>
          )}

          {/* Week Differentiator */}
          {summary.getWeekDifferentiator() && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <TrendingUp className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-medium text-blue-700 dark:text-blue-400 mb-1">
                  {t('themes.summary.weekDifferentiator')}
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-300">
                  {summary.getWeekDifferentiator()}
                </p>
              </div>
            </div>
          )}

          {/* Intent Breakdown */}
          {summary.getIntentBreakdown() && Object.keys(summary.getIntentBreakdown()!).length > 0 && (
            <div className="p-3 rounded-lg bg-gray-50 dark:bg-zinc-800">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-xs font-medium text-gray-700 dark:text-zinc-300">
                  {t('themes.summary.intentBreakdown')}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(summary.getIntentBreakdown()!).map(([intent, count]) => (
                  <span
                    key={intent}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-200 dark:bg-zinc-700 text-xs text-gray-600 dark:text-zinc-300"
                  >
                    {t(`themes.intents.${intent}`, intent)}
                    <span className="font-medium">{count}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function CollapsibleSection({
  title,
  icon,
  count,
  isExpanded,
  onToggle,
  children,
}: Readonly<{
  title: string
  icon: React.ReactNode
  count?: number
  isExpanded: boolean
  onToggle: () => void
  children: React.ReactNode
}>) {
  return (
    <div>
      <button
        type="button"
        className="w-full flex items-center gap-2 py-1.5 text-left hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
        onClick={onToggle}
      >
        {isExpanded ? (
          <ChevronDown className="w-3 h-3 text-gray-400" />
        ) : (
          <ChevronRight className="w-3 h-3 text-gray-400" />
        )}
        <span className="text-gray-500 dark:text-zinc-400">{icon}</span>
        <span className="text-xs font-medium text-gray-700 dark:text-zinc-300">{title}</span>
        {count !== undefined && (
          <span className="text-xs text-gray-400 dark:text-zinc-500">{count}</span>
        )}
      </button>
      {isExpanded && <div className="pl-5 mt-1">{children}</div>}
    </div>
  )
}
