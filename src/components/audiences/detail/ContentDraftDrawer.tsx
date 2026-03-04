import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Copy, Check, Hash, FileText, Target, Image, BookOpen, MessageSquare, Linkedin, Twitter, Instagram, ImageOff, ExternalLink } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import type { ContentDraft, ContentDraftPlatform } from '@/modules/audience/domain/entities/ContentDraft.entity'

export interface ContentDraftDrawerProps {
  draft: ContentDraft | null
  open: boolean
  onClose: () => void
}

const platformIcons: Record<ContentDraftPlatform, React.ElementType> = {
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  reddit: FileText,
}

export function ContentDraftDrawer({ draft, open, onClose }: Readonly<ContentDraftDrawerProps>) {
  const { t } = useTranslation('audiences')
  const [selectedHook, setSelectedHook] = useState<number | null>(null)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  if (!draft) return null

  const PlatformIcon = platformIcons[draft.getPlatform()]

  async function copyToClipboard(text: string, field: string) {
    await navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  return (
    <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto bg-white dark:bg-zinc-950 px-0">
        <SheetHeader className="px-5">
          <SheetTitle className="text-left pr-8 flex items-center gap-2 text-lg leading-snug text-gray-900 dark:text-white">
            <PlatformIcon className="w-5 h-5 text-lime-600 dark:text-lime-400" />
            {t(`contentSuggestions.production.platform.${draft.getPlatform()}`)}
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-4 mt-4 px-5 pb-6">
          {/* Hook Options */}
          {draft.getHooks().length > 0 && (
            <DraftSection icon={MessageSquare} title={t('contentSuggestions.drafts.hooks.title')}>
              <p className="text-xs text-gray-500 dark:text-zinc-400 mb-3">
                {t('contentSuggestions.drafts.hooks.description')}
              </p>
              <div className="space-y-2">
                {draft.getHooks().map((hook) => (
                  <button
                    key={hook.option}
                    type="button"
                    onClick={() => setSelectedHook(hook.option)}
                    className={cn(
                      'w-full text-left p-3 rounded-lg border transition-all cursor-pointer',
                      selectedHook === hook.option
                        ? 'border-lime-500 bg-lime/10 dark:bg-lime-900/20 ring-1 ring-lime-500/30'
                        : 'border-gray-200 dark:border-zinc-700 hover:border-gray-300 dark:hover:border-zinc-600'
                    )}
                  >
                    <div className="flex items-start gap-2">
                      <span className={cn(
                        'shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5',
                        selectedHook === hook.option
                          ? 'bg-lime-600 text-white'
                          : 'bg-gray-200 dark:bg-zinc-700 text-gray-600 dark:text-zinc-300'
                      )}>
                        {hook.option}
                      </span>
                      <p className="text-sm text-gray-900 dark:text-zinc-100 leading-relaxed">{hook.text}</p>
                    </div>
                  </button>
                ))}
              </div>
            </DraftSection>
          )}

          {/* Full Draft */}
          <DraftSection icon={FileText} title={t('contentSuggestions.drafts.fullDraft')}>
            <div className="relative">
              <CopyButton
                onClick={() => copyToClipboard(draft.getFullDraft(), 'fullDraft')}
                copied={copiedField === 'fullDraft'}
                label={copiedField === 'fullDraft' ? t('contentSuggestions.drafts.copied') : t('contentSuggestions.drafts.copy')}
              />
              <pre className="text-sm text-gray-900 dark:text-zinc-100 leading-relaxed whitespace-pre-wrap font-sans pr-16">
                {draft.getFullDraft()}
              </pre>
            </div>
          </DraftSection>

          {/* Narrative Arc */}
          {draft.getNarrativeArc() && (
            <DraftSection icon={BookOpen} title={t('contentSuggestions.drafts.narrativeArc')}>
              <p className="text-sm text-gray-700 dark:text-zinc-300 leading-relaxed italic">
                {draft.getNarrativeArc()}
              </p>
            </DraftSection>
          )}

          {/* CTA */}
          {draft.getCta() && (
            <DraftSection icon={Target} title={t('contentSuggestions.drafts.cta')}>
              <div className="relative">
                <CopyButton
                  onClick={() => copyToClipboard(draft.getCta(), 'cta')}
                  copied={copiedField === 'cta'}
                  label={copiedField === 'cta' ? t('contentSuggestions.drafts.copied') : t('contentSuggestions.drafts.copy')}
                />
                <p className="text-sm text-gray-900 dark:text-zinc-100 leading-relaxed font-medium pr-16">
                  {draft.getCta()}
                </p>
              </div>
            </DraftSection>
          )}

          {/* Platform Notes */}
          {draft.getPlatformNotes() && (
            <DraftSection icon={FileText} title={t('contentSuggestions.drafts.platformNotes')}>
              <p className="text-sm text-gray-700 dark:text-zinc-300 leading-relaxed">
                {draft.getPlatformNotes()}
              </p>
            </DraftSection>
          )}

          {/* Hashtags */}
          {draft.getHashtags().length > 0 && (
            <DraftSection icon={Hash} title={t('contentSuggestions.drafts.hashtags')}>
              <div className="relative">
                <CopyButton
                  onClick={() => copyToClipboard(draft.getHashtags().join(' '), 'hashtags')}
                  copied={copiedField === 'hashtags'}
                  label={copiedField === 'hashtags' ? t('contentSuggestions.drafts.copied') : t('contentSuggestions.drafts.copy')}
                />
                <div className="flex flex-wrap gap-1.5 pr-16">
                  {draft.getHashtags().map((tag) => (
                    <span key={tag} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-zinc-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </DraftSection>
          )}

          {/* Generated Image */}
          {draft.getImageUrl() && (
            <DraftImageSection
              imageUrl={draft.getImageUrl()!}
              aspectRatio={draft.getImageAspectRatio()}
              t={t}
            />
          )}

          {/* Model Info */}
          {draft.getModelUsed() && (
            <div className="pt-3 border-t border-gray-200 dark:border-zinc-800">
              <p className="text-xs text-gray-400 dark:text-zinc-500">
                {t('contentSuggestions.drafts.modelUsed', { model: draft.getModelUsed() })}
              </p>
            </div>
          )}

          {/* Error Message */}
          {draft.getErrorMessage() && (
            <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3">
              <p className="text-sm text-red-700 dark:text-red-300">
                {t('contentSuggestions.drafts.errorMessage', { message: draft.getErrorMessage() })}
              </p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

function DraftSection({ icon: Icon, title, children }: Readonly<{ icon: React.ElementType; title: string; children: React.ReactNode }>) {
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

function DraftImageSection({ imageUrl, aspectRatio, t }: Readonly<{ imageUrl: string; aspectRatio: string | null; t: (key: string, options?: Record<string, string>) => string }>) {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  if (imageError) {
    return (
      <DraftSection icon={Image} title={t('contentSuggestions.drafts.image')}>
        <div className="flex flex-col items-center justify-center gap-3 py-8 rounded-lg border border-dashed border-gray-300 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-800/50">
          <ImageOff className="w-8 h-8 text-gray-400 dark:text-zinc-500" />
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            {t('contentSuggestions.drafts.imageLoadError')}
          </p>
          <a
            href={imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-lime-600 dark:text-lime-400 hover:underline"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            {t('contentSuggestions.drafts.openImageLink')}
          </a>
        </div>
        {aspectRatio && (
          <p className="text-xs text-gray-400 dark:text-zinc-500 mt-2">
            {t('contentSuggestions.drafts.imageAspectRatio', { ratio: aspectRatio })}
          </p>
        )}
      </DraftSection>
    )
  }

  return (
    <DraftSection icon={Image} title={t('contentSuggestions.drafts.image')}>
      {!imageLoaded && (
        <div className="flex items-center justify-center py-12 rounded-lg border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/50 animate-pulse">
          <Image className="w-8 h-8 text-gray-300 dark:text-zinc-600" />
        </div>
      )}
      <img
        src={imageUrl}
        alt="Generated content"
        className={cn(
          'w-full rounded-lg border border-gray-200 dark:border-zinc-700',
          !imageLoaded && 'hidden'
        )}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
        referrerPolicy="no-referrer"
      />
      {aspectRatio && (
        <p className="text-xs text-gray-400 dark:text-zinc-500 mt-2">
          {t('contentSuggestions.drafts.imageAspectRatio', { ratio: aspectRatio })}
        </p>
      )}
    </DraftSection>
  )
}

function CopyButton({ onClick, copied, label }: Readonly<{ onClick: () => void; copied: boolean; label: string }>) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute top-0 right-0 flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium text-gray-500 dark:text-zinc-400 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
    >
      {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
      {label}
    </button>
  )
}
