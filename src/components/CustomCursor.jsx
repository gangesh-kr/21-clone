import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false)
  const [hidden, setHidden] = useState(true)
  const [isTouch, setIsTouch] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 30, stiffness: 700, mass: 0.1 }
  const cursorSpringX = useSpring(cursorX, springConfig)
  const cursorSpringY = useSpring(cursorY, springConfig)

  useEffect(() => {
    // Detect touch device via touch events rather than rigid media query
    const handleTouchStart = () => {
      setIsTouch(true)
    }
    window.addEventListener('touchstart', handleTouchStart, { passive: true })

    const moveCursor = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setHidden(false)
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
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      observer.disconnect()
    }
  }, [])

  if (isTouch || hidden) return null

  return (
    <>
      {/* Outer Ring with spring lag */}
      <motion.div
        style={{
          left: cursorSpringX,
          top: cursorSpringY,
          translateX: '-50%',
          translateY: '-50%',
          boxShadow: '0 0 5px rgba(255, 255, 255, 0.4), inset 0 0 3px rgba(255, 255, 255, 0.1)'
        }}
        animate={{
          scale: hovered ? 1.6 : 1,
          borderColor: hovered ? '#1b365d' : 'rgba(27, 54, 93, 0.6)',
          backgroundColor: hovered ? 'rgba(27, 54, 93, 0.15)' : 'rgba(27, 54, 93, 0)'
        }}
        className="fixed w-9 h-9 rounded-full border-2 border-[#1b365d]/60 pointer-events-none z-[9999] hidden md:block"
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      />
      {/* Inner Pinpoint Dot */}
      <motion.div
        style={{
          left: cursorX,
          top: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          boxShadow: '0 0 3px rgba(255, 255, 255, 0.6)'
        }}
        animate={{
          scale: hovered ? 0.6 : 1,
          backgroundColor: hovered ? '#1b365d' : '#1b365d'
        }}
        className="fixed w-1.5 h-1.5 rounded-full bg-[#1b365d] pointer-events-none z-[9999] hidden md:block"
      />
    </>
  )
}
