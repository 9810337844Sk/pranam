import { useRef, useState } from 'react'
import { supabase } from '~/lib/supabase'

function extOf(name: string) {
  const m = /\.[a-zA-Z0-9]+$/.exec(name)
  return m ? m[0] : ''
}

export function ImageField({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (url: string) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    if (!supabase) {
      setError('Supabase is not configured — add the env vars from .env.example.')
      return
    }
    setUploading(true)
    setError('')
    try {
      const path = `uploads/${Date.now()}-${Math.random().toString(36).slice(2, 8)}${extOf(file.name)}`
      const { error: uploadErr } = await supabase.storage.from('media').upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      })
      if (uploadErr) throw uploadErr
      const { data } = supabase.storage.from('media').getPublicUrl(path)
      onChange(data.publicUrl)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <label className="admin-field admin-image-field">
      <span>{label}</span>
      <div className="admin-image-row">
        {value && <img src={value} alt="" className="admin-image-preview" />}
        <div className="admin-image-controls">
          <input type="text" placeholder="https://…" value={value} onChange={(e) => onChange(e.target.value)} />
          <div className="admin-image-actions">
            <button
              type="button"
              className="admin-btn"
              disabled={uploading}
              onClick={() => inputRef.current?.click()}
            >
              {uploading ? 'Uploading…' : 'Upload Image'}
            </button>
            <input ref={inputRef} type="file" accept="image/*" hidden onChange={onFile} />
          </div>
        </div>
      </div>
      {error && <span className="admin-error">{error}</span>}
    </label>
  )
}
