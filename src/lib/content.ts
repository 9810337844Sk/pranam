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
    if (!supabase) {
      console.info(`📋 Using fallback data for ${table} (Supabase not configured)`)
      return
    }

    supabase
      .from(table)
      .select('*')
      .order(orderCol, { ascending: true })
      .then(({ data, error }) => {
        if (cancelled) return
        
        if (error) {
          // Check if it's a missing table error (404)
          if (error.message?.includes('relation') && error.message?.includes('does not exist')) {
            console.info(`📋 Table "${table}" doesn't exist yet, using fallback data. Run setup-database.sql to create it.`)
          } else {
            console.warn(`⚠️ Error fetching ${table}:`, error.message)
          }
          return // Use fallback data
        }
        
        if (!data || data.length === 0) {
          console.info(`📋 Table "${table}" is empty, using fallback data`)
          return // Use fallback data
        }
        
        console.info(`✅ Loaded ${data.length} items from ${table}`)
        setRows(data as T[])
      })
      .catch((error) => {
        if (!cancelled) {
          console.info(`📋 Using fallback data for ${table} due to error:`, error.message)
        }
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
    if (!supabase) {
      console.info(`📋 Using fallback data for ${table} (Supabase not configured)`)
      return
    }

    supabase
      .from(table)
      .select('*')
      .limit(1)
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled) return
        
        if (error) {
          if (error.message?.includes('relation') && error.message?.includes('does not exist')) {
            console.info(`📋 Table "${table}" doesn't exist yet, using fallback data. Run setup-database.sql to create it.`)
          } else {
            console.warn(`⚠️ Error fetching ${table}:`, error.message)
          }
          return // Use fallback data
        }
        
        if (!data) {
          console.info(`📋 No data in ${table}, using fallback`)
          return // Use fallback data
        }
        
        console.info(`✅ Loaded singleton data from ${table}`)
        setRow(map(data))
      })
      .catch((error) => {
        if (!cancelled) {
          console.info(`📋 Using fallback data for ${table} due to error:`, error.message)
        }
      })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table])

  return row
}
