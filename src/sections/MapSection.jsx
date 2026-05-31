import { motion } from 'framer-motion'

const OFFICES = [
  { name: 'Geneva', region: 'EUROPE', role: 'Trading & Operations', address: 'Rue du Rhône 14, 1204 Geneva' },
  { name: 'Dubai', region: 'MIDDLE EAST HQ', role: 'Corporate Headquarters', address: 'Marina Plaza, Suite 2902, Dubai Marina' },
  { name: 'Singapore', region: 'ASIA PACIFIC', role: 'Regional Logistics Hub', address: '10 Collyer Quay, Ocean Financial Centre' }
]

export default function MapSection() {
  return (
    <section id="markets-map" className="section">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-24">
          <div className="lg:col-span-6">
            <span className="eyebrow">GLOBAL PRESENCE</span>
            <h2 className="heading-section">
              STRATEGIC TRADING HUBS.
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="text-sm text-text-muted font-light leading-relaxed max-w-[500px]">
              We operate from the world's most critical financial and commercial junctions. Our headquarters in Dubai is anchored by operational hubs in Geneva and Singapore, providing continuous coverage across major time zones.
            </p>
          </div>
        </div>

        {/* Minimal Typographic Layout for Hubs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t border-border">
          {OFFICES.map((office) => (
            <div key={office.name} className="flex flex-col gap-3">
              <span className="text-[10px] tracking-[0.25em] text-text-muted font-mono">{office.region}</span>
              <h4 className="text-xl font-sans uppercase tracking-[0.15em] text-text-primary font-light">{office.name}</h4>
              <span className="text-[11px] tracking-[0.1em] text-text-muted font-light uppercase">{office.role}</span>
              <p className="text-xs text-text-muted/75 font-light leading-relaxed mt-2">
                {office.address}
              </p>
            </div>
          ))}
        </div>

        {/* Stylized Minimal Vector Map (no grids, no tech elements, extremely clean) */}
        <div className="relative w-full aspect-[2/1] min-h-[250px] md:min-h-[400px] border border-border mt-20 flex items-center justify-center p-4">
          <svg
            viewBox="0 0 1000 500"
            className="w-full h-full opacity-45 text-text-muted"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outline of World Continents */}
            <g stroke="currentColor" strokeWidth="0.8" fill="none">
              {/* North America */}
              <path d="M120,100 L180,80 L250,110 L280,180 L220,240 L160,250 L120,200 Z" />
              {/* South America */}
              <path d="M220,250 L270,290 L300,380 L270,450 L240,430 L210,310 Z" />
              {/* Greenland */}
              <path d="M290,40 L350,30 L380,70 L320,80 Z" />
              {/* Africa */}
              <path d="M430,220 L480,210 L540,250 L560,330 L500,410 L470,410 L440,320 L410,250 Z" />
              {/* Europe & Asia */}
              <path d="M390,140 L450,110 L520,90 L680,80 L840,110 L880,160 L800,230 L740,280 L680,310 L580,260 L480,210 L420,170 Z" />
              {/* India */}
              <path d="M600,220 L640,250 L630,280 L610,250 Z" />
              {/* Australia */}
              <path d="M760,350 L840,360 L860,420 L780,430 L740,390 Z" />
            </g>
          </svg>

          {/* Simple Static Pins */}
          {[
            { name: 'Geneva', coords: { x: '48%', y: '33%' } },
            { name: 'Dubai', coords: { x: '59%', y: '42%' } },
            { name: 'Singapore', coords: { x: '78%', y: '61%' } }
          ].map((pin) => (
            <div
              key={pin.name}
              style={{ left: pin.coords.x, top: pin.coords.y }}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 z-10"
            >
              {/* Clean tiny white dot */}
              <span className="inline-flex rounded-full h-2 w-2 bg-white border border-text-primary shadow-sm" />
              <span className="text-[9px] tracking-[0.15em] uppercase text-text-primary bg-white/95 px-2 py-0.5 mt-1 border border-border font-mono shadow-sm">
                {pin.name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
