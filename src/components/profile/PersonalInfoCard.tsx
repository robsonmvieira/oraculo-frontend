import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { User, Mail, Phone, MapPin, Save, Loader2 } from 'lucide-react'
import { Card, Button, Input } from '@/components/ui'
import { useUpdateProfile } from '@/modules/auth'
import type { AuthUser } from '@/modules/auth'

interface PersonalInfoCardProps {
  user: AuthUser
}

export function PersonalInfoCard({ user }: Readonly<PersonalInfoCardProps>) {
  const { t } = useTranslation(['profile', 'common'])
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
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{t('profile:personalInfo.title')}</h3>
        <Button
          variant={isEditing ? 'danger' : 'dark'}
          size="sm"
          onClick={isEditing ? handleCancel : () => setIsEditing(true)}
          disabled={isPending}
        >
          {isEditing ? t('profile:personalInfo.cancelEdit') : t('profile:personalInfo.editProfile')}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium text-gray-500 dark:text-zinc-400 mb-2 block">
            {t('profile:personalInfo.fullName')}
          </label>
          <div className="flex items-center gap-3 h-10">
            <User className="w-4 h-4 text-gray-400 dark:text-zinc-500" />
            <span className="text-sm text-gray-900 dark:text-white">{user.getFullName()}</span>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-500 dark:text-zinc-400 mb-2 block">
            {t('profile:personalInfo.emailAddress')}
          </label>
          <div className="flex items-center gap-3 h-10">
            <Mail className="w-4 h-4 text-gray-400 dark:text-zinc-500" />
            <span className="text-sm text-gray-900 dark:text-white">{user.getEmail()}</span>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-500 dark:text-zinc-400 mb-2 block">
            {t('profile:personalInfo.phoneNumber')}
          </label>
          {isEditing ? (
            <Input
              type="tel"
              value={formData.phone_number}
              onChange={(e) => handleChange('phone_number', e.target.value)}
              placeholder={t('profile:personalInfo.phonePlaceholder')}
            />
          ) : (
            <div className="flex items-center gap-3 h-10">
              <Phone className="w-4 h-4 text-gray-400 dark:text-zinc-500" />
              <span className="text-sm text-gray-900 dark:text-white">
                {user.getPhoneNumber() || t('common:labels.notSet')}
              </span>
            </div>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-500 dark:text-zinc-400 mb-2 block">
            {t('profile:personalInfo.location')}
          </label>
          {isEditing ? (
            <Input
              value={formData.locale}
              onChange={(e) => handleChange('locale', e.target.value)}
              placeholder={t('profile:personalInfo.locationPlaceholder')}
            />
          ) : (
            <div className="flex items-center gap-3 h-10">
              <MapPin className="w-4 h-4 text-gray-400 dark:text-zinc-500" />
              <span className="text-sm text-gray-900 dark:text-white">
                {user.getLocale() || t('common:labels.notSet')}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <label className="text-sm font-medium text-gray-500 dark:text-zinc-400 mb-2 block">
          {t('profile:personalInfo.bio')}
        </label>
        {isEditing ? (
          <textarea
            value={formData.bio}
            onChange={(e) => handleChange('bio', e.target.value)}
            rows={3}
            placeholder={t('profile:personalInfo.bioPlaceholder')}
            className="flex w-full rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white px-4 py-3 text-sm placeholder:text-gray-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-lime transition-colors duration-300 resize-none"
          />
        ) : (
          <p className="text-sm text-gray-900 dark:text-white leading-relaxed">
            {user.getBio() || t('common:labels.notSet')}
          </p>
        )}
      </div>

      {isEditing && (
        <div className="flex justify-end mt-6">
          <Button variant="primary" size="md" onClick={handleSave} disabled={isPending} className="gap-2">
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {isPending ? t('common:actions.saving') : t('profile:personalInfo.saveChanges')}
          </Button>
        </div>
      )}
    </Card>
  )
}
