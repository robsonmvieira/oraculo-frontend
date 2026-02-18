import { useState, createContext, useContext, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface TabsContextValue {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const TabsContext = createContext<TabsContextValue | null>(null)

function useTabs() {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs provider')
  }
  return context
}

export interface TabsProps {
  defaultValue: string
  children: ReactNode
  className?: string
}

export function Tabs({ defaultValue, children, className }: Readonly<TabsProps>) {
  const [activeTab, setActiveTab] = useState(defaultValue)

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

export interface TabsListProps {
  children: ReactNode
  className?: string
}

export function TabsList({ children, className }: Readonly<TabsListProps>) {
  return (
    <div
      className={cn(
        'flex items-center gap-6 border-b border-gray-200 dark:border-zinc-800',
        className
      )}
    >
      {children}
    </div>
  )
}

export interface TabsTriggerProps {
  value: string
  children: ReactNode
  count?: number
  className?: string
}

export function TabsTrigger({
  value,
  children,
  count,
  className,
}: Readonly<TabsTriggerProps>) {
  const { activeTab, setActiveTab } = useTabs()
  const isActive = activeTab === value

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={cn(
        'cursor-pointer relative pb-3 text-sm font-medium transition-colors duration-200',
        isActive
          ? 'text-gray-900 dark:text-white'
          : 'text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:hover:text-zinc-300',
        className
      )}
    >
      <span className="flex items-center gap-2">
        {children}
        {count !== undefined && (
          <span
            className={cn(
              'text-xs',
              isActive
                ? 'text-gray-600 dark:text-zinc-300'
                : 'text-gray-400 dark:text-zinc-500'
            )}
          >
            {count}
          </span>
        )}
      </span>
      {isActive && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-lime" />
      )}
    </button>
  )
}

export interface TabsContentProps {
  value: string
  children: ReactNode
  className?: string
}

export function TabsContent({
  value,
  children,
  className,
}: Readonly<TabsContentProps>) {
  const { activeTab } = useTabs()

  if (activeTab !== value) return null

  return <div className={className}>{children}</div>
}
