import React from 'react'

export default function Footer() {
  return (
    <footer className="relative z-10 bg-white text-[#1b365d] pt-24 pb-16 px-[10.3%] border-t border-[#1b365d]/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">

          {/* Column 1: Logo & Group Navigation */}
          <div className="flex flex-col justify-between min-h-[220px]">
            <div>
              {/* Functional outline circle logo acting as a scroll-to-top button */}
              {/* <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-[34px] h-[34px] rounded-full border border-[#1b365d]/60 hover:border-[#1b365d] hover:bg-[#1b365d]/5 hover:scale-105 active:scale-95 transition-all duration-300 mb-8 cursor-none focus:outline-none flex items-center justify-center"
                aria-label="Scroll to top"
              /> */}

              <div className="flex flex-col gap-3 text-[9px] tracking-[0.22em] font-light">
                <a href="#group" className="hover:text-[#1b365d]/60 transition-colors uppercase">TWENTY1GLOBAL GROUP</a>
                <a href="#trading" className="hover:text-[#1b365d]/60 transition-colors uppercase">TWENTY1GLOBAL TRADING</a>
                <a href="#capital" className="hover:text-[#1b365d]/60 transition-colors uppercase">TWENTY1GLOBAL CAPITAL</a>
                <a href="#maritime" className="hover:text-[#1b365d]/60 transition-colors uppercase">TWENTY1GLOBAL MARITIME</a>
                <a href="#energy" className="hover:text-[#1b365d]/60 transition-colors uppercase">FORT ENERGY</a>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-8 text-[9px] tracking-[0.22em] font-light text-[#1b365d]/60">
              <a href="#contact" className="hover:text-[#1b365d] transition-colors uppercase">CONTACT</a>
              <a href="#esg" className="hover:text-[#1b365d] transition-colors uppercase">ESG</a>
              <a href="#privacy" className="hover:text-[#1b365d] transition-colors uppercase">PRIVACY POLICY</a>
              <a href="#terms" className="hover:text-[#1b365d] transition-colors uppercase">TERMS OF USE</a>
            </div>
          </div>

          {/* Column 2: Europe (Geneva) */}
          <div className="flex flex-col justify-between min-h-[220px]">
            <div>
              <h4 className="font-sans text-[13px] text-[#1b365d] font-light uppercase tracking-[0.22em] leading-[1.6] mb-8">
                GENEVA,<br />SWITZERLAND
              </h4>
              <p className="text-[10px] font-light text-[#5d7488]/90 leading-[1.8] tracking-[0.05em] max-w-[220px]">
                Rue du Rhône 14, 1204 Geneva<br />
                Switzerland
              </p>
            </div>

            <div className="text-[10px] font-light tracking-[0.08em] mt-8 text-[#1b365d] hover:text-[#1b365d]/70 transition-colors">
              <a href="mailto:geneva@twenty1global.com">geneva@twenty1global.com</a>
            </div>
          </div>

          {/* Column 3: Middle East HQ (Dubai) */}
          <div className="flex flex-col justify-between min-h-[220px]">
            <div>
              <h4 className="font-sans text-[13px] text-[#1b365d] font-light uppercase tracking-[0.22em] leading-[1.6] mb-8">
                DUBAI,<br />UAE
              </h4>
              <p className="text-[10px] font-light text-[#5d7488]/90 leading-[1.8] tracking-[0.05em] max-w-[220px]">
                Marina Plaza, Suite 2902, Dubai Marina<br />
                Dubai, United Arab Emirates
              </p>
            </div>

            <div className="text-[10px] font-light tracking-[0.08em] mt-8 text-[#1b365d] hover:text-[#1b365d]/70 transition-colors">
              <a href="mailto:info@twenty1global.com">info@twenty1global.com</a>
            </div>
          </div>

          {/* Column 4: Asia Pacific (Singapore) */}
          <div className="flex flex-col justify-between min-h-[220px]">
            <div>
              <h4 className="font-sans text-[13px] text-[#1b365d] font-light uppercase tracking-[0.22em] leading-[1.6] mb-8">
                SINGAPORE<br />&nbsp;
              </h4>
              <p className="text-[10px] font-light text-[#5d7488]/90 leading-[1.8] tracking-[0.05em] max-w-[220px]">
                10 Collyer Quay, Ocean Financial Centre<br />
                Singapore 049315
              </p>
            </div>

            <div className="text-[10px] font-light tracking-[0.08em] mt-8 text-[#1b365d] hover:text-[#1b365d]/70 transition-colors">
              <a href="mailto:singapore@twenty1global.com">singapore@twenty1global.com</a>
            </div>
          </div>

        </div>

        {/* Thin divider line */}
        <div className="w-full border-t border-[#1b365d]/10 mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo with Mesh and Vertical bar */}
          <div className="flex items-center">
            {/* Elegant SVG mesh of dots */}
            <svg className="w-6 h-6 text-[#1b365d]/80" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="4" r="1.2" />
              <circle cx="9" cy="6.2" r="1.2" />
              <circle cx="15" cy="6.2" r="1.2" />
              <circle cx="6" cy="8.4" r="1.2" />
              <circle cx="12" cy="8.4" r="1.2" />
              <circle cx="18" cy="8.4" r="1.2" />
              <circle cx="9" cy="10.6" r="1.2" />
              <circle cx="15" cy="10.6" r="1.2" />
              <circle cx="12" cy="12.8" r="1.2" />
              <circle cx="6" cy="15" r="1.2" />
              <circle cx="18" cy="15" r="1.2" />
              <circle cx="9" cy="17.2" r="1.2" />
              <circle cx="15" cy="17.2" r="1.2" />
              <circle cx="12" cy="19.4" r="1.2" />
            </svg>
            <div className="h-5 w-[1px] bg-[#1b365d]/20 mx-4" />
            <span className="text-[12px] font-light tracking-[0.3em] text-[#1b365d] uppercase">TWENTY1GLOBAL</span>
          </div>

          {/* Copyright notice */}
          <span className="text-[9px] font-light tracking-[0.1em] text-[#5d7488]/80">
            © {new Date().getFullYear()} | Twenty1Global - All rights reserved
          </span>
        </div>
      </div>
    </footer>
  )
}
