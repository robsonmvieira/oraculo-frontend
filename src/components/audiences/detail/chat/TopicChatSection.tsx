import { useState, useRef, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Send, Loader2, AlertCircle, Plus, ArrowLeft, Archive, Info, MessageSquareText, User, Bot } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks'
import { Button } from '@/components/ui'
import { Badge } from '@/components/ui/badge'
import {
  useStartTopicChat,
  useSendTopicChatMessage,
  useListTopicChatConversations,
  useGetTopicChatMessages,
  useArchiveTopicChat,
  TOPIC_CHAT_CONVERSATIONS_QUERY_KEY,
} from '@/modules/audience/application/hooks'
import { useQueryClient } from '@tanstack/react-query'
import type { TopicConversationMessage } from '@/modules/audience/domain/entities/TopicConversationMessage.entity'

interface TopicChatSectionProps {
  audienceId: string
  topicId: string
}

type ChatView = 'list' | 'conversation'

interface LocalMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  isStreaming?: boolean
}

export function TopicChatSection({ audienceId, topicId }: Readonly<TopicChatSectionProps>) {
  const { t } = useTranslation('audiences')
  const prefersReducedMotion = useReducedMotion()
  const queryClient = useQueryClient()

  const [view, setView] = useState<ChatView>('list')
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null)
  const [question, setQuestion] = useState('')
  const [localMessages, setLocalMessages] = useState<LocalMessage[]>([])
  const [streamingText, setStreamingText] = useState('')

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const streamingRef = useRef<HTMLSpanElement>(null)
  const gsapTweenRef = useRef<gsap.core.Tween | null>(null)

  const startChat = useStartTopicChat()
  const sendMessage = useSendTopicChatMessage()
  const archiveChat = useArchiveTopicChat()

  const { data: conversationsData, isLoading: isLoadingConversations } = useListTopicChatConversations(
    audienceId,
    topicId,
    view === 'list',
  )

  const { data: messagesData } = useGetTopicChatMessages(
    audienceId,
    topicId,
    activeConversationId ?? '',
    view === 'conversation' && !!activeConversationId,
  )

  const conversations = conversationsData?.conversations ?? []

  const serverMessages: LocalMessage[] = (messagesData?.messages ?? []).map((m: TopicConversationMessage) => ({
    id: m.getMessageId(),
    role: m.getRole(),
    content: m.getContent(),
  }))

  const displayMessages = localMessages.length > 0 ? localMessages : serverMessages

  const trimmedQuestion = question.trim()
  const isValid = trimmedQuestion.length >= 3
  const isSending = sendMessage.isPending

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [displayMessages.length, streamingText, scrollToBottom])

  const animateStreamingText = useCallback((fullText: string) => {
    if (prefersReducedMotion) {
      setStreamingText(fullText)
      return
    }

    const proxy = { chars: 0 }
    gsapTweenRef.current?.kill()

    gsapTweenRef.current = gsap.to(proxy, {
      chars: fullText.length,
      duration: Math.min(fullText.length * 0.02, 3),
      ease: 'none',
      onUpdate: () => {
        setStreamingText(fullText.slice(0, Math.round(proxy.chars)))
      },
      onComplete: () => {
        setStreamingText(fullText)
      },
    })
  }, [prefersReducedMotion])

  const handleStartConversation = () => {
    startChat.mutate(
      { audienceId, topicId },
      {
        onSuccess: (data) => {
          setActiveConversationId(data.conversationId)
          setLocalMessages([])
          setView('conversation')
        },
      },
    )
  }

  const handleOpenConversation = (conversationId: string) => {
    setActiveConversationId(conversationId)
    setLocalMessages([])
    setStreamingText('')
    setView('conversation')
  }

  const handleBackToList = () => {
    gsapTweenRef.current?.kill()
    setView('list')
    setActiveConversationId(null)
    setLocalMessages([])
    setStreamingText('')
    setQuestion('')
    queryClient.invalidateQueries({
      queryKey: [TOPIC_CHAT_CONVERSATIONS_QUERY_KEY, audienceId, topicId],
    })
  }

  const handleArchive = () => {
    if (!activeConversationId) return
    archiveChat.mutate(
      { audienceId, topicId, conversationId: activeConversationId },
      { onSuccess: handleBackToList },
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid || isSending || !activeConversationId) return

    const userMessage: LocalMessage = {
      id: `local-user-${Date.now()}`,
      role: 'user',
      content: trimmedQuestion,
    }

    const currentMessages = localMessages.length > 0 ? localMessages : serverMessages
    setLocalMessages([...currentMessages, userMessage])
    setQuestion('')
    setStreamingText('')

    sendMessage.mutate(
      {
        audienceId,
        topicId,
        conversationId: activeConversationId,
        question: trimmedQuestion,
      },
      {
        onSuccess: (data) => {
          const assistantMessage: LocalMessage = {
            id: data.messageId,
            role: 'assistant',
            content: data.answer,
            isStreaming: true,
          }
          setLocalMessages((prev) => [...prev, assistantMessage])
          animateStreamingText(data.answer)
        },
      },
    )
  }

  // --- Conversation list view ---
  if (view === 'list') {
    return (
      <div className="pt-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
            {t('topicDetail.chatTitle')}
          </h4>
          <Button
            variant="primary"
            size="sm"
            className="gap-1.5"
            onClick={handleStartConversation}
            disabled={startChat.isPending}
          >
            {startChat.isPending ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Plus className="w-3.5 h-3.5" />
            )}
            {startChat.isPending
              ? t('topicDetail.chatStarting')
              : t('topicDetail.chatNewConversation')}
          </Button>
        </div>

        {isLoadingConversations && (
          <div className="flex items-center justify-center py-8">
            <div className="w-6 h-6 border-3 border-lime border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!isLoadingConversations && conversations.length === 0 && (
          <p className="text-sm text-gray-500 dark:text-zinc-400 text-center py-6">
            {t('topicDetail.chatNoConversations')}
          </p>
        )}

        {!isLoadingConversations && conversations.length > 0 && (
          <ul className="space-y-2">
            {conversations.map((conv) => (
              <li key={conv.getConversationId()}>
                <button
                  type="button"
                  onClick={() => handleOpenConversation(conv.getConversationId())}
                  className="w-full text-left p-3 rounded-lg border border-gray-100 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors"
                >
                  <div className="flex items-start gap-2">
                    <MessageSquareText className="w-4 h-4 text-gray-400 dark:text-zinc-500 mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {conv.getTitle() || t('topicDetail.chatNewConversation')}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          variant={conv.getContextQuality() === 'rich' ? 'success' : 'warning'}
                          size="sm"
                        >
                          {conv.getContextQuality() === 'rich'
                            ? t('topicDetail.chatContextRich')
                            : t('topicDetail.chatContextLimited')}
                        </Badge>
                        <span className="text-xs text-gray-400 dark:text-zinc-500">
                          {new Date(conv.getUpdatedAt()).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}

        {startChat.isError && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 mt-3">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            <p className="text-sm text-red-600 dark:text-red-400">
              {t('topicDetail.chatError')}
            </p>
          </div>
        )}
      </div>
    )
  }

  // --- Conversation chat view ---
  return (
    <div className="pt-4 flex flex-col" style={{ maxHeight: '60vh' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={handleBackToList}
          className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {t('topicDetail.chatBack')}
        </button>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1 text-xs text-red-500 hover:text-red-600"
          onClick={handleArchive}
          disabled={archiveChat.isPending}
        >
          <Archive className="w-3 h-3" />
          {t('topicDetail.chatArchive')}
        </Button>
      </div>

      {/* Context quality badge */}
      {messagesData && (
        <div className="mb-3">
          <Badge
            variant={messagesData.contextQuality === 'rich' ? 'success' : 'warning'}
            size="sm"
          >
            {messagesData.contextQuality === 'rich'
              ? t('topicDetail.chatContextRich')
              : t('topicDetail.chatContextLimited')}
          </Badge>
        </div>
      )}

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-3 min-h-[200px] max-h-[400px] pr-1">
        {displayMessages.length === 0 && (
          <p className="text-sm text-gray-400 dark:text-zinc-500 text-center py-8">
            {t('topicDetail.chatNoMessages')}
          </p>
        )}

        {displayMessages.map((msg, index) => {
          const isLastAssistant =
            msg.role === 'assistant' && index === displayMessages.length - 1 && msg.isStreaming
          const displayContent = isLastAssistant && streamingText ? streamingText : msg.content

          return (
            <div
              key={msg.id}
              className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-6 h-6 rounded-full bg-lime/20 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-3.5 h-3.5 text-lime" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-lime text-black rounded-br-sm'
                    : 'bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 rounded-bl-sm'
                }`}
              >
                <span ref={isLastAssistant ? streamingRef : undefined} className="whitespace-pre-line">
                  {displayContent}
                </span>
                {isLastAssistant && streamingText.length < msg.content.length && (
                  <span className="inline-block w-0.5 h-4 bg-gray-500 dark:bg-zinc-400 animate-pulse ml-0.5 align-text-bottom" />
                )}
              </div>
              {msg.role === 'user' && (
                <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-zinc-700 flex items-center justify-center shrink-0 mt-1">
                  <User className="w-3.5 h-3.5 text-gray-500 dark:text-zinc-400" />
                </div>
              )}
            </div>
          )
        })}

        {/* Loading indicator while waiting for response */}
        {isSending && (
          <div className="flex gap-2 justify-start">
            <div className="w-6 h-6 rounded-full bg-lime/20 flex items-center justify-center shrink-0 mt-1">
              <Bot className="w-3.5 h-3.5 text-lime" />
            </div>
            <div className="bg-gray-100 dark:bg-zinc-800 rounded-xl rounded-bl-sm px-3 py-2">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-zinc-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-zinc-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-zinc-500 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion */}
      {sendMessage.data?.suggestion && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/30 mb-3">
          <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-medium text-amber-700 dark:text-amber-400 mb-0.5">
              {t('topicDetail.chatSuggestion')}
            </p>
            <p className="text-xs text-amber-600 dark:text-amber-300">
              {sendMessage.data.suggestion}
            </p>
          </div>
        </div>
      )}

      {/* Error */}
      {sendMessage.isError && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 mb-3">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
          <p className="text-sm text-red-600 dark:text-red-400">
            {t('topicDetail.chatError')}
          </p>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={t('topicDetail.chatPlaceholder')}
          maxLength={500}
          disabled={isSending}
          className="flex-1 h-9 px-3 text-sm rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-lime focus:border-transparent disabled:opacity-50"
        />
        <Button
          type="submit"
          variant="primary"
          size="sm"
          disabled={!isValid || isSending}
          className="gap-1.5"
        >
          {isSending ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Send className="w-3.5 h-3.5" />
          )}
          {isSending ? t('topicDetail.chatSending') : t('topicDetail.chatSend')}
        </Button>
      </form>

      {trimmedQuestion.length > 0 && trimmedQuestion.length < 3 && (
        <p className="text-xs text-amber-500 mt-2">
          {t('topicDetail.chatMinLength')}
        </p>
      )}
    </div>
  )
}
