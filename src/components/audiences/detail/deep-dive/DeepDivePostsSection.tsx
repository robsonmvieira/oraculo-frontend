import { ExternalLink, ArrowUp } from 'lucide-react'
import type { RepresentativePost } from '@/modules/audience/domain/entities/TopicDeepDive.entity'

export interface DeepDivePostsSectionProps {
  posts: RepresentativePost[]
}

export function DeepDivePostsSection({ posts }: Readonly<DeepDivePostsSectionProps>) {
  if (posts.length === 0) return null

  return (
    <div className="pt-4 border-t border-gray-100 dark:border-zinc-800">
      <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-3">
        Representative Posts
        <span className="ml-2 text-xs text-gray-500 dark:text-zinc-400">{posts.length}</span>
      </h4>
      <div className="space-y-3">
        {posts.map((post) => (
          <div
            key={post.permalink}
            className="p-3 rounded-lg bg-gray-50 dark:bg-zinc-800"
          >
            <div className="flex items-start gap-2 mb-1">
              <div className="flex items-center gap-1 text-gray-500 dark:text-zinc-400 shrink-0">
                <ArrowUp className="w-3 h-3" />
                <span className="text-xs font-medium">{post.score}</span>
              </div>
              <div className="flex-1 min-w-0">
                <a
                  href={post.permalink.startsWith('http') ? post.permalink : `https://reddit.com${post.permalink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-gray-900 dark:text-white hover:text-lime transition-colors inline-flex items-center gap-1"
                >
                  <span className="line-clamp-2">{post.title}</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              </div>
            </div>
            <div className="flex items-center gap-2 ml-7">
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-zinc-700 text-gray-600 dark:text-zinc-300">
                r/{post.subreddit}
              </span>
            </div>
            {post.excerpt && (
              <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed mt-1.5 ml-7 line-clamp-2">
                {post.excerpt}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
