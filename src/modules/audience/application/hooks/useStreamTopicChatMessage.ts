import { useState, useRef, useCallback } from 'react'
import { container, TYPES } from '@/modules/shared'
import type {
  IStreamTopicChatMessageUseCase,
  StreamTopicChatMessageParams,
  StreamTopicChatMessageDonePayload,
} from '@/modules/audience/domain/use-cases'

const streamUseCase = container.get<IStreamTopicChatMessageUseCase>(TYPES.StreamTopicChatMessageUseCase)

export function useStreamTopicChatMessage() {
  const [streamingText, setStreamingText] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const send = useCallback(
    async (
      params: Omit<StreamTopicChatMessageParams, 'question'> & { question: string },
      onDone: (payload: StreamTopicChatMessageDonePayload) => void,
    ) => {
      abortRef.current?.abort()
      const controller = new AbortController()
      abortRef.current = controller

      setStreamingText('')
      setIsStreaming(true)
      setError(null)

      let accumulated = ''

      try {
        await streamUseCase.execute(
          params,
          {
            onToken: (content) => {
              accumulated += content
              setStreamingText(accumulated)
            },
            onDone: (payload) => {
              setStreamingText('')
              setIsStreaming(false)
              onDone(payload)
            },
            onError: (err) => {
              setError(err)
              setIsStreaming(false)
            },
          },
          controller.signal,
        )
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return
        setError(err instanceof Error ? err.message : 'Unknown error')
        setIsStreaming(false)
      }
    },
    [],
  )

  const abort = useCallback(() => {
    abortRef.current?.abort()
    setIsStreaming(false)
  }, [])

  return { send, abort, streamingText, isStreaming, error }
}
