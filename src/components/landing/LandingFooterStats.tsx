import { useCountUp } from '@/hooks'

export function LandingFooterStats() {
  const particleCount = useCountUp(12400, { duration: 2, delay: 0.8 })

  return (
    <footer className="pointer-events-auto flex items-end justify-between">
      <div className="flex flex-col gap-1">
        <span className="font-mono text-[10px] text-white/40">
          RENDER_TIME
        </span>
        <span className="font-mono text-xs text-purple-400">1.2ms</span>
      </div>

      <div className="hidden gap-12 md:flex">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[10px] text-white/40">
            PARTICLES
          </span>
          <span className="font-mono text-xs text-white/80">
            {particleCount}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[10px] text-white/40">STATUS</span>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
            <span className="font-mono text-xs text-white/80">ONLINE</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
