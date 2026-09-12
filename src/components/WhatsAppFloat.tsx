import { company as defaultCompany, mapCompanyRow } from '~/data/site'
import { useLiveSingleton } from '~/lib/content'
import { WhatsApp } from './Icons'

export function WhatsAppFloat() {
  const company = useLiveSingleton('company_info', defaultCompany, mapCompanyRow)
  return (
    <a
      className="wa-float"
      href={company.whatsapp}
      target="_blank"
      rel="noopener"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <WhatsApp />
    </a>
  )
}
