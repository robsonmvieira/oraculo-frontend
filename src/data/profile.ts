export interface ProfileUser {
  id: string
  fullName: string
  email: string
  phone: string
  location: string
  bio: string
  avatarUrl: string
  role: string
  isVerified: boolean
  stats: {
    orders: number
    reviews: number
    rating: number
  }
}

export interface ConnectedAccount {
  id: string
  provider: 'github' | 'facebook'
  label: string
  username?: string
  connected: boolean
}

export interface ActivityItem {
  id: string
  title: string
  timestamp: string
  isRecent: boolean
}

export const profileUser: ProfileUser = {
  id: '1',
  fullName: 'Thomas Anree',
  email: 'thomas.anree@example.com',
  phone: '+1 (555) 123-4567',
  location: 'New York, USA',
  bio: 'Senior Administrator with 5 years of experience in managing e-commerce platforms.',
  avatarUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
  role: 'Admin',
  isVerified: true,
  stats: {
    orders: 120,
    reviews: 12,
    rating: 4.8,
  },
}

export const connectedAccounts: ConnectedAccount[] = [
  {
    id: '1',
    provider: 'github',
    label: 'GitHub',
    username: 'thomas-anree',
    connected: true,
  },
  {
    id: '2',
    provider: 'facebook',
    label: 'Facebook',
    username: undefined,
    connected: false,
  },
]

export const recentActivity: ActivityItem[] = [
  {
    id: '1',
    title: 'Updated profile information',
    timestamp: '2 hours ago',
    isRecent: true,
  },
  {
    id: '2',
    title: 'Logged in from new device (MacBook Pro)',
    timestamp: '1 day ago',
    isRecent: false,
  },
  {
    id: '3',
    title: 'Changed password',
    timestamp: '3 days ago',
    isRecent: false,
  },
]
