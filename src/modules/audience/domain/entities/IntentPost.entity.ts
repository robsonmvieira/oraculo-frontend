interface IntentPostProps {
  postRedditId: string
  postTitle: string
  postSubreddit: string
  primaryIntent: string
  secondaryIntent: string | null
  confidence: string
}

export class IntentPost {
  private readonly postRedditId: string
  private readonly postTitle: string
  private readonly postSubreddit: string
  private readonly primaryIntent: string
  private readonly secondaryIntent: string | null
  private readonly confidence: string

  constructor({ postRedditId, postTitle, postSubreddit, primaryIntent, secondaryIntent, confidence }: IntentPostProps) {
    this.postRedditId = postRedditId
    this.postTitle = postTitle
    this.postSubreddit = postSubreddit
    this.primaryIntent = primaryIntent
    this.secondaryIntent = secondaryIntent
    this.confidence = confidence
  }

  getPostRedditId(): string {
    return this.postRedditId
  }

  getPostTitle(): string {
    return this.postTitle
  }

  getPostSubreddit(): string {
    return this.postSubreddit
  }

  getPrimaryIntent(): string {
    return this.primaryIntent
  }

  getSecondaryIntent(): string | null {
    return this.secondaryIntent
  }

  getConfidence(): string {
    return this.confidence
  }
}
