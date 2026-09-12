import { Navigate, Outlet } from 'react-router-dom'
import { isAuthed } from '~/lib/adminAuth'

export function ProtectedRoute() {
  if (!isAuthed()) return <Navigate to="/admin/login" replace />
  return <Outlet />
}
