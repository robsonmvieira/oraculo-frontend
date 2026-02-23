import { ArrowRightLeft } from 'lucide-react'
import type { ShiftPattern } from '@/modules/audience/domain/entities/TopicBehavioralPattern.entity'

export interface ShiftPatternsSectionProps {
  patterns: ShiftPattern[]
}

export function ShiftPatternsSection({ patterns }: Readonly<ShiftPatternsSectionProps>) {
  if (patterns.length === 0) return null

  return (
    <div className="pt-4 border-t border-gray-100 dark:border-zinc-800">
      <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-3">
        Migration Shifts
        <span className="ml-2 text-xs text-gray-500 dark:text-zinc-400">{patterns.length}</span>
      </h4>
      <div className="space-y-3">
        {patterns.map((pattern, i) => (
          <div key={i} className="p-3 rounded-lg bg-gray-50 dark:bg-zinc-800">
            <div className="flex items-center gap-2 mb-2">
              <ArrowRightLeft className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span className="text-sm font-medium text-red-500 dark:text-red-400 line-through">
                {pattern.from}
              </span>
              <span className="text-xs text-gray-400 dark:text-zinc-500">&rarr;</span>
              <span className="text-sm font-medium text-green-600 dark:text-green-400">
                {pattern.to}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 ml-auto">
                {pattern.stage}
              </span>
            </div>
            <p className="text-xs text-gray-600 dark:text-zinc-300 leading-relaxed ml-5.5 mb-1.5">
              {pattern.reason}
            </p>
            <p className="text-[11px] text-gray-400 dark:text-zinc-500 leading-relaxed italic ml-5.5">
              &ldquo;{pattern.evidence}&rdquo;
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
