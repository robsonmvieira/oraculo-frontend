export const stats = {
  grossRevenue: {
    value: 2427,
    percentChange: 12.5,
  },
  avgOrderValue: {
    value: 227.28,
    percentChange: 8.2,
  },
  totalOrders: {
    value: 1265,
    percentChange: 8.2,
  },
  activeCustomers: {
    value: 892,
    percentChange: -2.1,
  },
  avgRating: {
    value: 4.8,
    percentChange: 5.3,
  },
}

export const salesPerformance = [
  { day: 'Mon', netIncome: 2400, totalSales: 1800, totalRevenue: 3200 },
  { day: 'Tue', netIncome: 1398, totalSales: 2200, totalRevenue: 2800 },
  { day: 'Wed', netIncome: 3800, totalSales: 2600, totalRevenue: 4200 },
  { day: 'Thu', netIncome: 3908, totalSales: 3100, totalRevenue: 4500 },
  { day: 'Fri', netIncome: 4800, totalSales: 3800, totalRevenue: 5200 },
  { day: 'Sat', netIncome: 3800, totalSales: 2900, totalRevenue: 4100 },
  { day: 'Sun', netIncome: 4300, totalSales: 3400, totalRevenue: 4800 },
]

export const paymentMethods = [
  { name: 'Cash', value: 50, color: '#c3f53c' },
  { name: 'Card', value: 30, color: '#1a1a1a' },
  { name: 'Wallet', value: 20, color: '#9ca3af' },
]

export const inventoryAlerts = [
  {
    id: '1',
    productName: 'Premium Sneaker Blue',
    productImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop',
    quantity: 5,
  },
  {
    id: '2',
    productName: 'Classic T-Shirt White',
    productImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop',
    quantity: 12,
  },
  {
    id: '3',
    productName: 'Denim Jacket Premium',
    productImage: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=100&h=100&fit=crop',
    quantity: 8,
  },
  {
    id: '4',
    productName: 'Running Shoes Pro',
    productImage: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=100&h=100&fit=crop',
    quantity: 3,
  },
  {
    id: '5',
    productName: 'Leather Belt Classic',
    productImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop',
    quantity: 22,
  },
]

export type OrderStatus = 'on_delivery' | 'pending' | 'removed' | 'completed'

export interface Order {
  id: string
  customerId: string
  customerName: string
  customerImage: string
  date: string
  productName: string
  quantity: number
  amount: number
  status: OrderStatus
}

export const orders: Order[] = [
  {
    id: 'ORD-001',
    customerId: 'CUS-2847',
    customerName: 'John Anderson',
    customerImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    date: '2024-01-15',
    productName: 'Premium Sneaker',
    quantity: 2,
    amount: 179.98,
    status: 'on_delivery',
  },
  {
    id: 'ORD-002',
    customerId: 'CUS-3921',
    customerName: 'Sarah Miller',
    customerImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    date: '2024-01-14',
    productName: 'Classic T-Shirt',
    quantity: 3,
    amount: 104.97,
    status: 'completed',
  },
  {
    id: 'ORD-003',
    customerId: 'CUS-1583',
    customerName: 'Michael Chen',
    customerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    date: '2024-01-14',
    productName: 'Denim Jacket',
    quantity: 1,
    amount: 129.99,
    status: 'pending',
  },
  {
    id: 'ORD-004',
    customerId: 'CUS-4729',
    customerName: 'Emily Davis',
    customerImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    date: '2024-01-13',
    productName: 'Running Shoes Pro',
    quantity: 1,
    amount: 149.99,
    status: 'removed',
  },
  {
    id: 'ORD-005',
    customerId: 'CUS-8321',
    customerName: 'David Wilson',
    customerImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    date: '2024-01-13',
    productName: 'Leather Belt Classic',
    quantity: 2,
    amount: 79.98,
    status: 'on_delivery',
  },
  {
    id: 'ORD-006',
    customerId: 'CUS-6214',
    customerName: 'Lisa Thompson',
    customerImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
    date: '2024-01-12',
    productName: 'Premium Sneaker',
    quantity: 1,
    amount: 89.99,
    status: 'completed',
  },
  {
    id: 'ORD-007',
    customerId: 'CUS-9473',
    customerName: 'James Brown',
    customerImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
    date: '2024-01-12',
    productName: 'Classic T-Shirt',
    quantity: 5,
    amount: 174.95,
    status: 'pending',
  },
]
