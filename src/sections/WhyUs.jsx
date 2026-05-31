import { motion } from 'framer-motion'

const ADVANTAGES = [
  { roman: 'I', title: 'Strong Global Network', text: 'Established relationships across key trading zones, ensuring secure resource flows.' },
  { roman: 'II', title: 'Reliable Execution', text: 'Structured commercial clearing, documentation audits, and zero-compromise logistics.' },
  { roman: 'III', title: 'Risk Abatement', text: 'Rigorous capital protections, credit lines, and geopolitical risk mitigation.' },
  { roman: 'IV', title: 'Operational Transparency', text: 'Institutional governance, anti-corruption standards, and transparent transactions.' },
  { roman: 'V', title: 'Bespoke Strategy', text: 'Commercial structures tailored precisely to regional trade requirements.' },
  { roman: 'VI', title: 'Absolute Discretion', text: 'Professional compliance, strict confidentiality, and reserved corporate standards.' },
]

export default function WhyUs() {
  return (
    <section id="why" className="section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto"
      >
        <span className="eyebrow">ADVANTAGES</span>
        <h2 className="heading-section mb-20">
          THE Twenty1Global<br />CREDENTIAL
        </h2>

        <div className="flex flex-col border-b border-border">
          {ADVANTAGES.map((adv, index) => (
            <motion.div
              key={adv.roman}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.8 }}
              className="border-t border-border py-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline"
            >
              <div className="md:col-span-1 text-[11px] tracking-[0.25em] text-text-muted font-mono">
                {adv.roman}
              </div>
              <div className="md:col-span-4">
                <h4 className="heading-sub font-light text-text-primary">{adv.title}</h4>
              </div>
              <div className="md:col-span-7">
                <p className="text-[13px] text-text-muted leading-relaxed font-light">{adv.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
