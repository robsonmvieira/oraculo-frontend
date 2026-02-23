import { useTranslation } from 'react-i18next'
import { ChevronLeft, Info, Pencil, Share2, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export interface AudienceDetailHeaderProps {
  audienceName: string
  isUserAudience: boolean
  onBack: () => void
  onEdit: () => void
  onDelete: () => void
}

export function AudienceDetailHeader({
  audienceName,
  isUserAudience,
  onBack,
  onEdit,
  onDelete,
}: Readonly<AudienceDetailHeaderProps>) {
  const { t } = useTranslation('audiences')

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="cursor-pointer w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {audienceName}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Info className="w-4 h-4" />
          {t('detail.info')}
        </Button>
        {isUserAudience && (
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Pencil className="w-4 h-4" />
            {t('detail.edit')}
          </Button>
        )}
        <Button variant="outline" size="sm">
          <Share2 className="w-4 h-4" />
          {t('detail.share')}
        </Button>
        <Button variant="primary" size="sm">
          <Plus className="w-4 h-4" />
          {t('detail.add')}
        </Button>
        {isUserAudience && (
          <Button
            variant="outline"
            size="sm"
            className="text-red-500 border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
            onClick={onDelete}
          >
            <Trash2 className="w-4 h-4" />
            {t('detail.delete')}
          </Button>
        )}
      </div>
    </div>
  )
}
