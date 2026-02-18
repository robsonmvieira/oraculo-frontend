import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

gsap.defaults({
  ease: 'power2.out',
  duration: 0.4,
})

gsap.config({
  nullTargetWarn: false,
})

export { gsap, ScrollTrigger }
