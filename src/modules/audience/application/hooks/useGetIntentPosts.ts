import { useQuery } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IGetIntentPostsUseCase, GetIntentPostsResult } from '@/modules/audience/domain/use-cases'
import type { ThemeAnalysisWindow } from '@/modules/audience/domain/use-cases'

const getIntentPostsUseCase = container.get<IGetIntentPostsUseCase>(
  TYPES.GetIntentPostsUseCase
)

export const INTENT_POSTS_QUERY_KEY = (audienceId: string, category: string, window: ThemeAnalysisWindow) =>
  ['intent-posts', audienceId, category, window] as const

export function useGetIntentPosts(
  audienceId: string,
  category: string,
  window: ThemeAnalysisWindow,
  enabled: boolean,
  limit?: number,
  offset?: number,
) {
  return useQuery<GetIntentPostsResult, Error>({
    queryKey: [...INTENT_POSTS_QUERY_KEY(audienceId, category, window), limit, offset],
    queryFn: () => getIntentPostsUseCase.execute({ audienceId, category, window, limit, offset }),
    enabled: !!audienceId && !!category && enabled,
  })
}
