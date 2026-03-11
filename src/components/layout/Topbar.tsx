import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, NavLink } from 'react-router-dom'
import {
  Bell, Sun, Moon, Plus, ChevronDown, User, LogOut, Settings, HelpCircle, Menu,
  Home, Package,
} from 'lucide-react'
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
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'
import { useThemeStore } from '@/modules/shared'
import { useAuthStore, useLogout } from '@/modules/auth'
import { useUnreadCount, useNotificationStore } from '@/modules/notifications'
import { NotificationDropdown } from '@/components/notifications'
import { useReducedMotion } from '@/hooks'
import { useCreateAudienceStore } from '@/modules/audience/application/store'

const mobileNavItems = [
  { icon: Home, path: '/dashboard', label: 'Dashboard' },
  { icon: Package, path: '/audiences', label: 'Audiences' },
  { icon: Bell, path: '/notifications', label: 'Notifications' },
]

const pageNames: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/audiences': 'Audiences',
  '/settings': 'Settings',
  '/help': 'Help',
  '/profile': 'Profile',
  '/notifications': 'Notifications',
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
  const { t } = useTranslation('layout')
  const { openModal } = useCreateAudienceStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  useUnreadCount()
  const unreadCount = useNotificationStore((state) => state.unreadCount)

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
    if (!bellRef.current || prefersReducedMotion || unreadCount === 0) return

    const badge = bellRef.current?.querySelector('.notification-badge')
    if (!badge) return

    const pulse = gsap.to(badge, {
      scale: 1.3,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    })

    return () => {
      pulse.kill()
    }
  }, [prefersReducedMotion, unreadCount])

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
      className="sticky top-0 z-40 flex items-center justify-between h-16 px-4 md:px-8 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-gray-100 dark:border-zinc-800"
    >
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden cursor-pointer w-10 h-10 rounded-full flex items-center justify-center text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white">{pageName}</h1>
      </div>

      <div className="hidden md:block flex-1 max-w-md mx-8">
        <Input icon placeholder="Search..." className="w-full" />
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <Button
          variant="primary"
          size="md"
          className="gap-2 hidden sm:flex"
          onClick={openModal}
        >
          <Plus className="w-4 h-4" />
          {t('topbar.createAudience')}
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

        <NotificationDropdown>
          <button
            ref={bellRef}
            className="relative w-10 h-10 rounded-full flex items-center justify-center text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="notification-badge absolute top-1 right-0 min-w-5 h-5 px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
        </NotificationDropdown>

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

      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-72 p-0 bg-dark border-none" showCloseButton={false}>
          <div className="flex flex-col h-full py-6">
            <div className="flex items-center justify-center mb-8">
              <div className="w-12 h-12 bg-lime rounded-xl flex items-center justify-center">
                <span className="text-black font-bold text-xl">S</span>
              </div>
            </div>

            <nav className="flex-1 flex flex-col gap-1 px-4">
              {mobileNavItems.map(({ icon: Icon, path, label }) => (
                <NavLink
                  key={path}
                  to={path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-200',
                    location.pathname === path
                      ? 'bg-lime text-black font-medium'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{label}</span>
                </NavLink>
              ))}
            </nav>

            <div className="flex flex-col gap-1 px-4 mt-auto">
              <NavLink
                to="/settings"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-200',
                  location.pathname === '/settings'
                    ? 'bg-lime text-black font-medium'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                )}
              >
                <Settings className="w-5 h-5" />
                <span className="text-sm">Settings</span>
              </NavLink>
              <NavLink
                to="/help"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-200',
                  location.pathname === '/help'
                    ? 'bg-lime text-black font-medium'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                )}
              >
                <HelpCircle className="w-5 h-5" />
                <span className="text-sm">Help</span>
              </NavLink>
              <button
                onClick={() => { handleLogout(); setMobileMenuOpen(false) }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-colors duration-200 cursor-pointer"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}
