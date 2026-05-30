import { useState, useEffect } from 'react'

const DOTS = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'markets', label: 'Markets', href: '#markets' },
  { id: 'fmcg', label: 'FMCG', href: '#fmcg' },
  { id: 'sustainability', label: 'Sustainability', href: '#sustainability' },
  { id: 'contact', label: 'Contact', href: '#contact' }
]

export default function DotNavigation() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3

      for (const dot of DOTS) {
        const el = document.getElementById(dot.id)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(dot.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    // Run once initially
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = (e, href, id) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(id)
    }
  }

  return (
    <div className="dot-nav">
      {DOTS.map((dot) => (
        <a
          key={dot.id}
          href={dot.href}
          onClick={(e) => handleClick(e, dot.href, dot.id)}
          className={`dot-nav-item ${activeSection === dot.id ? 'active' : ''}`}
          aria-label={`Scroll to ${dot.label}`}
        >
          <span className="dot-nav-tooltip">{dot.label}</span>
        </a>
      ))}
    </div>
  )
}
