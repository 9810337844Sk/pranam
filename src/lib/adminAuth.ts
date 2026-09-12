const STORAGE_KEY = 'pranam_admin_auth'
const SESSION_HOURS = 24

function password() {
  return import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'
}

export function login(input: string): boolean {
  if (input !== password()) return false
  localStorage.setItem(STORAGE_KEY, String(Date.now()))
  return true
}

export function logout() {
  localStorage.removeItem(STORAGE_KEY)
}

export function isAuthed(): boolean {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return false
  const loggedInAt = Number(raw)
  if (!loggedInAt) return false
  const ageHours = (Date.now() - loggedInAt) / (1000 * 60 * 60)
  if (ageHours > SESSION_HOURS) {
    logout()
    return false
  }
  return true
}
