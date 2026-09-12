import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '~/lib/adminAuth'

export default function Login() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (login(password)) {
      navigate('/admin/enquiries', { replace: true })
    } else {
      setError('Incorrect password.')
    }
  }

  return (
    <div className="admin-login">
      <form className="admin-login-card" onSubmit={onSubmit}>
        <h1>Pranam Admin</h1>
        <p>Sign in to manage your website content.</p>
        <label>
          <span>Password</span>
          <input
            type="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
          />
        </label>
        {error && <p className="admin-error">{error}</p>}
        <button type="submit" className="admin-btn primary">
          Sign In
        </button>
      </form>
    </div>
  )
}
