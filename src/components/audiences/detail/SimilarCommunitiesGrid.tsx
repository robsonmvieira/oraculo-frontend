import { TrendingUp } from 'lucide-react'

export interface SimilarCommunity {
  id: string
  name: string
  members: number
  weeklyGrowth: number
  sizeCategory: string
  activityLevel: string
  description: string
}

export interface SimilarCommunitiesGridProps {
  communities: readonly SimilarCommunity[]
}

export function SimilarCommunitiesGrid({ communities }: Readonly<SimilarCommunitiesGridProps>) {
  return (
    <div>
      <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
        Expand your audience with similar communities
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {communities.map((subreddit) => (
          <div
            key={subreddit.id}
            className="bg-white dark:bg-zinc-900 rounded-2xl p-5"
          >
            <div className="flex items-start gap-4 mb-3">
              <div className="w-14 h-14 rounded-full bg-gray-200 dark:bg-zinc-700 flex items-center justify-center text-lg font-medium text-gray-600 dark:text-zinc-300 shrink-0">
                {subreddit.name.charAt(2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-gray-900 dark:text-white text-base">
                  {subreddit.name}
                </h4>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500 dark:text-zinc-400">
                    {subreddit.members >= 1_000_000
                      ? `${(subreddit.members / 1_000_000).toFixed(1)}M`
                      : `${Math.round(subreddit.members / 1_000)}k`}{' '}
                    members
                  </span>
                  <span className="flex items-center gap-1 text-success-light">
                    <TrendingUp className="w-3 h-3" />
                    {subreddit.weeklyGrowth}% / week
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm text-gray-600 dark:text-zinc-300 border-b border-dashed border-gray-400 dark:border-zinc-500">
                {subreddit.sizeCategory}
              </span>
              <span className="text-sm text-gray-600 dark:text-zinc-300 border-b border-dashed border-gray-400 dark:border-zinc-500">
                {subreddit.activityLevel}
              </span>
            </div>

            <div className="mb-4">
              <p className="text-[10px] font-medium text-gray-500 dark:text-zinc-500 uppercase tracking-wide mb-1">
                Description
              </p>
              <p className="text-sm text-gray-700 dark:text-zinc-300">
                {subreddit.description}
              </p>
            </div>

            <div className="flex gap-3">
              <button className="cursor-pointer flex-1 py-2.5 text-sm font-medium text-zinc-900 bg-cyan-400 hover:bg-cyan-500 rounded-lg transition-colors">
                Add to Audience
              </button>
              <button className="cursor-pointer flex-1 py-2.5 text-sm font-medium text-gray-300 dark:text-zinc-400 bg-gray-700 dark:bg-zinc-700 hover:bg-gray-600 dark:hover:bg-zinc-600 rounded-lg transition-colors">
                Not Relevant
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
