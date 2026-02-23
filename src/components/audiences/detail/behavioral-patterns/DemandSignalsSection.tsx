import { Megaphone } from 'lucide-react'
import type { DemandSignal } from '@/modules/audience/domain/entities/TopicBehavioralPattern.entity'

export interface DemandSignalsSectionProps {
  signals: DemandSignal[]
}

const frequencyColors: Record<string, string> = {
  high: 'text-red-600 dark:text-red-400',
  moderate: 'text-yellow-600 dark:text-yellow-400',
  low: 'text-gray-500 dark:text-zinc-400',
}

const signalTypeColors: Record<string, string> = {
  tool_request: 'bg-lime/20 text-lime-700 dark:text-lime',
  feature_request: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  integration_request: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  content_request: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
}

export function DemandSignalsSection({ signals }: Readonly<DemandSignalsSectionProps>) {
  if (signals.length === 0) return null

  return (
    <div className="pt-4 border-t border-gray-100 dark:border-zinc-800">
      <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-3">
        Demand Signals
        <span className="ml-2 text-xs text-gray-500 dark:text-zinc-400">{signals.length}</span>
      </h4>
      <div className="space-y-3">
        {signals.map((signal, i) => (
          <div key={i} className="p-3 rounded-lg bg-gray-50 dark:bg-zinc-800">
            <div className="flex items-start gap-2 mb-2">
              <Megaphone className="w-3.5 h-3.5 text-lime shrink-0 mt-0.5" />
              <p className="text-sm text-gray-900 dark:text-white leading-relaxed flex-1">
                {signal.signal}
              </p>
              <span className={`text-[10px] shrink-0 ${frequencyColors[signal.frequency] ?? frequencyColors.low}`}>
                {signal.frequency}
              </span>
            </div>
            <div className="flex items-center gap-2 ml-5.5 mb-2">
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${signalTypeColors[signal.signalType] ?? 'bg-gray-100 text-gray-600 dark:bg-zinc-700 dark:text-zinc-300'}`}>
                {signal.signalType.replace(/_/g, ' ')}
              </span>
            </div>
            <p className="text-[11px] text-gray-400 dark:text-zinc-500 leading-relaxed italic ml-5.5">
              &ldquo;{signal.evidence}&rdquo;
            </p>
            {signal.communities.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1.5 ml-5.5">
                {signal.communities.map((c) => (
                  <span key={c} className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-zinc-700 text-gray-600 dark:text-zinc-300">
                    {c}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
