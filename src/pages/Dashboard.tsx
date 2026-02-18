import { useRef, useEffect } from 'react'
import { DollarSign, Package, Users, Star } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import {
  StatsCard,
  SalesChart,
  PaymentMethods,
  InventoryAlerts,
  OrderList,
} from '@/components/dashboard'
import { useReducedMotion } from '@/hooks'
import {
  stats,
  salesPerformance,
  paymentMethods,
  inventoryAlerts,
  orders,
} from '@/data/mock'

export function Dashboard() {
  const statsGridRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const grid = statsGridRef.current
    if (!grid || prefersReducedMotion) return

    const children = Array.from(grid.children)

    gsap.fromTo(
      children,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        clearProps: 'all',
      }
    )
  }, [prefersReducedMotion])

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Store Overview</h2>

        <div ref={statsGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Revenue"
            value={stats.grossRevenue.value}
            percentChange={stats.grossRevenue.percentChange}
            prefix="$"
            icon={<DollarSign className="w-6 h-6" />}
            iconBgColor="#dbeafe"
            iconColor="#0369a1"
          />
          <StatsCard
            title="Total Orders"
            value={stats.totalOrders.value}
            percentChange={stats.totalOrders.percentChange}
            icon={<Package className="w-6 h-6" />}
            iconBgColor="#f0fdf4"
            iconColor="#16a34a"
          />
          <StatsCard
            title="Active Customers"
            value={stats.activeCustomers.value}
            percentChange={stats.activeCustomers.percentChange}
            icon={<Users className="w-6 h-6" />}
            iconBgColor="#fef3c7"
            iconColor="#d97706"
          />
          <StatsCard
            title="Avg. Rating"
            value={stats.avgRating.value}
            percentChange={stats.avgRating.percentChange}
            decimals={1}
            suffix="/5"
            icon={<Star className="w-6 h-6" />}
            iconBgColor="#f3e8ff"
            iconColor="#7c3aed"
          />
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesChart data={salesPerformance} />
        </div>
        <div>
          <PaymentMethods data={paymentMethods} total={100} />
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <OrderList orders={orders} />
        </div>
        <div>
          <InventoryAlerts items={inventoryAlerts} />
        </div>
      </section>
    </div>
  )
}

export default Dashboard
