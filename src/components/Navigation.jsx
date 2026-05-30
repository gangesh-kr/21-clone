import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Sustainability', href: '#sustainability' },
  { label: 'Markets', href: '#markets' },
  { label: 'FMCG', href: '#fmcg' },
  { label: 'Contact', href: '#contact' }
]

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [navTheme, setNavTheme] = useState('transparent') // 'transparent' | 'white' | 'hidden'
  const [activeSection, setActiveSection] = useState('#home')

  const timeoutRef = useRef(null)
  const isHoveredRef = useRef(false)
  const menuOpenRef = useRef(false)

  useEffect(() => {
    let lastScrollY = window.scrollY

    const hideNavbar = () => {
      if (isHoveredRef.current || menuOpenRef.current) return
      const currentScrollY = window.scrollY
      const hero = document.getElementById('home')
      const heroHeight = hero ? hero.offsetHeight : window.innerHeight
      if (currentScrollY < heroHeight) {
        if (currentScrollY <= 80) {
          setNavTheme('transparent')
        } else {
          setNavTheme('white')
        }
        return
      }
      setNavTheme('hidden')
    }

    const showNavbar = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY <= 80) {
        setNavTheme('transparent')
      } else {
        setNavTheme('white')
      }

      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(hideNavbar, 2000)
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // 1. Detect Active Section
      const scrollPosition = currentScrollY + window.innerHeight / 3
      const sections = ['#home', '#about', '#services', '#sustainability', '#markets', '#fmcg', '#contact']
      for (const section of sections) {
        const el = document.querySelector(section)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section)
            break
          }
        }
      }

      // 2. Navigation State transitions
      if (currentScrollY === 0) {
        showNavbar()
      } else if (currentScrollY > lastScrollY) {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        hideNavbar()
      } else if (currentScrollY < lastScrollY) {
        showNavbar()
      }

      lastScrollY = currentScrollY
    }

    // Capture wheel events globally (works at scrollY = 0)
    const handleWheel = (e) => {
      if (e.deltaY < 0) {
        showNavbar()
      } else if (e.deltaY > 0) {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        hideNavbar()
      }
    }

    // Capture touch gesture for mobile devices
    let touchStartY = 0
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY
    }
    const handleTouchMove = (e) => {
      const touchY = e.touches[0].clientY
      const deltaY = touchY - touchStartY
      if (deltaY > 8) {
        showNavbar()
      } else if (deltaY < -8) {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        hideNavbar()
      }
      touchStartY = touchY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('wheel', handleWheel, { passive: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })

    showNavbar()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <>
      <nav
        className={`nav-header nav-state-${navTheme}`}
        onMouseEnter={() => {
          isHoveredRef.current = true
          if (timeoutRef.current) clearTimeout(timeoutRef.current)
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false
          if (timeoutRef.current) clearTimeout(timeoutRef.current)
          timeoutRef.current = setTimeout(() => {
            if (!isHoveredRef.current && !menuOpenRef.current) {
              hideNavbar()
            }
          }, 2000)
        }}
      >
        <a
          href="#home"
          className="nav-logo font-sans text-[0.95rem] font-light tracking-[0.28em] z-[1001]"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          TWENTY1GLOBAL
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-10 list-none">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className={`nav-menu-link text-[11px] font-sans font-light tracking-[0.25em] uppercase transition-colors duration-300 relative pb-1 ${
                  activeSection === href ? 'active' : ''
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop Utility Link / Lang */}
        <div className="hidden md:flex items-center gap-6 z-[1001]">
          <a
            href="#contact"
            className="nav-btn text-[10px] tracking-[0.22em] uppercase border border-white/20 px-4 py-2 transition-all duration-300 font-sans font-light"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Get In Touch
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden flex flex-col gap-[5px] cursor-pointer p-[6px] z-[1001] bg-transparent border-none relative"
          onClick={() => {
            const next = !menuOpen
            setMenuOpen(next)
            menuOpenRef.current = next
            if (next) {
              if (timeoutRef.current) clearTimeout(timeoutRef.current)
            } else {
              if (timeoutRef.current) clearTimeout(timeoutRef.current)
              timeoutRef.current = setTimeout(() => {
                if (!isHoveredRef.current && !menuOpenRef.current) {
                  hideNavbar()
                }
              }, 2000)
            }
          }}
          aria-label="Toggle menu"
        >
          <span className={`burger-line block w-[22px] h-[1px] bg-current transition-all duration-300 ${menuOpen ? 'translate-y-[6px] rotate-45' : ''}`} />
          <span className={`burger-line block w-[22px] h-[1px] bg-current transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`burger-line block w-[22px] h-[1px] bg-current transition-all duration-300 ${menuOpen ? '-translate-y-[6px] -rotate-45' : ''}`} />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[999] bg-[#0a0e17] flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="text-[1.1rem] tracking-[0.28em] uppercase text-[#a3b3c2] font-light hover:text-[#f4f6f8] transition-colors"
                onClick={(e) => {
                  e.preventDefault()
                  setMenuOpen(false)
                  setTimeout(() => {
                    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
                  }, 100)
                }}
              >
                {label}
              </a>
            ))}
            <a
              href="#contact"
              className="mt-4 text-[0.75rem] tracking-[0.22em] uppercase border border-white/10 px-8 py-3 text-[#f4f6f8] hover:border-white/30 transition-all font-light"
              onClick={(e) => {
                e.preventDefault()
                setMenuOpen(false)
                setTimeout(() => {
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                }, 100)
              }}
            >
              Get In Touch
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

