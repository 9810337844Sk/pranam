import { useEffect, useMemo, useState } from 'react'
import { supabase } from '~/lib/supabase'

type Inquiry = {
  id: string
  created_at: string
  full_name: string
  email: string | null
  phone: string
  company: string | null
  service: string
  budget: string | null
  message: string
  status: 'new' | 'contacted' | 'quoted' | 'won' | 'lost'
}

const statuses: { value: Inquiry['status'] | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'quoted', label: 'Quoted' },
  { value: 'won', label: 'Won' },
  { value: 'lost', label: 'Lost' },
]

function waLink(phone: string) {
  return `https://wa.me/${phone.replace(/[^\d]/g, '')}`
}

export default function Enquiries() {
  const [rows, setRows] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<(typeof statuses)[number]['value']>('all')
  const [search, setSearch] = useState('')

  async function refresh() {
    setLoading(true)
    setError('')
    if (!supabase) {
      setError('Supabase is not configured — add the env vars from .env.example.')
      setLoading(false)
      return
    }
    const { data, error: err } = await supabase
      .from('project_inquiries')
      .select('*')
      .order('created_at', { ascending: false })
    if (err) setError(err.message)
    else setRows((data ?? []) as Inquiry[])
    setLoading(false)
  }

  useEffect(() => {
    refresh()
  }, [])

  async function setStatus(id: string, status: Inquiry['status']) {
    if (!supabase) return
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)))
    const { error: err } = await supabase.from('project_inquiries').update({ status }).eq('id', id)
    if (err) setError(err.message)
  }

  const visible = useMemo(() => {
    return rows.filter((r) => {
      if (filter !== 'all' && r.status !== filter) return false
      if (!search.trim()) return true
      const q = search.trim().toLowerCase()
      return (
        r.full_name.toLowerCase().includes(q) ||
        r.phone.toLowerCase().includes(q) ||
        r.service.toLowerCase().includes(q)
      )
    })
  }, [rows, filter, search])

  return (
    <div className="admin-page">
      <h1>Website Enquiries</h1>
      <p className="admin-hint">Enquiries submitted from your website's contact form.</p>

      <input
        className="admin-search"
        placeholder="Search by name, phone, service…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="admin-pills">
        {statuses.map((s) => (
          <button
            key={s.value}
            type="button"
            className={`admin-pill${filter === s.value ? ' active' : ''}`}
            onClick={() => setFilter(s.value)}
          >
            {s.label}
          </button>
        ))}
      </div>

      {error && <p className="admin-error">{error}</p>}

      {loading ? (
        <p>Loading…</p>
      ) : visible.length === 0 ? (
        <p>No enquiries found.</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Service</th>
                <th>Contact</th>
                <th>Message</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((r) => (
                <tr key={r.id}>
                  <td>{r.full_name}</td>
                  <td>
                    {r.service}
                    {r.budget && <div className="admin-sub">{r.budget}</div>}
                  </td>
                  <td>
                    <div>{r.phone}</div>
                    {r.email && <div className="admin-sub">{r.email}</div>}
                  </td>
                  <td className="admin-message">{r.message || 'No message provided'}</td>
                  <td>{new Date(r.created_at).toLocaleString()}</td>
                  <td>
                    <select value={r.status} onChange={(e) => setStatus(r.id, e.target.value as Inquiry['status'])}>
                      {statuses
                        .filter((s) => s.value !== 'all')
                        .map((s) => (
                          <option key={s.value} value={s.value}>
                            {s.label}
                          </option>
                        ))}
                    </select>
                  </td>
                  <td>
                    <a className="admin-btn" href={waLink(r.phone)} target="_blank" rel="noopener">
                      WhatsApp
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
