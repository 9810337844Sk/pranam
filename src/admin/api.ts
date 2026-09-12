import { supabase } from '~/lib/supabase'

export type Row = { id: string; [key: string]: unknown }

function db() {
  if (!supabase) throw new Error('Supabase is not configured — add the env vars from .env.example.')
  return supabase
}

export async function listRows<T extends Row>(table: string, orderCol = 'sort_order'): Promise<T[]> {
  const { data, error } = await db().from(table).select('*').order(orderCol, { ascending: true })
  if (error) throw new Error(error.message)
  return (data ?? []) as T[]
}

export async function insertRow<T extends Row>(table: string, values: Record<string, unknown>): Promise<T> {
  const { data, error } = await db().from(table).insert(values as never).select().single()
  if (error) throw new Error(error.message)
  return data as T
}

export async function updateRow<T extends Row>(table: string, id: string, values: Record<string, unknown>): Promise<T> {
  const { data, error } = await db().from(table).update(values as never).eq('id', id).select().single()
  if (error) throw new Error(error.message)
  return data as T
}

export async function deleteRow(table: string, id: string): Promise<void> {
  const { error } = await db().from(table).delete().eq('id', id)
  if (error) throw new Error(error.message)
}
