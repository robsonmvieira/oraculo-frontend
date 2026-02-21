import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks'

export interface AudienceStats {
  type: 'Curated Audience' | 'Auto-generated'
  totalMembers: number
  monthlyGrowth: number
}

export interface RadarData {
  age: number
  reach: number
  size: number
  activity: number
  growth: number
}

export interface AboutAudiencePanelProps {
  stats: AudienceStats
  radarData: RadarData
  audienceName: string
  comparisonName?: string
}

function formatNumber(num: number): string {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(0)}K`
  }
  return num.toString()
}

function RadarChart({
  data,
  audienceName,
  comparisonName,
}: {
  data: RadarData
  audienceName: string
  comparisonName?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 40

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Labels
    const labels = ['Age', 'Reach', 'Size', 'Activity', 'Growth']
    const values = [data.age, data.reach, data.size, data.activity, data.growth]
    const numPoints = labels.length
    const angleStep = (Math.PI * 2) / numPoints
    const startAngle = -Math.PI / 2 // Start from top

    // Draw grid lines
    ctx.strokeStyle = 'rgba(113, 113, 122, 0.2)' // zinc-500 with opacity
    ctx.lineWidth = 1

    // Draw concentric pentagons (grid)
    for (let level = 1; level <= 5; level++) {
      const levelRadius = (radius * level) / 5
      ctx.beginPath()
      for (let i = 0; i <= numPoints; i++) {
        const angle = startAngle + i * angleStep
        const x = centerX + Math.cos(angle) * levelRadius
        const y = centerY + Math.sin(angle) * levelRadius
        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.closePath()
      ctx.stroke()
    }

    // Draw spokes
    for (let i = 0; i < numPoints; i++) {
      const angle = startAngle + i * angleStep
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius)
      ctx.stroke()
    }

    // Draw labels
    ctx.fillStyle = 'rgba(161, 161, 170, 0.9)' // zinc-400
    ctx.font = '11px Inter, system-ui, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    for (let i = 0; i < numPoints; i++) {
      const angle = startAngle + i * angleStep
      const labelRadius = radius + 25
      const x = centerX + Math.cos(angle) * labelRadius
      const y = centerY + Math.sin(angle) * labelRadius
      ctx.fillText(labels[i], x, y)
    }

    // Draw comparison area (Reddit Avg) - red/pink
    const avgValues = [50, 60, 70, 50, 40] // Average values
    ctx.beginPath()
    for (let i = 0; i <= numPoints; i++) {
      const idx = i % numPoints
      const angle = startAngle + idx * angleStep
      const valueRadius = (radius * avgValues[idx]) / 100
      const x = centerX + Math.cos(angle) * valueRadius
      const y = centerY + Math.sin(angle) * valueRadius
      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.closePath()
    ctx.fillStyle = 'rgba(239, 68, 68, 0.1)' // red with low opacity
    ctx.fill()
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.5)'
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw audience data area - lime/cyan
    const drawAudienceData = (progress: number) => {
      ctx.beginPath()
      for (let i = 0; i <= numPoints; i++) {
        const idx = i % numPoints
        const angle = startAngle + idx * angleStep
        const valueRadius = (radius * values[idx] * progress) / 100
        const x = centerX + Math.cos(angle) * valueRadius
        const y = centerY + Math.sin(angle) * valueRadius
        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.closePath()
      ctx.fillStyle = 'rgba(165, 241, 81, 0.15)' // lime with opacity
      ctx.fill()
      ctx.strokeStyle = 'rgba(165, 241, 81, 0.8)'
      ctx.lineWidth = 2
      ctx.stroke()
    }

    if (prefersReducedMotion) {
      drawAudienceData(1)
    } else {
      // Animate the audience data
      let progress = 0
      const animate = () => {
        if (progress >= 1) return

        progress += 0.05
        if (progress > 1) progress = 1

        // Clear and redraw
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Redraw grid
        ctx.strokeStyle = 'rgba(113, 113, 122, 0.2)'
        ctx.lineWidth = 1
        for (let level = 1; level <= 5; level++) {
          const levelRadius = (radius * level) / 5
          ctx.beginPath()
          for (let i = 0; i <= numPoints; i++) {
            const angle = startAngle + i * angleStep
            const x = centerX + Math.cos(angle) * levelRadius
            const y = centerY + Math.sin(angle) * levelRadius
            if (i === 0) {
              ctx.moveTo(x, y)
            } else {
              ctx.lineTo(x, y)
            }
          }
          ctx.closePath()
          ctx.stroke()
        }

        // Redraw spokes
        for (let i = 0; i < numPoints; i++) {
          const angle = startAngle + i * angleStep
          ctx.beginPath()
          ctx.moveTo(centerX, centerY)
          ctx.lineTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius)
          ctx.stroke()
        }

        // Redraw labels
        ctx.fillStyle = 'rgba(161, 161, 170, 0.9)'
        ctx.font = '11px Inter, system-ui, sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        for (let i = 0; i < numPoints; i++) {
          const angle = startAngle + i * angleStep
          const labelRadius = radius + 25
          const x = centerX + Math.cos(angle) * labelRadius
          const y = centerY + Math.sin(angle) * labelRadius
          ctx.fillText(labels[i], x, y)
        }

        // Redraw avg area
        ctx.beginPath()
        for (let i = 0; i <= numPoints; i++) {
          const idx = i % numPoints
          const angle = startAngle + idx * angleStep
          const valueRadius = (radius * avgValues[idx]) / 100
          const x = centerX + Math.cos(angle) * valueRadius
          const y = centerY + Math.sin(angle) * valueRadius
          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.closePath()
        ctx.fillStyle = 'rgba(239, 68, 68, 0.1)'
        ctx.fill()
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.5)'
        ctx.lineWidth = 2
        ctx.stroke()

        drawAudienceData(progress)

        requestAnimationFrame(animate)
      }
      animate()
    }
  }, [data, prefersReducedMotion])

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        width={240}
        height={240}
        className="max-w-full"
      />
      <div className="flex items-center gap-4 mt-2 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-red-500/50" />
          <span className="text-gray-500 dark:text-zinc-400">Reddit Avg</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-lime/50" />
          <span className="text-gray-500 dark:text-zinc-400">{audienceName}</span>
        </div>
        {comparisonName && (
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-cyan-500/50" />
            <span className="text-gray-500 dark:text-zinc-400">{comparisonName}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export function AboutAudiencePanel({
  stats,
  radarData,
  audienceName,
  comparisonName,
}: Readonly<AboutAudiencePanelProps>) {
  const panelRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!panelRef.current || prefersReducedMotion) return

    gsap.fromTo(
      panelRef.current,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
    )
  }, [prefersReducedMotion])

  return (
    <div
      ref={panelRef}
      className="bg-white dark:bg-zinc-900 rounded-2xl p-5"
    >
      <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
        About this audience
      </h3>

      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500 dark:text-zinc-400">
            {stats.type === 'Curated Audience' ? '📋' : '✨'}
          </span>
          <span className="text-gray-600 dark:text-zinc-300">{stats.type}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500 dark:text-zinc-400">👥</span>
          <span className="text-gray-600 dark:text-zinc-300">
            {formatNumber(stats.totalMembers)} Members
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500 dark:text-zinc-400">📈</span>
          <span className="text-gray-600 dark:text-zinc-300">
            {stats.monthlyGrowth >= 0 ? '+' : ''}
            {stats.monthlyGrowth.toFixed(1)}% / month
          </span>
        </div>
      </div>

      <RadarChart
        data={radarData}
        audienceName={audienceName}
        comparisonName={comparisonName}
      />
    </div>
  )
}
