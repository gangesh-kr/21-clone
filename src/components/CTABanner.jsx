export default function CTABanner() {
  return (
    <div className="py-28 px-6 text-center bg-[#111827] border-t border-b border-white/5 relative overflow-hidden">
      {/* Subtle tech background lines */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#2d628c_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />
      
      <h2 className="font-serif text-[clamp(2.2rem,4.5vw,3.6rem)] font-light text-white mb-6 leading-tight">
        Ready to Start<br /><em className="italic text-[#2d628c]">Trading with Us?</em>
      </h2>
      <p className="text-[15px] text-gray-400 max-w-[550px] mx-auto mb-10 leading-relaxed font-light">
        Whether you are a supplier seeking new markets, a buyer in search of reliable sourcing, or an FMCG brand looking to expand — we are your trusted partner in global trade.
      </p>
      <a
        href="#contact"
        className="btn-beige"
        onClick={(e) => {
          e.preventDefault()
          document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
        }}
      >
        Get in Touch
      </a>
    </div>
  )
}
