import { useRef, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ChevronLeft,
  Search,
  Info,
  Pencil,
  Share2,
  Plus,
  Sparkles,
  TrendingUp,
} from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  SubredditsList,
  SubredditsGrid,
  ThemesList,
  TopicsList,
  TopicsTable,
  AboutAudiencePanel,
  TopicDetailPanel,
  ThemesGrid,
  ThemeDetailPanel,
} from '@/components/audiences/detail'
import type {
  TopicTableItem,
  TopicDetail,
  ThemeGridItem,
  ThemeDetail,
} from '@/components/audiences/detail'
import { useGetAudienceTemplateById } from '@/modules/audience/application/hooks'

// Theme data for the themes tab
const themesGridData: ThemeGridItem[] = [
  { id: 'th1', name: 'Hot Discussions', description: 'Popular discussions this week', type: 'scoring' },
  { id: 'th2', name: 'Top Content', description: 'Best-performing content of past month', type: 'scoring' },
  { id: 'th3', name: 'Advice Requests', description: 'People asking for advice & resources', count: 1000, type: 'ai-tagged' },
  { id: 'th4', name: 'Pain & Anger', description: 'People expressing pain points & frustrations', count: 287, type: 'ai-tagged' },
  { id: 'th5', name: 'Solution Requests', description: 'People asking for tools & solutions', count: 243, type: 'ai-tagged' },
  { id: 'th6', name: 'Self-Promotion', description: 'People launching products & services', count: 26, type: 'ai-tagged' },
  { id: 'th7', name: 'Ideas', description: 'People suggesting ideas', count: 25, type: 'ai-tagged' },
  { id: 'th8', name: 'News', description: 'Conversations about current news & events', count: 12, type: 'ai-tagged' },
]

const themesDetailData: Record<string, Omit<ThemeDetail, 'id' | 'name'>> = {
  th1: {
    description: 'This week in the Pet Lovers communities on Reddit, members shared heartwarming stories and adorable photos of their pets. From fulfilling dreams of seeing puffins to celebrating the retirement of a beloved therapy dog, the discussions were filled with love and positivity. Members also shared cute moments of their pets, like snuggling buddies and newly adopted pups, creating a sense of joy and camaraderie among pet lovers.',
    subcategories: [
      { name: 'Frustration', count: 1 },
      { name: 'Questions', count: 1 },
    ],
    topics: [
      { name: 'Dog', count: 3 },
      { name: 'Rat', count: 1 },
      { name: 'Friendship', count: 1 },
      { name: 'Breed', count: 1 },
      { name: 'Rescue', count: 1 },
      { name: 'Lab mix', count: 1 },
      { name: 'Pup', count: 1 },
    ],
    subreddits: [
      { name: 'r/dogbreed', count: 8 },
      { name: 'r/cockatiel', count: 7 },
      { name: 'r/DOG', count: 7 },
      { name: 'r/turtle', count: 7 },
      { name: 'r/RATS', count: 6 },
      { name: 'r/germanshepherds', count: 6 },
      { name: 'r/leopardgeckos', count: 5 },
      { name: 'r/reptiles', count: 5 },
      { name: 'r/BeardedDragons', count: 4 },
      { name: 'r/puppy101', count: 4 },
      { name: 'r/cats', count: 4 },
      { name: 'r/goldenretrievers', count: 3 },
      { name: 'r/DogAdvice', count: 3 },
      { name: 'r/ballpython', count: 3 },
      { name: 'r/dogs', count: 3 },
      { name: 'r/herpetology', count: 3 },
      { name: 'r/dogpictures', count: 2 },
      { name: 'r/Pets', count: 2 },
      { name: 'r/Aquariums', count: 2 },
    ],
  },
  th2: {
    description: 'The best-performing content from the past month in pet communities, featuring viral posts, highly upvoted discussions, and content that resonated most with community members.',
    subcategories: [
      { name: 'Photos', count: 5 },
      { name: 'Stories', count: 3 },
    ],
    topics: [
      { name: 'Cute moments', count: 4 },
      { name: 'Advice', count: 2 },
    ],
    subreddits: [
      { name: 'r/cats', count: 10 },
      { name: 'r/dogs', count: 8 },
      { name: 'r/aww', count: 6 },
    ],
  },
  th3: {
    description: 'Posts where community members are seeking advice about pet care, training, health concerns, and general guidance from experienced pet owners.',
    subcategories: [
      { name: 'Health', count: 8 },
      { name: 'Training', count: 5 },
      { name: 'Nutrition', count: 3 },
    ],
    topics: [
      { name: 'Vet visits', count: 6 },
      { name: 'Behavior', count: 4 },
      { name: 'Diet', count: 3 },
    ],
    subreddits: [
      { name: 'r/DogAdvice', count: 12 },
      { name: 'r/CatAdvice', count: 10 },
      { name: 'r/AskVet', count: 8 },
    ],
  },
  th4: {
    description: 'Posts where community members express frustration, anger, or pain points related to pet ownership, including vet costs, behavioral issues, and difficult situations.',
    subcategories: [
      { name: 'Vet costs', count: 5 },
      { name: 'Behavioral issues', count: 4 },
      { name: 'Loss & grief', count: 3 },
    ],
    topics: [
      { name: 'Expensive care', count: 4 },
      { name: 'Problem behavior', count: 3 },
      { name: 'Frustration', count: 2 },
    ],
    subreddits: [
      { name: 'r/dogs', count: 8 },
      { name: 'r/cats', count: 6 },
      { name: 'r/Pets', count: 4 },
    ],
  },
  th5: {
    description: 'Posts where community members are looking for specific tools, products, or solutions to address pet-related challenges and improve their pets\' lives.',
    subcategories: [
      { name: 'Products', count: 6 },
      { name: 'Tools', count: 4 },
      { name: 'Services', count: 2 },
    ],
    topics: [
      { name: 'Pet tech', count: 3 },
      { name: 'Food brands', count: 3 },
      { name: 'Toys', count: 2 },
    ],
    subreddits: [
      { name: 'r/DogAdvice', count: 7 },
      { name: 'r/CatAdvice', count: 5 },
      { name: 'r/Aquariums', count: 4 },
    ],
  },
  th6: {
    description: 'Posts where community members share their own products, services, or content related to pets, including small businesses and content creators.',
    subcategories: [
      { name: 'Products', count: 3 },
      { name: 'Services', count: 2 },
    ],
    topics: [
      { name: 'Pet products', count: 2 },
      { name: 'Art & crafts', count: 1 },
    ],
    subreddits: [
      { name: 'r/Pets', count: 4 },
      { name: 'r/dogs', count: 3 },
    ],
  },
  th7: {
    description: 'Posts where community members share creative ideas, suggestions for improvement, or innovative approaches to pet care and community engagement.',
    subcategories: [
      { name: 'Suggestions', count: 3 },
      { name: 'Innovations', count: 2 },
    ],
    topics: [
      { name: 'DIY projects', count: 2 },
      { name: 'Community ideas', count: 1 },
    ],
    subreddits: [
      { name: 'r/Aquariums', count: 3 },
      { name: 'r/reptiles', count: 2 },
    ],
  },
  th8: {
    description: 'Conversations about current news, events, and trending topics in the pet world, including legislation, viral stories, and industry updates.',
    subcategories: [
      { name: 'Legislation', count: 2 },
      { name: 'Viral stories', count: 1 },
    ],
    topics: [
      { name: 'Pet laws', count: 2 },
      { name: 'Viral pets', count: 1 },
    ],
    subreddits: [
      { name: 'r/dogs', count: 3 },
      { name: 'r/cats', count: 2 },
    ],
  },
}

// Topic data with descriptions for the detail panel
const topicsData: (TopicTableItem & { description: string; subredditCounts: { name: string; postCount: number }[] })[] = [
  { id: 'tp1', name: 'Health issues', growth: 400, frequency: 3.0, frequencyUnit: 'mo', subreddits: ['r/CatAdvice', 'r/DogAdvice'], description: 'Health issues in the context of Pet Lovers refer to any physical or mental conditions that may affect the well-being of their beloved animals, requiring attention and care to ensure their health and happiness.', subredditCounts: [{ name: 'r/DogAdvice', postCount: 15 }, { name: 'r/CatAdvice', postCount: 6 }] },
  { id: 'tp2', name: 'Choice', growth: 300, frequency: 2.4, frequencyUnit: 'mo', subreddits: ['r/CatAdvice'], description: 'Discussions about making choices regarding pet ownership, including breed selection, adoption vs buying, and lifestyle considerations.', subredditCounts: [{ name: 'r/CatAdvice', postCount: 12 }] },
  { id: 'tp3', name: 'Dog health', growth: 150, frequency: 1.5, frequencyUnit: 'mo', subreddits: ['r/dogs', 'r/DogAdvice'], description: 'Specific health concerns, preventive care, and medical advice related to dogs of all breeds and ages.', subredditCounts: [{ name: 'r/dogs', postCount: 18 }, { name: 'r/DogAdvice', postCount: 9 }] },
  { id: 'tp4', name: 'Bird-species', growth: 133, frequency: 2.1, frequencyUnit: 'mo', subreddits: ['r/birding'], description: 'Identification and discussion of various bird species, their characteristics, habitats, and behaviors.', subredditCounts: [{ name: 'r/birding', postCount: 21 }] },
  { id: 'tp5', name: 'Mistake', growth: 122, frequency: 1.4, frequencyUnit: 'week', subreddits: ['r/CatAdvice', 'r/puppy101'], description: 'Common mistakes made by pet owners and lessons learned from pet care experiences.', subredditCounts: [{ name: 'r/CatAdvice', postCount: 8 }, { name: 'r/puppy101', postCount: 11 }] },
  { id: 'tp6', name: 'Frog', growth: 120, frequency: 1.3, frequencyUnit: 'day', subreddits: ['r/reptiles', 'r/herpetology'], description: 'Care guides, habitat setup, and discussions about keeping frogs as pets.', subredditCounts: [{ name: 'r/reptiles', postCount: 7 }, { name: 'r/herpetology', postCount: 5 }] },
  { id: 'tp7', name: 'Bird species', growth: 120, frequency: 3.3, frequencyUnit: 'mo', subreddits: ['r/birding', 'r/Ornithology'], description: 'In-depth discussions about specific bird species, their behaviors, and care requirements.', subredditCounts: [{ name: 'r/birding', postCount: 14 }, { name: 'r/Ornithology', postCount: 8 }] },
  { id: 'tp8', name: 'Annoying', growth: 107, frequency: 2.2, frequencyUnit: 'week', subreddits: ['r/cats', 'r/CatAdvice'], description: 'Discussions about dealing with annoying pet behaviors and how to address them effectively.', subredditCounts: [{ name: 'r/cats', postCount: 16 }, { name: 'r/CatAdvice', postCount: 9 }] },
  { id: 'tp9', name: 'Bird behavior', growth: 100, frequency: 1.5, frequencyUnit: 'mo', subreddits: ['r/cockatiel', 'r/birding', 'r/parrots', 'r/budgies'], description: 'Understanding and interpreting bird behaviors, communication patterns, and social interactions.', subredditCounts: [{ name: 'r/cockatiel', postCount: 6 }, { name: 'r/birding', postCount: 4 }, { name: 'r/parrots', postCount: 8 }, { name: 'r/budgies', postCount: 5 }] },
  { id: 'tp10', name: 'Mix', growth: 79, frequency: 3.5, frequencyUnit: 'day', subreddits: ['r/DOG', 'r/germanshepherds', 'r/labrador'], description: 'Discussions about mixed breed dogs, their characteristics, and care requirements.', subredditCounts: [{ name: 'r/DOG', postCount: 12 }, { name: 'r/germanshepherds', postCount: 7 }, { name: 'r/labrador', postCount: 9 }] },
  { id: 'tp11', name: 'Rehoming', growth: 77, frequency: 1.4, frequencyUnit: 'day', subreddits: ['r/RATS', 'r/dogs', 'r/cats', 'r/parrots', 'r/rabbits', 'r/hamsters', 'r/guineapigs', 'r/ferrets'], description: 'Resources and advice for responsibly rehoming pets when necessary.', subredditCounts: [{ name: 'r/RATS', postCount: 3 }, { name: 'r/dogs', postCount: 5 }, { name: 'r/cats', postCount: 4 }, { name: 'r/parrots', postCount: 2 }, { name: 'r/rabbits', postCount: 2 }, { name: 'r/hamsters', postCount: 1 }] },
  { id: 'tp12', name: 'Tank setup', growth: 75, frequency: 6.4, frequencyUnit: 'week', subreddits: ['r/leopardgeckos', 'r/Aquariums', 'r/bettafish'], description: 'Guides and discussions about setting up proper tanks and enclosures for aquatic pets and reptiles.', subredditCounts: [{ name: 'r/leopardgeckos', postCount: 11 }, { name: 'r/Aquariums', postCount: 18 }, { name: 'r/bettafish', postCount: 14 }] },
]

export function AudienceDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const [selectedTopic, setSelectedTopic] = useState<TopicDetail | null>(null)
  const [selectedTheme, setSelectedTheme] = useState<ThemeDetail | null>(null)

  const { data: audienceTemplate, isLoading, error } = useGetAudienceTemplateById(id ?? '')

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

  if (error || !audienceTemplate) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-gray-500 dark:text-zinc-400">Audience not found</p>
        <Button onClick={() => navigate('/audiences')} variant="outline">
          Back to Audiences
        </Button>
      </div>
    )
  }

  const communities = audienceTemplate.getCommunities()
  const subredditsData = communities.map((community, index) => ({
    id: `${audienceTemplate.getId()}-${index}`,
    name: `r/${community.name}`,
    members: community.subscribers,
    monthlyGrowth: community.growth_month ?? 0,
  }))

  const suggestedTags = ['Search Tips', 'health issues', 'choice', 'I hate', 'Looking for']

  return (
    <div className="space-y-6">
      <div ref={headerRef}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/audiences')}
              className="cursor-pointer w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {audienceTemplate.getName()}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Info className="w-4 h-4" />
              Info
            </Button>
            <Button variant="outline" size="sm">
              <Pencil className="w-4 h-4" />
              Edit
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4" />
              Share
            </Button>
            <Button variant="primary" size="sm">
              <Plus className="w-4 h-4" />
              Add
            </Button>
          </div>
        </div>

        <Tabs defaultValue="search" className="w-full">
          <TabsList>
            <TabsTrigger value="search">
              <Search className="w-4 h-4" />
              Search
            </TabsTrigger>
            <TabsTrigger value="subreddits" count={audienceTemplate.getCommunitiesCount()}>
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
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Keyword Search
                  </label>
                  <Input
                    icon
                    placeholder="Keyword search in audience"
                    className="max-w-2xl"
                  />
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {suggestedTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="neutral"
                      size="md"
                      className="cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-700"
                    >
                      {tag === 'Search Tips' ? (
                        <Info className="w-3 h-3" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-lime" />
                      )}
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div
                ref={contentRef}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <div className="flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Subreddits
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-zinc-400">
                        {audienceTemplate.getCommunitiesCount()}
                      </span>
                    </div>
                    <button className="cursor-pointer flex items-center gap-1 text-sm text-gray-500 dark:text-zinc-400 hover:text-lime transition-colors">
                      <Plus className="w-4 h-4" />
                      Add
                    </button>
                  </div>
                  <SubredditsList
                    subreddits={subredditsData}
                    totalCount={audienceTemplate.getCommunitiesCount()}
                    showHeader={false}
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Themes
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-zinc-400">
                      0
                    </span>
                  </div>
                  <ThemesList
                    themes={[]}
                    totalCount={0}
                    showHeader={false}
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Topics
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-zinc-400">
                      200
                    </span>
                  </div>
                  <TopicsList
                    topics={[]}
                    totalCount={0}
                    showHeader={false}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="subreddits" className="mt-6">
            <div className="space-y-8">
              <div className="flex gap-6">
                <SubredditsGrid
                  subreddits={subredditsData}
                  totalCount={audienceTemplate.getCommunitiesCount()}
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
                    audienceName={audienceTemplate.getName()}
                    comparisonName="r/parrots"
                  />
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Expand your audience with similar communities
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {[
                    {
                      id: 'sim1',
                      name: 'r/Austin',
                      members: 547_000,
                      weeklyGrowth: 0.35,
                      sizeCategory: 'Huge',
                      activityLevel: 'Super Active',
                      description: 'The place for all things Austin, TX.',
                    },
                    {
                      id: 'sim2',
                      name: 'r/AnimalLovers',
                      members: 890_000,
                      weeklyGrowth: 0.28,
                      sizeCategory: 'Huge',
                      activityLevel: 'Super Active',
                      description: 'Share your love for all animals, from pets to wildlife.',
                    },
                    {
                      id: 'sim3',
                      name: 'r/PetPhotography',
                      members: 245_000,
                      weeklyGrowth: 0.42,
                      sizeCategory: 'Large',
                      activityLevel: 'Active',
                      description: 'Showcase your best pet photography and get tips from others.',
                    },
                    {
                      id: 'sim4',
                      name: 'r/Pets',
                      members: 1_200_000,
                      weeklyGrowth: 0.18,
                      sizeCategory: 'Massive',
                      activityLevel: 'Super Active',
                      description: 'A community for pet lovers to share stories, photos, and advice about their furry friends.',
                    },
                    {
                      id: 'sim5',
                      name: 'r/AnimalRescue',
                      members: 320_000,
                      weeklyGrowth: 0.55,
                      sizeCategory: 'Large',
                      activityLevel: 'High Activity',
                      description: 'Dedicated to animal rescue stories, adoption resources, and volunteer opportunities.',
                    },
                    {
                      id: 'sim6',
                      name: 'r/VetTech',
                      members: 178_000,
                      weeklyGrowth: 0.31,
                      sizeCategory: 'Medium',
                      activityLevel: 'Active',
                      description: 'A community for veterinary technicians to share experiences and knowledge.',
                    },
                    {
                      id: 'sim7',
                      name: 'r/WildlifePhotography',
                      members: 560_000,
                      weeklyGrowth: 0.22,
                      sizeCategory: 'Huge',
                      activityLevel: 'Super Active',
                      description: 'Share and discuss wildlife photography from around the world.',
                    },
                    {
                      id: 'sim8',
                      name: 'r/PetBehavior',
                      members: 89_000,
                      weeklyGrowth: 0.67,
                      sizeCategory: 'Medium',
                      activityLevel: 'Active',
                      description: 'Understanding and improving pet behavior through positive reinforcement.',
                    },
                    {
                      id: 'sim9',
                      name: 'r/ExoticPets',
                      members: 412_000,
                      weeklyGrowth: 0.38,
                      sizeCategory: 'Large',
                      activityLevel: 'High Activity',
                      description: 'For owners and enthusiasts of exotic and unusual pets.',
                    },
                  ].map((subreddit) => (
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
            </div>
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
              <div className="w-1/3 shrink-0">
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
    </div>
  )
}

export default AudienceDetail
