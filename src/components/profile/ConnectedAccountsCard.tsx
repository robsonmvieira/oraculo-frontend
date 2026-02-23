import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Github } from 'lucide-react'
import { Card } from '@/components/ui'
import type { ConnectedAccount } from '@/data/profile'

interface ConnectedAccountsCardProps {
  accounts: ConnectedAccount[]
}

function FacebookIcon() {
  return (
    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
      <span className="text-white font-bold text-lg">f</span>
    </div>
  )
}

function GithubIcon() {
  return (
    <div className="w-10 h-10 rounded-full bg-gray-800 dark:bg-zinc-700 flex items-center justify-center flex-shrink-0">
      <Github className="w-5 h-5 text-white" />
    </div>
  )
}

export function ConnectedAccountsCard({ accounts }: Readonly<ConnectedAccountsCardProps>) {
  const { t } = useTranslation('profile')
  const [localAccounts, setLocalAccounts] = useState(accounts)

  const toggleConnection = (id: string) => {
    setLocalAccounts((prev) =>
      prev.map((account) =>
        account.id === id ? { ...account, connected: !account.connected } : account
      )
    )
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">{t('connectedAccounts.title')}</h3>

      <div className="space-y-4">
        {localAccounts.map((account) => (
          <div
            key={account.id}
            className="flex items-center justify-between py-2"
          >
            <div className="flex items-center gap-3">
              {account.provider === 'github' ? <GithubIcon /> : <FacebookIcon />}
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {account.label}
                </p>
                <p className="text-xs text-gray-500 dark:text-zinc-400">
                  {account.connected ? t('connectedAccounts.connectedAs', { username: account.username }) : t('connectedAccounts.notConnected')}
                </p>
              </div>
            </div>

            <button
              onClick={() => toggleConnection(account.id)}
              className={`text-sm font-semibold cursor-pointer transition-colors ${
                account.connected
                  ? 'text-red-500 hover:text-red-600'
                  : 'text-lime hover:text-lime-hover'
              }`}
            >
              {account.connected ? t('connectedAccounts.disconnect') : t('connectedAccounts.connect')}
            </button>
          </div>
        ))}
      </div>
    </Card>
  )
}
