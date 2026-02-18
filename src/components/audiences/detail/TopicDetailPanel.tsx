import { useRef, useEffect, useLayoutEffect } from 'react'
import { TrendingUp, Search, Sparkles, MessageSquare } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks'
import { Button } from '@/components/ui/button'

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
}

export function TopicDetailPanel({ topic }: Readonly<TopicDetailPanelProps>) {
  const containerRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    if (!containerRef.current || !panelRef.current) return

    if (!topic) {
      // Hide panel when no topic selected
      gsap.set(panelRef.current, { opacity: 0, x: 50, display: 'none' })
    }
  }, [])

  useEffect(() => {
    if (!containerRef.current || !panelRef.current) return

    if (topic) {
      // Show panel with animation
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
      // Hide panel with animation
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

  return (
    <div ref={containerRef} className="h-full">
      <div
        ref={panelRef}
        className="bg-white dark:bg-zinc-900 rounded-2xl p-6 hidden"
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
              >
                <Search className="w-3.5 h-3.5" />
                Browse all
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Patterns
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
          </>
        )}
      </div>
    </div>
  )
}
