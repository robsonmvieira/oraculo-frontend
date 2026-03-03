import { useTranslation } from 'react-i18next'
import { Linkedin, Twitter, Instagram, FileText, Loader2, CheckCircle2, XCircle, Eye } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ContentDraft, ContentDraftPlatform } from '@/modules/audience/domain/entities/ContentDraft.entity'

export interface ContentDraftCardProps {
  draft: ContentDraft
  onView: () => void
}

const platformIcons: Record<ContentDraftPlatform, React.ElementType> = {
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  reddit: FileText,
}

const statusConfig = {
  processing: { icon: Loader2, className: 'text-amber-600 dark:text-amber-400', iconClassName: 'animate-spin' },
  ready: { icon: CheckCircle2, className: 'text-green-600 dark:text-green-400', iconClassName: '' },
  failed: { icon: XCircle, className: 'text-red-600 dark:text-red-400', iconClassName: '' },
}

export function ContentDraftCard({ draft, onView }: Readonly<ContentDraftCardProps>) {
  const { t } = useTranslation('audiences')
  const PlatformIcon = platformIcons[draft.getPlatform()]
  const status = statusConfig[draft.getStatus()]
  const StatusIcon = status.icon
  const isReady = draft.getStatus() === 'ready'

  return (
    <button
      type="button"
      onClick={onView}
      disabled={!isReady}
      className={cn(
        'w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left',
        isReady
          ? 'border-gray-200 dark:border-zinc-700 hover:border-lime-400 dark:hover:border-lime-600 cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-900'
          : 'border-gray-100 dark:border-zinc-800 cursor-default opacity-70'
      )}
    >
      <PlatformIcon className="w-5 h-5 text-gray-500 dark:text-zinc-400 shrink-0" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-gray-900 dark:text-zinc-100">
          {t(`contentSuggestions.production.platform.${draft.getPlatform()}`)}
        </p>
        <p className={cn('text-xs', status.className)}>
          {t(`contentSuggestions.drafts.status.${draft.getStatus()}`)}
        </p>
      </div>
      {isReady ? (
        <Eye className="w-4 h-4 text-gray-400 dark:text-zinc-500 shrink-0" />
      ) : (
        <StatusIcon className={cn('w-4 h-4 shrink-0', status.className, status.iconClassName)} />
      )}
    </button>
  )
}
