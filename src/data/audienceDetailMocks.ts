import type { TopicTableItem, ThemeGridItem, ThemeDetail } from '@/components/audiences/detail'

export type TopicDataItem = TopicTableItem & { description: string; subredditCounts: { name: string; postCount: number }[] }

export const themesGridData: ThemeGridItem[] = [
  { id: 'th1', name: 'Hot Discussions', description: 'Popular discussions this week', type: 'scoring' },
  { id: 'th2', name: 'Top Content', description: 'Best-performing content of past month', type: 'scoring' },
  { id: 'th3', name: 'Advice Requests', description: 'People asking for advice & resources', count: 1000, type: 'ai-tagged' },
  { id: 'th4', name: 'Pain & Anger', description: 'People expressing pain points & frustrations', count: 287, type: 'ai-tagged' },
  { id: 'th5', name: 'Solution Requests', description: 'People asking for tools & solutions', count: 243, type: 'ai-tagged' },
  { id: 'th6', name: 'Self-Promotion', description: 'People launching products & services', count: 26, type: 'ai-tagged' },
  { id: 'th7', name: 'Ideas', description: 'People suggesting ideas', count: 25, type: 'ai-tagged' },
  { id: 'th8', name: 'News', description: 'Conversations about current news & events', count: 12, type: 'ai-tagged' },
]

export const themesDetailData: Record<string, Omit<ThemeDetail, 'id' | 'name'>> = {
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

export const topicsData: TopicDataItem[] = [
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

export const similarCommunitiesData = [
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
]
