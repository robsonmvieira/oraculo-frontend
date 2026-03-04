import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown, ChevronRight, TrendingUp, Eye } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { TopicAnalysis } from '@/modules/audience/domain/entities/YouTubeValidation.entity'
import { TopicVideosSection } from './TopicVideosSection'

export interface TopicAnalysisAccordionProps {
  topic: TopicAnalysis
  audienceId: string
}

export function TopicAnalysisAccordion({ topic, audienceId }: Readonly<TopicAnalysisAccordionProps>) {
  const { t } = useTranslation('audiences')
  const [isExpanded, setIsExpanded] = useState(false)
  const [showVideos, setShowVideos] = useState(false)

  const tractionPercent = (topic.tractionScore * 100).toFixed(0)

  return (
    <div className="border border-gray-200 dark:border-zinc-700 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3">
          {isExpanded
            ? <ChevronDown className="w-4 h-4 text-gray-400" />
            : <ChevronRight className="w-4 h-4 text-gray-400" />
          }
          <span className="text-sm font-medium text-gray-900 dark:text-white">{topic.topicName}</span>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant={topic.contentGap ? 'warning' : topic.contentSaturated ? 'error' : 'success'} size="sm">
            {topic.contentGap
              ? t('youtubeValidation.topic.contentGap')
              : topic.contentSaturated
                ? t('youtubeValidation.topic.contentSaturated')
                : `${tractionPercent}%`
            }
          </Badge>
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-zinc-400">
            <TrendingUp className="w-3 h-3" />
            {tractionPercent}%
          </div>
        </div>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Sentiment Comparison */}
            <div className="bg-gray-50 dark:bg-zinc-800 rounded-lg p-3">
              <p className="text-xs font-medium text-gray-700 dark:text-zinc-300 mb-2">
                {t('youtubeValidation.topic.sentiment')}
              </p>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500 dark:text-zinc-400">{t('youtubeValidation.topic.reddit')}</span>
                  <span className="font-medium text-gray-900 dark:text-white">{topic.sentimentComparison.reddit}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500 dark:text-zinc-400">{t('youtubeValidation.topic.youtube')}</span>
                  <span className="font-medium text-gray-900 dark:text-white">{topic.sentimentComparison.youtube}</span>
                </div>
                <div className="flex items-center justify-between text-xs border-t border-gray-200 dark:border-zinc-700 pt-1.5 mt-1.5">
                  <span className="text-gray-500 dark:text-zinc-400">{t('youtubeValidation.topic.alignment')}</span>
                  <Badge variant={topic.sentimentComparison.alignment === 'aligned' ? 'success' : topic.sentimentComparison.alignment === 'divergent' ? 'warning' : 'neutral'} size="sm">
                    {topic.sentimentComparison.alignment}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="bg-gray-50 dark:bg-zinc-800 rounded-lg p-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500 dark:text-zinc-400">{t('youtubeValidation.topic.tractionScore')}</span>
                  <span className="font-medium text-gray-900 dark:text-white">{tractionPercent}%</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500 dark:text-zinc-400">{t('youtubeValidation.topic.audienceOverlap')}</span>
                  <span className="font-medium text-gray-900 dark:text-white">{(topic.audienceOverlapScore * 100).toFixed(0)}%</span>
                </div>
                {topic.productMentions.length > 0 && (
                  <div className="text-xs">
                    <p className="text-gray-500 dark:text-zinc-400 mb-1">{t('youtubeValidation.topic.productMentions')}</p>
                    <div className="flex flex-wrap gap-1">
                      {topic.productMentions.map((product) => (
                        <Badge key={product} variant="neutral" size="sm">{product}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Opportunity Insights */}
          {topic.opportunityInsights && (
            <div className="bg-lime/5 border border-lime/20 rounded-lg p-3">
              <p className="text-xs font-medium text-lime-700 dark:text-lime-400 mb-1">
                {t('youtubeValidation.topic.opportunityInsights')}
              </p>
              <p className="text-xs text-gray-600 dark:text-zinc-400">{topic.opportunityInsights}</p>
            </div>
          )}

          {/* View Videos Toggle */}
          <button
            type="button"
            onClick={() => setShowVideos(!showVideos)}
            className="flex items-center gap-1.5 text-xs text-[#FF0000] hover:text-[#CC0000] dark:text-red-400 dark:hover:text-red-300 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            {t('youtubeValidation.topic.viewVideos')}
            {showVideos
              ? <ChevronDown className="w-3 h-3" />
              : <ChevronRight className="w-3 h-3" />
            }
          </button>

          {showVideos && (
            <TopicVideosSection
              audienceId={audienceId}
              topicName={topic.topicName}
            />
          )}
        </div>
      )}
    </div>
  )
}
