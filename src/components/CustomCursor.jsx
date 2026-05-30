import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false)
  const [hidden, setHidden] = useState(true)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 45, stiffness: 400, mass: 0.4 }
  const cursorSpringX = useSpring(cursorX, springConfig)
  const cursorSpringY = useSpring(cursorY, springConfig)

  useEffect(() => {
    // Check if pointer events are supported (exclude touch devices)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return
    }

    const moveCursor = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (hidden) setHidden(false)
    }

    const handleMouseEnter = () => setHidden(false)
    const handleMouseLeave = () => setHidden(true)

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    const addHoverListeners = () => {
      const clickables = document.querySelectorAll('a, button, [role="button"], .dot-nav-item, .proc-num, .svc-card, .why-card, .fmcg-country, .geo-tag')
      clickables.forEach((el) => {
        el.addEventListener('mouseenter', () => setHovered(true))
        el.addEventListener('mouseleave', () => setHovered(false))
      })
    }

    addHoverListeners()

    // Observe layout changes to bind elements dynamically
    const observer = new MutationObserver(addHoverListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      observer.disconnect()
    }
  }, [hidden])

  if (hidden) return null

  return (
    <>
      {/* Outer Ring with spring lag */}
      <motion.div
        style={{
          left: cursorSpringX,
          top: cursorSpringY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          scale: hovered ? 1.6 : 1,
          borderColor: hovered ? '#a5f3fc' : 'rgba(255, 255, 255, 0.4)',
          backgroundColor: hovered ? 'rgba(165, 243, 252, 0.05)' : 'rgba(255, 255, 255, 0)'
        }}
        className="fixed w-9 h-9 rounded-full border border-white/40 pointer-events-none z-[9999] hidden md:block"
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      />
      {/* Inner Pinpoint Dot */}
      <motion.div
        style={{
          left: cursorX,
          top: cursorY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          scale: hovered ? 0.6 : 1,
          backgroundColor: hovered ? '#2d628c' : '#ffffff'
        }}
        className="fixed w-1.5 h-1.5 rounded-full bg-white pointer-events-none z-[9999] hidden md:block"
      />
    </>
  )
}
