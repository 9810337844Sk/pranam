import { useEffect, useState } from 'react'
import { supabase } from '~/lib/supabase'

interface DatabaseStatus {
  isConnected: boolean
  missingTables: string[]
  error?: string
}

export function DatabaseStatus() {
  const [status, setStatus] = useState<DatabaseStatus>({ isConnected: false, missingTables: [] })
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    checkDatabaseStatus()
  }, [])

  const checkDatabaseStatus = async () => {
    if (!supabase) {
      setStatus({ isConnected: false, missingTables: [], error: 'Supabase not configured' })
      return
    }

    const requiredTables = ['project_inquiries', 'hero_slides', 'page_views']
    const missingTables: string[] = []

    // Check each table
    for (const table of requiredTables) {
      try {
        const { error } = await supabase.from(table).select('id').limit(1)
        if (error && error.message?.includes('does not exist')) {
          missingTables.push(table)
        }
      } catch (error) {
        console.warn(`Could not check table ${table}:`, error)
        missingTables.push(table)
      }
    }

    setStatus({
      isConnected: true,
      missingTables,
      error: missingTables.length > 0 ? `Missing tables: ${missingTables.join(', ')}` : undefined
    })
  }

  // Auto-hide after 10 seconds if no missing tables
  useEffect(() => {
    if (status.missingTables.length === 0) {
      const timer = setTimeout(() => setIsVisible(false), 10000)
      return () => clearTimeout(timer)
    }
  }, [status.missingTables.length])

  // Don't show if everything is working
  if (!isVisible || (status.isConnected && status.missingTables.length === 0)) {
    return null
  }

  return (
    <div className="database-status">
      <div className="database-status-content">
        {!status.isConnected ? (
          <>
            <span className="database-status-icon">⚠️</span>
            <div>
              <strong>Database not configured</strong>
              <p>Add Supabase credentials to .env file</p>
            </div>
          </>
        ) : status.missingTables.length > 0 ? (
          <>
            <span className="database-status-icon">📋</span>
            <div>
              <strong>Database setup needed</strong>
              <p>Run setup-database.sql to create missing tables: {status.missingTables.join(', ')}</p>
            </div>
          </>
        ) : (
          <>
            <span className="database-status-icon">✅</span>
            <div>
              <strong>Database connected</strong>
              <p>All systems operational</p>
            </div>
          </>
        )}
        <button
          className="database-status-close"
          onClick={() => setIsVisible(false)}
          aria-label="Close"
        >
          ×
        </button>
      </div>
    </div>
  )
}

// Add CSS styles
const styles = `
.database-status {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: #1A73E8;
  color: white;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 14px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.database-status-content {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.database-status-icon {
  font-size: 20px;
  flex-shrink: 0;
}

.database-status strong {
  display: block;
  font-weight: 600;
  margin-bottom: 2px;
}

.database-status p {
  margin: 0;
  opacity: 0.9;
  font-size: 13px;
}

.database-status-close {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  margin-left: auto;
  padding: 4px;
  border-radius: 4px;
  opacity: 0.8;
}

.database-status-close:hover {
  opacity: 1;
  background: rgba(255,255,255,0.1);
}

@media (max-width: 768px) {
  .database-status-content {
    padding: 10px 16px;
  }
  
  .database-status {
    font-size: 13px;
  }
}
`

// Inject styles
if (typeof window !== 'undefined' && !document.querySelector('#database-status-styles')) {
  const styleEl = document.createElement('style')
  styleEl.id = 'database-status-styles'
  styleEl.textContent = styles
  document.head.appendChild(styleEl)
}