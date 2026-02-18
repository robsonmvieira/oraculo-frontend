import { useEffect, useRef, type RefObject } from 'react'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from './useReducedMotion'

interface UseHoverTiltOptions {
  maxTilt?: number
  perspective?: number
  scale?: number
  speed?: number
}

export function useHoverTilt<T extends HTMLElement>(
  options: UseHoverTiltOptions = {}
): RefObject<T | null> {
  const ref = useRef<T>(null)
  const prefersReducedMotion = useReducedMotion()

  const {
    maxTilt = 10,
    perspective = 800,
    scale = 1.02,
    speed = 0.3,
  } = options

  useEffect(() => {
    if (!ref.current || prefersReducedMotion) return

    const element = ref.current
    element.style.perspective = `${perspective}px`
    element.style.transformStyle = 'preserve-3d'

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const mouseX = e.clientX - centerX
      const mouseY = e.clientY - centerY

      const rotateX = (mouseY / (rect.height / 2)) * -maxTilt
      const rotateY = (mouseX / (rect.width / 2)) * maxTilt

      gsap.to(element, {
        rotateX,
        rotateY,
        scale,
        duration: speed,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(element, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: speed,
        ease: 'power2.out',
      })
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [maxTilt, perspective, scale, speed, prefersReducedMotion])

  return ref
}
