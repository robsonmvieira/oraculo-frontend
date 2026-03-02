import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { TrendingUp, TrendingDown, Minus, Search, Sparkles, Heart, MessageSquare, MessageCircleQuestion, MessageSquareText, LineChart, Loader2, AlertCircle, RefreshCw } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks'
import { Button } from '@/components/ui/button'
import { useGetTopicDeepDive, useTriggerTopicDeepDive, useGetTopicBehavioralPatterns, useTriggerTopicBehavioralPatterns, useGetTopicSentiment, useTriggerTopicSentiment, useGetTopicGrowthHistory } from '@/modules/audience/application/hooks'
import {
  DeepDiveSummarySection,
  DeepDiveSubtopicsSection,
  DeepDiveQuestionsSection,
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
import {
  SentimentOverallSection,
  EmotionalMapSection,
  SentimentByCommunitySection,
  SentimentBySubtopicSection,
  SentimentDriversSection,
  TensionPointsSection,
  PainPointsSection,
  SentimentOpportunitiesSection,
} from './sentiment'
import { TopicAskSection } from './ask'
import { TopicChatSection } from './chat'
import { TopicGrowthHistorySection } from './growth-history'

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
  growthSource?: 'calculated' | 'estimated' | null
  growthTrend?: 'up' | 'stable' | 'down' | null
}

export interface TopicDetailPanelProps {
  topic: TopicDetail | null
  audienceId: string
  embedded?: boolean
}

export function TopicDetailPanel({ topic, audienceId, embedded = false }: Readonly<TopicDetailPanelProps>) {
  const { t } = useTranslation('audiences')
  const containerRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const [deepDiveActive, setDeepDiveActive] = useState(false)
  const [patternsActive, setPatternsActive] = useState(false)
  const [sentimentActive, setSentimentActive] = useState(false)
  const [askActive, setAskActive] = useState(false)
  const [chatActive, setChatActive] = useState(false)
  const [growthActive, setGrowthActive] = useState(false)
  const [currentTopicId, setCurrentTopicId] = useState<string | null>(null)

  const triggerDeepDive = useTriggerTopicDeepDive()
  const triggerPatterns = useTriggerTopicBehavioralPatterns()
  const triggerSentiment = useTriggerTopicSentiment()

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

  const { data: sentimentResult, isLoading: isLoadingSentiment } = useGetTopicSentiment(
    audienceId,
    topic?.id ?? '',
    sentimentActive && !!topic,
  )

  const { data: growthResult, isLoading: isLoadingGrowth } = useGetTopicGrowthHistory(
    audienceId,
    topic?.id ?? '',
    growthActive && !!topic,
  )

  const deepDiveStatus = deepDiveResult?.status
  const deepDiveData = deepDiveResult?.data
  const isProcessing = deepDiveActive && deepDiveStatus === 'processing'

  const patternsStatus = patternsResult?.status
  const patternsData = patternsResult?.data
  const isPatternsProcessing = patternsActive && patternsStatus === 'processing'

  const sentimentStatus = sentimentResult?.status
  const sentimentData = sentimentResult?.data
  const isSentimentProcessing = sentimentActive && sentimentStatus === 'processing'

  const growthData = growthResult?.data

  // Reset when topic changes
  useEffect(() => {
    if (topic?.id !== currentTopicId) {
      setDeepDiveActive(false)
      setPatternsActive(false)
      setSentimentActive(false)
      setAskActive(false)
      setChatActive(false)
      setGrowthActive(false)
      setCurrentTopicId(topic?.id ?? null)
    }
  }, [topic?.id, currentTopicId])

  const handleBrowseAll = () => {
    if (!topic) return
    setDeepDiveActive(true)
    setPatternsActive(false)
    setSentimentActive(false)
    setAskActive(false)
    setChatActive(false)
    setGrowthActive(false)
  }

  const handleRetry = () => {
    if (!topic) return
    triggerDeepDive.mutate({ audienceId, topicId: topic.id })
  }

  const handlePatterns = () => {
    if (!topic) return
    setPatternsActive(true)
    setDeepDiveActive(false)
    setSentimentActive(false)
    setAskActive(false)
    setChatActive(false)
    setGrowthActive(false)
  }

  const handlePatternsRetry = () => {
    if (!topic) return
    triggerPatterns.mutate({ audienceId, topicId: topic.id })
  }

  const handleSentiment = () => {
    if (!topic) return
    setSentimentActive(true)
    setDeepDiveActive(false)
    setPatternsActive(false)
    setAskActive(false)
    setChatActive(false)
    setGrowthActive(false)
  }

  const handleAsk = () => {
    if (!topic) return
    setAskActive(true)
    setDeepDiveActive(false)
    setPatternsActive(false)
    setSentimentActive(false)
    setChatActive(false)
    setGrowthActive(false)
  }

  const handleChat = () => {
    if (!topic) return
    setChatActive(true)
    setDeepDiveActive(false)
    setPatternsActive(false)
    setSentimentActive(false)
    setAskActive(false)
    setGrowthActive(false)
  }

  const handleGrowth = () => {
    if (!topic) return
    setGrowthActive(true)
    setDeepDiveActive(false)
    setPatternsActive(false)
    setSentimentActive(false)
    setAskActive(false)
    setChatActive(false)
  }

  const handleSentimentRetry = () => {
    if (!topic) return
    triggerSentiment.mutate({ audienceId, topicId: topic.id })
  }

  useLayoutEffect(() => {
    if (embedded || !containerRef.current || !panelRef.current) return

    if (!topic) {
      gsap.set(panelRef.current, { opacity: 0, x: 50, display: 'none' })
    }
  }, [embedded])

  useEffect(() => {
    if (embedded || !containerRef.current || !panelRef.current) return

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
  }, [embedded, prefersReducedMotion, topic])

  const browseAllLabel = isProcessing ? t('topicDetail.analyzing') : t('topicDetail.browseAll')
  const browseAllDisabled = isProcessing || triggerDeepDive.isPending

  const patternsLabel = isPatternsProcessing ? t('topicDetail.analyzing') : t('topicDetail.patterns')
  const patternsDisabled = isPatternsProcessing || triggerPatterns.isPending

  const sentimentLabel = isSentimentProcessing ? t('topicDetail.analyzing') : t('topicDetail.sentiment')
  const sentimentDisabled = isSentimentProcessing || triggerSentiment.isPending

  return (
    <div ref={containerRef} className={embedded ? '' : 'h-full'}>
      <div
        ref={panelRef}
        className={embedded
          ? ''
          : 'bg-white dark:bg-zinc-900 rounded-2xl p-6 hidden max-h-[80vh] overflow-y-auto'
        }
      >
        {topic && (
          <>
            {!embedded && (
              <>
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                    {topic.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500 dark:text-zinc-400">
                      {topic.frequency} / {topic.frequencyUnit}
                    </span>
                    <span className={`flex items-center gap-1 ${
                      topic.growthTrend === 'down' ? 'text-red-500'
                        : topic.growthTrend === 'stable' ? 'text-yellow-500'
                        : 'text-green-500'
                    }`}>
                      {topic.growthTrend === 'down' ? <TrendingDown className="w-3 h-3" />
                        : topic.growthTrend === 'stable' ? <Minus className="w-3 h-3" />
                        : <TrendingUp className="w-3 h-3" />}
                      {topic.growth}%
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-zinc-300 mb-6 leading-relaxed">
                  {topic.description}
                </p>
              </>
            )}

            <div className="flex flex-wrap justify-end gap-2 mb-6">
              <Button
                variant={deepDiveActive ? 'primary' : 'outline'}
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
                variant={patternsActive ? 'primary' : 'outline'}
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
                variant={sentimentActive ? 'primary' : 'outline'}
                size="sm"
                className="gap-1.5"
                onClick={handleSentiment}
                disabled={sentimentDisabled}
              >
                {isSentimentProcessing ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Heart className="w-3.5 h-3.5" />
                )}
                {sentimentLabel}
              </Button>
              <Button
                variant={askActive ? 'primary' : 'outline'}
                size="sm"
                className="gap-1.5"
                onClick={handleAsk}
              >
                <MessageCircleQuestion className="w-3.5 h-3.5" />
                {t('topicDetail.ask')}
              </Button>
              <Button
                variant={chatActive ? 'primary' : 'outline'}
                size="sm"
                className="gap-1.5"
                onClick={handleChat}
              >
                <MessageSquareText className="w-3.5 h-3.5" />
                {t('topicDetail.chat')}
              </Button>
              <Button
                variant={growthActive ? 'primary' : 'outline'}
                size="sm"
                className="gap-1.5"
                onClick={handleGrowth}
              >
                <LineChart className="w-3.5 h-3.5" />
                {t('topicDetail.growth')}
              </Button>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                  {t('topicDetail.subreddits')}
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
                        {t('topicDetail.analyzingTopic')}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">
                        {t('topicDetail.analyzingHelp')}
                      </p>
                    </div>
                  </div>
                )}

                {/* Failed state */}
                {deepDiveStatus === 'failed' && (
                  <div className="flex flex-col items-center py-8 gap-3">
                    <AlertCircle className="w-6 h-6 text-red-500" />
                    <p className="text-sm text-gray-600 dark:text-zinc-300">
                      {t('topicDetail.analysisFailed')}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1.5"
                      onClick={handleRetry}
                      disabled={triggerDeepDive.isPending}
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      {t('topicDetail.retry')}
                    </Button>
                  </div>
                )}

                {/* No analysis state */}
                {deepDiveStatus === 'no_analysis' && (
                  <div className="flex flex-col items-center py-8 gap-3">
                    <p className="text-sm text-gray-500 dark:text-zinc-400">
                      {t('topicDetail.noAnalysis')}
                    </p>
                    <Button
                      variant="primary"
                      size="sm"
                      className="gap-1.5"
                      onClick={handleRetry}
                      disabled={triggerDeepDive.isPending}
                    >
                      <Search className="w-3.5 h-3.5" />
                      {t('topicDetail.startAnalysis')}
                    </Button>
                  </div>
                )}

                {/* Ready state — render all sections */}
                {deepDiveStatus === 'ready' && deepDiveData && (
                  <div>
                    <div className="flex items-center justify-between pt-4 mb-2">
                      <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                        {t('topicDetail.deepDive')}
                      </h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1 text-xs"
                        onClick={handleRetry}
                        disabled={triggerDeepDive.isPending}
                      >
                        <RefreshCw className="w-3 h-3" />
                        {t('topicDetail.refresh')}
                      </Button>
                    </div>
                    <DeepDiveSummarySection summary={deepDiveData.getSummary()} />
                    <DeepDiveSubtopicsSection subtopics={deepDiveData.getSubtopics()} />
                    <DeepDiveQuestionsSection questions={deepDiveData.getCommonQuestions()} />
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
                        {t('topicDetail.detectingPatterns')}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">
                        {t('topicDetail.detectingPatternsHelp')}
                      </p>
                    </div>
                  </div>
                )}

                {/* Failed state */}
                {patternsStatus === 'failed' && (
                  <div className="flex flex-col items-center py-8 gap-3">
                    <AlertCircle className="w-6 h-6 text-red-500" />
                    <p className="text-sm text-gray-600 dark:text-zinc-300">
                      {t('topicDetail.patternsFailed')}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1.5"
                      onClick={handlePatternsRetry}
                      disabled={triggerPatterns.isPending}
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      {t('topicDetail.retry')}
                    </Button>
                  </div>
                )}

                {/* No analysis state */}
                {patternsStatus === 'no_analysis' && (
                  <div className="flex flex-col items-center py-8 gap-3">
                    <p className="text-sm text-gray-500 dark:text-zinc-400">
                      {t('topicDetail.noPatternsAnalysis')}
                    </p>
                    <Button
                      variant="primary"
                      size="sm"
                      className="gap-1.5"
                      onClick={handlePatternsRetry}
                      disabled={triggerPatterns.isPending}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      {t('topicDetail.startAnalysis')}
                    </Button>
                  </div>
                )}

                {/* Ready state — render all sections */}
                {patternsStatus === 'ready' && patternsData && (
                  <div>
                    <div className="flex items-center justify-between pt-4 mb-2">
                      <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                        {t('topicDetail.behavioralPatterns')}
                      </h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1 text-xs"
                        onClick={handlePatternsRetry}
                        disabled={triggerPatterns.isPending}
                      >
                        <RefreshCw className="w-3 h-3" />
                        {t('topicDetail.refresh')}
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

            {/* Ask Q&A Section */}
            {askActive && (
              <div className="mt-6 border-t border-gray-100 dark:border-zinc-800">
                <TopicAskSection audienceId={audienceId} topicId={topic.id} />
              </div>
            )}

            {/* Topic Chat Section */}
            {chatActive && (
              <div className="mt-6 border-t border-gray-100 dark:border-zinc-800">
                <TopicChatSection audienceId={audienceId} topicId={topic.id} />
              </div>
            )}

            {/* Sentiment Analysis Section */}
            {sentimentActive && (
              <div className="mt-6 border-t border-gray-100 dark:border-zinc-800">
                {/* Loading initial fetch */}
                {isLoadingSentiment && (
                  <div className="flex items-center justify-center py-8">
                    <div className="w-6 h-6 border-3 border-lime border-t-transparent rounded-full animate-spin" />
                  </div>
                )}

                {/* Processing state */}
                {isSentimentProcessing && (
                  <div className="flex flex-col items-center py-8 gap-3">
                    <Loader2 className="w-6 h-6 text-lime animate-spin" />
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {t('topicDetail.analyzingSentiment')}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">
                        {t('topicDetail.analyzingSentimentHelp')}
                      </p>
                    </div>
                  </div>
                )}

                {/* Failed state */}
                {sentimentStatus === 'failed' && (
                  <div className="flex flex-col items-center py-8 gap-3">
                    <AlertCircle className="w-6 h-6 text-red-500" />
                    <p className="text-sm text-gray-600 dark:text-zinc-300">
                      {t('topicDetail.sentimentFailed')}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1.5"
                      onClick={handleSentimentRetry}
                      disabled={triggerSentiment.isPending}
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      {t('topicDetail.retry')}
                    </Button>
                  </div>
                )}

                {/* No analysis state */}
                {sentimentStatus === 'no_analysis' && (
                  <div className="flex flex-col items-center py-8 gap-3">
                    <p className="text-sm text-gray-500 dark:text-zinc-400">
                      {t('topicDetail.noSentimentAnalysis')}
                    </p>
                    <Button
                      variant="primary"
                      size="sm"
                      className="gap-1.5"
                      onClick={handleSentimentRetry}
                      disabled={triggerSentiment.isPending}
                    >
                      <Heart className="w-3.5 h-3.5" />
                      {t('topicDetail.startAnalysis')}
                    </Button>
                  </div>
                )}

                {/* Ready state — render all sections */}
                {sentimentStatus === 'ready' && sentimentData && (
                  <div>
                    <div className="flex items-center justify-between pt-4 mb-2">
                      <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                        {t('topicDetail.sentimentAnalysis')}
                      </h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1 text-xs"
                        onClick={handleSentimentRetry}
                        disabled={triggerSentiment.isPending}
                      >
                        <RefreshCw className="w-3 h-3" />
                        {t('topicDetail.refresh')}
                      </Button>
                    </div>
                    <SentimentOverallSection overall={sentimentData.getOverallSentiment()} />
                    <EmotionalMapSection entries={sentimentData.getEmotionalMap()} />
                    <SentimentByCommunitySection communities={sentimentData.getSentimentByCommunity()} />
                    <SentimentBySubtopicSection subtopics={sentimentData.getSentimentBySubtopic()} />
                    <SentimentDriversSection drivers={sentimentData.getSentimentDrivers()} />
                    <TensionPointsSection tensions={sentimentData.getTensionPoints()} />
                    <PainPointsSection pains={sentimentData.getPainPoints()} />
                    <SentimentOpportunitiesSection opportunities={sentimentData.getSentimentOpportunities()} />
                  </div>
                )}
              </div>
            )}

            {/* Growth History Section */}
            {growthActive && (
              <div className="mt-6 border-t border-gray-100 dark:border-zinc-800">
                {isLoadingGrowth && (
                  <div className="flex items-center justify-center py-8">
                    <div className="w-6 h-6 border-3 border-lime border-t-transparent rounded-full animate-spin" />
                  </div>
                )}

                {!isLoadingGrowth && !growthData && (
                  <div className="flex flex-col items-center py-8 gap-3">
                    <LineChart className="w-6 h-6 text-gray-400 dark:text-zinc-500" />
                    <p className="text-sm text-gray-500 dark:text-zinc-400 text-center">
                      {t('topicDetail.noGrowthData')}
                    </p>
                  </div>
                )}

                {!isLoadingGrowth && growthData && (
                  <div className="pt-4">
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-3">
                      {t('topicDetail.growthHistory')}
                    </h4>
                    <TopicGrowthHistorySection data={growthData} />
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
