import type { IntentPost } from '../entities/IntentPost.entity'
import type { ThemeAnalysisWindow } from './get-audience-themes.use-case'

export interface GetIntentPostsParams {
  audienceId: string
  category: string
  window: ThemeAnalysisWindow
  limit?: number
  offset?: number
}

export interface GetIntentPostsResult {
  posts: IntentPost[]
  total: number
  limit: number
  offset: number
  hasMore: boolean
}

export interface IGetIntentPostsUseCase {
  execute(params: GetIntentPostsParams): Promise<GetIntentPostsResult>
}
