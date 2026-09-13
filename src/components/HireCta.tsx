import { ButtonLink } from './ui/button'

export function HireCta() {
  return (
    <section style={{ paddingBlock: '0 84px' }}>
      <div className="wrap">
        <div className="hire">
          <div>
            <h3>Hire Us on Freelancer</h3>
            <p>Hire our verified team securely for website, app, and custom software development.</p>
          </div>
          <ButtonLink to="/contact" variant="yellow">
            Hire Us on Freelancer
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
