import { SubredditsGrid } from './SubredditsGrid'
import { AboutAudiencePanel } from './AboutAudiencePanel'
import { SimilarCommunitiesGrid } from './SimilarCommunitiesGrid'
import type { SubredditDetail } from '@/data/audienceDetails'
import type { SimilarCommunity } from './SimilarCommunitiesGrid'
import type { AudienceStats, RadarData } from './AboutAudiencePanel'

export interface SubredditsTabContentProps {
  subredditsData: readonly SubredditDetail[]
  communitiesCount: number
  audienceName: string
  audienceStats: AudienceStats
  radarData: RadarData
  similarCommunities: readonly SimilarCommunity[]
  isLoadingSuggestions?: boolean
  onAddToAudience?: (subredditName: string) => void
  onMarkNotRelevant?: (subredditName: string) => void
}

export function SubredditsTabContent({
  subredditsData,
  communitiesCount,
  audienceName,
  audienceStats,
  radarData,
  similarCommunities,
  isLoadingSuggestions,
  onAddToAudience,
  onMarkNotRelevant,
}: Readonly<SubredditsTabContentProps>) {
  return (
    <div className="space-y-8">
      <div className="flex gap-6">
        <SubredditsGrid
          subreddits={subredditsData}
          totalCount={communitiesCount}
        />
        <div className="w-[280px] shrink-0">
          <AboutAudiencePanel
            stats={audienceStats}
            radarData={radarData}
            audienceName={audienceName}
          />
        </div>
      </div>

      <SimilarCommunitiesGrid communities={similarCommunities} isLoading={isLoadingSuggestions} onAddToAudience={onAddToAudience} onMarkNotRelevant={onMarkNotRelevant} />
    </div>
  )
}
