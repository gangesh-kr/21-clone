import { motion } from 'framer-motion'

const ESG_SECTORS = [
  {
    title: 'Environmental Stewardship',
    desc: 'Minimizing ecological impact through logistically optimized transport routing and low-carbon maritime compliance.',
    bullets: [
      'Maritime Compliance: Partnering exclusively with ocean carriers meeting strict emissions standards.',
      'Logistics Efficiency: Optimizing sea routes to reduce carbon footprint per metric ton.'
    ]
  },
  {
    title: 'Social Integrity',
    desc: 'Fostering safe workplaces, respecting local communities, and supporting economic equity in our operational regions.',
    bullets: [
      'Labor Standards: Strict compliance with fair labor laws across all regional operations.',
      'Community Reinvestment: Fostering development within our sourcing hubs.'
    ]
  },
  {
    title: 'Institutional Governance',
    desc: 'Operating with transparency, compliance audits, and board-level risk management frameworks.',
    bullets: [
      'Trade Compliance: Airtight auditing of all transactional and customs structures.',
      'Risk Framework: Continuous evaluation of geopolitical, credit, and operational risks.'
    ]
  }
]

export default function Sustainability() {
  return (
    <section id="sustainability" className="section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-24">
          <div className="lg:col-span-6">
            <span className="eyebrow">SUSTAINABILITY</span>
            <h2 className="heading-section">
              RESPONSIBLE OPERATIONS.
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="text-sm text-text-muted font-light leading-relaxed max-w-[500px]">
              We integrate risk management, environmental compliance, and social responsibility directly into our core trading frameworks, safeguarding long-term capital and resource reliability.
            </p>
          </div>
        </div>

        {/* ESG Dimensions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {ESG_SECTORS.map((sector, index) => (
            <motion.div
              key={sector.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="pt-8"
            >
              <h3 className="text-lg font-sans uppercase tracking-[0.15em] text-text-primary mb-4 font-light">
                {sector.title}
              </h3>
              <p className="text-[13px] text-text-muted leading-relaxed font-light mb-6">
                {sector.desc}
              </p>
              <ul className="flex flex-col gap-4 list-none p-0">
                {sector.bullets.map((bullet, idx) => {
                  const [title, desc] = bullet.split(': ')
                  return (
                    <li key={idx} className="text-xs text-text-muted/80 leading-relaxed font-light pl-4 border-l border-border-strong">
                      <strong className="text-text-primary font-normal block mb-1 uppercase tracking-wider">{title}</strong>
                      {desc}
                    </li>
                  )
                })}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
