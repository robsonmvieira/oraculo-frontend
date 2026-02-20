import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { MainLayout } from '@/components/layout'

const LandingPage = lazy(() => import('@/pages/LandingPage'))
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const Audiences = lazy(() => import('@/pages/Audiences'))
const AudienceDetail = lazy(() => import('@/pages/AudienceDetail'))
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
  const isAuthenticated = Boolean(localStorage.getItem('access_token'))

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <LandingPage />
    </Suspense>
  )
}

function RequireAuth({ children }: { children: React.ReactNode }) {
  const isAuthenticated = Boolean(localStorage.getItem('access_token'))

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthRedirect />,
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
        path: 'orders',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Placeholder />
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
        path: 'campaigns',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Placeholder />
          </Suspense>
        ),
      },
      {
        path: 'cart',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Placeholder />
          </Suspense>
        ),
      },
      {
        path: 'analytics',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Placeholder />
          </Suspense>
        ),
      },
      {
        path: 'customers',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Placeholder />
          </Suspense>
        ),
      },
      {
        path: 'integrations',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Placeholder />
          </Suspense>
        ),
      },
      {
        path: 'mobile',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Placeholder />
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
