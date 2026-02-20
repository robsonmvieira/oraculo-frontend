import { useState, useRef, useEffect, useMemo } from 'react'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks'
import { useAuthStore } from '@/modules/auth'
import {
  ProfileCard,
  PersonalInfoCard,
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

  const currentUser = useMemo(() => ({
    ...profileUser,
    fullName: user?.getFullName() || profileUser.fullName,
    email: user?.getEmail() || profileUser.email,
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
            user={currentUser}
            onViewPublicProfile={() => setIsPublicProfileOpen(true)}
          />
        </div>

        <div ref={rightColRef} className="space-y-6">
          <PersonalInfoCard user={currentUser} />
          <ConnectedAccountsCard accounts={connectedAccounts} />
          <RecentActivityCard activities={recentActivity} />
        </div>
      </div>

      <PublicProfileModal
        isOpen={isPublicProfileOpen}
        onClose={() => setIsPublicProfileOpen(false)}
        user={currentUser}
      />
    </>
  )
}

export default ProfilePage
