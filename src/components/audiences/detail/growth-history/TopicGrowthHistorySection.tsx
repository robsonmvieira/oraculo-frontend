import { useTranslation } from 'react-i18next'
import {
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
} from 'recharts'
import { TrendingUp, TrendingDown, Minus, BarChart3, MessageSquare, Calendar } from 'lucide-react'
import type { TopicGrowthHistory } from '@/modules/audience/domain/entities/TopicGrowthHistory.entity'

interface TopicGrowthHistorySectionProps {
  data: TopicGrowthHistory
}

export function TopicGrowthHistorySection({ data }: Readonly<TopicGrowthHistorySectionProps>) {
  const { t } = useTranslation('audiences')

  const current = data.getCurrent()
  const history = data.getHistory()
  const trend = data.getTrend()

  const trendConfig = {
    up: { icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30', label: t('topicDetail.trendUp') },
    stable: { icon: Minus, color: 'text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-900/30', label: t('topicDetail.trendStable') },
    down: { icon: TrendingDown, color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/30', label: t('topicDetail.trendDown') },
  }

  const trendInfo = trend ? trendConfig[trend] : null
  const TrendIcon = trendInfo?.icon ?? TrendingUp

  // Build chart data: history (oldest first) + current
  const chartData = [
    ...history.slice().reverse().map((s) => ({
      date: new Date(s.snapshotDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      mentionFrequency: s.mentionFrequency,
      postCount: s.postCount,
    })),
    {
      date: new Date(current.snapshotDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      mentionFrequency: current.mentionFrequency,
      postCount: current.postCount,
    },
  ]

  return (
    <div className="space-y-4">
      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-lg bg-gray-50 dark:bg-zinc-800">
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 className="w-3.5 h-3.5 text-gray-400 dark:text-zinc-500" />
            <span className="text-xs text-gray-500 dark:text-zinc-400">{t('topicDetail.mentions')}</span>
          </div>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">{current.mentionFrequency}</p>
        </div>

        <div className="p-3 rounded-lg bg-gray-50 dark:bg-zinc-800">
          <div className="flex items-center gap-2 mb-1">
            <MessageSquare className="w-3.5 h-3.5 text-gray-400 dark:text-zinc-500" />
            <span className="text-xs text-gray-500 dark:text-zinc-400">{t('topicDetail.posts')}</span>
          </div>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">{current.postCount}</p>
        </div>

        <div className="p-3 rounded-lg bg-gray-50 dark:bg-zinc-800">
          <div className="flex items-center gap-2 mb-1">
            {trendInfo && <TrendIcon className={`w-3.5 h-3.5 ${trendInfo.color}`} />}
            <span className="text-xs text-gray-500 dark:text-zinc-400">{t('topicDetail.growthPercentage')}</span>
          </div>
          <div className="flex items-center gap-2">
            <p className={`text-lg font-semibold ${
              trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-gray-900 dark:text-white'
            }`}>
              {current.growthPercentage > 0 ? '+' : ''}{current.growthPercentage.toFixed(1)}%
            </p>
            {trendInfo && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${trendInfo.bg} ${trendInfo.color}`}>
                {trendInfo.label}
              </span>
            )}
          </div>
        </div>

        <div className="p-3 rounded-lg bg-gray-50 dark:bg-zinc-800">
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-3.5 h-3.5 text-gray-400 dark:text-zinc-500" />
            <span className="text-xs text-gray-500 dark:text-zinc-400">{t('topicDetail.totalSnapshots')}</span>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-lg font-semibold text-gray-900 dark:text-white">{data.getTotalSnapshots()}</p>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
              current.growthSource === 'calculated'
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
            }`}>
              {current.growthSource === 'calculated' ? t('topicDetail.calculated') : t('topicDetail.estimated')}
            </span>
          </div>
        </div>
      </div>

      {/* Chart */}
      {chartData.length >= 2 && (
        <div className="p-4 rounded-lg bg-gray-50 dark:bg-zinc-800">
          <h5 className="text-xs font-medium text-gray-500 dark:text-zinc-400 mb-3">
            {t('topicDetail.mentions')}
          </h5>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorMentions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c3f53c" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#c3f53c" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.2} />
                <XAxis
                  dataKey="date"
                  tick={{ fill: '#9ca3af', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: '#9ca3af', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  width={35}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181b',
                    border: '1px solid #3f3f46',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#fff',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="mentionFrequency"
                  stroke="#c3f53c"
                  strokeWidth={2}
                  fill="url(#colorMentions)"
                  name={t('topicDetail.mentions')}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  )
}
