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

function shortId(id: string) {
  return `#${id.slice(0, 5).toUpperCase()}`
}

export default function Enquiries() {
  const [rows, setRows] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<(typeof statuses)[number]['value']>('all')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [menuFor, setMenuFor] = useState<string | null>(null)

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

  async function deleteRow(id: string) {
    if (!supabase) return
    if (!confirm('Delete this enquiry? This cannot be undone.')) return
    setMenuFor(null)
    setRows((rs) => rs.filter((r) => r.id !== id))
    const { error: err } = await supabase.from('project_inquiries').delete().eq('id', id)
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

  const allSelected = visible.length > 0 && visible.every((r) => selected.has(r.id))

  function toggleAll() {
    setSelected(allSelected ? new Set() : new Set(visible.map((r) => r.id)))
  }

  function toggleOne(id: string) {
    setSelected((s) => {
      const next = new Set(s)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

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
                <th className="admin-th-check">
                  <input type="checkbox" checked={allSelected} onChange={toggleAll} />
                </th>
                <th>#</th>
                <th>Name</th>
                <th>Service / Package</th>
                <th>Date &amp; Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((r) => (
                <tr key={r.id} className={selected.has(r.id) ? 'is-selected' : ''}>
                  <td className="admin-th-check">
                    <input type="checkbox" checked={selected.has(r.id)} onChange={() => toggleOne(r.id)} />
                  </td>
                  <td className="admin-mono">{shortId(r.id)}</td>
                  <td>
                    <b>{r.full_name}</b>
                    <div className="admin-sub">{r.phone}</div>
                  </td>
                  <td>
                    {r.service}
                    <div className="admin-sub">{r.message || 'No message provided'}</div>
                  </td>
                  <td>
                    {new Date(r.created_at).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}
                    <div className="admin-sub">
                      {new Date(r.created_at).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </td>
                  <td>
                    <select
                      className={`admin-status-pill admin-status-${r.status}`}
                      value={r.status}
                      onChange={(e) => setStatus(r.id, e.target.value as Inquiry['status'])}
                    >
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
                    <div className="admin-row-actions">
                      <a className="admin-btn admin-btn-wa" href={waLink(r.phone)} target="_blank" rel="noopener">
                        WhatsApp
                      </a>
                      <div className="admin-kebab-wrap">
                        <button
                          type="button"
                          className="admin-kebab"
                          aria-label="More actions"
                          onClick={() => setMenuFor(menuFor === r.id ? null : r.id)}
                        >
                          ⋮
                        </button>
                        {menuFor === r.id && (
                          <div className="admin-kebab-menu">
                            <button type="button" onClick={() => deleteRow(r.id)}>
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
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
