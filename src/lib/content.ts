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
    
    // Always start with fallback to ensure the site works
    if (!fallback || fallback.length === 0) {
      console.warn(`⚠️ No fallback data provided for ${table}`)
      return
    }

    if (!supabase) {
      console.info(`📋 Using fallback data for ${table} (Supabase not configured)`)
      return
    }

    // Wrap everything in try-catch to prevent any errors from breaking the site
    const loadData = async () => {
      try {
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .order(orderCol, { ascending: true })

        if (cancelled) return
        
        if (error) {
          // Log error but don't break the site
          console.info(`📋 Using fallback data for ${table} due to error:`, error.message)
          return // Keep using fallback data
        }
        
        if (!data || data.length === 0) {
          console.info(`📋 Table "${table}" is empty, using fallback data`)
          return // Keep using fallback data
        }
        
        console.info(`✅ Loaded ${data.length} items from ${table}`)
        setRows(data as T[])
      } catch (error: any) {
        if (!cancelled) {
          console.info(`📋 Using fallback data for ${table} due to exception:`, error.message)
        }
        // Keep using fallback data - don't update state on error
      }
    }

    // Add a small delay to prevent blocking the initial render
    const timer = setTimeout(loadData, 100)

    return () => {
      cancelled = true
      clearTimeout(timer)
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
    
    // Always start with fallback to ensure the site works
    if (!fallback) {
      console.warn(`⚠️ No fallback data provided for ${table}`)
      return
    }

    if (!supabase) {
      console.info(`📋 Using fallback data for ${table} (Supabase not configured)`)
      return
    }

    // Wrap everything in try-catch to prevent any errors from breaking the site
    const loadData = async () => {
      try {
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .limit(1)
          .maybeSingle()

        if (cancelled) return
        
        if (error) {
          console.info(`📋 Using fallback data for ${table} due to error:`, error.message)
          return // Keep using fallback data
        }
        
        if (!data) {
          console.info(`📋 No data in ${table}, using fallback`)
          return // Keep using fallback data
        }
        
        console.info(`✅ Loaded singleton data from ${table}`)
        setRow(map(data))
      } catch (error: any) {
        if (!cancelled) {
          console.info(`📋 Using fallback data for ${table} due to exception:`, error.message)
        }
        // Keep using fallback data - don't update state on error
      }
    }

    // Add a small delay to prevent blocking the initial render
    const timer = setTimeout(loadData, 150)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table])

  return row
}
