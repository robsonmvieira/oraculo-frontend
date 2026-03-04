import { useMutation } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IExportIntentChatUseCase, ExportIntentChatParams } from '@/modules/audience/domain/use-cases'

const exportIntentChatUseCase = container.get<IExportIntentChatUseCase>(TYPES.ExportIntentChatUseCase)

export function useExportIntentChat() {
  return useMutation({
    mutationFn: async (params: ExportIntentChatParams) => {
      const { blob, filename } = await exportIntentChatUseCase.execute(params)

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
