import { useSpaceGrotesk } from '@/hooks'
import {
  ParticleBackground,
  LandingNavbar,
  LandingHero,
  LandingFooterStats,
} from '@/components/landing'

export function LandingPage() {
  useSpaceGrotesk()

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#030014] text-white antialiased selection:bg-purple-500 selection:text-white">
      <ParticleBackground />

      <div className="pointer-events-none relative z-10 flex h-full flex-col justify-between p-6 md:p-12">
        <LandingNavbar />
        <LandingHero />
        <LandingFooterStats />
      </div>
    </section>
  )
}

export default LandingPage
