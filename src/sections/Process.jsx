import { motion } from 'framer-motion'

const STEPS = [
  { num: 'I', title: 'Requirement Analysis', text: 'Detailing volumes, delivery timelines, product specifications, and quality parameters.' },
  { num: 'II', title: 'Sourcing & Verification', text: 'Engaging our verified producer network to secure allocation and confirm compliance.' },
  { num: 'III', title: 'Commercial Structuring', text: 'Formulating legal structures, credit facilities, risk hedging, and purchase terms.' },
  { num: 'IV', title: 'Regulatory Compliance', text: 'Preparing customs files, maritime documents, certificates of origin, and compliance clearing.' },
  { num: 'V', title: 'Logistics Execution', text: 'Coordinating vessel booking, freight tracking, cargo inspections, and terminal handovers.' },
]

export default function Process() {
  return (
    <section id="process" className="section border-t border-[#2b3e50]/20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto"
      >
        <span className="eyebrow">OUR PROCESS</span>
        <h2 className="heading-section mb-20">
          FIVE STAGES OF<br />FLAWLESS EXECUTION
        </h2>

        <div className="flex flex-col border-b border-[#2b3e50]/20">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.8 }}
              className="border-t border-[#2b3e50]/20 py-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline"
            >
              <div className="md:col-span-1 text-[11px] tracking-[0.25em] text-[#5d7488] font-mono">
                {step.num}
              </div>
              <div className="md:col-span-4">
                <h4 className="heading-sub font-light text-[#f4f6f8]">{step.title}</h4>
              </div>
              <div className="md:col-span-7">
                <p className="text-[13px] text-[#a3b3c2] leading-relaxed font-light">{step.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
