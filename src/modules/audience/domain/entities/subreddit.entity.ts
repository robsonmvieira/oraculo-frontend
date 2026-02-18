
interface SubredditProps {
  display_name: string;
  title: string;
  public_description: string;
  subscribers: number;
  community_icon: string;
  primary_color: string;
  banner_background_color: string;
  growth_week: number | null;
  related_communities: RelatedCommunity[];
  related_communities_status: "ready" | "processing";
}

export class Subreddit {
  private readonly display_name: string
  private readonly title: string
  private readonly public_description: string
  private readonly subscribers: number
  private readonly community_icon: string
  private readonly primary_color: string
  private readonly banner_background_color: string
  private readonly growth_week: number | null
  private readonly related_communities: RelatedCommunity[]
  private readonly related_communities_status: "ready" | "processing"

  constructor(
    {
      display_name,
      title,
      public_description,
      subscribers,
      community_icon,
      primary_color,
      banner_background_color,
      growth_week,
      related_communities,
      related_communities_status,
    }: SubredditProps
  ) {
    this.display_name = display_name
    this.title = title
    this.public_description = public_description
    this.subscribers = subscribers
    this.community_icon = community_icon
    this.primary_color = primary_color
    this.banner_background_color = banner_background_color
    this.growth_week = growth_week
    this.related_communities = related_communities
    this.related_communities_status = related_communities_status
  }

  toJSON(): object {
    return {
      display_name: this.display_name,
      title: this.title,
      public_description: this.public_description,
      subscribers: this.subscribers,
      community_icon: this.community_icon,
      primary_color: this.primary_color,
      banner_background_color: this.banner_background_color,
      growth_week: this.growth_week,
      related_communities: this.related_communities,
      related_communities_status: this.related_communities_status,
    }
  }
}