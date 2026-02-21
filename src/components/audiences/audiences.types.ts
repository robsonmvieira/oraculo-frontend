import type { Subreddit } from './AudienceCard'

export type SortOption = 'subreddits' | 'name'
export type ViewMode = 'grid' | 'list'

export interface AudienceDisplayItem {
  id: string
  name: string
  subredditCount: number
  totalMembers: number
  weeklyGrowth: number
  subreddits: readonly Subreddit[]
}

export const gridClassName = (viewMode: ViewMode) =>
  `grid gap-4 ${
    viewMode === 'grid'
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      : 'grid-cols-1'
  }`
