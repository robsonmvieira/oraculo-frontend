import { useSpaceGrotesk } from '@/hooks'
import { ParticleBackground } from '@/components/landing'
import { LoginForm } from '@/components/auth'

export function LoginPage() {
  useSpaceGrotesk()

  return (
    <section className="relative grid h-screen w-full md:grid-cols-2 bg-[#030014] text-white antialiased selection:bg-purple-500 selection:text-white">
      {/* Left — Particle Cloud */}
      <div className="relative hidden overflow-hidden md:block">
        <ParticleBackground />
      </div>

      {/* Right — Login Form */}
      <div className="relative z-10 flex items-center justify-center">
        <LoginForm />
      </div>
    </section>
  )
}

export default LoginPage
