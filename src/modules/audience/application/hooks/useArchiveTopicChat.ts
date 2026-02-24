import { useMutation, useQueryClient } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IArchiveTopicChatUseCase, ArchiveTopicChatParams } from '@/modules/audience/domain/use-cases'
import { TOPIC_CHAT_CONVERSATIONS_QUERY_KEY } from './useListTopicChatConversations'

const archiveTopicChatUseCase = container.get<IArchiveTopicChatUseCase>(TYPES.ArchiveTopicChatUseCase)

export function useArchiveTopicChat() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: ArchiveTopicChatParams) => archiveTopicChatUseCase.execute(params),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [TOPIC_CHAT_CONVERSATIONS_QUERY_KEY, variables.audienceId, variables.topicId],
      })
    },
  })
}
