import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { gsap } from '@/lib/gsap'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { useReducedMotion } from '@/hooks'
import { useNotificationSSE } from '@/modules/notifications'

export function MainLayout() {
  const contentRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const prefersReducedMotion = useReducedMotion()
  useNotificationSSE()

  useEffect(() => {
    if (!contentRef.current || prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
      )
    }, contentRef)

    return () => ctx.revert()
  }, [location.pathname, prefersReducedMotion])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <Sidebar />

      <div className="ml-20">
        <Topbar />

        <main
          ref={contentRef}
          className="p-4 xl:p-8"
        >
          <Outlet />
        </main>
      </div>
    </div>
  )
}
