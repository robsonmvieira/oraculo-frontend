import { Search, LayoutGrid, List } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { SortOption, ViewMode } from './audiences.types'

export interface AudiencesToolbarProps {
  sortBy: SortOption
  onSortChange: (sort: SortOption) => void
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function AudiencesToolbar({
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  searchQuery,
  onSearchChange,
}: Readonly<AudiencesToolbarProps>) {
  const { t } = useTranslation('audiences')

  return (
    <div className="flex justify-end">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-zinc-400">
          <span>{t('toolbar.sort')}</span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="bg-transparent border-none text-gray-900 dark:text-white font-medium cursor-pointer focus:ring-0 focus:outline-none"
          >
            <option value="name">{t('toolbar.sortName')}</option>
            <option value="subreddits">{t('toolbar.sortSubreddits')}</option>
          </select>
        </div>

        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-zinc-400">
          <span>{t('toolbar.display')}</span>
          <div className="flex items-center bg-gray-100 dark:bg-zinc-800 rounded-lg p-1">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-zinc-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-zinc-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-zinc-400">
          <span>{t('toolbar.search')}</span>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t('toolbar.searchPlaceholder')}
              className="w-48 pl-3 pr-8 py-1.5 bg-transparent border border-gray-200 dark:border-zinc-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-lime"
            />
            <Search className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  )
}
