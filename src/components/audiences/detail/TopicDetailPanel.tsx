import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { TrendingUp, Search, Sparkles, MessageSquare, Loader2, AlertCircle, RefreshCw } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks'
import { Button } from '@/components/ui/button'
import { useGetTopicDeepDive, useTriggerTopicDeepDive, useGetTopicBehavioralPatterns, useTriggerTopicBehavioralPatterns } from '@/modules/audience/application/hooks'
import {
  DeepDiveSummarySection,
  DeepDiveSubtopicsSection,
  DeepDiveQuestionsSection,
  DeepDiveSentimentSection,
  DeepDiveProductsSection,
  DeepDivePostsSection,
  DeepDiveInsightsSection,
} from './deep-dive'
import {
  BehavioralPatternsSummarySection,
  ToolPatternsSection,
  WorkaroundPatternsSection,
  FrictionPatternsSection,
  ShiftPatternsSection,
  DemandSignalsSection,
} from './behavioral-patterns'

export interface TopicSubreddit {
  name: string
  postCount: number
}

export interface TopicDetail {
  id: string
  name: string
  frequency: number
  frequencyUnit: 'day' | 'week' | 'mo'
  growth: number
  description: string
  subreddits: TopicSubreddit[]
}

export interface TopicDetailPanelProps {
  topic: TopicDetail | null
  audienceId: string
}

export function TopicDetailPanel({ topic, audienceId }: Readonly<TopicDetailPanelProps>) {
  const containerRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const [deepDiveActive, setDeepDiveActive] = useState(false)
  const [patternsActive, setPatternsActive] = useState(false)
  const [currentTopicId, setCurrentTopicId] = useState<string | null>(null)

  const triggerDeepDive = useTriggerTopicDeepDive()
  const triggerPatterns = useTriggerTopicBehavioralPatterns()

  const { data: deepDiveResult, isLoading: isLoadingDeepDive } = useGetTopicDeepDive(
    audienceId,
    topic?.id ?? '',
    deepDiveActive && !!topic,
  )

  const { data: patternsResult, isLoading: isLoadingPatterns } = useGetTopicBehavioralPatterns(
    audienceId,
    topic?.id ?? '',
    patternsActive && !!topic,
  )

  const deepDiveStatus = deepDiveResult?.status
  const deepDiveData = deepDiveResult?.data
  const isProcessing = deepDiveStatus === 'processing'

  const patternsStatus = patternsResult?.status
  const patternsData = patternsResult?.data
  const isPatternsProcessing = patternsStatus === 'processing'

  // Reset when topic changes
  useEffect(() => {
    if (topic?.id !== currentTopicId) {
      setDeepDiveActive(false)
      setPatternsActive(false)
      setCurrentTopicId(topic?.id ?? null)
    }
  }, [topic?.id, currentTopicId])

  const handleBrowseAll = () => {
    if (!topic) return
    setDeepDiveActive(true)
    setPatternsActive(false)
  }

  const handleRetry = () => {
    if (!topic) return
    triggerDeepDive.mutate({ audienceId, topicId: topic.id })
  }

  const handlePatterns = () => {
    if (!topic) return
    setPatternsActive(true)
    setDeepDiveActive(false)
  }

  const handlePatternsRetry = () => {
    if (!topic) return
    triggerPatterns.mutate({ audienceId, topicId: topic.id })
  }

  useLayoutEffect(() => {
    if (!containerRef.current || !panelRef.current) return

    if (!topic) {
      gsap.set(panelRef.current, { opacity: 0, x: 50, display: 'none' })
    }
  }, [])

  useEffect(() => {
    if (!containerRef.current || !panelRef.current) return

    if (topic) {
      gsap.set(panelRef.current, { display: 'block' })

      if (prefersReducedMotion) {
        gsap.set(panelRef.current, { opacity: 1, x: 0 })
      } else {
        gsap.fromTo(
          panelRef.current,
          { opacity: 0, x: 50, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.4,
            ease: 'power3.out',
          }
        )
      }
    } else {
      if (prefersReducedMotion) {
        gsap.set(panelRef.current, { opacity: 0, display: 'none' })
      } else {
        gsap.to(panelRef.current, {
          opacity: 0,
          x: 30,
          scale: 0.98,
          duration: 0.25,
          ease: 'power2.in',
          onComplete: () => {
            gsap.set(panelRef.current, { display: 'none' })
          },
        })
      }
    }
  }, [prefersReducedMotion, topic])

  const browseAllLabel = isProcessing ? 'Analyzing...' : 'Browse all'
  const browseAllDisabled = isProcessing || triggerDeepDive.isPending

  const patternsLabel = isPatternsProcessing ? 'Analyzing...' : 'Patterns'
  const patternsDisabled = isPatternsProcessing || triggerPatterns.isPending

  return (
    <div ref={containerRef} className="h-full">
      <div
        ref={panelRef}
        className="bg-white dark:bg-zinc-900 rounded-2xl p-6 hidden max-h-[80vh] overflow-y-auto"
      >
        {topic && (
          <>
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                {topic.name}
              </h3>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500 dark:text-zinc-400">
                  {topic.frequency} / {topic.frequencyUnit}
                </span>
                <span className="flex items-center gap-1 text-green-500">
                  <TrendingUp className="w-3 h-3" />
                  {topic.growth}%
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-zinc-300 mb-6 leading-relaxed">
              {topic.description}
            </p>

            <div className="flex flex-wrap justify-end gap-2 mb-6">
              <Button
                variant="primary"
                size="sm"
                className="gap-1.5"
                onClick={handleBrowseAll}
                disabled={browseAllDisabled}
              >
                {isProcessing ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Search className="w-3.5 h-3.5" />
                )}
                {browseAllLabel}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={handlePatterns}
                disabled={patternsDisabled}
              >
                {isPatternsProcessing ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5" />
                )}
                {patternsLabel}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Sentiment
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Ask
              </Button>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                  Subreddits
                </h4>
                <span className="text-xs text-gray-500 dark:text-zinc-400">
                  {topic.subreddits.length}
                </span>
              </div>

              <ul className="space-y-2">
                {topic.subreddits.map((subreddit) => (
                  <li
                    key={subreddit.name}
                    className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-zinc-700 flex items-center justify-center">
                        <MessageSquare className="w-3 h-3 text-gray-500 dark:text-zinc-400" />
                      </div>
                      <span className="text-sm text-gray-900 dark:text-white">
                        {subreddit.name}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-zinc-400">
                      {subreddit.postCount}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Deep Dive Section */}
            {deepDiveActive && (
              <div className="mt-6 border-t border-gray-100 dark:border-zinc-800">
                {/* Loading initial fetch */}
                {isLoadingDeepDive && (
                  <div className="flex items-center justify-center py-8">
                    <div className="w-6 h-6 border-3 border-lime border-t-transparent rounded-full animate-spin" />
                  </div>
                )}

                {/* Processing state */}
                {isProcessing && (
                  <div className="flex flex-col items-center py-8 gap-3">
                    <Loader2 className="w-6 h-6 text-lime animate-spin" />
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Analyzing topic...
                      </p>
                      <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">
                        This may take a couple of minutes
                      </p>
                    </div>
                  </div>
                )}

                {/* Failed state */}
                {deepDiveStatus === 'failed' && (
                  <div className="flex flex-col items-center py-8 gap-3">
                    <AlertCircle className="w-6 h-6 text-red-500" />
                    <p className="text-sm text-gray-600 dark:text-zinc-300">
                      Analysis failed. Please try again.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1.5"
                      onClick={handleRetry}
                      disabled={triggerDeepDive.isPending}
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Retry
                    </Button>
                  </div>
                )}

                {/* No analysis state */}
                {deepDiveStatus === 'no_analysis' && (
                  <div className="flex flex-col items-center py-8 gap-3">
                    <p className="text-sm text-gray-500 dark:text-zinc-400">
                      No deep dive analysis found for this topic.
                    </p>
                    <Button
                      variant="primary"
                      size="sm"
                      className="gap-1.5"
                      onClick={handleRetry}
                      disabled={triggerDeepDive.isPending}
                    >
                      <Search className="w-3.5 h-3.5" />
                      Start Analysis
                    </Button>
                  </div>
                )}

                {/* Ready state — render all sections */}
                {deepDiveStatus === 'ready' && deepDiveData && (
                  <div>
                    <div className="flex items-center justify-between pt-4 mb-2">
                      <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                        Deep Dive
                      </h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1 text-xs"
                        onClick={handleRetry}
                        disabled={triggerDeepDive.isPending}
                      >
                        <RefreshCw className="w-3 h-3" />
                        Refresh
                      </Button>
                    </div>
                    <DeepDiveSummarySection summary={deepDiveData.getSummary()} />
                    <DeepDiveSubtopicsSection subtopics={deepDiveData.getSubtopics()} />
                    <DeepDiveQuestionsSection questions={deepDiveData.getCommonQuestions()} />
                    <DeepDiveSentimentSection sentiment={deepDiveData.getSentiment()} />
                    <DeepDiveProductsSection products={deepDiveData.getMentionedProducts()} />
                    <DeepDivePostsSection posts={deepDiveData.getRepresentativePosts()} />
                    <DeepDiveInsightsSection insights={deepDiveData.getActionableInsights()} />
                  </div>
                )}
              </div>
            )}

            {/* Behavioral Patterns Section */}
            {patternsActive && (
              <div className="mt-6 border-t border-gray-100 dark:border-zinc-800">
                {/* Loading initial fetch */}
                {isLoadingPatterns && (
                  <div className="flex items-center justify-center py-8">
                    <div className="w-6 h-6 border-3 border-lime border-t-transparent rounded-full animate-spin" />
                  </div>
                )}

                {/* Processing state */}
                {isPatternsProcessing && (
                  <div className="flex flex-col items-center py-8 gap-3">
                    <Loader2 className="w-6 h-6 text-lime animate-spin" />
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Detecting behavioral patterns...
                      </p>
                      <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">
                        This may take 3-5 minutes
                      </p>
                    </div>
                  </div>
                )}

                {/* Failed state */}
                {patternsStatus === 'failed' && (
                  <div className="flex flex-col items-center py-8 gap-3">
                    <AlertCircle className="w-6 h-6 text-red-500" />
                    <p className="text-sm text-gray-600 dark:text-zinc-300">
                      Pattern detection failed. Please try again.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1.5"
                      onClick={handlePatternsRetry}
                      disabled={triggerPatterns.isPending}
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Retry
                    </Button>
                  </div>
                )}

                {/* No analysis state */}
                {patternsStatus === 'no_analysis' && (
                  <div className="flex flex-col items-center py-8 gap-3">
                    <p className="text-sm text-gray-500 dark:text-zinc-400">
                      No behavioral patterns analysis found for this topic.
                    </p>
                    <Button
                      variant="primary"
                      size="sm"
                      className="gap-1.5"
                      onClick={handlePatternsRetry}
                      disabled={triggerPatterns.isPending}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Start Analysis
                    </Button>
                  </div>
                )}

                {/* Ready state — render all sections */}
                {patternsStatus === 'ready' && patternsData && (
                  <div>
                    <div className="flex items-center justify-between pt-4 mb-2">
                      <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                        Behavioral Patterns
                      </h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1 text-xs"
                        onClick={handlePatternsRetry}
                        disabled={triggerPatterns.isPending}
                      >
                        <RefreshCw className="w-3 h-3" />
                        Refresh
                      </Button>
                    </div>
                    <BehavioralPatternsSummarySection summary={patternsData.getSummary()} />
                    <ToolPatternsSection patterns={patternsData.getToolPatterns()} />
                    <WorkaroundPatternsSection patterns={patternsData.getWorkaroundPatterns()} />
                    <FrictionPatternsSection patterns={patternsData.getFrictionPatterns()} />
                    <ShiftPatternsSection patterns={patternsData.getShiftPatterns()} />
                    <DemandSignalsSection signals={patternsData.getDemandSignals()} />
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
