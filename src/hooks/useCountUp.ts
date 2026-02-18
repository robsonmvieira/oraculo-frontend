import { useEffect, useState, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from './useReducedMotion'

interface UseCountUpOptions {
  duration?: number
  delay?: number
  ease?: string
  decimals?: number
  prefix?: string
  suffix?: string
}

export function useCountUp(
  target: number,
  options: UseCountUpOptions = {}
): string {
  const {
    duration = 1.5,
    delay = 0,
    ease = 'power2.out',
    decimals = 0,
    prefix = '',
    suffix = '',
  } = options

  const prefersReducedMotion = useReducedMotion()
  const [displayValue, setDisplayValue] = useState(prefersReducedMotion ? target : 0)
  const valueRef = useRef({ value: 0 })

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayValue(target)
      return
    }

    valueRef.current.value = 0

    const tween = gsap.to(valueRef.current, {
      value: target,
      duration,
      delay,
      ease,
      onUpdate: () => {
        setDisplayValue(valueRef.current.value)
      },
    })

    return () => {
      tween.kill()
    }
  }, [target, duration, delay, ease, prefersReducedMotion])

  const formattedValue = decimals > 0
    ? displayValue.toFixed(decimals)
    : Math.round(displayValue).toLocaleString()

  return `${prefix}${formattedValue}${suffix}`
}
