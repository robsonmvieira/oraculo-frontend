import { useLocation } from 'react-router-dom'

const pageDescriptions: Record<string, string> = {
  '/orders': 'Manage and track all customer orders in one place.',
  '/products': 'View and manage your product catalog.',
  '/campaigns': 'Create and monitor marketing campaigns.',
  '/cart': 'View active shopping carts and abandoned carts.',
  '/analytics': 'Deep dive into your store analytics and metrics.',
  '/customers': 'Manage customer relationships and profiles.',
  '/integrations': 'Connect with third-party services and apps.',
  '/mobile': 'Mobile app settings and push notifications.',
  '/settings': 'Configure your store settings and preferences.',
  '/help': 'Get help and access documentation.',
}

export function Placeholder() {
  const location = useLocation()
  const pageName = location.pathname.slice(1).charAt(0).toUpperCase() + location.pathname.slice(2)
  const description = pageDescriptions[location.pathname] || 'This page is under construction.'

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-24 h-24 bg-lime/20 rounded-3xl flex items-center justify-center mb-6">
        <span className="text-4xl">🚧</span>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{pageName}</h1>
      <p className="text-gray-600 max-w-md mb-8">{description}</p>
      <p className="text-sm text-gray-400">Coming soon...</p>
    </div>
  )
}

export default Placeholder
