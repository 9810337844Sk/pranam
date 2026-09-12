import { useState } from 'react'
import {
  brands,
  company,
  heroImage,
  products,
  services,
  team,
  testimonials,
} from '~/data/site'
import { supabase } from '~/lib/supabase'

const importPassword = import.meta.env.VITE_IMPORT_PASSWORD || '9810'

type Job = {
  key: string
  label: string
  table: string
  rows: () => Record<string, unknown>[]
  singleton?: boolean
}

const jobs: Job[] = [
  {
    key: 'company',
    label: 'Company Info',
    table: 'company_info',
    singleton: true,
    rows: () => [
      {
        name: company.name,
        legal_name: company.legalName,
        tagline: company.tagline,
        founded: company.founded,
        address: company.address,
        phone: company.phone,
        phone_href: company.phoneHref,
        email: company.email,
        hours: company.hours,
        whatsapp: company.whatsapp,
      },
    ],
  },
  {
    key: 'hero_slides',
    label: 'Hero Image',
    table: 'hero_slides',
    rows: () => [
      {
        sort_order: 0,
        image: heroImage,
        title: 'Websites & Apps That Grow Your Business',
        subtitle:
          'Pranam Software builds fast, SEO-friendly websites, mobile apps and custom software that help businesses grow.',
      },
    ],
  },
  {
    key: 'services',
    label: 'Services',
    table: 'services',
    rows: () =>
      services.map((s, i) => ({
        sort_order: i,
        title: s.title,
        body: s.body,
        icon: s.icon,
        color: s.color,
        image: s.image,
        features: s.features,
      })),
  },
  {
    key: 'products',
    label: 'Products',
    table: 'products',
    rows: () =>
      products.map((p, i) => ({
        sort_order: i,
        name: p.name,
        ini: p.ini,
        body: p.body,
        tags: p.tags,
        img: p.img,
        wide: Boolean(p.wide),
      })),
  },
  {
    key: 'team_members',
    label: 'Team',
    table: 'team_members',
    rows: () =>
      team.map((m, i) => ({
        sort_order: i,
        name: m.name,
        ini: m.ini,
        role: m.role,
        skills: m.skills,
        img: m.img,
      })),
  },
  {
    key: 'testimonials',
    label: 'Testimonials',
    table: 'testimonials',
    rows: () =>
      testimonials.map((t, i) => ({
        sort_order: i,
        name: t.name,
        ini: t.ini,
        at: t.at,
        tag: t.tag,
        time: t.time,
        quote: t.quote,
        img: t.img,
      })),
  },
  {
    key: 'brands',
    label: 'Trusted By (Logos)',
    table: 'brands',
    rows: () => brands.map((b, i) => ({ sort_order: i, name: b.name, logo: b.logo })),
  },
]

type Status = 'idle' | 'checking' | 'empty' | 'has-data' | 'importing' | 'done' | 'error'

export default function ImportContent() {
  const [unlocked, setUnlocked] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [statuses, setStatuses] = useState<Record<string, { status: Status; message?: string }>>({})

  function unlock(e: React.FormEvent) {
    e.preventDefault()
    if (password === importPassword) {
      setUnlocked(true)
      setError('')
    } else {
      setError('Incorrect import password.')
    }
  }

  function setJobStatus(key: string, status: Status, message?: string) {
    setStatuses((s) => ({ ...s, [key]: { status, message } }))
  }

  async function runJob(job: Job, force = false) {
    if (!supabase) {
      setJobStatus(job.key, 'error', 'Supabase is not configured — check your .env file.')
      return
    }
    setJobStatus(job.key, 'checking')
    const { count, error: countErr } = await supabase
      .from(job.table)
      .select('*', { count: 'exact', head: true })
    if (countErr) {
      setJobStatus(job.key, 'error', countErr.message)
      return
    }
    if (count && count > 0 && !force) {
      setJobStatus(job.key, 'has-data', `Already has ${count} row(s) — skipped. Use "Import anyway" to add more.`)
      return
    }
    setJobStatus(job.key, 'importing')
    const { error: insertErr } = await supabase.from(job.table).insert(job.rows())
    if (insertErr) setJobStatus(job.key, 'error', insertErr.message)
    else setJobStatus(job.key, 'done', `Imported ${job.rows().length} row(s).`)
  }

  async function runAll() {
    for (const job of jobs) {
      // eslint-disable-next-line no-await-in-loop
      await runJob(job)
    }
  }

  if (!unlocked) {
    return (
      <div className="admin-page">
        <h1>Import Website Content</h1>
        <p className="admin-hint">
          One-click import of the site's built-in starter content into your connected Supabase project. This is
          separate from your admin login — enter the import password to continue.
        </p>
        <section className="admin-card" style={{ maxWidth: 380 }}>
          <form onSubmit={unlock}>
            <div className="admin-field" style={{ marginBottom: 14 }}>
              <span>Import Password</span>
              <input
                type="password"
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ border: '1px solid var(--line)', borderRadius: 8, padding: '9px 11px', fontSize: 14.5 }}
              />
            </div>
            {error && <p className="admin-error">{error}</p>}
            <button type="submit" className="admin-btn primary">
              Unlock
            </button>
          </form>
        </section>
      </div>
    )
  }

  return (
    <div className="admin-page">
      <h1>Import Website Content</h1>
      <p className="admin-hint">
        Seeds your Supabase tables with the site's built-in starter content (the same copy that ships in the code).
        Safe to run once — each item is skipped automatically if that table already has data. After importing, edit
        everything normally from the sections in the sidebar.
      </p>

      <section className="admin-card">
        <h2>Import everything</h2>
        <button type="button" className="admin-btn primary" onClick={runAll}>
          Import All
        </button>
      </section>

      <div className="admin-list">
        {jobs.map((job) => {
          const s = statuses[job.key]
          return (
            <article className="admin-card" key={job.key}>
              <div className="admin-row">
                <span className="admin-row-title">{job.label}</span>
                <div className="admin-row-actions">
                  <button type="button" className="admin-btn" onClick={() => runJob(job)}>
                    Import
                  </button>
                  {s?.status === 'has-data' && (
                    <button type="button" className="admin-btn danger" onClick={() => runJob(job, true)}>
                      Import anyway
                    </button>
                  )}
                </div>
              </div>
              {s && (
                <p className={s.status === 'error' ? 'admin-error' : 'admin-sub'} style={{ marginTop: 10 }}>
                  {s.status === 'checking' && 'Checking…'}
                  {s.status === 'importing' && 'Importing…'}
                  {(s.status === 'done' || s.status === 'has-data' || s.status === 'error') && s.message}
                </p>
              )}
            </article>
          )
        })}
      </div>
    </div>
  )
}
