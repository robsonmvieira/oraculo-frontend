import { Camera } from 'lucide-react'
import { Card, Avatar, Button } from '@/components/ui'
import type { ProfileUser } from '@/data/profile'

interface ProfileCardProps {
  user: ProfileUser
  onViewPublicProfile: () => void
}

export function ProfileCard({ user, onViewPublicProfile }: Readonly<ProfileCardProps>) {
  return (
    <Card className="flex flex-col items-center text-center py-8 px-6">
      <div className="relative mb-4">
        <Avatar
          src={user.avatarUrl}
          alt={user.fullName}
          size="xl"
          className="grayscale"
        />
        <button
          className="absolute bottom-0 right-0 w-8 h-8 bg-lime rounded-full flex items-center justify-center border-2 border-white hover:bg-lime-hover transition-colors cursor-pointer"
          title="Change photo"
        >
          <Camera className="w-4 h-4 text-black" />
        </button>
      </div>

      <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user.fullName}</h2>
      <p className="text-sm text-gray-500 dark:text-zinc-400 mb-6">{user.role}</p>

      <div className="flex items-center justify-center gap-6 mb-6 w-full">
        <div className="text-center">
          <p className="text-xl font-bold text-gray-900 dark:text-white">{user.stats.orders}</p>
          <p className="text-xs text-gray-500 dark:text-zinc-400">Orders</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-gray-900 dark:text-white">{user.stats.reviews}</p>
          <p className="text-xs text-gray-500 dark:text-zinc-400">Reviews</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-gray-900 dark:text-white">{user.stats.rating}</p>
          <p className="text-xs text-gray-500 dark:text-zinc-400">Rating</p>
        </div>
      </div>

      <Button variant="outline" size="md" className="w-full" onClick={onViewPublicProfile}>
        View Public Profile
      </Button>
    </Card>
  )
}
