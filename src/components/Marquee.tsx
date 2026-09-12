const items = [
  'Websites & Apps That Grow Your Business',
  'Free consultation for your next project',
  'Trusted by businesses across Nepal',
  'Fast delivery, modern designs, real results',
]

export function Marquee() {
  const track = [...items, ...items]
  return (
    <div className="announce">
      <div className="announce-track">
        {track.map((text, i) => (
          <span className="announce-item" key={i}>
            {text}
            <span className="announce-dot" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  )
}
