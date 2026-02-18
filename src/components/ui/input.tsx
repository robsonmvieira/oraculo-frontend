import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    if (icon) {
      return (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-zinc-500" />
          <input
            type={type}
            className={cn(
              'flex h-10 w-full rounded-full border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white pl-10 pr-4 py-2 text-sm placeholder:text-gray-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-lime transition-colors duration-300',
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
      )
    }

    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white px-4 py-2 text-sm placeholder:text-gray-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-lime transition-colors duration-300',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

export { Input }
