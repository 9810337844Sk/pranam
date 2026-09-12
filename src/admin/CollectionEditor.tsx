import { useEffect, useState } from 'react'
import { deleteRow, insertRow, listRows, updateRow, type Row } from './api'

export type FieldConfig = {
  key: string
  label: string
  type?: 'text' | 'textarea' | 'boolean' | 'tags'
  placeholder?: string
}

type FormValues = Record<string, string | boolean>

function toFormValues(fields: FieldConfig[], row?: Row): FormValues {
  const values: FormValues = {}
  for (const f of fields) {
    const raw = row?.[f.key]
    if (f.type === 'boolean') values[f.key] = Boolean(raw)
    else if (f.type === 'tags') values[f.key] = Array.isArray(raw) ? raw.join(', ') : ''
    else values[f.key] = typeof raw === 'string' ? raw : ''
  }
  return values
}

function toPayload(fields: FieldConfig[], values: FormValues) {
  const payload: Record<string, unknown> = {}
  for (const f of fields) {
    const v = values[f.key]
    if (f.type === 'boolean') payload[f.key] = Boolean(v)
    else if (f.type === 'tags')
      payload[f.key] = String(v ?? '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    else payload[f.key] = v ?? ''
  }
  return payload
}

function Fields({
  fields,
  values,
  onChange,
}: {
  fields: FieldConfig[]
  values: FormValues
  onChange: (key: string, value: string | boolean) => void
}) {
  return (
    <div className="admin-fields">
      {fields.map((f) => (
        <label key={f.key} className="admin-field">
          <span>{f.label}</span>
          {f.type === 'boolean' ? (
            <input
              type="checkbox"
              checked={Boolean(values[f.key])}
              onChange={(e) => onChange(f.key, e.target.checked)}
            />
          ) : f.type === 'textarea' ? (
            <textarea
              rows={3}
              placeholder={f.placeholder}
              value={String(values[f.key] ?? '')}
              onChange={(e) => onChange(f.key, e.target.value)}
            />
          ) : (
            <input
              type="text"
              placeholder={f.placeholder}
              value={String(values[f.key] ?? '')}
              onChange={(e) => onChange(f.key, e.target.value)}
            />
          )}
        </label>
      ))}
    </div>
  )
}

export function CollectionEditor({
  table,
  title,
  fields,
  itemLabel,
}: {
  table: string
  title: string
  fields: FieldConfig[]
  itemLabel: (row: Row) => string
}) {
  const [rows, setRows] = useState<Row[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValues, setEditValues] = useState<FormValues>({})
  const [newValues, setNewValues] = useState<FormValues>(toFormValues(fields))
  const [busy, setBusy] = useState(false)

  async function refresh() {
    setLoading(true)
    setError('')
    try {
      setRows(await listRows(table))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table])

  async function handleAdd() {
    setBusy(true)
    setError('')
    try {
      const payload = toPayload(fields, newValues)
      await insertRow(table, { ...payload, sort_order: rows.length })
      setNewValues(toFormValues(fields))
      await refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to add.')
    } finally {
      setBusy(false)
    }
  }

  function startEdit(row: Row) {
    setEditingId(row.id)
    setEditValues(toFormValues(fields, row))
  }

  async function handleSave(id: string) {
    setBusy(true)
    setError('')
    try {
      await updateRow(table, id, toPayload(fields, editValues))
      setEditingId(null)
      await refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to save.')
    } finally {
      setBusy(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this item? This cannot be undone.')) return
    setBusy(true)
    setError('')
    try {
      await deleteRow(table, id)
      await refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to delete.')
    } finally {
      setBusy(false)
    }
  }

  async function move(row: Row, direction: -1 | 1) {
    const idx = rows.findIndex((r) => r.id === row.id)
    const swapWith = rows[idx + direction]
    if (!swapWith) return
    setBusy(true)
    try {
      await updateRow(table, row.id, { sort_order: idx + direction })
      await updateRow(table, swapWith.id, { sort_order: idx })
      await refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to reorder.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="admin-page">
      <h1>{title}</h1>
      {error && <p className="admin-error">{error}</p>}

      <section className="admin-card">
        <h2>Add new</h2>
        <Fields fields={fields} values={newValues} onChange={(k, v) => setNewValues((s) => ({ ...s, [k]: v }))} />
        <button type="button" className="admin-btn primary" disabled={busy} onClick={handleAdd}>
          Add
        </button>
      </section>

      {loading ? (
        <p>Loading…</p>
      ) : rows.length === 0 ? (
        <p>Nothing here yet.</p>
      ) : (
        <div className="admin-list">
          {rows.map((row, idx) => (
            <article className="admin-card" key={row.id}>
              {editingId === row.id ? (
                <>
                  <Fields
                    fields={fields}
                    values={editValues}
                    onChange={(k, v) => setEditValues((s) => ({ ...s, [k]: v }))}
                  />
                  <div className="admin-row-actions">
                    <button type="button" className="admin-btn primary" disabled={busy} onClick={() => handleSave(row.id)}>
                      Save
                    </button>
                    <button type="button" className="admin-btn" onClick={() => setEditingId(null)}>
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <div className="admin-row">
                  <span className="admin-row-title">{itemLabel(row)}</span>
                  <div className="admin-row-actions">
                    <button type="button" className="admin-btn" disabled={busy || idx === 0} onClick={() => move(row, -1)}>
                      ↑
                    </button>
                    <button
                      type="button"
                      className="admin-btn"
                      disabled={busy || idx === rows.length - 1}
                      onClick={() => move(row, 1)}
                    >
                      ↓
                    </button>
                    <button type="button" className="admin-btn" onClick={() => startEdit(row)}>
                      Edit
                    </button>
                    <button type="button" className="admin-btn danger" disabled={busy} onClick={() => handleDelete(row.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
