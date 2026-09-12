import { processImage, processSteps } from '~/data/site'
import { Ph } from './Ph'

export function ProcessSection({ withHead = true }: { withHead?: boolean }) {
  return (
    <section className="process">
      <div className="wrap">
        {withHead && (
          <div className="sec-head">
            <div className="proc-rule" style={{ marginInline: 'auto' }} />
            <h2 className="proc-title">
              Our <em>Process</em>
            </h2>
            <p>Streamlined approach to deliver exceptional results every time</p>
          </div>
        )}

        <div className="proc-grid">
          <ol className="steps">
            {processSteps.map((s, i) => (
              <li className="step" key={s.title}>
                <span className="step-n">{i + 1}</span>
                <div>
                  <h4>{s.title}</h4>
                  <p>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <Ph ini="PS" className="proc-img" src={processImage} alt="Pranam Software planning session" />
        </div>
      </div>
    </section>
  )
}
