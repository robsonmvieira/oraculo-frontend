import { useEffect, useRef } from 'react'
import { Filter, MoreHorizontal } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Badge,
  Input,
  Button,
  Avatar,
} from '@/components/ui'
import { formatCurrency, formatDate } from '@/lib/utils'
import { useReducedMotion } from '@/hooks'

type OrderStatus = 'on_delivery' | 'pending' | 'removed' | 'completed'

interface Order {
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

interface OrderListProps {
  orders: Order[]
}

const statusConfig: Record<OrderStatus, { variant: 'success' | 'warning' | 'error' | 'neutral'; label: string }> = {
  on_delivery: { variant: 'success', label: 'On Delivery' },
  pending: { variant: 'warning', label: 'Pending' },
  removed: { variant: 'error', label: 'Removed' },
  completed: { variant: 'success', label: 'Completed' },
}

export function OrderList({ orders }: OrderListProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const tableBodyRef = useRef<HTMLTableSectionElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const tableBody = tableBodyRef.current
    if (!tableBody || prefersReducedMotion) return

    const children = Array.from(tableBody.children)

    gsap.fromTo(
      children,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.06,
        delay: 0.2,
        ease: 'power2.out',
        clearProps: 'all',
      }
    )
  }, [prefersReducedMotion])

  return (
    <div
      ref={containerRef}
      className="bg-white dark:bg-zinc-900 rounded-[1.875rem] overflow-hidden border border-transparent transition-all duration-300 hover:border-gray-200 dark:hover:border-zinc-700"
    >
      <div className="p-6 border-b border-gray-100 dark:border-zinc-800">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Order List</h3>

          <div className="flex items-center gap-4">
            <div className="w-64">
              <Input icon placeholder="Search orders..." />
            </div>
            <Button variant="outline" size="md" className="gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody ref={tableBodyRef}>
          {orders.map((order) => {
            const status = statusConfig[order.status]

            return (
              <TableRow key={order.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={order.customerImage}
                      alt={order.customerName}
                      size="sm"
                    />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{order.customerName}</p>
                      <p className="text-xs text-gray-500 dark:text-zinc-400">{order.customerId}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{formatDate(order.date)}</TableCell>
                <TableCell className="font-medium">{order.productName}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell className="font-bold">{formatCurrency(order.amount)}</TableCell>
                <TableCell>
                  <Badge variant={status.variant}>{status.label}</Badge>
                </TableCell>
                <TableCell>
                  <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
