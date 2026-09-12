import { useEffect, useRef, useState } from 'react'
import { supabase } from '~/lib/supabase'

function extOf(name: string) {
  const m = /\.[a-zA-Z0-9]+$/.exec(name)
  return m ? m[0] : ''
}

export function RichTextEditor({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (html: string) => void
}) {
  const editorRef = useRef<HTMLDivElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const initialized = useRef(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (editorRef.current && !initialized.current) {
      editorRef.current.innerHTML = value || ''
      initialized.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function emitChange() {
    onChange(editorRef.current?.innerHTML ?? '')
  }

  function exec(command: string, arg?: string) {
    editorRef.current?.focus()
    document.execCommand(command, false, arg)
    emitChange()
  }

  function onLink() {
    const url = prompt('Link URL:')
    if (url) exec('createLink', url)
  }

  async function onImageFile(e: React.ChangeEvent<HTMLInputElement>) {
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
      const { error: uploadErr } = await supabase.storage.from('media').upload(path, file, { upsert: false })
      if (uploadErr) throw uploadErr
      const { data } = supabase.storage.from('media').getPublicUrl(path)
      exec('insertImage', data.publicUrl)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <label className="admin-field admin-rte-field">
      <span>{label}</span>
      <div className="admin-rte">
        <div className="admin-rte-toolbar">
          <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => exec('bold')}>
            <b>B</b>
          </button>
          <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => exec('italic')}>
            <i>I</i>
          </button>
          <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => exec('underline')}>
            <u>U</u>
          </button>
          <span className="admin-rte-sep" />
          <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => exec('formatBlock', 'h3')}>
            H3
          </button>
          <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => exec('formatBlock', 'p')}>
            P
          </button>
          <span className="admin-rte-sep" />
          <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => exec('insertUnorderedList')}>
            • List
          </button>
          <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => exec('insertOrderedList')}>
            1. List
          </button>
          <span className="admin-rte-sep" />
          <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={onLink}>
            Link
          </button>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            disabled={uploading}
            onClick={() => fileRef.current?.click()}
          >
            {uploading ? 'Uploading…' : 'Image'}
          </button>
          <input ref={fileRef} type="file" accept="image/*" hidden onChange={onImageFile} />
        </div>
        <div
          ref={editorRef}
          className="admin-rte-body"
          contentEditable
          suppressContentEditableWarning
          onInput={emitChange}
        />
      </div>
      {error && <span className="admin-error">{error}</span>}
    </label>
  )
}
