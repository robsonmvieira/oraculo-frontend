import { Icon } from '@iconify/react'
import { useGsapEntrance } from '@/hooks'

const FONT_DISPLAY = { fontFamily: "'Space Grotesk', sans-serif" }

export function LandingHero() {
  const ref = useGsapEntrance<HTMLElement>({
    y: 40,
    stagger: 0.15,
    duration: 1.2,
    delay: 0.6,
    ease: 'power3.out',
  })

  return (
    <main ref={ref} className="flex max-w-4xl flex-col">
      <div className="mb-6 flex items-center gap-3">
        <div className="h-px w-8 bg-purple-500/50" />
        <span className="font-mono text-xs uppercase tracking-widest text-purple-400">
          Infinit ideas
        </span>
      </div>

      <h1
        className="mb-8 bg-linear-to-br from-white via-white to-white/40 bg-clip-text text-5xl font-medium leading-[0.9] tracking-tight text-transparent md:text-7xl lg:text-8xl"
        style={FONT_DISPLAY}
      >
        Infinite ideas <br />
        in{' '}
        <span className="font-light italic text-purple-400">Reddit.</span>
      </h1>

      <p className="mb-10 max-w-md text-sm font-light leading-relaxed text-white/60 md:text-base">
        Find what really matters. Generate ideas and insights, ideas valuable for your business and build content that really impact your audience.
      </p>

      <div className="pointer-events-auto flex items-center gap-4">
        <button className="cursor-pointer group relative flex items-center justify-center gap-3 overflow-hidden rounded-full bg-white px-8 py-3.5 text-black transition-transform hover:scale-105 active:scale-95">
          <span className="relative z-10 text-sm font-semibold tracking-tight">
           Login Now
          </span>
          <Icon
            icon="solar:arrow-right-up-linear"
            className="relative z-10 text-lg transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
          />
          <div className="absolute inset-0 bg-linear-to-r from-purple-200 to-purple-400 opacity-0 transition-opacity group-hover:opacity-100" />
        </button>

        <button className="cursor-pointer group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-colors hover:border-purple-500/30 hover:bg-white/10">
          <Icon
            icon="solar:play-linear"
            className="ml-0.5 text-xl text-white transition-colors group-hover:text-purple-400"
          />
        </button>
      </div>
    </main>
  )
}
