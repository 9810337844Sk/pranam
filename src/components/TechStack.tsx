import { techStack } from '~/data/site'

export function TechStack() {
  return (
    <section className="tech">
      <div className="wrap">
        <h2 className="tech-title">Tools &amp; Technologies</h2>
        <div className="tech-row">
          {techStack.map((t) => (
            <div className="tech-item" key={t.slug}>
              <img src={`https://cdn.simpleicons.org/${t.slug}/94A3B8`} alt={t.name} loading="lazy" />
              <span>{t.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
