import { useEffect, useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  Home,
  FileText,
  Package,
  Briefcase,
  ShoppingBag,
  Clock,
  User,
  Link2,
  Smartphone,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
} from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks'
import { useLogout } from '@/modules/auth'

const navItems = [
  { icon: Home, path: '/dashboard', label: 'Dashboard' },
  { icon: FileText, path: '/orders', label: 'Orders' },
  { icon: Package, path: '/audiences', label: 'Audiences' },
  { icon: Briefcase, path: '/campaigns', label: 'Campaigns' },
  { icon: ShoppingBag, path: '/cart', label: 'Cart' },
  { icon: Clock, path: '/analytics', label: 'Analytics' },
  { icon: User, path: '/customers', label: 'Customers' },
  { icon: Link2, path: '/integrations', label: 'Integrations' },
  { icon: Smartphone, path: '/mobile', label: 'Mobile' },
  { icon: Bell, path: '/notifications', label: 'Notifications' },
]

const bottomItems = [
  { icon: Settings, path: '/settings', label: 'Settings' },
  { icon: HelpCircle, path: '/help', label: 'Help' },
]

export function Sidebar() {
  const sidebarRef = useRef<HTMLElement>(null)
  const iconsRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const location = useLocation()
  const handleLogout = useLogout()

  useEffect(() => {
    if (!sidebarRef.current || !iconsRef.current || prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from(sidebarRef.current, {
        x: -80,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      })

      gsap.from(iconsRef.current?.children ?? [], {
        scale: 0,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        delay: 0.3,
        ease: 'back.out(2)',
      })
    }, sidebarRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  const handleIconHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (prefersReducedMotion) return
    gsap.to(e.currentTarget, {
      scale: 1.2,
      duration: 0.2,
      ease: 'back.out(2)',
    })
  }

  const handleIconLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (prefersReducedMotion) return
    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 0.2,
      ease: 'power2.out',
    })
  }

  return (
    <aside
      ref={sidebarRef}
      className="fixed left-0 top-0 h-screen w-20 bg-dark rounded-r-3xl flex flex-col items-center py-6 z-50"
    >
      <div className="w-12 h-12 bg-lime rounded-xl flex items-center justify-center mb-8">
        <span className="text-black font-bold text-xl">S</span>
      </div>

      <nav ref={iconsRef} className="flex-1 flex flex-col items-center gap-2">
        {navItems.map(({ icon: Icon, path, label }) => {
          const isActive = location.pathname === path

          return (
            <NavLink
              key={path}
              to={path}
              onMouseEnter={handleIconHover}
              onMouseLeave={handleIconLeave}
              className={cn(
                'w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300',
                isActive
                  ? 'bg-lime text-black'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              )}
              title={label}
            >
              <Icon className="w-5 h-5" />
            </NavLink>
          )
        })}
      </nav>

      <div className="flex flex-col items-center gap-2 mt-auto">
        {bottomItems.map(({ icon: Icon, path, label }) => (
          <NavLink
            key={path}
            to={path}
            onMouseEnter={handleIconHover}
            onMouseLeave={handleIconLeave}
            className={cn(
              'w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300',
              location.pathname === path
                ? 'bg-lime text-black'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            )}
            title={label}
          >
            <Icon className="w-5 h-5" />
          </NavLink>
        ))}

        <button
          onClick={handleLogout}
          className="cursor-pointer w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-colors duration-300 mt-4"
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </aside>
  )
}
