import { useParticleCloud } from '@/hooks'

export function ParticleBackground() {
  const containerRef = useParticleCloud()

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 h-full w-full"
    />
  )
}
