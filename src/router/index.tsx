import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { MainLayout } from '@/components/layout'
import { useAuthStore } from '@/modules/auth'

const LandingPage = lazy(() => import('@/pages/LandingPage'))
const LoginPage = lazy(() => import('@/pages/LoginPage'))
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const Audiences = lazy(() => import('@/pages/Audiences'))
const AudienceDetail = lazy(() => import('@/pages/AudienceDetail'))
const ProfilePage = lazy(() => import('@/pages/ProfilePage'))
const NotificationsPage = lazy(() => import('@/pages/NotificationsPage'))
const Placeholder = lazy(() => import('@/pages/Placeholder'))
const NotFound = lazy(() => import('@/pages/NotFound'))

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-4 border-lime border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

function AuthRedirect() {
  const { isAuthenticated, isHydrated } = useAuthStore()

  if (!isHydrated) {
    return <PageLoader />
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <LandingPage />
    </Suspense>
  )
}

function RedirectIfAuthenticated({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isHydrated } = useAuthStore()

  if (!isHydrated) {
    return <PageLoader />
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isHydrated } = useAuthStore()

  if (!isHydrated) {
    return <PageLoader />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthRedirect />,
  },
  {
    path: '/login',
    element: (
      <RedirectIfAuthenticated>
        <Suspense fallback={<PageLoader />}>
          <LoginPage />
        </Suspense>
      </RedirectIfAuthenticated>
    ),
  },
  {
    element: (
      <RequireAuth>
        <MainLayout />
      </RequireAuth>
    ),
    children: [
      {
        path: 'dashboard',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: 'audiences',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Audiences />
          </Suspense>
        ),
      },
      {
        path: 'audiences/:id',
        element: (
          <Suspense fallback={<PageLoader />}>
            <AudienceDetail />
          </Suspense>
        ),
      },
      {
        path: 'notifications',
        element: (
          <Suspense fallback={<PageLoader />}>
            <NotificationsPage />
          </Suspense>
        ),
      },
      {
        path: 'profile',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProfilePage />
          </Suspense>
        ),
      },
      {
        path: 'settings',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Placeholder />
          </Suspense>
        ),
      },
      {
        path: 'help',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Placeholder />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<PageLoader />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
