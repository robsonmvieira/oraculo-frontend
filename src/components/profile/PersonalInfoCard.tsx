import { useState } from 'react'
import { User, Mail, Phone, MapPin, Save, Loader2 } from 'lucide-react'
import { Card, Button, Input } from '@/components/ui'
import { useUpdateProfile } from '@/modules/auth'
import type { AuthUser } from '@/modules/auth'

interface PersonalInfoCardProps {
  user: AuthUser
}

export function PersonalInfoCard({ user }: Readonly<PersonalInfoCardProps>) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    phone_number: user.getPhoneNumber() || '',
    locale: user.getLocale() || '',
    bio: user.getBio() || '',
  })

  const { mutate: updateProfile, isPending } = useUpdateProfile()

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    updateProfile(formData, {
      onSuccess: () => {
        setIsEditing(false)
      },
    })
  }

  const handleCancel = () => {
    setFormData({
      phone_number: user.getPhoneNumber() || '',
      locale: user.getLocale() || '',
      bio: user.getBio() || '',
    })
    setIsEditing(false)
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Personal Information</h3>
        <Button
          variant={isEditing ? 'danger' : 'dark'}
          size="sm"
          onClick={isEditing ? handleCancel : () => setIsEditing(true)}
          disabled={isPending}
        >
          {isEditing ? 'Cancel Edit' : 'Edit Profile'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium text-gray-500 dark:text-zinc-400 mb-2 block">
            Full Name
          </label>
          <div className="flex items-center gap-3 h-10">
            <User className="w-4 h-4 text-gray-400 dark:text-zinc-500" />
            <span className="text-sm text-gray-900 dark:text-white">{user.getFullName()}</span>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-500 dark:text-zinc-400 mb-2 block">
            Email Address
          </label>
          <div className="flex items-center gap-3 h-10">
            <Mail className="w-4 h-4 text-gray-400 dark:text-zinc-500" />
            <span className="text-sm text-gray-900 dark:text-white">{user.getEmail()}</span>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-500 dark:text-zinc-400 mb-2 block">
            Phone Number
          </label>
          {isEditing ? (
            <Input
              type="tel"
              value={formData.phone_number}
              onChange={(e) => handleChange('phone_number', e.target.value)}
              placeholder="+55 21 99999-9999"
            />
          ) : (
            <div className="flex items-center gap-3 h-10">
              <Phone className="w-4 h-4 text-gray-400 dark:text-zinc-500" />
              <span className="text-sm text-gray-900 dark:text-white">
                {user.getPhoneNumber() || 'Not set'}
              </span>
            </div>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-500 dark:text-zinc-400 mb-2 block">
            Location
          </label>
          {isEditing ? (
            <Input
              value={formData.locale}
              onChange={(e) => handleChange('locale', e.target.value)}
              placeholder="Rio de Janeiro, Brasil"
            />
          ) : (
            <div className="flex items-center gap-3 h-10">
              <MapPin className="w-4 h-4 text-gray-400 dark:text-zinc-500" />
              <span className="text-sm text-gray-900 dark:text-white">
                {user.getLocale() || 'Not set'}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <label className="text-sm font-medium text-gray-500 dark:text-zinc-400 mb-2 block">
          Bio
        </label>
        {isEditing ? (
          <textarea
            value={formData.bio}
            onChange={(e) => handleChange('bio', e.target.value)}
            rows={3}
            placeholder="Tell us about yourself..."
            className="flex w-full rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white px-4 py-3 text-sm placeholder:text-gray-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-lime transition-colors duration-300 resize-none"
          />
        ) : (
          <p className="text-sm text-gray-900 dark:text-white leading-relaxed">
            {user.getBio() || 'Not set'}
          </p>
        )}
      </div>

      {isEditing && (
        <div className="flex justify-end mt-6">
          <Button variant="primary" size="md" onClick={handleSave} disabled={isPending} className="gap-2">
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      )}
    </Card>
  )
}
