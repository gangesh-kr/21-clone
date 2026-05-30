import { motion } from 'framer-motion'

export default function Contact() {
  return (
    <section id="contact" className="section border-t border-[#2b3e50]/20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto"
      >
        <span className="eyebrow">CONTACT</span>
        <h2 className="heading-section mb-20">
          SECURE CONNECTION HUBS
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pt-12 border-t border-[#2b3e50]/20">
          <div>
            <div className="text-[10px] tracking-[0.25em] text-[#5d7488] uppercase font-light mb-3">HQ LOCATION</div>
            <div className="text-sm text-[#f4f6f8] font-light leading-relaxed">
              Dubai, United Arab Emirates<br />
              <span className="text-xs text-[#a3b3c2] font-sans">Marina Plaza, Suite 2902</span>
            </div>
          </div>
          
          <div>
            <div className="text-[10px] tracking-[0.25em] text-[#5d7488] uppercase font-light mb-3">EMAIL INQUIRIES</div>
            <div className="text-sm text-[#f4f6f8] hover:text-[#a3b3c2] font-light leading-relaxed transition-colors">
              <a href="mailto:info@twenty1global.com">info@twenty1global.com</a>
            </div>
          </div>

          <div>
            <div className="text-[10px] tracking-[0.25em] text-[#5d7488] uppercase font-light mb-3">TRADING SECTORS</div>
            <div className="text-xs text-[#a3b3c2] font-light leading-relaxed tracking-wide uppercase">
              Oil &amp; Gas &nbsp;·&nbsp; Industrial Goods &nbsp;·&nbsp; Energy &nbsp;·&nbsp; FMCG
            </div>
          </div>

          <div>
            <div className="text-[10px] tracking-[0.25em] text-[#5d7488] uppercase font-light mb-3">OPERATIONAL CENTERS</div>
            <div className="text-xs text-[#a3b3c2] font-light leading-relaxed tracking-wide uppercase">
              Geneva &nbsp;·&nbsp; Dubai HQ &nbsp;·&nbsp; Singapore
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
