import { useState } from 'react'
import { User, Mail, Phone, MapPin, Save } from 'lucide-react'
import { Card, Button, Input } from '@/components/ui'
import type { ProfileUser } from '@/data/profile'

interface PersonalInfoCardProps {
  user: ProfileUser
}

export function PersonalInfoCard({ user }: Readonly<PersonalInfoCardProps>) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    location: user.location,
    bio: user.bio,
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      location: user.location,
      bio: user.bio,
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
        >
          {isEditing ? 'Cancel Edit' : 'Edit Profile'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium text-gray-500 dark:text-zinc-400 mb-2 block">
            Full Name
          </label>
          {isEditing ? (
            <Input
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
            />
          ) : (
            <div className="flex items-center gap-3 h-10">
              <User className="w-4 h-4 text-gray-400 dark:text-zinc-500" />
              <span className="text-sm text-gray-900 dark:text-white">{formData.fullName}</span>
            </div>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-500 dark:text-zinc-400 mb-2 block">
            Email Address
          </label>
          {isEditing ? (
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          ) : (
            <div className="flex items-center gap-3 h-10">
              <Mail className="w-4 h-4 text-gray-400 dark:text-zinc-500" />
              <span className="text-sm text-gray-900 dark:text-white">{formData.email}</span>
            </div>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-500 dark:text-zinc-400 mb-2 block">
            Phone Number
          </label>
          {isEditing ? (
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          ) : (
            <div className="flex items-center gap-3 h-10">
              <Phone className="w-4 h-4 text-gray-400 dark:text-zinc-500" />
              <span className="text-sm text-gray-900 dark:text-white">{formData.phone}</span>
            </div>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-500 dark:text-zinc-400 mb-2 block">
            Location
          </label>
          {isEditing ? (
            <Input
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
            />
          ) : (
            <div className="flex items-center gap-3 h-10">
              <MapPin className="w-4 h-4 text-gray-400 dark:text-zinc-500" />
              <span className="text-sm text-gray-900 dark:text-white">{formData.location}</span>
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
            className="flex w-full rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white px-4 py-3 text-sm placeholder:text-gray-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-lime transition-colors duration-300 resize-none"
          />
        ) : (
          <p className="text-sm text-gray-900 dark:text-white leading-relaxed">
            {formData.bio}
          </p>
        )}
      </div>

      {isEditing && (
        <div className="flex justify-end mt-6">
          <Button variant="primary" size="md" onClick={handleSave} className="gap-2">
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </div>
      )}
    </Card>
  )
}
