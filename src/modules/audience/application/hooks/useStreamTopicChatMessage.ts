import { useState, useRef, useCallback, useEffect } from 'react'
import { container, TYPES } from '@/modules/shared'
import type {
  IStreamTopicChatMessageUseCase,
  StreamTopicChatMessageParams,
  StreamTopicChatMessageDonePayload,
} from '@/modules/audience/domain/use-cases'

const RATE_LIMIT_COOLDOWN_SECONDS = 60

const streamUseCase = container.get<IStreamTopicChatMessageUseCase>(TYPES.StreamTopicChatMessageUseCase)

export function useStreamTopicChatMessage() {
  const [streamingText, setStreamingText] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [rateLimitCountdown, setRateLimitCountdown] = useState(0)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (rateLimitCountdown <= 0) return

    const interval = setInterval(() => {
      setRateLimitCountdown((prev) => {
        if (prev <= 1) {
          setError(null)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [rateLimitCountdown])

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
              if (err === 'rate_limit_exceeded') {
                setRateLimitCountdown(RATE_LIMIT_COOLDOWN_SECONDS)
              }
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

  const isMessageLimitError = error === 'message_limit_reached'
  const isRateLimitError = error === 'rate_limit_exceeded'

  return { send, abort, streamingText, isStreaming, error, isMessageLimitError, isRateLimitError, rateLimitCountdown }
}
