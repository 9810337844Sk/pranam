const items = [
  'Websites & Apps That Grow Your Business',
  'Free consultation for your next project',
  'Trusted by businesses across Nepal',
  'Fast delivery, modern designs, real results',
]

export function Marquee() {
  const track = [...items, ...items]
  return (
    <div className="marquee">
      <div className="marquee-track">
        {track.map((text, i) => (
          <span className="marquee-item" key={i}>
            {text}
            <span className="marquee-dot" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  )
}
