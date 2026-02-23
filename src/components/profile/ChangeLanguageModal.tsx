import { AlertTriangle, Globe, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/shared'

export interface ChangeLanguageModalProps {
  isOpen: boolean
  isPending: boolean
  targetLanguageLabel: string
  onClose: () => void
  onConfirm: () => void
}

export function ChangeLanguageModal({
  isOpen,
  isPending,
  targetLanguageLabel,
  onClose,
  onConfirm,
}: Readonly<ChangeLanguageModalProps>) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Change Analysis Language"
      icon={<AlertTriangle className="w-5 h-5 text-yellow-500" />}
      size="sm"
    >
      <div className="p-6 space-y-4">
        <p className="text-sm text-gray-600 dark:text-zinc-400">
          You are about to change your analysis language to{' '}
          <span className="font-semibold text-gray-900 dark:text-white">{targetLanguageLabel}</span>.
        </p>
        <p className="text-sm text-yellow-600 dark:text-yellow-500">
          Previous analyses will remain in their original language. Only new analyses will be generated in the selected language.
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
            variant="primary"
            size="sm"
            disabled={isPending}
            onClick={onConfirm}
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Globe className="w-4 h-4" />
            )}
            {isPending ? 'Updating...' : 'Confirm Change'}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
