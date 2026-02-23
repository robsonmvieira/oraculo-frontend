import { useState, useRef, useEffect, useMemo } from 'react'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks'
import { useAuthStore } from '@/modules/auth'
import {
  ProfileCard,
  PersonalInfoCard,
  LanguagePreferenceCard,
  ConnectedAccountsCard,
  RecentActivityCard,
  PublicProfileModal,
} from '@/components/profile'
import { profileUser, connectedAccounts, recentActivity } from '@/data/profile'

export function ProfilePage() {
  const [isPublicProfileOpen, setIsPublicProfileOpen] = useState(false)
  const leftColRef = useRef<HTMLDivElement>(null)
  const rightColRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const { user } = useAuthStore()

  const profileCardUser = useMemo(() => ({
    ...profileUser,
    fullName: user?.getFullName() || profileUser.fullName,
    email: user?.getEmail() || profileUser.email,
    bio: user?.getBio() || profileUser.bio,
    location: user?.getLocale() || profileUser.location,
    phone: user?.getPhoneNumber() || profileUser.phone,
    role: user?.getIsSuperuser() ? 'Admin' : 'Member',
  }), [user])

  useEffect(() => {
    if (prefersReducedMotion) return

    if (leftColRef.current) {
      gsap.fromTo(
        leftColRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
      )
    }

    if (rightColRef.current) {
      const children = Array.from(rightColRef.current.children)
      gsap.fromTo(
        children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.15,
          ease: 'power2.out',
          clearProps: 'all',
        }
      )
    }
  }, [prefersReducedMotion])

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6">
        <div ref={leftColRef}>
          <ProfileCard
            user={profileCardUser}
            onViewPublicProfile={() => setIsPublicProfileOpen(true)}
          />
        </div>

        <div ref={rightColRef} className="space-y-6">
          {user && <PersonalInfoCard user={user} />}
          {user && <LanguagePreferenceCard user={user} />}
          <ConnectedAccountsCard accounts={connectedAccounts} />
          <RecentActivityCard activities={recentActivity} />
        </div>
      </div>

      <PublicProfileModal
        isOpen={isPublicProfileOpen}
        onClose={() => setIsPublicProfileOpen(false)}
        user={profileCardUser}
      />
    </>
  )
}

export default ProfilePage
