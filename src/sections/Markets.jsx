import { motion } from 'framer-motion'

export default function Markets() {
  return (
    <section id="markets" className="section border-t border-[#2b3e50]/20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto"
      >
        <span className="eyebrow">MARKETS</span>
        <h2 className="heading-section mb-20">
          OPERATING SECTORS &amp;<br />GLOBAL COMMODITIES
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 mb-20">
          {[
            {
              title: 'Oil & Gas',
              text: 'Active sourcing, contract structuring, and compliance navigation for crude oil, refined distillates, and specialized gas resources.'
            },
            {
              title: 'Industrial Materials',
              text: 'Coordination of critical minerals, chemical products, and bulk industrial inputs for manufacturing clusters worldwide.'
            },
            {
              title: 'Energy Resources',
              text: 'Providing global supply nodes with reliable energy allocations, managing transit risk and hedging credit exposures.'
            },
          ].map((m, index) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="border-t border-[#2b3e50]/20 pt-8"
            >
              <h3 className="text-lg font-sans uppercase tracking-[0.15em] text-[#f4f6f8] mb-4 font-light">{m.title}</h3>
              <p className="text-[13px] text-[#a3b3c2] leading-relaxed font-light">{m.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-3 pt-8 border-t border-[#2b3e50]/20">
          {['Middle East', 'Asia Pacific', 'Western Europe', 'CIS Regions'].map((geo) => (
            <span key={geo} className="text-[10px] tracking-[0.25em] text-[#a3b3c2] uppercase font-light">
              {geo}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
