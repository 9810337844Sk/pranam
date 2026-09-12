const STORAGE_KEY = 'pranam_admin_auth'
const SHORT_SESSION_HOURS = 24
const REMEMBER_SESSION_HOURS = 24 * 30

function password() {
  return import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'
}

export function login(input: string, remember = false): boolean {
  if (input !== password()) return false
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ at: Date.now(), remember }))
  return true
}

export function logout() {
  localStorage.removeItem(STORAGE_KEY)
}

export function isAuthed(): boolean {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return false
  try {
    const { at, remember } = JSON.parse(raw) as { at: number; remember?: boolean }
    if (!at) return false
    const ageHours = (Date.now() - at) / (1000 * 60 * 60)
    const limit = remember ? REMEMBER_SESSION_HOURS : SHORT_SESSION_HOURS
    if (ageHours > limit) {
      logout()
      return false
    }
    return true
  } catch {
    logout()
    return false
  }
}
