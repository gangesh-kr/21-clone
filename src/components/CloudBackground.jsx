import { useEffect, useRef } from 'react'

export default function CloudBackground() {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let width = (canvas.width = container.offsetWidth)
    let height = (canvas.height = container.offsetHeight)

    // Load cloud image
    const cloudImg = new Image()
    cloudImg.src = '/cloud-particle.png'

    const particles = []
    const particleCount = 7 // Small number of huge particles for performance & soft layering

    // Mouse interactive coordinates
    let mouseX = 0
    let mouseY = 0
    let targetMouseX = 0
    let targetMouseY = 0

    class CloudParticle {
      constructor() {
        this.reset(true)
      }

      reset(init = false) {
        this.scale = Math.random() * 2.2 + 1.6 // Huge volumetric scales
        this.w = 512 * this.scale
        this.h = 512 * this.scale

        if (init) {
          // Spread initially across the screen width
          this.x = Math.random() * (width + this.w) - this.w
        } else {
          // Spawn just off the left edge to drift right
          this.x = -this.w
        }
        
        // Spawn across height with padding
        this.y = Math.random() * (height - this.h * 0.4) - this.h * 0.3

        this.vx = Math.random() * 0.08 + 0.04 // extremely slow, majestic drift
        this.vy = (Math.random() - 0.5) * 0.02 // barely noticeable vertical drift
        this.opacity = Math.random() * 0.16 + 0.08 // low opacity for soft blending
        this.rotation = Math.random() * Math.PI * 2
        this.vRotation = (Math.random() - 0.5) * 0.00015 // extremely slow rotation
        this.depth = Math.random() * 0.4 + 0.6 // depth factor for parallax (0.6 to 1.0)
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        this.rotation += this.vRotation

        // Reset when it goes fully past the right edge
        if (this.x > width) {
          this.reset(false)
        }
      }

      draw(parallaxX, parallaxY) {
        ctx.save()
        ctx.globalAlpha = this.opacity
        
        // Shift drawing coordinates based on mouse parallax and depth
        const drawX = this.x + this.w / 2 + parallaxX * this.depth
        const drawY = this.y + this.h / 2 + parallaxY * this.depth
        
        ctx.translate(drawX, drawY)
        ctx.rotate(this.rotation)
        ctx.drawImage(cloudImg, -this.w / 2, -this.h / 2, this.w, this.h)
        ctx.restore()
      }
    }

    const init = () => {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new CloudParticle())
      }
    }

    let isVisible = true

    const animate = () => {
      if (!isVisible) return

      ctx.clearRect(0, 0, width, height)

      // Lerp mouse coordinates for organic deceleration feel
      mouseX += (targetMouseX - mouseX) * 0.05
      mouseY += (targetMouseY - mouseY) * 0.05

      // Draw all cloud particles
      particles.forEach((p) => {
        p.update()
        p.draw(mouseX, mouseY)
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    cloudImg.onload = () => {
      init()
      animate()
    }

    // Set up mouse move tracking
    const handleMouseMove = (e) => {
      // Calculate mouse offset from center in pixels (-25px to +25px)
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * -50
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * -50
    }

    // Handle container resize
    const handleResize = () => {
      if (!container || !canvas) return
      width = canvas.width = container.offsetWidth
      height = canvas.height = container.offsetHeight
    }

    // Performance Optimization: Only animate when visible in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting
          if (isVisible) {
            animate()
          } else {
            cancelAnimationFrame(animationFrameId)
          }
        })
      },
      { threshold: 0.05 }
    )

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })
    observer.observe(container)

    // Trigger initial resize to fit container
    handleResize()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      observer.disconnect()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-65"
      />
    </div>
  )
}
