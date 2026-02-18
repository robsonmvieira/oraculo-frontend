import { useEffect, useRef, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  icon?: ReactNode
  children: ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-2xl',
  lg: 'max-w-4xl',
  xl: 'max-w-6xl',
}

export function Modal({
  isOpen,
  onClose,
  title,
  icon,
  children,
  className,
  size = 'lg',
}: Readonly<ModalProps>) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!overlayRef.current || !contentRef.current) return

    if (isOpen) {
      document.body.style.overflow = 'hidden'

      if (!prefersReducedMotion) {
        gsap.set(overlayRef.current, { opacity: 0 })
        gsap.set(contentRef.current, { y: 20, scale: 0.95 })

        gsap.to(overlayRef.current, {
          opacity: 1,
          duration: 0.2,
          ease: 'power2.out',
        })

        gsap.to(contentRef.current, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
          delay: 0.1,
        })
      }
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen, prefersReducedMotion])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    >
      <div
        ref={contentRef}
        className={cn(
          'w-full bg-white dark:bg-zinc-900 rounded-2xl shadow-xl overflow-hidden',
          sizeClasses[size],
          className
        )}
      >
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              {icon && (
                <div className="text-gray-600 dark:text-zinc-400">{icon}</div>
              )}
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                {title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="cursor-pointer w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
        <div className="max-h-[calc(100vh-12rem)] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
