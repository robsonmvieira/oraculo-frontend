import { useMutation, useQueryClient } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IArchiveIntentChatUseCase, ArchiveIntentChatParams } from '@/modules/audience/domain/use-cases'
import { INTENT_CHAT_CONVERSATIONS_QUERY_KEY } from './useListIntentChatConversations'

const archiveIntentChatUseCase = container.get<IArchiveIntentChatUseCase>(TYPES.ArchiveIntentChatUseCase)

export function useArchiveIntentChat() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: ArchiveIntentChatParams) => archiveIntentChatUseCase.execute(params),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [INTENT_CHAT_CONVERSATIONS_QUERY_KEY, variables.audienceId, variables.category],
      })
    },
  })
}
