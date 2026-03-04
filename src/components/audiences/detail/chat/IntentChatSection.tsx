import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Send, Loader2, AlertCircle, Plus, ArrowLeft, Archive, Download, Info, MessageSquareText, User, Bot } from 'lucide-react'
import { Button } from '@/components/ui'
import { Badge } from '@/components/ui/badge'
import {
  useStartIntentChat,
  useListIntentChatConversations,
  useGetIntentChatMessages,
  useArchiveIntentChat,
  useSendIntentChatMessage,
  useExportIntentChat,
  INTENT_CHAT_CONVERSATIONS_QUERY_KEY,
} from '@/modules/audience/application/hooks'
import { useQueryClient } from '@tanstack/react-query'
import type { IntentConversationMessage } from '@/modules/audience/domain/entities/IntentConversationMessage.entity'

interface IntentChatSectionProps {
  audienceId: string
  category: string
}

type ChatView = 'list' | 'conversation'

interface LocalMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export function IntentChatSection({ audienceId, category }: Readonly<IntentChatSectionProps>) {
  const { t } = useTranslation('audiences')
  const queryClient = useQueryClient()

  const [view, setView] = useState<ChatView>('list')
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null)
  const [question, setQuestion] = useState('')
  const [localMessages, setLocalMessages] = useState<LocalMessage[]>([])
  const [suggestion, setSuggestion] = useState<string | null>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const startChat = useStartIntentChat()
  const archiveChat = useArchiveIntentChat()
  const exportChat = useExportIntentChat()
  const sendMessage = useSendIntentChatMessage()

  const { data: conversationsData, isLoading: isLoadingConversations } = useListIntentChatConversations(
    audienceId,
    category,
    view === 'list',
  )

  const { data: messagesData } = useGetIntentChatMessages(
    audienceId,
    category,
    activeConversationId ?? '',
    view === 'conversation' && !!activeConversationId,
  )

  const conversations = conversationsData?.conversations ?? []

  const serverMessages: LocalMessage[] = (messagesData?.messages ?? []).map((m: IntentConversationMessage) => ({
    id: m.getMessageId(),
    role: m.getRole(),
    content: m.getContent(),
  }))

  const displayMessages = localMessages.length > 0 ? localMessages : serverMessages

  const trimmedQuestion = question.trim()
  const isValid = trimmedQuestion.length >= 3
  const isBusy = sendMessage.isPending

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [displayMessages.length])

  const handleStartConversation = () => {
    startChat.mutate(
      { audienceId, category, window: 'week' },
      {
        onSuccess: (data) => {
          setActiveConversationId(data.conversationId)
          setLocalMessages([])
          setSuggestion(null)
          setView('conversation')
        },
      },
    )
  }

  const handleOpenConversation = (conversationId: string) => {
    setActiveConversationId(conversationId)
    setLocalMessages([])
    setSuggestion(null)
    setView('conversation')
  }

  const handleBackToList = () => {
    setView('list')
    setActiveConversationId(null)
    setLocalMessages([])
    setSuggestion(null)
    setQuestion('')
    queryClient.invalidateQueries({
      queryKey: [INTENT_CHAT_CONVERSATIONS_QUERY_KEY, audienceId, category],
    })
  }

  const handleArchive = () => {
    if (!activeConversationId) return
    archiveChat.mutate(
      { audienceId, category, conversationId: activeConversationId },
      { onSuccess: handleBackToList },
    )
  }

  const handleExport = () => {
    if (!activeConversationId) return
    exportChat.mutate({ audienceId, category, conversationId: activeConversationId })
  }

  const handleSendMessage = (text: string) => {
    if (!activeConversationId || isBusy) return

    const userMessage: LocalMessage = {
      id: `local-user-${crypto.randomUUID()}`,
      role: 'user',
      content: text,
    }

    const currentMessages = localMessages.length > 0 ? localMessages : serverMessages
    const isFirstMessage = currentMessages.filter((m) => m.role === 'user').length === 0

    setLocalMessages([...currentMessages, userMessage])
    setQuestion('')
    setSuggestion(null)

    sendMessage.mutate(
      {
        audienceId,
        category,
        conversationId: activeConversationId,
        question: text,
        window: 'week',
      },
      {
        onSuccess: (data) => {
          const assistantMessage: LocalMessage = {
            id: data.messageId,
            role: 'assistant',
            content: data.answer,
          }

          setLocalMessages((prev) => [...prev, assistantMessage])
          setSuggestion(data.suggestion)

          if (isFirstMessage) {
            queryClient.invalidateQueries({
              queryKey: [INTENT_CHAT_CONVERSATIONS_QUERY_KEY, audienceId, category],
            })
          }
        },
        onError: () => {
          setLocalMessages((prev) => prev.filter((m) => m.id !== userMessage.id))
        },
      },
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid || isBusy) return
    handleSendMessage(trimmedQuestion)
  }

  // --- Conversation list view ---
  if (view === 'list') {
    return (
      <div className="pt-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
            {t('themes.intentChat.title')}
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
              ? t('themes.intentChat.starting')
              : t('themes.intentChat.newConversation')}
          </Button>
        </div>

        {isLoadingConversations && (
          <div className="flex items-center justify-center py-8">
            <div className="w-6 h-6 border-3 border-lime border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!isLoadingConversations && conversations.length === 0 && (
          <p className="text-sm text-gray-500 dark:text-zinc-400 text-center py-6">
            {t('themes.intentChat.noConversations')}
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
                        {conv.getTitle() || t('themes.intentChat.newConversation')}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          variant={conv.getContextQuality() === 'rich' ? 'success' : 'warning'}
                          size="sm"
                        >
                          {conv.getContextQuality() === 'rich'
                            ? t('themes.intentChat.contextRich')
                            : t('themes.intentChat.contextLimited')}
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
              {t('themes.intentChat.error')}
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
          {t('themes.intentChat.back')}
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
            {t('themes.intentChat.export')}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-xs text-red-500 hover:text-red-600"
            onClick={handleArchive}
            disabled={archiveChat.isPending}
          >
            <Archive className="w-3 h-3" />
            {t('themes.intentChat.archive')}
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
              ? t('themes.intentChat.contextRich')
              : t('themes.intentChat.contextLimited')}
          </Badge>
        </div>
      )}

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-3 min-h-[200px] max-h-[400px] pr-1">
        {displayMessages.length === 0 && (
          <p className="text-sm text-gray-400 dark:text-zinc-500 text-center py-8">
            {t('themes.intentChat.noMessages')}
          </p>
        )}

        {displayMessages.map((msg) => (
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
              <span className="whitespace-pre-line">{msg.content}</span>
            </div>
            {msg.role === 'user' && (
              <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-zinc-700 flex items-center justify-center shrink-0 mt-1">
                <User className="w-3.5 h-3.5 text-gray-500 dark:text-zinc-400" />
              </div>
            )}
          </div>
        ))}

        {/* Loading indicator while waiting for response */}
        {isBusy && (
          <div className="flex gap-2 justify-start">
            <div className="w-6 h-6 rounded-full bg-lime/20 flex items-center justify-center shrink-0 mt-1">
              <Bot className="w-3.5 h-3.5 text-lime" />
            </div>
            <div className="bg-gray-100 dark:bg-zinc-800 rounded-xl rounded-bl-sm px-3 py-2">
              <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion */}
      {suggestion && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/30 mb-3">
          <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-medium text-amber-700 dark:text-amber-400 mb-0.5">
              {t('themes.intentChat.suggestion')}
            </p>
            <p className="text-xs text-amber-600 dark:text-amber-300">
              {suggestion}
            </p>
          </div>
        </div>
      )}

      {/* Error: send failed */}
      {sendMessage.isError && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 mb-3">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
          <p className="text-sm text-red-600 dark:text-red-400">
            {t('themes.intentChat.error')}
          </p>
        </div>
      )}

      {/* Error: export failed */}
      {exportChat.isError && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 mb-3">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
          <p className="text-sm text-red-600 dark:text-red-400">
            {t('themes.intentChat.exportError')}
          </p>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={t('themes.intentChat.placeholder')}
          maxLength={500}
          disabled={isBusy}
          className="flex-1 h-9 px-3 text-sm rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-lime focus:border-transparent disabled:opacity-50"
        />
        <Button
          type="submit"
          variant="primary"
          size="sm"
          disabled={!isValid || isBusy}
          className="gap-1.5"
        >
          {isBusy ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Send className="w-3.5 h-3.5" />
          )}
          {isBusy ? t('themes.intentChat.sending') : t('themes.intentChat.send')}
        </Button>
      </form>

      {trimmedQuestion.length > 0 && trimmedQuestion.length < 3 && (
        <p className="text-xs text-amber-500 mt-2">
          {t('themes.intentChat.minLength')}
        </p>
      )}
    </div>
  )
}
