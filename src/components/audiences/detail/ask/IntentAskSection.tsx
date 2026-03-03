import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Send, Loader2, AlertCircle, Info, Zap } from 'lucide-react'
import { Button } from '@/components/ui'
import { Badge } from '@/components/ui/badge'
import { useAskIntent } from '@/modules/audience/application/hooks'
import type { IntentAskResponse } from '@/modules/audience/domain/entities/IntentAskResponse.entity'

interface IntentAskSectionProps {
  audienceId: string
  category: string
}

export function IntentAskSection({ audienceId, category }: Readonly<IntentAskSectionProps>) {
  const { t } = useTranslation('audiences')
  const [question, setQuestion] = useState('')
  const [lastResponse, setLastResponse] = useState<IntentAskResponse | null>(null)
  const askIntent = useAskIntent()

  const trimmedQuestion = question.trim()
  const isValid = trimmedQuestion.length >= 3

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid || askIntent.isPending) return

    askIntent.mutate(
      { audienceId, category, question: trimmedQuestion },
      {
        onSuccess: (data) => {
          setLastResponse(data)
          setQuestion('')
        },
      }
    )
  }

  return (
    <div className="pt-4">
      <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-3">
        {t('themes.intentAsk.title')}
      </h4>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={t('themes.intentAsk.placeholder')}
          maxLength={500}
          disabled={askIntent.isPending}
          className="flex-1 h-9 px-3 text-sm rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-lime focus:border-transparent disabled:opacity-50"
        />
        <Button
          type="submit"
          variant="primary"
          size="sm"
          disabled={!isValid || askIntent.isPending}
          className="gap-1.5"
        >
          {askIntent.isPending ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Send className="w-3.5 h-3.5" />
          )}
          {askIntent.isPending ? t('themes.intentAsk.sending') : t('themes.intentAsk.send')}
        </Button>
      </form>

      {trimmedQuestion.length > 0 && trimmedQuestion.length < 3 && (
        <p className="text-xs text-amber-500 mb-3">
          {t('themes.intentAsk.minLength')}
        </p>
      )}

      {askIntent.isError && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 mb-4">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
          <p className="text-sm text-red-600 dark:text-red-400">
            {t('themes.intentAsk.error')}
          </p>
        </div>
      )}

      {lastResponse && (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant={lastResponse.getContextQuality() === 'rich' ? 'success' : 'warning'}
              size="sm"
            >
              {lastResponse.getContextQuality() === 'rich'
                ? t('themes.intentAsk.contextRich')
                : t('themes.intentAsk.contextLimited')}
            </Badge>
            {lastResponse.isCached() && (
              <Badge variant="info" size="sm">
                <Zap className="w-3 h-3" />
                {t('themes.intentAsk.cached')}
              </Badge>
            )}
          </div>

          <div className="p-4 rounded-lg bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-700">
            <p className="text-sm text-gray-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
              {lastResponse.getAnswer()}
            </p>
          </div>

          {lastResponse.getSuggestion() && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/30">
              <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-amber-700 dark:text-amber-400 mb-0.5">
                  {t('themes.intentAsk.suggestion')}
                </p>
                <p className="text-xs text-amber-600 dark:text-amber-300">
                  {lastResponse.getSuggestion()}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
