import { useMutation } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IExportTopicChatUseCase, ExportTopicChatParams } from '@/modules/audience/domain/use-cases'

const exportTopicChatUseCase = container.get<IExportTopicChatUseCase>(TYPES.ExportTopicChatUseCase)

export function useExportTopicChat() {
  return useMutation({
    mutationFn: async (params: ExportTopicChatParams) => {
      const { blob, filename } = await exportTopicChatUseCase.execute(params)

      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    },
  })
}
