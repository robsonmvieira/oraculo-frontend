import { SubredditsGrid } from './SubredditsGrid'
import { AboutAudiencePanel } from './AboutAudiencePanel'
import { SimilarCommunitiesGrid } from './SimilarCommunitiesGrid'
import type { SubredditDetail } from '@/data/audienceDetails'
import type { SimilarCommunity } from './SimilarCommunitiesGrid'

export interface SubredditsTabContentProps {
  subredditsData: readonly SubredditDetail[]
  communitiesCount: number
  audienceName: string
  similarCommunities: readonly SimilarCommunity[]
  isLoadingSuggestions?: boolean
}

export function SubredditsTabContent({
  subredditsData,
  communitiesCount,
  audienceName,
  similarCommunities,
  isLoadingSuggestions,
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
            stats={{
              type: 'Curated Audience',
              totalMembers: 24_200_000,
              monthlyGrowth: 0.8,
            }}
            radarData={{
              age: 65,
              reach: 80,
              size: 90,
              activity: 75,
              growth: 60,
            }}
            audienceName={audienceName}
            comparisonName="r/parrots"
          />
        </div>
      </div>

      <SimilarCommunitiesGrid communities={similarCommunities} isLoading={isLoadingSuggestions} />
    </div>
  )
}
