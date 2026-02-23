import { useTranslation } from 'react-i18next'
import type { SentimentByCommunity } from '@/modules/audience/domain/entities/TopicSentiment.entity'

export interface SentimentByCommunitySectionProps {
  communities: SentimentByCommunity[]
}

export function SentimentByCommunitySection({ communities }: Readonly<SentimentByCommunitySectionProps>) {
  const { t } = useTranslation('audiences')

  if (communities.length === 0) return null

  return (
    <div className="pt-4 border-t border-gray-100 dark:border-zinc-800">
      <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-3">
        {t('topicDetail.sentimentByCommunity')}
        <span className="ml-2 text-xs text-gray-500 dark:text-zinc-400">{communities.length}</span>
      </h4>
      <div className="space-y-2">
        {communities.map((community, i) => (
          <div key={i} className="p-3 rounded-lg bg-gray-50 dark:bg-zinc-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {community.community}
              </span>
              <span className="text-[10px] text-gray-500 dark:text-zinc-400 capitalize">
                {community.dominantEmotion}
              </span>
            </div>
            <div className="flex h-2 rounded-full overflow-hidden bg-gray-200 dark:bg-zinc-700">
              <div
                className="bg-green-500"
                style={{ width: `${community.positive * 100}%` }}
                title={`${t('topicSentiment.score.positive')}: ${Math.round(community.positive * 100)}%`}
              />
              <div
                className="bg-red-500"
                style={{ width: `${community.negative * 100}%` }}
                title={`${t('topicSentiment.score.negative')}: ${Math.round(community.negative * 100)}%`}
              />
              <div
                className="bg-gray-400 dark:bg-zinc-500"
                style={{ width: `${community.neutral * 100}%` }}
                title={`${t('topicSentiment.score.neutral')}: ${Math.round(community.neutral * 100)}%`}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[10px] text-green-600 dark:text-green-400">{Math.round(community.positive * 100)}%</span>
              <span className="text-[10px] text-red-600 dark:text-red-400">{Math.round(community.negative * 100)}%</span>
              <span className="text-[10px] text-gray-500 dark:text-zinc-400">{Math.round(community.neutral * 100)}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
