import { useState } from 'react'

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-5 py-[1.2rem] md:px-14 bg-[rgba(245,240,232,0.96)] border-b border-[rgba(13,27,42,0.1)] backdrop-blur-[10px]">
        <a
          href="#home"
          className="font-serif text-[1.35rem] font-normal tracking-[0.06em] text-[var(--color-navy)] z-[1001]"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        >
          Twenty<span className="text-[var(--color-navy-soft)]">1</span>Global
        </a>

        <ul className="hidden md:flex gap-[2.2rem] list-none">
          {[
            ['About', '#about'],
            ['Services', '#services'],
            ['Markets', '#markets'],
            ['FMCG', '#fmcg'],
            ['Contact', '#contact'],
          ].map(([label, href]) => (
            <li key={href}>
              <a
                href={href}
                className="label-text hover:text-[var(--color-navy)] transition-colors duration-300"
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

        <button
          className="md:hidden flex flex-col gap-[5px] cursor-pointer p-[6px] z-[1001] bg-transparent border-none relative"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-[22px] h-[1.5px] bg-[var(--color-navy)] transition-all duration-300 ${menuOpen ? 'translate-y-[6.5px] rotate-45' : ''}`} />
          <span className={`block w-[22px] h-[1.5px] bg-[var(--color-navy)] transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`block w-[22px] h-[1.5px] bg-[var(--color-navy)] transition-all duration-300 ${menuOpen ? '-translate-y-[6.5px] -rotate-45' : ''}`} />
        </button>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-[999] bg-[var(--color-white)] flex-col items-center justify-center gap-[2.8rem] md:hidden ${
          menuOpen ? 'flex' : 'hidden'
        }`}
      >
        {[
          ['About', '#about'],
          ['Services', '#services'],
          ['Markets', '#markets'],
          ['FMCG', '#fmcg'],
          ['Contact', '#contact'],
        ].map(([label, href]) => (
          <a
            key={href}
            href={href}
            className="text-[1.1rem] tracking-[0.24em] uppercase text-[var(--color-navy)] font-light hover:text-[var(--color-navy-muted)] transition-colors"
            onClick={(e) => {
              e.preventDefault()
              setMenuOpen(false)
              document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            {label}
          </a>
        ))}
      </div>
    </>
  )
}
