export default function CTABanner() {
  return (
    <div className="py-24 px-5 md:px-14 text-center bg-[var(--color-navy)]">
      <h2 className="font-serif text-[clamp(2.2rem,4.5vw,3.8rem)] font-light text-[var(--color-beige)] mb-4 leading-[1.15]">
        Ready to Start<br/><em className="italic text-[var(--color-beige-warm)]">Trading with Us?</em>
      </h2>
      <p className="text-[0.93rem] text-[var(--color-navy-light)] max-w-[500px] mx-auto mb-10 leading-[1.85]">
        Whether you are a supplier seeking new markets, a buyer in search of reliable sourcing, or an FMCG brand looking to expand — we are your trusted partner in global trade.
      </p>
      <a
        href="#contact"
        className="btn-beige"
        onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
      >
        Get in Touch
      </a>
    </div>
  )
}
