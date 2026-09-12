import { googleReviews, testimonials as defaultTestimonials, type Testimonial } from '~/data/site'
import { useLiveContent } from '~/lib/content'
import { Ph } from './Ph'
import { GoogleG } from './Icons'

export function Testimonials() {
  const testimonials = useLiveContent<Testimonial>('testimonials', defaultTestimonials)
  return (
    <section className="tst">
      <div className="wrap">
        <div className="tst-head">
          <div>
            <p className="tst-kicker">What Clients Say</p>
            <h2 className="tst-title">Google Reviews</h2>
          </div>

          <div className="g-badge">
            <GoogleG className="g-badge-icon" />
            <div className="g-badge-mid">
              <div className="stars">★★★★★</div>
              <b>{googleReviews.rating.toFixed(1)}</b>
            </div>
            <span>{googleReviews.count} Google Reviews</span>
            <a className="g-write" href={googleReviews.writeReviewHref} target="_blank" rel="noopener">
              Write a Review
            </a>
          </div>
        </div>

        <div className="tst-grid">
          {testimonials.slice(0, 3).map((t) => (
            <article className="card-t" key={t.name}>
              <div className="card-t-top">
                <div className="stars">★★★★★</div>
                <GoogleG className="card-t-g" />
              </div>
              <p>&ldquo;{t.quote}&rdquo;</p>
              <div className="card-t-bottom">
                <div className="who">
                  <Ph ini={t.ini} className="avatar-s" src={t.img} alt={t.name} />
                  <div>
                    <b>{t.name}</b>
                    <small>{t.tag}</small>
                  </div>
                </div>
                <span className="ago">{t.time}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
