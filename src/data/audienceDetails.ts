export interface SubredditDetail {
  id: string
  name: string
  icon?: string
  members: number
  monthlyGrowth: number
  description?: string
  activityLevel?: 'Super Active' | 'High Activity' | 'Active' | 'Moderate'
  sizeCategory?: 'Massive' | 'Huge' | 'Large' | 'Medium' | 'Small'
}

export interface Theme {
  id: string
  name: string
  description: string
  icon?: string
}

export interface Topic {
  id: string
  name: string
  postsCount: number
  relatedKeyword: string
  growth: number
}

export interface AudienceDetailData {
  id: string
  name: string
  subreddits: SubredditDetail[]
  themes: Theme[]
  topics: Topic[]
}

export const audienceDetailsMap: Record<string, AudienceDetailData> = {
  '1': {
    id: '1',
    name: 'Influencers',
    subreddits: [
      { id: 's1', name: 'r/BGC', members: 2_100_000, monthlyGrowth: 1.5 },
      { id: 's2', name: 'r/Instagram', members: 5_400_000, monthlyGrowth: 0.8 },
      { id: 's3', name: 'r/TikTok', members: 3_200_000, monthlyGrowth: 2.1 },
      { id: 's4', name: 'r/YouTube', members: 4_800_000, monthlyGrowth: 0.6 },
      { id: 's5', name: 'r/Twitter', members: 1_900_000, monthlyGrowth: 0.3 },
      { id: 's6', name: 'r/Twitch', members: 2_700_000, monthlyGrowth: 1.2 },
      { id: 's7', name: 'r/LinkedIn', members: 890_000, monthlyGrowth: 0.9 },
    ],
    themes: [
      { id: 't1', name: 'Hot Discussions', description: 'Popular discussions this week' },
      { id: 't2', name: 'Top Content', description: 'Best-performing content of past month' },
      { id: 't3', name: 'Advice Requests', description: 'People asking for advice & resources' },
      { id: 't4', name: 'Pain & Anger', description: 'People expressing pain points & frustrations' },
      { id: 't5', name: 'Solution Requests', description: 'People asking for tools & solutions' },
      { id: 't6', name: 'Self-Promotion', description: 'People launching products & services' },
    ],
    topics: [
      { id: 'tp1', name: 'Brand deals', postsCount: 45, relatedKeyword: 'Brand deals', growth: 280 },
      { id: 'tp2', name: 'Engagement rate', postsCount: 38, relatedKeyword: 'Engagement rate', growth: 220 },
      { id: 'tp3', name: 'Algorithm changes', postsCount: 52, relatedKeyword: 'Algorithm changes', growth: 180 },
      { id: 'tp4', name: 'Monetization', postsCount: 67, relatedKeyword: 'Monetization', growth: 165 },
      { id: 'tp5', name: 'Content calendar', postsCount: 29, relatedKeyword: 'Content calendar', growth: 145 },
      { id: 'tp6', name: 'Sponsorships', postsCount: 41, relatedKeyword: 'Sponsorships', growth: 130 },
    ],
  },
  '7': {
    id: '7',
    name: 'Parents',
    subreddits: [
      { id: 's43', name: 'r/Parenting', members: 2_100_000, monthlyGrowth: 0.8 },
      { id: 's44', name: 'r/Mommit', members: 890_000, monthlyGrowth: 0.6 },
      { id: 's45', name: 'r/Daddit', members: 720_000, monthlyGrowth: 0.7 },
      { id: 's46', name: 'r/BabyBumps', members: 1_400_000, monthlyGrowth: 0.9 },
      { id: 's47', name: 'r/Toddlers', members: 340_000, monthlyGrowth: 1.1 },
      { id: 's48', name: 'r/NewParents', members: 180_000, monthlyGrowth: 1.3 },
    ],
    themes: [
      { id: 't1', name: 'Hot Discussions', description: 'Popular discussions this week' },
      { id: 't2', name: 'Top Content', description: 'Best-performing content of past month' },
      { id: 't3', name: 'Advice Requests', description: 'People asking for advice & resources' },
      { id: 't4', name: 'Pain & Anger', description: 'People expressing pain points & frustrations' },
      { id: 't5', name: 'Solution Requests', description: 'People asking for tools & solutions' },
      { id: 't6', name: 'Self-Promotion', description: 'People launching products & services' },
    ],
    topics: [
      { id: 'tp1', name: 'Sleep training', postsCount: 89, relatedKeyword: 'Sleep training', growth: 320 },
      { id: 'tp2', name: 'Screen time', postsCount: 67, relatedKeyword: 'Screen time', growth: 280 },
      { id: 'tp3', name: 'Daycare costs', postsCount: 45, relatedKeyword: 'Daycare costs', growth: 240 },
      { id: 'tp4', name: 'Work-life balance', postsCount: 78, relatedKeyword: 'Work-life balance', growth: 195 },
      { id: 'tp5', name: 'Picky eaters', postsCount: 56, relatedKeyword: 'Picky eaters', growth: 160 },
      { id: 'tp6', name: 'School choice', postsCount: 34, relatedKeyword: 'School choice', growth: 145 },
    ],
  },
}

// Generate default data for any audience not explicitly defined
export function getAudienceDetails(audienceId: string, audienceName: string): AudienceDetailData {
  if (audienceDetailsMap[audienceId]) {
    return audienceDetailsMap[audienceId]
  }

  // Generate default mock data
  return {
    id: audienceId,
    name: audienceName,
    subreddits: [
      {
        id: 's1',
        name: 'r/cats',
        members: 8_600_000,
        monthlyGrowth: 1.2,
        description: 'Pictures, videos, questions, and articles featuring/about cats.',
        sizeCategory: 'Massive',
        activityLevel: 'Super Active',
      },
      {
        id: 's2',
        name: 'r/dogs',
        members: 2_800_000,
        monthlyGrowth: 0.3,
        description: '/r/dogs is a place for dog owners of all levels of knowledge, skill, and experience to discuss various topics related to responsible dog ownership. This subreddit is a great starting...',
        sizeCategory: 'Massive',
        activityLevel: 'Super Active',
      },
      {
        id: 's3',
        name: 'r/Dogtraining',
        members: 1_500_000,
        monthlyGrowth: 0.1,
        description: 'DogTraining: A forum on dog training and behavior. Here you will find content that will help you train your dogs. Dog training links, discussions and questions are encouraged and conten...',
        sizeCategory: 'Massive',
        activityLevel: 'High Activity',
      },
      {
        id: 's4',
        name: 'r/Aquariums',
        members: 1_400_000,
        monthlyGrowth: 0.4,
        description: "The subreddit for anything related to aquariums! Come here to enjoy pictures, videos, articles and discussion. We're also here to help you if you need advice.",
        sizeCategory: 'Massive',
        activityLevel: 'Super Active',
      },
      {
        id: 's5',
        name: 'r/parrots',
        members: 1_400_000,
        monthlyGrowth: 0,
        description: 'This is a community for the discussion of parrots. Feel free to talk about parrots in the wild, owning parrots, the pet trade, rescuing parrots, purchasing parrots, avian veterinarians, an...',
        sizeCategory: 'Massive',
        activityLevel: 'Super Active',
      },
      {
        id: 's6',
        name: 'r/dogpictures',
        members: 1_000_000,
        monthlyGrowth: 0.3,
        description: 'Pictures of dogs!',
        sizeCategory: 'Massive',
        activityLevel: 'Super Active',
      },
      {
        id: 's7',
        name: 'r/dogswithjobs',
        members: 912_000,
        monthlyGrowth: 0,
        description: 'This is a community for real working dogs. These are jobs or tasks a dog is specifically trained to perform such as Guide Dog, Service Dog, Herding Dog, Police Dog, Sled Dog, etc....',
        sizeCategory: 'Huge',
        activityLevel: 'Active',
      },
      {
        id: 's8',
        name: 'r/RATS',
        members: 830_000,
        monthlyGrowth: 0.9,
        description: "🐀 This is a community for our little pocket puppies! We will occasionally accept wild rat posts, but this is mainly a place to celebrate our pets! We love art, stories, videos, and photos ...",
        sizeCategory: 'Huge',
        activityLevel: 'Super Active',
      },
      {
        id: 's9',
        name: 'r/BeardedDragons',
        members: 719_000,
        monthlyGrowth: 0.2,
        description: 'A home to talk about all things Bearded Dragons!',
        sizeCategory: 'Huge',
        activityLevel: 'Super Active',
      },
      {
        id: 's10',
        name: 'r/birding',
        members: 654_000,
        monthlyGrowth: 1.0,
        description: 'Birding, bird watching, twitching, listing. Whatever you want to call it, if you are looking at or listening to birds, this is where you should be.',
        sizeCategory: 'Huge',
        activityLevel: 'Super Active',
      },
      {
        id: 's11',
        name: 'r/DOG',
        members: 455_000,
        monthlyGrowth: 1.2,
        description: 'A subreddit dedicated to the best animal ever, the dog!',
        sizeCategory: 'Huge',
        activityLevel: 'Super Active',
      },
      {
        id: 's12',
        name: 'r/CatAdvice',
        members: 450_000,
        monthlyGrowth: 2.8,
        description: 'There are no dumb questions, except the ones asking for medical advice which is prohibited. Read the rules and the FAQ first.',
        sizeCategory: 'Huge',
        activityLevel: 'Super Active',
      },
    ],
    themes: [
      { id: 't1', name: 'Hot Discussions', description: 'Popular discussions this week' },
      { id: 't2', name: 'Top Content', description: 'Best-performing content of past month' },
      { id: 't3', name: 'Advice Requests', description: 'People asking for advice & resources' },
      { id: 't4', name: 'Pain & Anger', description: 'People expressing pain points & frustrations' },
      { id: 't5', name: 'Solution Requests', description: 'People asking for tools & solutions' },
      { id: 't6', name: 'Self-Promotion', description: 'People launching products & services' },
    ],
    topics: [
      { id: 'tp1', name: 'Health issues', postsCount: 21, relatedKeyword: 'Health issues', growth: 400 },
      { id: 'tp2', name: 'Choice', postsCount: 27, relatedKeyword: 'Choice', growth: 300 },
      { id: 'tp3', name: 'Dog health', postsCount: 27, relatedKeyword: 'Dog health', growth: 150 },
      { id: 'tp4', name: 'Bird-species', postsCount: 21, relatedKeyword: 'Bird-species', growth: 133 },
      { id: 'tp5', name: 'Mistake', postsCount: 81, relatedKeyword: 'Mistake', growth: 122 },
      { id: 'tp6', name: 'Frog', postsCount: 34, relatedKeyword: 'Frog', growth: 120 },
    ],
  }
}
