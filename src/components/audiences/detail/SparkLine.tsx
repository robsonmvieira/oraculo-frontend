import { useRef, useEffect } from 'react'

export function SparkLine({ growth }: Readonly<{ growth: number }>) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    ctx.clearRect(0, 0, width, height)

    // Generate sparkline data based on growth
    const points = 20
    const data: number[] = []
    let value = 30 + Math.random() * 20

    for (let i = 0; i < points; i++) {
      const extraValue =growth > 100 ? 0.55 : 0.5
      const trend = growth > 200 ? 0.6 : extraValue
      value = value + (Math.random() - (1 - trend)) * 10
      value = Math.max(10, Math.min(90, value))
      data.push(value)
    }

    // Draw line
    ctx.beginPath()
    ctx.strokeStyle = '#4ade80' // green-400
    ctx.lineWidth = 2

    data.forEach((val, i) => {
      const x = (i / (points - 1)) * width
      const y = height - (val / 100) * height
      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.stroke()
  }, [growth])

  return <canvas ref={canvasRef} width={70} height={28} />
}
