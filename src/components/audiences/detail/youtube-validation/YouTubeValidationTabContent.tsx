import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Youtube, AlertCircle, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  useGetYouTubeValidation,
  useTriggerYouTubeValidation,
} from '@/modules/audience/application/hooks'
import { toast } from '@/hooks/useToast'
import { CrossPlatformSummarySection } from './CrossPlatformSummarySection'
import { TopicAnalysisAccordion } from './TopicAnalysisAccordion'

export interface YouTubeValidationTabContentProps {
  audienceId: string
}

export function YouTubeValidationTabContent({ audienceId }: Readonly<YouTubeValidationTabContentProps>) {
  const { t } = useTranslation('audiences')
  const { data, isLoading } = useGetYouTubeValidation(audienceId, true)
  const triggerMutation = useTriggerYouTubeValidation()

  const status = data?.status ?? 'no_analysis'
  const validation = data?.data ?? null

  const handleTrigger = (force = false) => {
    triggerMutation.mutate({ audienceId, force }, {
      onError: () => {
        toast({ title: t('youtubeValidation.failed'), variant: 'destructive' })
      },
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
            {t('youtubeValidation.title')}
          </h3>
          <p className="text-xs text-gray-500 dark:text-zinc-400 mt-0.5">
            {t('youtubeValidation.subtitle')}
          </p>
        </div>

        <button
          onClick={() => handleTrigger(status === 'ready' || status === 'failed')}
          disabled={triggerMutation.isPending || status === 'processing'}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg bg-[#FF0000] text-white hover:bg-[#CC0000] transition-colors cursor-pointer disabled:opacity-50"
        >
          {(triggerMutation.isPending || status === 'processing') ? (
            <RefreshCw className={cn('w-3.5 h-3.5', 'animate-spin')} />
          ) : (
            <Youtube className="w-3.5 h-3.5" />
          )}
          {t('youtubeValidation.startValidation')}
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-lime border-t-transparent rounded-full animate-spin" />
        </div>
      ) : status === 'processing' ? (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 text-center border border-gray-100 dark:border-zinc-800">
          <div className="w-8 h-8 border-4 border-lime border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm font-medium text-gray-700 dark:text-zinc-300">
            {t('youtubeValidation.processing')}
          </p>
          <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">
            {t('youtubeValidation.processingHelp')}
          </p>
        </div>
      ) : status === 'failed' ? (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 text-center border border-red-200 dark:border-red-900/40">
          <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-3" />
          <p className="text-sm font-medium text-gray-700 dark:text-zinc-300">
            {t('youtubeValidation.failed')}
          </p>
          <button
            onClick={() => handleTrigger(true)}
            disabled={triggerMutation.isPending}
            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-[#FF0000] text-white hover:bg-[#CC0000] transition-colors cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={cn('w-3.5 h-3.5', triggerMutation.isPending && 'animate-spin')} />
            {t('youtubeValidation.startValidation')}
          </button>
        </div>
      ) : status === 'no_analysis' || !validation ? (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 text-center border border-gray-100 dark:border-zinc-800">
          <Youtube className="w-8 h-8 text-gray-300 dark:text-zinc-600 mx-auto mb-3" />
          <p className="text-sm font-medium text-gray-700 dark:text-zinc-300">
            {t('youtubeValidation.noAnalysis')}
          </p>
          <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">
            {t('youtubeValidation.noAnalysisDescription')}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <CrossPlatformSummarySection
            summary={validation.getSummary()}
            crossPlatform={validation.getAnalysisData().crossPlatformSummary}
          />

          <div className="space-y-3">
            {validation.getAnalysisData().topics.map((topic) => (
              <TopicAnalysisAccordion
                key={topic.topicName}
                topic={topic}
                audienceId={audienceId}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
