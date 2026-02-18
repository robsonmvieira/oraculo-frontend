import { type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1 font-bold text-xs whitespace-nowrap',
  {
    variants: {
      variant: {
        success: 'bg-success-bg text-success',
        warning: 'bg-warning-bg text-warning',
        error: 'bg-error-bg text-error',
        info: 'bg-info-bg text-info',
        purple: 'bg-purple-bg text-purple',
        neutral: 'bg-gray-100 text-gray-600',
        dark: 'bg-dark text-white',
        lime: 'bg-lime text-black',
        limeDark: 'bg-black text-lime',
      },
      size: {
        sm: 'px-2 py-0.5 rounded-md',
        md: 'px-3 py-1 rounded-full',
        lg: 'px-4 py-1.5 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'neutral',
      size: 'md',
    },
  }
)

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size, className }))} {...props} />
  )
}

export { Badge, badgeVariants }
