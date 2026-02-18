import { useRef, useEffect, useLayoutEffect } from 'react'
import { Search, Sparkles, Copy, MessageSquare } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks'
import { Button } from '@/components/ui/button'

export interface ThemeSubcategory {
  name: string
  count: number
}

export interface ThemeTopic {
  name: string
  count: number
}

export interface ThemeSubreddit {
  name: string
  icon?: string
  count: number
}

export interface ThemeDetail {
  id: string
  name: string
  description: string
  subcategories: ThemeSubcategory[]
  topics: ThemeTopic[]
  subreddits: ThemeSubreddit[]
}

export interface ThemeDetailPanelProps {
  theme: ThemeDetail | null
}

export function ThemeDetailPanel({ theme }: Readonly<ThemeDetailPanelProps>) {
  const containerRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    if (!containerRef.current || !panelRef.current) return

    if (!theme) {
      gsap.set(panelRef.current, { opacity: 0, x: 50, display: 'none' })
    }
  }, [])

  useEffect(() => {
    if (!containerRef.current || !panelRef.current) return

    if (theme) {
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
  }, [prefersReducedMotion, theme])

  return (
    <div ref={containerRef} className="h-full">
      <div
        ref={panelRef}
        className="bg-white dark:bg-zinc-900 rounded-2xl p-6 hidden"
      >
        {theme && (
          <>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">
              {theme.name}
            </h3>

            <p className="text-sm text-gray-600 dark:text-zinc-300 mb-6 leading-relaxed">
              {theme.description}
            </p>

            <div className="flex flex-wrap justify-end gap-2 mb-6">
              <Button variant="primary" size="sm" className="gap-1.5">
                <Search className="w-3.5 h-3.5" />
                Browse all
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Patterns
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Ask
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Copy className="w-3.5 h-3.5" />
                Copy
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {/* Subcategories */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                    Subcategories
                  </h4>
                  <span className="text-xs text-gray-500 dark:text-zinc-400">
                    {theme.subcategories.length}
                  </span>
                </div>
                <ul className="space-y-1">
                  {theme.subcategories.map((sub) => (
                    <li
                      key={sub.name}
                      className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-gray-400 dark:bg-zinc-500" />
                        <span className="text-sm text-gray-700 dark:text-zinc-300">
                          {sub.name}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-zinc-400">
                        {sub.count}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Topics */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                    Topics
                  </h4>
                  <span className="text-xs text-gray-500 dark:text-zinc-400">
                    {theme.topics.length}
                  </span>
                </div>
                <ul className="space-y-1">
                  {theme.topics.map((topic) => (
                    <li
                      key={topic.name}
                      className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-3 h-3 text-gray-400 dark:text-zinc-500" />
                        <span className="text-sm text-gray-700 dark:text-zinc-300">
                          {topic.name}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-zinc-400">
                        {topic.count}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Subreddits */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                    Subreddits
                  </h4>
                  <span className="text-xs text-gray-500 dark:text-zinc-400">
                    {theme.subreddits.length}
                  </span>
                </div>
                <ul className="space-y-1 max-h-[400px] overflow-y-auto">
                  {theme.subreddits.map((subreddit) => (
                    <li
                      key={subreddit.name}
                      className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-zinc-700 flex items-center justify-center text-[10px] font-medium text-gray-500 dark:text-zinc-400">
                          {subreddit.name.charAt(2).toUpperCase()}
                        </div>
                        <span className="text-sm text-gray-700 dark:text-zinc-300">
                          {subreddit.name}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-zinc-400">
                        {subreddit.count}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
