import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Bell, Sun, Moon, Plus, ChevronDown, User, LogOut, Settings, HelpCircle } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { Button, Input, Avatar } from '@/components/ui'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useThemeStore } from '@/modules/shared'
import { useAuthStore, useLogout } from '@/modules/auth'
import { useReducedMotion } from '@/hooks'

const pageNames: Record<string, string> = {
  '/dashboard': 'Dashboard',
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
  '/profile': 'Profile',
}

export function Topbar() {
  const topbarRef = useRef<HTMLElement>(null)
  const themeIconRef = useRef<HTMLButtonElement>(null)
  const bellRef = useRef<HTMLButtonElement>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const { theme, toggleTheme } = useThemeStore()
  const { user } = useAuthStore()
  const handleLogout = useLogout()
  const prefersReducedMotion = useReducedMotion()

  const userName = user?.getFullName() || 'User'
  const userRole = user?.getIsSuperuser() ? 'Admin' : 'Member'

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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer">
              <Avatar
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                alt={userName}
                size="md"
              />
              <ChevronDown className="w-4 h-4 text-gray-500 dark:text-zinc-400" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-56 bg-white dark:bg-zinc-900 rounded-2xl border-gray-100 dark:border-zinc-800 p-2"
          >
            <DropdownMenuLabel className="px-3 py-2">
              <p className="text-sm font-bold text-gray-900 dark:text-white">{userName}</p>
              <p className="text-xs text-gray-500 dark:text-zinc-400">{userRole}</p>
            </DropdownMenuLabel>

            <DropdownMenuSeparator className="bg-gray-100 dark:bg-zinc-800" />

            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => navigate('/profile')}
                className="gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-gray-700 dark:text-zinc-300 focus:bg-gray-50 dark:focus:bg-zinc-800"
              >
                <User className="w-4 h-4" />
                Profile
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => navigate('/settings')}
                className="gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-gray-700 dark:text-zinc-300 focus:bg-gray-50 dark:focus:bg-zinc-800"
              >
                <Settings className="w-4 h-4" />
                Settings
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => navigate('/help')}
                className="gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-gray-700 dark:text-zinc-300 focus:bg-gray-50 dark:focus:bg-zinc-800"
              >
                <HelpCircle className="w-4 h-4" />
                Help Center
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="bg-gray-100 dark:bg-zinc-800" />

            <DropdownMenuItem
              variant="destructive"
              onClick={handleLogout}
              className="gap-3 px-3 py-2.5 rounded-xl cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
