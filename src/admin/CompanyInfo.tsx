import { useEffect, useState } from 'react'
import { supabase } from '~/lib/supabase'

type Company = {
  id: string
  name: string
  legal_name: string
  tagline: string
  founded: number
  address: string
  phone: string
  phone_href: string
  email: string
  hours: string
  whatsapp: string
}

const empty: Company = {
  id: '',
  name: '',
  legal_name: '',
  tagline: '',
  founded: 2024,
  address: '',
  phone: '',
  phone_href: '',
  email: '',
  hours: '',
  whatsapp: '',
}

export default function CompanyInfo() {
  const [row, setRow] = useState<Company>(empty)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!supabase) {
      setError('Supabase is not configured — add the env vars from .env.example.')
      setLoading(false)
      return
    }
    supabase
      .from('company_info')
      .select('*')
      .limit(1)
      .maybeSingle()
      .then(({ data, error: err }) => {
        if (err) setError(err.message)
        else if (data) setRow(data as Company)
        setLoading(false)
      })
  }, [])

  function update(key: keyof Company, value: string) {
    setRow((r) => ({ ...r, [key]: key === 'founded' ? Number(value) || 0 : value }))
  }

  async function save() {
    if (!supabase) return
    setError('')
    setSaved(false)
    const { id, ...values } = row
    const { error: err } = id
      ? await supabase.from('company_info').update(values).eq('id', id)
      : await supabase.from('company_info').insert(values)
    if (err) setError(err.message)
    else setSaved(true)
  }

  if (loading) return <div className="admin-page">Loading…</div>

  const fields: [keyof Company, string][] = [
    ['name', 'Brand name'],
    ['legal_name', 'Legal name'],
    ['tagline', 'Tagline'],
    ['founded', 'Founded (year)'],
    ['address', 'Address'],
    ['phone', 'Phone (display)'],
    ['phone_href', 'Phone link (tel:+977…)'],
    ['email', 'Email'],
    ['hours', 'Business hours'],
    ['whatsapp', 'WhatsApp link'],
  ]

  return (
    <div className="admin-page">
      <h1>Company Info</h1>
      {error && <p className="admin-error">{error}</p>}
      {saved && <p className="admin-success">Saved.</p>}
      <section className="admin-card">
        <div className="admin-fields">
          {fields.map(([key, label]) => (
            <label className="admin-field" key={key}>
              <span>{label}</span>
              <input type="text" value={String(row[key])} onChange={(e) => update(key, e.target.value)} />
            </label>
          ))}
        </div>
        <button type="button" className="admin-btn primary" onClick={save}>
          Save
        </button>
      </section>
    </div>
  )
}
