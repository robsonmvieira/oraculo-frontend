import { useRef, useEffect } from 'react'

interface SparkLineProps {
  growth: number
  historyData?: number[]
  strokeColor?: string
}

export function SparkLine({ growth, historyData, strokeColor = '#4ade80' }: Readonly<SparkLineProps>) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    ctx.clearRect(0, 0, width, height)

    let data: number[]

    if (historyData && historyData.length >= 2) {
      // Use real data: normalize to 0-100 range for canvas
      const min = Math.min(...historyData)
      const max = Math.max(...historyData)
      const range = max - min || 1
      data = historyData.map((v) => ((v - min) / range) * 80 + 10)
    } else {
      // Fallback: generate sparkline data based on growth
      const points = 20
      data = []
      let value = 30 + Math.random() * 20

      for (let i = 0; i < points; i++) {
        const extraValue = growth > 100 ? 0.55 : 0.5
        const trend = growth > 200 ? 0.6 : extraValue
        value = value + (Math.random() - (1 - trend)) * 10
        value = Math.max(10, Math.min(90, value))
        data.push(value)
      }
    }

    // Draw line
    ctx.beginPath()
    ctx.strokeStyle = strokeColor
    ctx.lineWidth = 2

    data.forEach((val, i) => {
      const x = (i / (data.length - 1)) * width
      const y = height - (val / 100) * height
      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.stroke()
  }, [growth, historyData, strokeColor])

  return <canvas ref={canvasRef} width={70} height={28} />
}
