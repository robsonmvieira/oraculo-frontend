import { useTranslation } from 'react-i18next'
import { AlertTriangle, Trash2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/shared'

export interface DeleteAudienceModalProps {
  isOpen: boolean
  audienceName: string
  isPending: boolean
  onClose: () => void
  onConfirm: () => void
}

export function DeleteAudienceModal({
  isOpen,
  audienceName,
  isPending,
  onClose,
  onConfirm,
}: Readonly<DeleteAudienceModalProps>) {
  const { t } = useTranslation(['audiences', 'common'])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('audiences:deleteModal.title')}
      icon={<AlertTriangle className="w-5 h-5 text-red-500" />}
      size="sm"
    >
      <div className="p-6 space-y-4">
        <p className="text-sm text-gray-600 dark:text-zinc-400">
          {t('audiences:deleteModal.confirmMessage', { name: audienceName })}
        </p>
        <p className="text-sm text-red-500">
          {t('audiences:deleteModal.warning')}
        </p>
        <div className="flex justify-end gap-3 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            disabled={isPending}
          >
            {t('common:actions.cancel')}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-red-500 border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
            disabled={isPending}
            onClick={onConfirm}
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
            {isPending ? t('audiences:deleteModal.deleting') : t('common:actions.delete')}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
