import { useEffect, useState } from 'react'
import { supabase } from './supabase'

/**
 * Reads a table that's editable from /admin, falling back to the static
 * default (from src/data/site.ts) if Supabase isn't configured, the table is
 * empty, or the request fails — the public site must never break because of
 * this.
 */
export function useLiveContent<T>(table: string, fallback: T[], orderCol = 'sort_order'): T[] {
  const [rows, setRows] = useState<T[]>(fallback)

  useEffect(() => {
    let cancelled = false
    if (!supabase) return
    supabase
      .from(table)
      .select('*')
      .order(orderCol, { ascending: true })
      .then(({ data, error }) => {
        if (cancelled || error || !data || data.length === 0) return
        setRows(data as T[])
      })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table])

  return rows
}

/** Same idea, for a singleton row like company_info. `map` adapts the DB row shape to the fallback's shape. */
export function useLiveSingleton<T>(
  table: string,
  fallback: T,
  map: (row: Record<string, unknown>) => T = (row) => row as T
): T {
  const [row, setRow] = useState<T>(fallback)

  useEffect(() => {
    let cancelled = false
    if (!supabase) return
    supabase
      .from(table)
      .select('*')
      .limit(1)
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled || error || !data) return
        setRow(map(data))
      })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table])

  return row
}
