import { useState } from 'react'
import { company, serviceOptions } from '~/data/site'
import { submitInquiry } from '~/server/inquiries'
import { Phone, Send, XClose } from './Icons'
import { Select } from './ui/field'

type State = { status: 'idle' | 'sending' | 'sent' | 'error'; message?: string }

export function BookingModal({
  defaultService,
  onClose,
}: {
  defaultService?: string
  onClose: () => void
}) {
  const [state, setState] = useState<State>({ status: 'idle' })
  const sending = state.status === 'sending'

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }
    const fd = new FormData(form)
    const eventDate = String(fd.get('event_date') ?? '')
    setState({ status: 'sending' })
    try {
      await submitInquiry({
        full_name: String(fd.get('full_name') ?? ''),
        phone: String(fd.get('phone') ?? ''),
        service: String(fd.get('service') ?? ''),
        message: eventDate ? `Booking Request - Preferred date: ${eventDate}` : 'Booking enquiry',
      })
      form.reset()
      setState({ status: 'sent', message: "Thanks — we'll confirm your slot within 24 hours." })
    } catch (err) {
      setState({
        status: 'error',
        message: err instanceof Error ? err.message : 'Something went wrong. Please try again.',
      })
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" aria-label="Close" onClick={onClose}>
          <XClose />
        </button>

        <p className="modal-kicker">Book your date</p>
        <h3 className="modal-title">Reserve Your Slot</h3>
        <p className="modal-sub">We reply to every enquiry within 24 hours.</p>

        <form className="booking-form" onSubmit={onSubmit} noValidate>
          <label>
            <span>Full Name</span>
            <input name="full_name" placeholder="Your full name" required />
          </label>

          <div className="booking-row">
            <label>
              <span>Phone</span>
              <input name="phone" placeholder="97/98XXXXXXXX" required />
            </label>
            <label>
              <span>Event Date</span>
              <input name="event_date" type="date" />
            </label>
          </div>

          <label>
            <span>Requirement</span>
            <Select
              name="service"
              placeholder="Select a service"
              options={serviceOptions}
              defaultValue={defaultService ?? ''}
              required
            />
          </label>

          <button className="booking-submit" type="submit" disabled={sending}>
            {sending ? 'Sending…' : 'Send Enquiry'} <Send />
          </button>

          {state.message && (
            <p className={`form-msg${state.status === 'error' ? ' error' : ''}`} style={{ display: 'block' }}>
              {state.message}
            </p>
          )}

          <a className="booking-call" href={company.phoneHref}>
            <Phone /> Or call {company.phone}
          </a>
        </form>
      </div>
    </div>
  )
}
