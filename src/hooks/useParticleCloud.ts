import { useEffect, useRef, type RefObject } from 'react'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { useReducedMotion } from './useReducedMotion'

// ─── Simplex Noise 3D (Stefan Gustavson) ───────────────────────────────────
const SIMPLEX_NOISE_GLSL = /* glsl */ `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
  + i.y + vec4(0.0, i1.y, i2.y, 1.0))
  + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`

// ─── Vertex Shader ─────────────────────────────────────────────────────────
const vertexShader = /* glsl */ `
${SIMPLEX_NOISE_GLSL}

uniform float uTime;
uniform vec3 uMouse;

attribute vec3 aRandom;

varying vec3 vColor;
varying float vAlpha;

void main() {
  vec3 pos = position;

  // Simplex noise morphing
  float noiseFreq = 0.6;
  float noiseAmp = 1.2;

  vec3 noisePos = vec3(
    pos.x * noiseFreq + uTime * 0.2,
    pos.y * noiseFreq + uTime * 0.3,
    pos.z * noiseFreq
  );

  float n = snoise(noisePos);
  vec3 dir = normalize(pos);
  pos += dir * n * noiseAmp;

  // Mouse repulsion
  float dist = distance(uMouse.xy, pos.xy);
  float influence = smoothstep(3.0, 0.0, dist);
  vec3 repelDir = normalize(pos - vec3(uMouse.xy, pos.z));
  pos += repelDir * influence * 1.5;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = 60.0 / -mvPosition.z;

  vColor = color;
  vAlpha = smoothstep(15.0, 0.0, -mvPosition.z);
}
`

// ─── Fragment Shader ───────────────────────────────────────────────────────
const fragmentShader = /* glsl */ `
varying vec3 vColor;
varying float vAlpha;

void main() {
  float r = distance(gl_PointCoord, vec2(0.5));
  if (r > 0.5) discard;

  float glow = 1.0 - (r * 2.0);
  glow = pow(glow, 1.5);

  gl_FragColor = vec4(vColor, vAlpha * glow);
}
`

export function useParticleCloud(): RefObject<HTMLDivElement | null> {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // ── Renderer ──
    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      powerPreference: 'high-performance',
      stencil: false,
      depth: false,
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.clientWidth, container.clientHeight)
    container.appendChild(renderer.domElement)

    // ── Scene ──
    const bgColor = new THREE.Color('#030014')
    const scene = new THREE.Scene()
    scene.background = bgColor
    scene.fog = new THREE.FogExp2(bgColor, 0.03)

    // ── Camera ──
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    )
    camera.position.set(0, 1, 8)

    // ── Particles ──
    const PARTICLE_COUNT = prefersReducedMotion ? 3000 : 12000
    const SPHERE_RADIUS = 5

    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const randoms = new Float32Array(PARTICLE_COUNT * 3)
    const colors = new Float32Array(PARTICLE_COUNT * 3)

    const purple = new THREE.Color('#a855f7')
    const skyBlue = new THREE.Color('#38bdf8')
    const tempColor = new THREE.Color()

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3

      // Uniform sphere surface distribution
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      const r = SPHERE_RADIUS + (Math.random() - 0.5) * 0.5

      positions[i3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = r * Math.cos(phi)

      randoms[i3] = Math.random()
      randoms[i3 + 1] = Math.random()
      randoms[i3 + 2] = Math.random()

      tempColor.copy(purple).lerp(skyBlue, Math.random())
      colors[i3] = tempColor.r
      colors[i3 + 1] = tempColor.g
      colors[i3 + 2] = tempColor.b
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector3(-9999, -9999, 0) },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    // ── Post-processing ──
    const composer = new EffectComposer(renderer)
    composer.addPass(new RenderPass(scene, camera))

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(container.clientWidth, container.clientHeight),
      1.2,  // strength
      0.5,  // radius
      0.2   // threshold
    )
    composer.addPass(bloomPass)

    // ── Mouse ──
    const mouse = { x: 0, y: 0 }
    const uMouse = { x: -9999, y: -9999 }
    const targetRotation = { x: 0, y: 0 }

    const handleMouseMove = (e: MouseEvent) => {
      const w = window.innerWidth
      const h = window.innerHeight
      mouse.x = (e.clientX / w) * 2 - 1
      mouse.y = -(e.clientY / h) * 2 + 1
      targetRotation.x = (e.clientX - w / 2) * 0.0005
      targetRotation.y = (e.clientY - h / 2) * 0.0005
    }

    // ── Clock ──
    const clock = new THREE.Clock()

    // ── Animation loop ──
    const animate = () => {
      const elapsedTime = clock.getElapsedTime()

      // Update time uniform
      material.uniforms.uTime.value = elapsedTime

      if (!prefersReducedMotion) {
        // Smooth mouse follow (lerp 10% per frame)
        uMouse.x += (mouse.x * 4 - uMouse.x) * 0.1
        uMouse.y += (mouse.y * 4 - uMouse.y) * 0.1
        material.uniforms.uMouse.value.set(uMouse.x, uMouse.y, 0)

        // Sphere rotation follows mouse
        particles.rotation.x += (targetRotation.y - particles.rotation.x) * 0.05
        particles.rotation.y += (targetRotation.x - particles.rotation.y) * 0.05
      }

      // Constant Z rotation
      particles.rotation.z = elapsedTime * 0.02

      composer.render()
    }

    // ── Start ──
    renderer.setAnimationLoop(animate)
    document.addEventListener('mousemove', handleMouseMove)

    // ── Resize ──
    const handleResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      composer.setSize(w, h)
      bloomPass.resolution.set(w, h)
    }
    window.addEventListener('resize', handleResize)

    // ── Cleanup ──
    return () => {
      renderer.setAnimationLoop(null)
      document.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      composer.dispose()
      container.removeChild(renderer.domElement)
    }
  }, [prefersReducedMotion])

  return containerRef
}
