import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { budgetOptions, company as defaultCompany, mapCompanyRow, serviceOptions } from '~/data/site'
import { useLiveSingleton } from '~/lib/content'
import { submitInquiry } from '~/server/inquiries'
import { trackMetaPixelEvent } from '~/lib/metaPixel'
import { Lock, Mail, Phone, Pin, WhatsApp } from './Icons'
import { SectionHead } from './PageHero'
import { Button } from './ui/button'
import { Field, Select } from './ui/field'

type State = { status: 'idle' | 'sending' | 'sent' | 'error'; message?: string }

export function ContactSection({ withHead = true }: { withHead?: boolean }) {
  const [state, setState] = useState<State>({ status: 'idle' })
  const company = useLiveSingleton('company_info', defaultCompany, mapCompanyRow)
  const [searchParams] = useSearchParams()
  const preselectedService = searchParams.get('service')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }
    const fd = new FormData(form)
    setState({ status: 'sending' })
    try {
      await submitInquiry({
        full_name: String(fd.get('full_name') ?? ''),
        email: String(fd.get('email') ?? ''),
        phone: String(fd.get('phone') ?? ''),
        company: String(fd.get('company') ?? ''),
        service: String(fd.get('service') ?? ''),
        budget: String(fd.get('budget') ?? ''),
        message: String(fd.get('message') ?? ''),
      })
      form.reset()
      trackMetaPixelEvent('Lead')
      setState({
        status: 'sent',
        message: 'Thanks — your inquiry is in. We reply within 24 hours.',
      })
    } catch (err) {
      setState({
        status: 'error',
        message: err instanceof Error ? err.message : 'Something went wrong. Please try again.',
      })
    }
  }

  const sending = state.status === 'sending'

  return (
    <section id="contact" style={{ paddingTop: withHead ? undefined : 84 }}>
      <div className="wrap">
        {withHead && (
          <SectionHead
            title="Start Your Project"
            subtitle="Have a project in mind? Fill out the form below and our team will contact you within 24 hours to discuss your requirements."
          />
        )}

        <div className="contact-grid">
          <div className="form-card">
            <span className="dots-pink" />
            <h3>Project Inquiry Form</h3>
            <p className="hint">Fill in your details and let's start a conversation about your project.</p>

            <form className="f" onSubmit={onSubmit} noValidate>
              <div className="f-row">
                <Field id="fname" label="Full name" required>
                  <input id="fname" name="full_name" placeholder="Your full name" required />
                </Field>
                <Field id="femail" label="Email address" required>
                  <input id="femail" name="email" type="email" placeholder="you@company.com" required />
                </Field>
              </div>

              <div className="f-row">
                <Field id="fphone" label="Phone / WhatsApp" required>
                  <input id="fphone" name="phone" placeholder="+977 98XXXXXXXX" required />
                </Field>
                <Field id="fcompany" label="Company">
                  <input id="fcompany" name="company" placeholder="Company or brand name" />
                </Field>
              </div>

              <div className="f-row">
                <Field id="fservice" label="Service needed" required>
                  <Select
                    id="fservice"
                    name="service"
                    placeholder="Select a service"
                    options={serviceOptions}
                    defaultValue={preselectedService ?? ''}
                    required
                  />
                </Field>
                <Field id="fbudget" label="Estimated budget">
                  <Select
                    id="fbudget"
                    name="budget"
                    placeholder="Select budget range"
                    options={budgetOptions}
                  />
                </Field>
              </div>

              <div style={{ marginBottom: 18 }}>
                <Field id="fmsg" label="Tell us about your project" required>
                  <textarea
                    id="fmsg"
                    name="message"
                    placeholder="Goals, required features and preferred timeline..."
                    required
                  />
                </Field>
              </div>

              <label className="agree" htmlFor="fagree">
                <input id="fagree" name="agree" type="checkbox" required /> I agree to be contacted
                about this project.
              </label>

              <Button variant="blue" type="submit" disabled={sending}>
                {sending ? 'Sending…' : 'Send Project Inquiry'}
              </Button>

              {state.message && (
                <p className={`form-msg${state.status === 'error' ? ' error' : ''}`} style={{ display: 'block' }}>
                  {state.message}
                </p>
              )}

              <p className="privacy">
                <Lock /> Your details are used only to respond to this inquiry.
              </p>
            </form>
          </div>

          <div className="info-col">
            <span className="dots-pink dots-br" aria-hidden="true" />
            <div className="info">
              <div className="info-ico">
                <Pin />
              </div>
              <div>
                <b>Location</b>
                <span>{company.address}</span>
              </div>
            </div>

            <div className="info">
              <div className="info-ico">
                <Phone />
              </div>
              <div>
                <b>Phone</b>
                <a className="hot" href={company.phoneHref}>
                  {company.phone}
                </a>
              </div>
            </div>

            <div className="info">
              <div className="info-ico">
                <Mail />
              </div>
              <div>
                <b>Email</b>
                <a className="hot" href={`mailto:${company.email}`}>
                  {company.email}
                </a>
              </div>
            </div>

            <div className="wa">
              <b>Quick Response?</b>
              <p>Chat with us on WhatsApp for instant support.</p>
              <a href={company.whatsapp} target="_blank" rel="noopener">
                <WhatsApp /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
