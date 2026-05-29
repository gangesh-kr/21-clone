export default function Ticker() {
  const items = [
    'Oil & Gas',
    'Industrial Commodities',
    'Energy Resources',
    'Middle East Markets',
    'CIS Regions',
    'International Trade Facilitation',
    'Supply Chain Management',
    'Strategic Sourcing',
  ]

  // Duplicate for seamless loop
  const allItems = [...items, ...items]

  return (
    <div className="ticker">
      <div className="ticker-track">
        {allItems.map((item, i) => (
          <span key={i} className="ticker-item">
            <span className="ticker-dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
