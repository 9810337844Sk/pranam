import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '~/lib/adminAuth'

export default function Login() {
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState('')
  const [showHint, setShowHint] = useState(false)
  const navigate = useNavigate()

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (login(password, remember)) {
      navigate('/admin/enquiries', { replace: true })
    } else {
      setError('Incorrect password.')
    }
  }

  return (
    <div className="admin-login">
      <div className="admin-login-scene">
        <span className="admin-login-cloud c1" />
        <span className="admin-login-cloud c2" />
        <span className="admin-login-hill h1" />
        <span className="admin-login-hill h2" />
        <span className="admin-login-tree t1" />
        <span className="admin-login-tree t2" />
        <span className="admin-login-cabin">
          <span className="admin-login-smoke" />
        </span>
      </div>

      <form className="admin-login-card" onSubmit={onSubmit}>
        <img src="/admin/admin-logo.png" alt="Pranam Software" className="admin-login-logo" />
        <h1>Login</h1>

        <label className="admin-login-field">
          <span>Admin Panel</span>
          <input value="Pranam Software" disabled />
        </label>

        <label className="admin-login-field">
          <span>Password</span>
          <input
            type="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </label>

        {error && <p className="admin-error">{error}</p>}

        <div className="admin-login-row">
          <label className="admin-login-remember">
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
            Remember Me
          </label>
          <button type="button" className="admin-login-forgot" onClick={() => setShowHint((v) => !v)}>
            Forgot Password?
          </button>
        </div>
        {showHint && (
          <p className="admin-login-hint">Ask your developer for the VITE_ADMIN_PASSWORD value.</p>
        )}

        <button type="submit" className="admin-login-btn">
          Log In
        </button>

        <p className="admin-login-back">
          <a href="/">← Back to Website</a>
        </p>
      </form>
    </div>
  )
}
