import { useTranslation } from 'react-i18next'
import { Hash, FileText, Search, Image, Lightbulb, Target, BarChart3, BookOpen, ShieldCheck } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import type { ContentSuggestion, ContentSuggestionFeedbackStatus } from '@/modules/audience/domain/entities/ContentSuggestion.entity'

export interface ContentSuggestionDrawerProps {
  suggestion: ContentSuggestion | null
  open: boolean
  onClose: () => void
  onFeedback: (suggestionId: string, status: ContentSuggestionFeedbackStatus) => void
  isSendingFeedback?: boolean
}

const priorityConfig: Record<string, { bgClass: string; textClass: string }> = {
  high: { bgClass: 'bg-red-100 dark:bg-red-900/40', textClass: 'text-red-700 dark:text-red-300' },
  medium: { bgClass: 'bg-orange-100 dark:bg-orange-900/40', textClass: 'text-orange-700 dark:text-orange-300' },
  low: { bgClass: 'bg-blue-100 dark:bg-blue-900/40', textClass: 'text-blue-700 dark:text-blue-300' },
}

export function ContentSuggestionDrawer({ suggestion, open, onClose, onFeedback, isSendingFeedback }: Readonly<ContentSuggestionDrawerProps>) {
  const { t } = useTranslation('audiences')

  if (!suggestion) return null

  const priority = priorityConfig[suggestion.getPriority()] ?? priorityConfig.medium

  return (
    <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto bg-white dark:bg-zinc-950 px-0">
        <SheetHeader className="px-5">
          <SheetTitle className="text-left pr-8 text-lg leading-snug text-gray-900 dark:text-white">
            {suggestion.getTitle()}
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-4 mt-4 px-5 pb-6">
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-bold text-gray-500 dark:text-zinc-400">
              {t('contentSuggestions.rank', { rank: suggestion.getRank() })}
            </span>
            <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium', priority.bgClass, priority.textClass)}>
              {t(`contentSuggestions.priority.${suggestion.getPriority()}`)}
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-200 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300">
              {t(`contentSuggestions.format.${suggestion.getFormat()}`)}
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300">
              {t(`contentSuggestions.tone.${suggestion.getEmotionalTone()}`)}
            </span>
          </div>

          <DrawerSection icon={Target} title={t('contentSuggestions.whyNow')}>
            <p className="text-sm text-gray-900 dark:text-zinc-100 leading-relaxed">
              {suggestion.getWhyNow()}
            </p>
          </DrawerSection>

          <DrawerSection icon={Lightbulb} title={t('contentSuggestions.approach')}>
            <p className="text-sm text-gray-900 dark:text-zinc-100 leading-relaxed">
              {suggestion.getApproach()}
            </p>
          </DrawerSection>

          <DrawerSection icon={FileText} title={t('contentSuggestions.format.label') + ' — ' + t(`contentSuggestions.format.${suggestion.getFormat()}`)}>
            <p className="text-sm text-gray-800 dark:text-zinc-200 leading-relaxed">
              {suggestion.getFormatRationale()}
            </p>
          </DrawerSection>

          <DrawerSection icon={BarChart3} title={t('contentSuggestions.tone.label') + ' — ' + t(`contentSuggestions.tone.${suggestion.getEmotionalTone()}`)}>
            <p className="text-sm text-gray-800 dark:text-zinc-200 leading-relaxed">
              {suggestion.getToneRationale()}
            </p>
          </DrawerSection>

          {suggestion.getOutline().length > 0 && (
            <DrawerSection icon={BookOpen} title={t('contentSuggestions.outline')}>
              <ol className="space-y-3">
                {suggestion.getOutline().map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-lime/20 text-lime-700 dark:text-lime-300 flex items-center justify-center text-xs font-bold">
                      {item.slide ?? item.item ?? i + 1}
                    </span>
                    <span className="text-gray-900 dark:text-zinc-100 leading-relaxed pt-0.5">{item.content}</span>
                  </li>
                ))}
              </ol>
            </DrawerSection>
          )}

          {suggestion.getKeywords().length > 0 && (
            <DrawerSection icon={Hash} title={t('contentSuggestions.keywords')}>
              <div className="flex flex-wrap gap-1.5">
                {suggestion.getKeywords().map((kw) => (
                  <span key={kw} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-zinc-200">
                    {kw}
                  </span>
                ))}
              </div>
            </DrawerSection>
          )}

          {suggestion.getResearchNotes() && (
            <DrawerSection icon={Search} title={t('contentSuggestions.researchNotes')}>
              <p className="text-sm text-gray-900 dark:text-zinc-100 leading-relaxed">
                {suggestion.getResearchNotes()}
              </p>
            </DrawerSection>
          )}

          {suggestion.getImagePrompt() && (
            <DrawerSection icon={Image} title={t('contentSuggestions.imagePrompt')}>
              <p className="text-sm text-gray-700 dark:text-zinc-300 italic leading-relaxed">
                {suggestion.getImagePrompt()}
              </p>
            </DrawerSection>
          )}

          {suggestion.getDifferentiationNotes() && (
            <DrawerSection icon={Lightbulb} title={t('contentSuggestions.differentiation')}>
              <p className="text-sm text-gray-900 dark:text-zinc-100 leading-relaxed">
                {suggestion.getDifferentiationNotes()}
              </p>
            </DrawerSection>
          )}

          {suggestion.getAccuracyNotes() && (
            <DrawerSection icon={ShieldCheck} title={t('contentSuggestions.accuracyNotes')}>
              <p className="text-sm text-gray-900 dark:text-zinc-100 leading-relaxed">
                {suggestion.getAccuracyNotes()}
              </p>
            </DrawerSection>
          )}

          {suggestion.getSourceTopics().length > 0 && (
            <DrawerSection icon={Target} title={t('contentSuggestions.sourceTopics')}>
              <div className="space-y-2">
                {suggestion.getSourceTopics().map((topic, i) => (
                  <div key={topic.topicId ?? i} className="flex items-center justify-between text-sm">
                    <span className="text-gray-900 dark:text-zinc-100 font-medium">{topic.topicName}</span>
                    {topic.growthPercentage != null && (
                      <span className="text-lime-600 dark:text-lime-400 font-semibold text-xs">
                        {t('contentSuggestions.growth', { value: topic.growthPercentage })}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </DrawerSection>
          )}

          {suggestion.getSourceModules().length > 0 && (
            <div className="pt-3 border-t border-gray-200 dark:border-zinc-800">
              <p className="text-xs text-gray-500 dark:text-zinc-400">
                {t('contentSuggestions.sourceModules')}: {suggestion.getSourceModules().join(', ')}
              </p>
            </div>
          )}

          <div className="flex items-center gap-2 pt-3 border-t border-gray-200 dark:border-zinc-800">
            <span className="text-xs text-gray-500 dark:text-zinc-400 mr-auto font-medium">
              {t('contentSuggestions.feedback.title')}
            </span>
            {(['useful', 'not_useful', 'used'] as const).map((status) => (
              <button
                key={status}
                onClick={() => onFeedback(suggestion.getId(), status)}
                disabled={isSendingFeedback}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer disabled:opacity-50',
                  suggestion.getFeedbackStatus() === status
                    ? 'bg-lime/20 text-lime-700 dark:text-lime-300'
                    : 'text-gray-600 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-zinc-700'
                )}
              >
                {t(`contentSuggestions.feedback.${status}`)}
              </button>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function DrawerSection({ icon: Icon, title, children }: Readonly<{ icon: React.ElementType; title: string; children: React.ReactNode }>) {
  return (
    <div className="rounded-xl bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 p-4">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-4 h-4 text-lime-600 dark:text-lime-400" />
        <h5 className="text-xs font-bold text-gray-700 dark:text-zinc-300 uppercase tracking-wide">
          {title}
        </h5>
      </div>
      {children}
    </div>
  )
}
