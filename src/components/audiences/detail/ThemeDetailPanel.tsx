import { useRef, useState, useEffect, useLayoutEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Search, Sparkles, Copy, MessageSquare, Loader2 } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks'
import { Button } from '@/components/ui/button'
import { useGetIntentPosts } from '@/modules/audience/application/hooks'

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
  audienceId?: string
  intentCategory?: string | null
}

export function ThemeDetailPanel({ theme, audienceId, intentCategory }: Readonly<ThemeDetailPanelProps>) {
  const { t } = useTranslation('audiences')
  const containerRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const [showPosts, setShowPosts] = useState(false)

  const postsQuery = useGetIntentPosts(
    audienceId ?? '',
    intentCategory ?? '',
    'week',
    showPosts && !!audienceId && !!intentCategory,
    20,
    0,
  )

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

  useEffect(() => {
    setShowPosts(false)
  }, [theme?.id, intentCategory])

  const isIntentTheme = !!intentCategory
  const posts = postsQuery.data?.posts
  const isLoadingPosts = postsQuery.isLoading

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
              <Button
                variant="primary"
                size="sm"
                className="gap-1.5"
                onClick={isIntentTheme ? () => setShowPosts(!showPosts) : undefined}
              >
                <Search className="w-3.5 h-3.5" />
                {t('themes.browseAll')}
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {t('themes.patterns')}
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {t('themes.ask')}
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Copy className="w-3.5 h-3.5" />
                {t('themes.copy')}
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {/* Subcategories */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                    {t('themes.subcategories')}
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
                    {t('themes.topics')}
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
                    {t('themes.subreddits')}
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

            {showPosts && isIntentTheme && (
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-3">
                  {t('themes.posts')}
                </h4>
                {isLoadingPosts && (
                  <div className="flex items-center justify-center py-6">
                    <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                  </div>
                )}
                {posts && posts.length > 0 && (
                  <ul className="space-y-2 max-h-[300px] overflow-y-auto">
                    {posts.map((post) => (
                      <li
                        key={post.getPostRedditId()}
                        className="py-2 px-3 rounded-lg bg-gray-50 dark:bg-zinc-800"
                      >
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {post.getPostTitle()}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500 dark:text-zinc-400">
                            r/{post.getPostSubreddit()}
                          </span>
                          <span className="text-xs text-gray-400 dark:text-zinc-500">
                            {Math.round(post.getConfidence() * 100)}%
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                {posts?.length === 0 && !isLoadingPosts && (
                  <p className="text-sm text-gray-500 dark:text-zinc-400 text-center py-4">
                    {t('themes.noBookmarks')}
                  </p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
