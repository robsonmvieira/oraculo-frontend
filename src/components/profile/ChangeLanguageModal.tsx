import { AlertTriangle, Globe, Loader2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation(['profile', 'common'])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('profile:language.changeTitle')}
      icon={<AlertTriangle className="w-5 h-5 text-yellow-500" />}
      size="sm"
    >
      <div className="p-6 space-y-4">
        <p className="text-sm text-gray-600 dark:text-zinc-400">
          {t('profile:language.changeMessage', { language: targetLanguageLabel })}
        </p>
        <p className="text-sm text-yellow-600 dark:text-yellow-500">
          {t('profile:language.changeWarning')}
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
            {isPending ? t('profile:language.updating') : t('profile:language.confirmChange')}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
