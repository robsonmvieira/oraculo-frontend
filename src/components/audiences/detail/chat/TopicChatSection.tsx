import { useState, useRef, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Send, Loader2, AlertCircle, Plus, ArrowLeft, Archive, Download, Info, MessageSquareText, User, Bot } from 'lucide-react'
import { Button } from '@/components/ui'
import { Badge } from '@/components/ui/badge'
import {
  useStartTopicChat,
  useListTopicChatConversations,
  useGetTopicChatMessages,
  useArchiveTopicChat,
  useStreamTopicChatMessage,
  useExportTopicChat,
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
  const queryClient = useQueryClient()

  const [view, setView] = useState<ChatView>('list')
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null)
  const [question, setQuestion] = useState('')
  const [localMessages, setLocalMessages] = useState<LocalMessage[]>([])
  const [suggestion, setSuggestion] = useState<string | null>(null)
  const [followUpSuggestions, setFollowUpSuggestions] = useState<string[]>([])

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const startChat = useStartTopicChat()
  const archiveChat = useArchiveTopicChat()
  const exportChat = useExportTopicChat()
  const stream = useStreamTopicChatMessage()

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
  const isBusy = stream.isStreaming

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [displayMessages.length, stream.streamingText, scrollToBottom])

  const handleStartConversation = () => {
    startChat.mutate(
      { audienceId, topicId },
      {
        onSuccess: (data) => {
          setActiveConversationId(data.conversationId)
          setLocalMessages([])
          setSuggestion(null)
          setFollowUpSuggestions([])
          setView('conversation')
        },
      },
    )
  }

  const handleOpenConversation = (conversationId: string) => {
    setActiveConversationId(conversationId)
    setLocalMessages([])
    setSuggestion(null)
    setFollowUpSuggestions([])
    setView('conversation')
  }

  const handleBackToList = () => {
    stream.abort()
    setView('list')
    setActiveConversationId(null)
    setLocalMessages([])
    setSuggestion(null)
    setFollowUpSuggestions([])
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

  const handleExport = () => {
    if (!activeConversationId) return
    exportChat.mutate({ audienceId, topicId, conversationId: activeConversationId })
  }

  const isLimitReached = stream.isMessageLimitError
  const isRateLimited = stream.isRateLimitError

  const sendMessage = (text: string) => {
    if (!activeConversationId || isBusy || isLimitReached || isRateLimited) return

    const userMessage: LocalMessage = {
      id: `local-user-${crypto.randomUUID()}`,
      role: 'user',
      content: text,
    }

    const streamingPlaceholder: LocalMessage = {
      id: `local-assistant-${crypto.randomUUID()}`,
      role: 'assistant',
      content: '',
      isStreaming: true,
    }

    const currentMessages = localMessages.length > 0 ? localMessages : serverMessages
    const isFirstMessage = currentMessages.filter((m) => m.role === 'user').length === 0

    setLocalMessages([...currentMessages, userMessage, streamingPlaceholder])
    setQuestion('')
    setSuggestion(null)
    setFollowUpSuggestions([])

    stream.send(
      {
        audienceId,
        topicId,
        conversationId: activeConversationId,
        question: text,
      },
      (payload) => {
        setLocalMessages((prev) =>
          prev.map((msg) =>
            msg.isStreaming
              ? { ...msg, id: payload.messageId, content: payload.answer, isStreaming: false }
              : msg,
          ),
        )
        setSuggestion(payload.suggestion)
        setFollowUpSuggestions(payload.followUpSuggestions)

        if (isFirstMessage) {
          queryClient.invalidateQueries({
            queryKey: [TOPIC_CHAT_CONVERSATIONS_QUERY_KEY, audienceId, topicId],
          })
        }
      },
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid || isBusy || isLimitReached || isRateLimited) return
    sendMessage(trimmedQuestion)
  }

  const handleFollowUpClick = (text: string) => {
    sendMessage(text)
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
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-xs text-gray-500 hover:text-gray-700 dark:text-zinc-400 dark:hover:text-zinc-200"
            onClick={handleExport}
            disabled={exportChat.isPending}
          >
            {exportChat.isPending ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <Download className="w-3 h-3" />
            )}
            {t('topicDetail.chatExport')}
          </Button>
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

        {displayMessages.map((msg) => {
          const isStreamingMsg = msg.isStreaming && stream.isStreaming
          const displayContent = isStreamingMsg ? stream.streamingText : msg.content

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
                <span className="whitespace-pre-line">
                  {displayContent || (isStreamingMsg ? '' : msg.content)}
                </span>
                {isStreamingMsg && (
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

        <div ref={messagesEndRef} />
      </div>

      {/* Follow-up suggestions */}
      {followUpSuggestions.length > 0 && !isBusy && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {followUpSuggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => handleFollowUpClick(s)}
              disabled={isLimitReached || isRateLimited}
              className="text-xs px-2.5 py-1 rounded-full border border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-zinc-400 hover:border-lime hover:text-lime transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Suggestion */}
      {suggestion && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/30 mb-3">
          <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-medium text-amber-700 dark:text-amber-400 mb-0.5">
              {t('topicDetail.chatSuggestion')}
            </p>
            <p className="text-xs text-amber-600 dark:text-amber-300">
              {suggestion}
            </p>
          </div>
        </div>
      )}

      {/* Error: message limit reached */}
      {isLimitReached && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 mb-3">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-red-600 dark:text-red-400 mb-2">
              {t('topicDetail.chatLimitReached')}
            </p>
            <Button
              variant="primary"
              size="sm"
              className="gap-1.5"
              onClick={handleStartConversation}
              disabled={startChat.isPending}
            >
              <Plus className="w-3.5 h-3.5" />
              {t('topicDetail.chatNewConversation')}
            </Button>
          </div>
        </div>
      )}

      {/* Error: rate limit exceeded */}
      {isRateLimited && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/30 mb-3">
          <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
          <p className="text-sm text-amber-600 dark:text-amber-400">
            {t('topicDetail.chatRateLimitReached', { seconds: stream.rateLimitCountdown })}
          </p>
        </div>
      )}

      {/* Error: generic stream error */}
      {stream.error && !isLimitReached && !isRateLimited && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 mb-3">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
          <p className="text-sm text-red-600 dark:text-red-400">
            {t('topicDetail.chatStreamError')}
          </p>
        </div>
      )}

      {/* Error: export failed */}
      {exportChat.isError && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 mb-3">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
          <p className="text-sm text-red-600 dark:text-red-400">
            {t('topicDetail.chatExportError')}
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
          disabled={isBusy || isLimitReached || isRateLimited}
          className="flex-1 h-9 px-3 text-sm rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-lime focus:border-transparent disabled:opacity-50"
        />
        <Button
          type="submit"
          variant="primary"
          size="sm"
          disabled={!isValid || isBusy || isLimitReached || isRateLimited}
          className="gap-1.5"
        >
          {isBusy ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Send className="w-3.5 h-3.5" />
          )}
          {isBusy ? t('topicDetail.chatSending') : t('topicDetail.chatSend')}
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
