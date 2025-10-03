'use client'

import { useEffect, useRef } from 'react'

export default function SophisticatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Sophisticated floating particles
    const particles: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
      hue: number
    }> = []

    // Create elegant particles
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.3 + 0.1,
        hue: Math.random() * 60 + 140 // Green to blue-green range
      })
    }

    let animationId: number
    let time = 0

    const animate = () => {
      time += 0.005
      
      // Create subtle gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, 'rgba(240, 253, 244, 0.95)') // Very light green
      gradient.addColorStop(0.5, 'rgba(236, 254, 245, 0.92)') // Slightly different green
      gradient.addColorStop(1, 'rgba(243, 244, 246, 0.95)') // Light gray

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Animate particles
      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Gentle floating motion
        particle.x += Math.sin(time + index * 0.1) * 0.2
        particle.y += Math.cos(time + index * 0.15) * 0.15

        // Wrap around screen
        if (particle.x < -10) particle.x = canvas.width + 10
        if (particle.x > canvas.width + 10) particle.x = -10
        if (particle.y < -10) particle.y = canvas.height + 10
        if (particle.y > canvas.height + 10) particle.y = -10

        // Subtle opacity animation
        particle.opacity = 0.1 + Math.sin(time * 2 + index * 0.3) * 0.1

        // Draw particle with soft glow
        const glowSize = particle.size * 3
        const glowGradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, glowSize
        )
        
        glowGradient.addColorStop(0, `hsla(${particle.hue}, 45%, 65%, ${particle.opacity * 0.8})`)
        glowGradient.addColorStop(0.5, `hsla(${particle.hue}, 35%, 55%, ${particle.opacity * 0.4})`)
        glowGradient.addColorStop(1, `hsla(${particle.hue}, 25%, 45%, 0)`)

        ctx.fillStyle = glowGradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2)
        ctx.fill()

        // Draw core particle
        ctx.fillStyle = `hsla(${particle.hue}, 50%, 70%, ${particle.opacity})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })

      // Add subtle connecting lines between nearby particles
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.08)'
      ctx.lineWidth = 0.5
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 120) {
            const opacity = (120 - distance) / 120 * 0.15
            ctx.strokeStyle = `rgba(34, 197, 94, ${opacity})`
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Add subtle wave pattern overlay
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.03)'
      ctx.lineWidth = 1
      
      for (let i = 0; i < 5; i++) {
        ctx.beginPath()
        const yOffset = canvas.height * 0.2 + i * canvas.height * 0.15
        
        for (let x = 0; x <= canvas.width; x += 10) {
          const y = yOffset + Math.sin((x * 0.005) + (time * 1.5) + (i * 0.5)) * 30
          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.stroke()
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />
      {/* Subtle overlay pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-emerald-50/10 pointer-events-none" />
      {/* Elegant noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </>
  )
}