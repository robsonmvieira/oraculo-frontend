import { CheckCircle, MapPin, Mail, Share2 } from 'lucide-react'
import { Modal } from '@/components/shared/Modal'
import { Avatar, Button } from '@/components/ui'
import type { ProfileUser } from '@/data/profile'

interface PublicProfileModalProps {
  isOpen: boolean
  onClose: () => void
  user: ProfileUser
}

export function PublicProfileModal({ isOpen, onClose, user }: Readonly<PublicProfileModalProps>) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="relative">
        <div className="h-32 bg-gradient-to-br from-gray-900 to-gray-700 dark:from-zinc-800 dark:to-zinc-600" />

        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/60 transition-colors cursor-pointer"
        >
          <span className="text-lg leading-none">&times;</span>
        </button>

        <div className="px-6 -mt-12">
          <div className="relative inline-block">
            <Avatar
              src={user.avatarUrl}
              alt={user.fullName}
              size="2xl"
              className="border-4 border-white dark:border-zinc-900"
            />
            {user.isVerified && (
              <CheckCircle className="absolute -right-1 bottom-2 w-6 h-6 text-lime fill-lime stroke-white" />
            )}
          </div>

          <div className="mt-3">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user.fullName}</h2>
            <p className="text-sm font-semibold text-lime">{user.role}</p>
          </div>

          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-zinc-400">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {user.location}
            </span>
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" />
              {user.email}
            </span>
          </div>

          <p className="mt-4 text-sm text-gray-600 dark:text-zinc-400 leading-relaxed">
            {user.bio}
          </p>

          <div className="flex items-center justify-start gap-8 mt-6 pb-2">
            <div className="text-center">
              <p className="text-xl font-bold text-gray-900 dark:text-white">{user.stats.orders}</p>
              <p className="text-xs text-gray-500 dark:text-zinc-400 uppercase tracking-wide">Orders</p>
            </div>
            <div className="text-center border-l border-gray-200 dark:border-zinc-700 pl-8">
              <p className="text-xl font-bold text-gray-900 dark:text-white">{user.stats.reviews}</p>
              <p className="text-xs text-gray-500 dark:text-zinc-400 uppercase tracking-wide">Reviews</p>
            </div>
            <div className="text-center border-l border-gray-200 dark:border-zinc-700 pl-8">
              <p className="text-xl font-bold text-gray-900 dark:text-white">{user.stats.rating}</p>
              <p className="text-xs text-gray-500 dark:text-zinc-400 uppercase tracking-wide">Rating</p>
            </div>
          </div>

          <div className="mt-6 pb-6">
            <Button variant="dark" size="full" className="gap-2">
              <Share2 className="w-4 h-4" />
              Share Profile
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
