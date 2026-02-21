import { useRef, useEffect, useState } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  TopicsTable,
  TopicDetailPanel,
  ThemesGrid,
  ThemeDetailPanel,
  AudienceDetailHeader,
  SearchTabContent,
  SubredditsTabContent,
  DeleteAudienceModal,
} from '@/components/audiences/detail'
import type { TopicDetail, ThemeDetail } from '@/components/audiences/detail'
import { useGetAudienceTemplateById, useGetAudienceById, useUpdateAudience, useDeleteAudience, useGetAudienceKeywords, useGetAudienceSuggestions } from '@/modules/audience/application/hooks'
import { useCreateAudienceStore } from '@/modules/audience/application/store'
import { toast } from '@/hooks'
import { SelectAudienceModal } from '@/components/shared'
import { Community } from '@/modules/community/domain/entities/Community.entity'
import { themesGridData, themesDetailData, topicsData } from '@/data/audienceDetailMocks'
import type { SimilarCommunity } from '@/components/audiences/detail/SimilarCommunitiesGrid'

export function AudienceDetail() {
  const { id } = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const [selectedTopic, setSelectedTopic] = useState<TopicDetail | null>(null)
  const [selectedTheme, setSelectedTheme] = useState<ThemeDetail | null>(null)

  const [activeTab, setActiveTab] = useState('search')
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const { openEditModal, closeModal } = useCreateAudienceStore()
  const updateAudienceMutation = useUpdateAudience()
  const deleteAudienceMutation = useDeleteAudience()

  const isUserAudience = searchParams.get('type') === 'user'

  const { data: audienceTemplate, isLoading: isLoadingTemplate, error: errorTemplate } = useGetAudienceTemplateById(isUserAudience ? '' : (id ?? ''))
  const { data: userAudience, isLoading: isLoadingUser, error: errorUser } = useGetAudienceById(isUserAudience ? (id ?? '') : '')
  const { data: keywordsData, isLoading: isLoadingKeywords } = useGetAudienceKeywords(id ?? '')
  const { data: suggestionsData, isLoading: isLoadingSuggestions } = useGetAudienceSuggestions(id)

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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="search">
              Search
            </TabsTrigger>
            <TabsTrigger value="subreddits" count={communitiesCount}>
              Subreddits
            </TabsTrigger>
            <TabsTrigger value="topics" count={200}>
              Topics
            </TabsTrigger>
            <TabsTrigger value="themes">
              <Sparkles className="w-4 h-4" />
              Themes
            </TabsTrigger>
            <TabsTrigger value="ask">
              <Sparkles className="w-4 h-4" />
              Ask
            </TabsTrigger>
            <TabsTrigger value="products">
              <Sparkles className="w-4 h-4" />
              Products
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="mt-6">
            <SearchTabContent
              contentRef={contentRef}
              subredditsData={subredditsData}
              communitiesCount={communitiesCount}
              keywords={keywords}
              isLoadingKeywords={isLoadingKeywords}
              isUserAudience={isUserAudience}
              onAddCommunity={handleEdit}
              onSubredditClick={() => setActiveTab('subreddits')}
            />
          </TabsContent>

          <TabsContent value="subreddits" className="mt-6">
            <SubredditsTabContent
              subredditsData={subredditsData}
              communitiesCount={communitiesCount}
              audienceName={audienceName}
              similarCommunities={similarCommunities}
              isLoadingSuggestions={isLoadingSuggestions}
            />
          </TabsContent>

          <TabsContent value="topics" className="mt-6">
            <div className="flex gap-6">
              <TopicsTable
                topics={topicsData}
                totalCount={200}
                selectedTopicId={selectedTopic?.id}
                onTopicSelect={(topic) => {
                  const fullTopic = topicsData.find((t) => t.id === topic.id)
                  if (fullTopic) {
                    setSelectedTopic({
                      id: fullTopic.id,
                      name: fullTopic.name,
                      frequency: fullTopic.frequency,
                      frequencyUnit: fullTopic.frequencyUnit,
                      growth: fullTopic.growth,
                      description: fullTopic.description,
                      subreddits: fullTopic.subredditCounts,
                    })
                  }
                }}
              />
              <div className="w-1/2 shrink-0">
                <TopicDetailPanel topic={selectedTopic} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="themes" className="mt-6">
            <div className="flex gap-6">
              <div className="flex-1">
                <ThemesGrid
                  themes={themesGridData}
                  selectedThemeId={selectedTheme?.id}
                  onThemeSelect={(theme) => {
                    const detailData = themesDetailData[theme.id]
                    if (detailData) {
                      setSelectedTheme({
                        id: theme.id,
                        name: theme.name,
                        ...detailData,
                      })
                    }
                  }}
                />
              </div>
              <div className="w-1/2 shrink-0">
                <ThemeDetailPanel theme={selectedTheme} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ask" className="mt-6">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 text-center">
              <Sparkles className="w-8 h-8 text-lime mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Ask AI
              </h3>
              <p className="text-sm text-gray-500 dark:text-zinc-400">
                Coming soon - Ask questions about this audience
              </p>
            </div>
          </TabsContent>

          <TabsContent value="products" className="mt-6">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 text-center">
              <Sparkles className="w-8 h-8 text-lime mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Products
              </h3>
              <p className="text-sm text-gray-500 dark:text-zinc-400">
                Coming soon - Discover products relevant to this audience
              </p>
            </div>
          </TabsContent>
        </Tabs>
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
