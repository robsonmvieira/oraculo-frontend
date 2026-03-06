import { useRef, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks'
import { Button } from '@/components/ui/button'
import {
  AudienceDetailHeader,
  AudienceDetailTabs,
  DeleteAudienceModal,
} from '@/components/audiences/detail'
import { useGetAudienceTemplateById, useGetAudienceById, useDeleteAudience, useGetAudienceKeywords, useGetAudienceSuggestions, useAddCommunityToAudience, useMarkCommunityNotRelevant, useGetAudienceTopics } from '@/modules/audience/application/hooks'
import { useCreateAudienceStore } from '@/modules/audience/application/store'
import { toast } from '@/hooks'
import { Community } from '@/modules/community/domain/entities/Community.entity'
import type { SimilarCommunity } from '@/components/audiences/detail/SimilarCommunitiesGrid'
import type { AudienceStats, RadarData } from '@/components/audiences/detail/AboutAudiencePanel'

export function AudienceDetail() {
  const { t } = useTranslation('audiences')
  const { id } = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const { openEditModal } = useCreateAudienceStore()
  const deleteAudienceMutation = useDeleteAudience()
  const addCommunityMutation = useAddCommunityToAudience()
  const markNotRelevantMutation = useMarkCommunityNotRelevant()

  const isUserAudience = searchParams.get('type') === 'user'

  const { data: audienceTemplate, isLoading: isLoadingTemplate, error: errorTemplate } = useGetAudienceTemplateById(isUserAudience ? '' : (id ?? ''))
  const { data: userAudience, isLoading: isLoadingUser, error: errorUser } = useGetAudienceById(isUserAudience ? (id ?? '') : '')
  const { data: keywordsData, isLoading: isLoadingKeywords } = useGetAudienceKeywords(id ?? '')
  const { data: suggestionsData, isLoading: isLoadingSuggestions } = useGetAudienceSuggestions(id)
  const {
    data: topicsData,
    isLoading: isLoadingTopics,
    fetchNextPage: fetchNextTopics,
    hasNextPage: hasMoreTopics,
    isFetchingNextPage: isLoadingMoreTopics,
  } = useGetAudienceTopics(id ?? '')

  const isLoading = isUserAudience ? isLoadingUser : isLoadingTemplate
  const error = isUserAudience ? errorUser : errorTemplate

  useEffect(() => {
    if (!headerRef.current || !contentRef.current || prefersReducedMotion) return

    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
    )

    gsap.fromTo(
      contentRef.current.children,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.2,
      }
    )
  }, [prefersReducedMotion, id])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-lime border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error || (!audienceTemplate && !userAudience)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-gray-500 dark:text-zinc-400">{t('detail.notFound')}</p>
        <Button onClick={() => navigate('/audiences')} variant="outline">
          {t('detail.backToAudiences')}
        </Button>
      </div>
    )
  }

  const audienceName = isUserAudience
    ? userAudience!.getName()
    : audienceTemplate!.getName()

  const audienceId = isUserAudience
    ? userAudience!.getId()
    : audienceTemplate!.getId()

  const communitiesCount = isUserAudience
    ? userAudience!.getTotalSubs()
    : audienceTemplate!.getCommunitiesCount()

  const subredditsData = isUserAudience
    ? userAudience!.getCommunities().map((community, index) => ({
        id: `${audienceId}-${index}`,
        name: `r/${community.display.display_name}`,
        icon: community.display.community_icon,
        members: community.display.subscribers ?? 0,
        monthlyGrowth: community.growth_month ?? 0,
      }))
    : audienceTemplate!.getCommunities().map((community, index) => ({
        id: `${audienceId}-${index}`,
        name: `r/${community.name}`,
        icon: community.icon_url,
        members: community.subscribers ?? 0,
        monthlyGrowth: community.growth_month ?? 0,
      }))

  const totalMembers = isUserAudience
    ? userAudience!.getTotalMembers()
    : audienceTemplate!.getTotalSubscribers()

  const monthlyGrowth = isUserAudience
    ? (userAudience!.getGrowthMonth() ?? 0)
    : 0

  const audienceStats: AudienceStats = {
    type: t('detail.curatedAudience') as AudienceStats['type'],
    totalMembers,
    monthlyGrowth,
  }

  const maxMembers = Math.max(...subredditsData.map((s) => s.members), 1)
  const avgGrowth = subredditsData.length > 0
    ? subredditsData.reduce((sum, s) => sum + s.monthlyGrowth, 0) / subredditsData.length
    : 0

  const radarData: RadarData = {
    age: Math.min(Math.round((communitiesCount / 20) * 100), 100),
    reach: Math.min(Math.round((totalMembers / 50_000_000) * 100), 100),
    size: Math.min(Math.round((maxMembers / 10_000_000) * 100), 100),
    activity: Math.min(Math.round(avgGrowth * 50), 100),
    growth: Math.min(Math.round(monthlyGrowth * 50), 100),
  }

  const keywords = keywordsData?.keywords ?? []

  const similarCommunities: SimilarCommunity[] = (suggestionsData?.suggestions ?? []).map((s) => ({
    id: s.subredditName,
    name: `r/${s.subredditName}`,
    members: s.subscribers,
    weeklyGrowth: s.growthWeek ?? 0,
    sizeCategory: s.sizeTag ?? '',
    activityLevel: s.activityTag ?? '',
    description: s.description,
  }))

  const handleEdit = () => {
    const communities = userAudience!.getCommunities().map((c) =>
      new Community({
        name: c.display.display_name,
        title: c.display.display_name,
        description: c.display.public_description,
        subscribers: c.display.subscribers,
        icon_url: c.display.community_icon,
        growth_week: c.growth_week,
        growth_month: c.growth_month,
        category: '',
      })
    )
    openEditModal(audienceId, audienceName, communities, userAudience?.getDescription() ?? '')
  }

  const handleAddToAudience = (subredditName: string) => {
    addCommunityMutation.mutate(
      { audienceId, subreddit_name: subredditName },
      {
        onSuccess: () => {
          toast({
            title: t('toast.communityAdded'),
            description: t('toast.communityAddedDescription', { name: subredditName }),
            variant: 'success',
          })
        },
        onError: () => {
          toast({
            title: t('toast.communityAddFailed'),
            description: t('toast.genericError'),
            variant: 'destructive',
          })
        },
      }
    )
  }

  const handleMarkNotRelevant = (subredditName: string) => {
    markNotRelevantMutation.mutate(
      { subredditName, audienceId },
      {
        onError: () => {
          toast({
            title: t('toast.markNotRelevantFailed'),
            description: t('toast.genericError'),
            variant: 'destructive',
          })
        },
      }
    )
  }

  const handleDelete = () => {
    deleteAudienceMutation.mutate(
      { audienceId },
      {
        onSuccess: () => {
          setShowDeleteModal(false)
          toast({
            title: t('toast.deleted'),
            description: t('toast.deletedDescription'),
            variant: 'success',
          })
          navigate('/audiences')
        },
        onError: () => {
          toast({
            title: t('toast.deleteFailed'),
            description: t('toast.genericError'),
            variant: 'destructive',
          })
        },
      }
    )
  }

  return (
    <div className="space-y-6">
      <div ref={headerRef}>
        <AudienceDetailHeader
          audienceName={audienceName}
          isUserAudience={isUserAudience}
          onBack={() => navigate('/audiences')}
          onEdit={handleEdit}
          onDelete={() => setShowDeleteModal(true)}
        />

        <AudienceDetailTabs
          contentRef={contentRef}
          subredditsData={subredditsData}
          communitiesCount={communitiesCount}
          audienceName={audienceName}
          audienceStats={audienceStats}
          radarData={radarData}
          keywords={keywords}
          isLoadingKeywords={isLoadingKeywords}
          isUserAudience={isUserAudience}
          similarCommunities={similarCommunities}
          isLoadingSuggestions={isLoadingSuggestions}
          onAddCommunity={handleEdit}
          onAddToAudience={handleAddToAudience}
          onMarkNotRelevant={handleMarkNotRelevant}
          topics={topicsData?.pages.flatMap((p) => p.topics) ?? []}
          totalTopics={topicsData?.pages[0]?.totalTopics ?? 0}
          isLoadingTopics={isLoadingTopics}
          onLoadMoreTopics={fetchNextTopics}
          hasMoreTopics={hasMoreTopics ?? false}
          isLoadingMoreTopics={isLoadingMoreTopics}
          audienceId={audienceId}
        />
      </div>

      <DeleteAudienceModal
        isOpen={showDeleteModal}
        audienceName={audienceName}
        isPending={deleteAudienceMutation.isPending}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />

    </div>
  )
}

export default AudienceDetail
