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
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Audience"
      icon={<AlertTriangle className="w-5 h-5 text-red-500" />}
      size="sm"
    >
      <div className="p-6 space-y-4">
        <p className="text-sm text-gray-600 dark:text-zinc-400">
          Are you sure you want to delete <span className="font-semibold text-gray-900 dark:text-white">{audienceName}</span>?
        </p>
        <p className="text-sm text-red-500">
          This action is irreversible. All data associated with this audience will be permanently removed.
        </p>
        <div className="flex justify-end gap-3 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            disabled={isPending}
          >
            Cancel
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
            {isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
