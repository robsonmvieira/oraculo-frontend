import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { Bell, Sun, Moon, Plus, ChevronDown } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { Button, Input, Avatar } from '@/components/ui'
import { useTheme } from '@/contexts/ThemeContext'
import { useReducedMotion } from '@/hooks'

const pageNames: Record<string, string> = {
  '/': 'Dashboard',
  '/orders': 'Orders',
  '/audiences': 'Audiences',
  '/campaigns': 'Campaigns',
  '/cart': 'Cart',
  '/analytics': 'Analytics',
  '/customers': 'Customers',
  '/integrations': 'Integrations',
  '/mobile': 'Mobile',
  '/settings': 'Settings',
  '/help': 'Help',
}

export function Topbar() {
  const topbarRef = useRef<HTMLElement>(null)
  const themeIconRef = useRef<HTMLButtonElement>(null)
  const bellRef = useRef<HTMLButtonElement>(null)
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const prefersReducedMotion = useReducedMotion()

  const pageName = pageNames[location.pathname] || 'Dashboard'

  useEffect(() => {
    if (!topbarRef.current || prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from(topbarRef.current, {
        y: -40,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
      })
    }, topbarRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  useEffect(() => {
    if (!bellRef.current || prefersReducedMotion) return

    const pulse = gsap.to(bellRef.current?.querySelector('.notification-badge'), {
      scale: 1.3,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    })

    return () => {
      pulse.kill()
    }
  }, [prefersReducedMotion])

  const handleThemeToggle = () => {
    if (!prefersReducedMotion && themeIconRef.current) {
      gsap.to(themeIconRef.current, {
        rotation: 180,
        scale: 0,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          toggleTheme()
          gsap.to(themeIconRef.current, {
            rotation: 360,
            scale: 1,
            duration: 0.2,
            ease: 'back.out(2)',
          })
        },
      })
    } else {
      toggleTheme()
    }
  }

  return (
    <header
      ref={topbarRef}
      className="sticky top-0 z-40 flex items-center justify-between h-16 px-8 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-gray-100 dark:border-zinc-800"
    >
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{pageName}</h1>

      <div className="flex-1 max-w-md mx-8">
        <Input icon placeholder="Search..." className="w-full" />
      </div>

      <div className="flex items-center gap-4">
        <Button variant="primary" size="md" className="gap-2">
          <Plus className="w-4 h-4" />
          Create Audience
        </Button>

        <button
          ref={themeIconRef}
          onClick={handleThemeToggle}
          className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </button>

        <button
          ref={bellRef}
          className="relative w-10 h-10 rounded-full flex items-center justify-center text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="notification-badge absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        <button className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer">
          <Avatar
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
            alt="John Anderson"
            size="md"
          />
          <ChevronDown className="w-4 h-4 text-gray-500 dark:text-zinc-400" />
        </button>
      </div>
    </header>
  )
}
