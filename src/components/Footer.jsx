export default function Footer() {
  return (
    <footer className="py-11 px-5 md:px-14 bg-[var(--color-navy)] flex flex-col md:flex-row justify-between items-start md:items-center flex-wrap gap-4">
      <div>
        <div className="font-serif text-[1.1rem] font-normal text-[var(--color-beige)] tracking-[0.05em]">
          Twenty<span className="text-[var(--color-beige-warm)]">1</span>Global Trading LLC
        </div>
        <div className="text-[0.6rem] tracking-[0.24em] uppercase text-[var(--color-navy-light)] mt-1">
          Strategic Trading. Trusted Execution.
        </div>
      </div>
      <small className="text-[0.68rem] text-[var(--color-navy-light)] tracking-[0.04em]">
        © 2025 Twenty1Global Trading LLC. All rights reserved.
      </small>
    </footer>
  )
}
