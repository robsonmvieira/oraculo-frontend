import { useRef, useEffect, useState } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks'
import { Button } from '@/components/ui/button'
import {
  AudienceDetailHeader,
  AudienceDetailTabs,
  DeleteAudienceModal,
} from '@/components/audiences/detail'
import { useGetAudienceTemplateById, useGetAudienceById, useUpdateAudience, useDeleteAudience, useGetAudienceKeywords, useGetAudienceSuggestions, useAddCommunityToAudience, useMarkCommunityNotRelevant, useGetAudienceTopics } from '@/modules/audience/application/hooks'
import { useCreateAudienceStore } from '@/modules/audience/application/store'
import { toast } from '@/hooks'
import { SelectAudienceModal } from '@/components/shared'
import { Community } from '@/modules/community/domain/entities/Community.entity'
import type { SimilarCommunity } from '@/components/audiences/detail/SimilarCommunitiesGrid'

export function AudienceDetail() {
  const { id } = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const { openEditModal, closeModal } = useCreateAudienceStore()
  const updateAudienceMutation = useUpdateAudience()
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
        <p className="text-gray-500 dark:text-zinc-400">Audience not found</p>
        <Button onClick={() => navigate('/audiences')} variant="outline">
          Back to Audiences
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
        members: community.display.subscribers ?? 0,
        monthlyGrowth: community.growth_month ?? 0,
      }))
    : audienceTemplate!.getCommunities().map((community, index) => ({
        id: `${audienceId}-${index}`,
        name: `r/${community.name}`,
        members: community.subscribers ?? 0,
        monthlyGrowth: community.growth_month ?? 0,
      }))

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
    openEditModal(audienceId, audienceName, communities)
  }

  const handleAddToAudience = (subredditName: string) => {
    addCommunityMutation.mutate(
      { audienceId, subreddit_name: subredditName },
      {
        onSuccess: () => {
          toast({
            title: 'Community added',
            description: `${subredditName} has been added to your audience.`,
            variant: 'success',
          })
        },
        onError: () => {
          toast({
            title: 'Failed to add community',
            description: 'Something went wrong. Please try again.',
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
            title: 'Failed to mark as not relevant',
            description: 'Something went wrong. Please try again.',
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
            title: 'Audience deleted',
            description: 'Your audience has been permanently deleted.',
            variant: 'success',
          })
          navigate('/audiences')
        },
        onError: () => {
          toast({
            title: 'Failed to delete audience',
            description: 'Something went wrong. Please try again.',
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
        />
      </div>

      <DeleteAudienceModal
        isOpen={showDeleteModal}
        audienceName={audienceName}
        isPending={deleteAudienceMutation.isPending}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />

      <SelectAudienceModal
        onCreateAudience={() => {}}
        onUpdateAudience={(editAudienceId, name, selectedCommunityNames) => {
          updateAudienceMutation.mutate(
            {
              audienceId: editAudienceId,
              name,
              description: userAudience?.getDescription() ?? '',
              subreddit_names: selectedCommunityNames,
            },
            {
              onSuccess: () => {
                closeModal()
                toast({
                  title: 'Audience updated',
                  description: 'Your audience has been updated successfully.',
                  variant: 'success',
                })
              },
              onError: () => {
                toast({
                  title: 'Failed to update audience',
                  description: 'Something went wrong. Please try again.',
                  variant: 'destructive',
                })
              },
            }
          )
        }}
        isLoading={updateAudienceMutation.isPending}
      />
    </div>
  )
}

export default AudienceDetail
