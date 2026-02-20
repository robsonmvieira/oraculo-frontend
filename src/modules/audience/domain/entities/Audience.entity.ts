// User (futuro)
//   └── Audiences[]
//         ├── name, description
//         ├── total_subs (qtd comunidades)
//         ├── total_members (soma subscribers)
//         ├── growth_week (média)
//         └── Communities[]
//               ├── subreddit_name
//               ├── icon_url
//               └── subscribers
// Community (quando clica)
//   ├── Dados do Reddit (subscribers, icon, etc)
//   ├── related_terms[] (LLM)
//   ├── related_communities[] (scraping)
//   ├── related_communities_status
//   └── growth_week/month (SubredditStats)

interface CommunityCardDisplay {
  display_name: string;
  subscribers: number;
  community_icon: string;
  public_description: string;
  primary_color: string;
  over18: boolean;
}


export interface RelatedCommunity {
  name: string;
  title: string;
  description: string;
  subscribers: number | null;
  discovered_via: string;
}

interface CommunityProps {
  id: string
  display: CommunityCardDisplay
  related_terms: string[]
  related_communities: RelatedCommunity[]
  related_communities_status: "ready" | "processing"
  growth_week: number | null
  growth_month: number | null
}

interface AudienceProps {
  id: string
  name: string
  description: string
  total_subs: number
  total_members: number
  communities: CommunityProps[]
  growth_week: number | null
  growth_month?: number | null
}
export class Audience {
  private readonly id: string
  private readonly name: string
  private readonly description: string
  private readonly total_subs: number
  private readonly total_members: number
  private readonly communities: CommunityProps[]
  private readonly growth_week: number | null
  private readonly growth_month?: number | null
  constructor(
    {
      id,
      name,
      description,
      total_subs,
      total_members,
      communities,
      growth_week,
      growth_month,
    }: AudienceProps
  ) {
    this.id = id
    this.name = name
    this.description = description
    this.total_subs = total_subs
    this.total_members = total_members
    this.communities = communities
    this.growth_week = growth_week
    this.growth_month = growth_month
  }

   getId(): string {
    return this.id
  }

  getName(): string {
    return this.name
  }

  getDescription(): string {
    return this.description
  }

  toJSON(): object {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      total_subs: this.total_subs,
      total_members: this.total_members,
      communities: this.communities,
      growth_week: this.growth_week,
      growth_month: this.growth_month,
    }
  }
}