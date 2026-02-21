import { Info } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { Keyword } from '@/modules/audience/domain/entities/Keyword.entity'

export interface KeywordTagsProps {
  keywords: Keyword[]
  isLoading: boolean
}

export function KeywordTags({ keywords, isLoading }: Readonly<KeywordTagsProps>) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Badge
        variant="neutral"
        size="md"
        className="cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-700"
      >
        <Info className="w-3 h-3" />
        Search Tips
      </Badge>
      {isLoading ? (
        <div className="flex items-center gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-7 w-24 rounded-full bg-gray-200 dark:bg-zinc-700 animate-pulse"
            />
          ))}
        </div>
      ) : (
        keywords.map((kw) => (
          <Badge
            key={kw.getId()}
            variant="neutral"
            size="md"
            className="cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-700"
          >
            <span className="w-2 h-2 rounded-full bg-lime" />
            {kw.getKeyword()}
          </Badge>
        ))
      )}
    </div>
  )
}
