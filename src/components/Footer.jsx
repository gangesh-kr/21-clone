export default function Footer() {
  return (
    <footer className="bg-[#0a0e17] text-[#a3b3c2] py-20 border-t border-[#2b3e50]/20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
        
        {/* Column 1: Europe */}
        <div className="flex flex-col gap-4">
          <span className="text-[9px] tracking-[0.25em] text-[#5d7488] uppercase font-light">EUROPE OFFICE</span>
          <h4 className="font-sans text-[15px] text-[#f4f6f8] font-light uppercase tracking-wider">Geneva, Switzerland</h4>
          <p className="text-xs font-light leading-relaxed max-w-[240px]">
            Rue du Rhône 14, 1204 Geneva<br />
            Switzerland
          </p>
          <p className="text-xs font-light text-[#5d7488]">geneva@twenty1global.com</p>
        </div>

        {/* Column 2: Middle East HQ */}
        <div className="flex flex-col gap-4">
          <span className="text-[9px] tracking-[0.25em] text-[#5d7488] uppercase font-light">MIDDLE EAST HQ</span>
          <h4 className="font-sans text-[15px] text-[#f4f6f8] font-light uppercase tracking-wider">Dubai, UAE</h4>
          <p className="text-xs font-light leading-relaxed max-w-[240px]">
            Marina Plaza, Suite 2902, Dubai Marina<br />
            Dubai, United Arab Emirates
          </p>
          <p className="text-xs font-light text-[#5d7488]">info@twenty1global.com</p>
        </div>

        {/* Column 3: Asia Pacific */}
        <div className="flex flex-col gap-4">
          <span className="text-[9px] tracking-[0.25em] text-[#5d7488] uppercase font-light">ASIA PACIFIC OFFICE</span>
          <h4 className="font-sans text-[15px] text-[#f4f6f8] font-light uppercase tracking-wider">Singapore Hub</h4>
          <p className="text-xs font-light leading-relaxed max-w-[240px]">
            10 Collyer Quay, Ocean Financial Centre<br />
            Singapore 049315
          </p>
          <p className="text-xs font-light text-[#5d7488]">singapore@twenty1global.com</p>
        </div>

      </div>

      {/* Bottom Bar separated by a thin line */}
      <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-[#2b3e50]/20 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <div>
          <h3 className="font-sans text-sm text-[#f4f6f8] font-light tracking-[0.25em] mb-1 uppercase">TWENTY1GLOBAL</h3>
          <p className="text-[8px] tracking-[0.2em] text-[#5d7488] uppercase font-light">Strategic Sourcing. Sovereign Execution.</p>
        </div>
        <small className="text-[10px] font-sans text-[#a3b3c2]/50 tracking-[0.05em]">
          © {new Date().getFullYear()} Twenty1Global Trading LLC. All rights reserved. &nbsp;·&nbsp; <a href="#privacy" className="hover:text-[#f4f6f8] transition-colors">Privacy Policy</a>
        </small>
      </div>
    </footer>
  )
}
