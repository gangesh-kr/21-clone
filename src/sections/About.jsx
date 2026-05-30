import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="section border-t border-[#2b3e50]/20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start max-w-7xl mx-auto"
      >
        <div className="lg:col-span-6">
          <span className="eyebrow">ABOUT US</span>
          <h2 className="heading-section mb-12">
            Where Markets Connect with Precision.
          </h2>
          <p className="body-text mb-8 text-[#a3b3c2] font-light leading-relaxed">
            Twenty1Global Trading is an international commodity facilitator built on reliability, transparency, and structural depth. We coordinate high-value global resources, connecting supply nodes with key trading hubs through airtight execution at every stage of the trade cycle.
          </p>
          <p className="body-text text-[#a3b3c2] font-light leading-relaxed">
            Our expertise navigates complex cross-border logistics, customs documentation, and trade compliance, ensuring seamless trade flows across regions.
          </p>
        </div>

        <div className="lg:col-span-6 flex flex-col gap-10">
          {[
            { num: '01', title: 'Global Network', text: 'Strategic relationships across the Middle East, Asia, Europe, and CIS regions built on trust and long-term commitment.' },
            { num: '02', title: 'Logistical Precision', text: 'End-to-end supply chain management with board-level compliance, documentation audits, and timely transit execution.' },
            { num: '03', title: 'Capital Protection', text: 'Sophisticated risk mitigation and credit frameworks protecting global capital in high-value resource movements.' },
            { num: '04', title: 'Market Intelligence', text: 'Data-driven insights and structured commercial agreements ensuring optimal pricing terms across key demand centers.' }
          ].map((pillar) => (
            <div key={pillar.num} className="border-t border-[#2b3e50]/20 pt-6">
              <div className="flex items-baseline justify-between mb-3">
                <h4 className="heading-sub font-light">{pillar.title}</h4>
                <span className="text-[10px] tracking-[0.2em] text-[#5d7488] font-mono">{pillar.num}</span>
              </div>
              <p className="text-[13px] text-[#a3b3c2] leading-relaxed font-light">{pillar.text}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
