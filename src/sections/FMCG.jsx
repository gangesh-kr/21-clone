import { motion } from 'framer-motion'

export default function FMCG() {
  return (
    <section id="fmcg" className="section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start max-w-7xl mx-auto"
      >
        <div className="lg:col-span-6">
          <span className="eyebrow">FMCG LOGISTICS</span>
          <h2 className="heading-section mb-8">
            MARKET ACCESS &amp; HUB INTEGRATION
          </h2>
          <p className="body-text mb-8 text-text-muted font-light leading-relaxed">
            We provide specialized market access frameworks for Fast-Moving Consumer Goods (FMCG). Leveraging our local partnerships, trade links, and compliance expertise, we coordinate access to complex, high-volume consumer markets.
          </p>
          <p className="body-text text-text-muted font-light leading-relaxed">
            Our systems manage customs, distributor networking, warehousing logistics, and regional regulatory clearances to unlock high-growth networks.
          </p>
        </div>

        <div className="lg:col-span-6 flex flex-col gap-10">
          {[
            {
              num: 'Market 01',
              title: 'Northern Region Integration',
              text: 'Navigating regulatory standards and regional distributor pipelines to deliver consumer brands across CIS and Eastern European zones.'
            },
            {
              num: 'Market 02',
              title: 'Southern Asia Hubs',
              text: 'Leveraging trade routes to connect consumer products with high-demand distribution links across India and Southern Asia.'
            },
          ].map((country) => (
            <div key={country.num} className="pt-6">
              <span className="text-[10px] tracking-[0.25em] text-text-muted font-mono block mb-2">{country.num}</span>
              <h4 className="heading-sub font-light mb-3 text-text-primary">{country.title}</h4>
              <p className="text-[13px] text-text-muted leading-relaxed font-light">{country.text}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
