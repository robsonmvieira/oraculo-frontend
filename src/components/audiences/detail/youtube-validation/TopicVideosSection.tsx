import { useTranslation } from 'react-i18next'
import { Play, ThumbsUp, MessageCircle, Clock, FileText, Calendar } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useGetYouTubeValidationVideos } from '@/modules/audience/application/hooks'

export interface TopicVideosSectionProps {
  audienceId: string
  topicName: string
}

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  return `${m}:${String(s).padStart(2, '0')}`
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return String(n)
}

export function TopicVideosSection({ audienceId, topicName }: Readonly<TopicVideosSectionProps>) {
  const { t } = useTranslation('audiences')
  const { data, isLoading } = useGetYouTubeValidationVideos(audienceId, topicName, true)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-6">
        <div className="w-6 h-6 border-3 border-lime border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const videos = data?.videos ?? []

  if (videos.length === 0) {
    return (
      <p className="text-xs text-gray-500 dark:text-zinc-400 py-2">
        {t('youtubeValidation.videos.noVideos')}
      </p>
    )
  }

  return (
    <div className="space-y-2">
      <h5 className="text-xs font-medium text-gray-700 dark:text-zinc-300">
        {t('youtubeValidation.videos.title')} ({videos.length})
      </h5>
      <div className="space-y-2">
        {videos.map((video) => (
          <a
            key={video.getId()}
            href={`https://www.youtube.com/watch?v=${video.getVideoId()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-gray-50 dark:bg-zinc-800 rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-zinc-750 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded bg-[#FF0000]/10 flex items-center justify-center shrink-0 mt-0.5">
                <Play className="w-4 h-4 text-[#FF0000]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {video.getTitle()}
                </p>
                <p className="text-xs text-gray-500 dark:text-zinc-400 mt-0.5">
                  {video.getChannelName()}
                </p>

                <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500 dark:text-zinc-400">
                  <span className="flex items-center gap-1">
                    <Play className="w-3 h-3" />
                    {formatNumber(video.getViews())} {t('youtubeValidation.videos.views')}
                  </span>
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="w-3 h-3" />
                    {formatNumber(video.getLikes())} {t('youtubeValidation.videos.likes')}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" />
                    {formatNumber(video.getCommentsCount())} {t('youtubeValidation.videos.comments')}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatDuration(video.getDurationSeconds())}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(video.getPublishedAt()).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  {video.getHasTranscript() ? (
                    <Badge variant="success" size="sm">
                      <FileText className="w-3 h-3 mr-1" />
                      {t('youtubeValidation.videos.transcript')}
                      {video.getTranscriptLang() && ` (${video.getTranscriptLang()})`}
                    </Badge>
                  ) : (
                    <Badge variant="neutral" size="sm">
                      {t('youtubeValidation.videos.noTranscript')}
                    </Badge>
                  )}
                </div>

                {video.getTags().length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {video.getTags().slice(0, 5).map((tag) => (
                      <Badge key={tag} variant="neutral" size="sm">{tag}</Badge>
                    ))}
                    {video.getTags().length > 5 && (
                      <Badge variant="neutral" size="sm">+{video.getTags().length - 5}</Badge>
                    )}
                  </div>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
