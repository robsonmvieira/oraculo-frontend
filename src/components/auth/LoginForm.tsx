import { useState } from 'react'
import { Icon } from '@iconify/react'
import { useGsapEntrance } from '@/hooks'

const FONT_DISPLAY = { fontFamily: "'Space Grotesk', sans-serif" }

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)

  const ref = useGsapEntrance<HTMLDivElement>({
    y: 30,
    stagger: 0.1,
    duration: 1,
    delay: 0.3,
    ease: 'power3.out',
  })

  return (
    <div
      ref={ref}
      className="flex w-full max-w-md flex-col gap-8 px-6 md:px-0"
    >
      {/* Logo */}
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

      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1
          className="text-3xl font-medium tracking-tight text-white"
          style={FONT_DISPLAY}
        >
          Welcome back
        </h1>
        <p className="text-sm text-white/50">
          Sign in to your account to continue
        </p>
      </div>

      {/* Form */}
      <form
        className="flex flex-col gap-5"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-white/60">Email</label>
          <input
            type="email"
            placeholder="your@email.com"
            className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-white/30 transition-colors duration-300 focus:border-purple-500 focus:outline-none"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-white/60">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 pr-11 text-sm text-white placeholder:text-white/30 transition-colors duration-300 focus:border-purple-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-white/40 transition-colors hover:text-white/70"
            >
              <Icon
                icon={
                  showPassword
                    ? 'solar:eye-linear'
                    : 'solar:eye-closed-linear'
                }
                className="text-lg"
              />
            </button>
          </div>
        </div>

        {/* Remember me + Forgot password */}
        <div className="flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-white/20 bg-white/5 text-purple-500 focus:ring-purple-500 focus:ring-offset-0"
            />
            <span className="text-xs text-white/50">Remember me</span>
          </label>
          <a
            href="#"
            className="text-xs text-purple-400 transition-colors hover:text-purple-300"
          >
            Forgot password?
          </a>
        </div>

        {/* Sign in button */}
        <button
          type="submit"
          className="group relative flex h-12 w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full bg-white text-black transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <span className="relative z-10 text-sm font-semibold tracking-tight">
            Sign in
          </span>
          <Icon
            icon="solar:arrow-right-up-linear"
            className="relative z-10 text-lg transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
          <div className="absolute inset-0 bg-linear-to-r from-purple-200 to-purple-400 opacity-0 transition-opacity group-hover:opacity-100" />
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-xs text-white/30">or</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      {/* Social login */}
      <button
        type="button"
        className="flex h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:border-white/20 hover:bg-white/10"
      >
        <Icon icon="flat-color-icons:google" className="text-xl" />
        <span className="text-sm font-medium">Continue with Google</span>
      </button>

      {/* Sign up link */}
      <p className="text-center text-xs text-white/40">
        Don&apos;t have an account?{' '}
        <a
          href="#"
          className="text-purple-400 transition-colors hover:text-purple-300"
        >
          Sign up
        </a>
      </p>
    </div>
  )
}
