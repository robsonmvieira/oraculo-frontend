import { Icon } from '@iconify/react'

const FONT_DISPLAY = { fontFamily: "'Space Grotesk', sans-serif" }

export function LandingNavbar() {
  return (
    <nav className="pointer-events-auto flex w-full items-center justify-between">
      <div className="group flex cursor-pointer items-center gap-2">
        <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/5 transition-colors group-hover:border-purple-500/50">
          <Icon
            icon="solar:atom-linear"
            className="text-xl text-white transition-transform duration-500 group-hover:rotate-180 group-hover:text-purple-400"
          />
        </div>
        <span
          className="text-sm font-medium tracking-tight text-white/90"
          style={FONT_DISPLAY}
        >
          Oraculo<span className="text-purple-400">Lab</span>
        </span>
      </div>

      <div className="hidden items-center gap-8 md:flex">
        <a
          className="cursor-pointer text-xs font-medium text-white/60 transition-colors hover:text-white"
          href="#"
        >
          Register
        </a>
        {/* <a
          className="text-xs font-medium text-white/60 transition-colors hover:text-white"
          href="#"
        >
          STUDIO
        </a> */}
        <button className="cursor-pointer rounded-full border border-white/5 bg-white/10 px-4 py-1.5 text-xs font-medium backdrop-blur-md transition-colors hover:bg-white/20">
          Login
        </button>
      </div>

      <button className="text-2xl text-white/80 md:hidden">
        <Icon icon="solar:hamburger-menu-linear" />
      </button>
    </nav>
  )
}
