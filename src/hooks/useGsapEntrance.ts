import { useEffect, useRef, type RefObject } from 'react'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from './useReducedMotion'

interface UseGsapEntranceOptions {
  y?: number
  x?: number
  opacity?: number
  duration?: number
  delay?: number
  stagger?: number
  ease?: string
  trigger?: boolean
}

export function useGsapEntrance<T extends HTMLElement>(
  options: UseGsapEntranceOptions = {}
): RefObject<T | null> {
  const ref = useRef<T>(null)
  const prefersReducedMotion = useReducedMotion()

  const {
    y = 30,
    x = 0,
    opacity = 0,
    duration = 0.5,
    delay = 0,
    stagger = 0,
    ease = 'power2.out',
  } = options

  useEffect(() => {
    const element = ref.current
    if (!element || prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const targets = stagger > 0 ? Array.from(element.children) : element

      gsap.fromTo(
        targets,
        { y, x, opacity },
        {
          y: 0,
          x: 0,
          opacity: 1,
          duration,
          delay,
          stagger,
          ease,
          clearProps: 'transform',
        }
      )
    }, element)

    return () => ctx.revert()
  }, [y, x, opacity, duration, delay, stagger, ease, prefersReducedMotion])

  return ref
}
