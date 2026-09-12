export function PageHero({
  crumb,
  title,
  subtitle,
}: {
  crumb: string
  title: string
  subtitle: string
}) {
  return (
    <section className="page-hero">
      <div className="wrap">
        <p className="crumb">{crumb}</p>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </section>
  )
}

export function SectionHead({ title, subtitle }: { title: string; subtitle?: React.ReactNode }) {
  return (
    <div className="sec-head">
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  )
}
