import { useEffect, useState } from 'react'
import { supabase } from '~/lib/supabase'

interface DatabaseStatus {
  isConnected: boolean
  missingTables: string[]
  error?: string
}

export function DatabaseStatus() {
  const [status, setStatus] = useState<DatabaseStatus>({ isConnected: false, missingTables: [] })
  const [isVisible, setIsVisible] = useState(true) // Start visible by default
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [checkAttempted, setCheckAttempted] = useState(false)

  useEffect(() => {
    // Use a longer timeout to ensure everything is loaded
    const timer = setTimeout(() => {
      checkDatabaseStatus()
    }, 1000) // 1 second delay

    return () => clearTimeout(timer)
  }, [])

  const checkDatabaseStatus = async () => {
    try {
      setCheckAttempted(true)
      
      // Check if we have valid environment variables first
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

      if (!supabaseUrl || !supabaseKey) {
        setStatus({ isConnected: false, missingTables: [], error: 'Supabase credentials missing from .env' })
        setIsVisible(true)
        setHasError(true)
        return
      }

      // Check if the keys look like placeholder values
      if (supabaseUrl.includes('your-project-id') || supabaseKey.includes('your-')) {
        setStatus({ isConnected: false, missingTables: [], error: 'Please update Supabase credentials in .env file' })
        setIsVisible(true)
        setHasError(true)
        return
      }

      // Check if the keys look valid (proper length and format)
      if (supabaseKey.length < 100 || !supabaseKey.startsWith('eyJ')) {
        setStatus({ isConnected: false, missingTables: [], error: 'Invalid Supabase credentials format' })
        setIsVisible(true)
        setHasError(true)
        return
      }

      if (!supabase) {
        setStatus({ isConnected: false, missingTables: [], error: 'Supabase client failed to initialize' })
        setIsVisible(true)
        setHasError(true)
        return
      }

      const requiredTables = ['project_inquiries', 'hero_slides', 'page_views']
      const missingTables: string[] = []
      let hasConnectionError = false

      // Test connection and check tables
      for (const table of requiredTables) {
        try {
          const { error } = await supabase.from(table).select('id').limit(1)
          
          if (error) {
            if (error.message?.includes('JWT') || error.message?.includes('unauthorized') || error.message?.includes('authentication')) {
              setStatus({ isConnected: false, missingTables: [], error: 'Authentication failed - check Supabase credentials' })
              setIsVisible(true)
              setHasError(true)
              return
            } else if (error.message?.includes('relation') || error.message?.includes('does not exist') || error.message?.includes('schema cache')) {
              // Table doesn't exist
              missingTables.push(table)
            } else {
              console.warn(`Database check warning for ${table}:`, error.message)
              // For unknown errors, assume table is missing to be safe
              missingTables.push(table)
            }
          }
        } catch (networkError: any) {
          if (networkError.message?.includes('fetch') || networkError.message?.includes('network')) {
            setStatus({ isConnected: false, missingTables: [], error: 'Network error - check internet connection and Supabase URL' })
            setIsVisible(true)
            setHasError(true)
            return
          } else {
            console.warn(`Could not check table ${table}:`, networkError)
            missingTables.push(table)
          }
        }
      }

      setStatus({
        isConnected: true,
        missingTables,
        error: missingTables.length > 0 ? `Setup needed - Missing tables: ${missingTables.join(', ')}` : undefined
      })

      // Always show if there are missing tables (don't auto-hide these)
      if (missingTables.length > 0) {
        setIsVisible(true)
        setHasError(false)
      } else {
        // Show success message briefly, then hide
        setIsVisible(true)
        setHasError(false)
        setTimeout(() => setIsVisible(false), 8000) // Hide success after 8 seconds
      }
      
    } catch (error: any) {
      console.error('Database status check failed:', error)
      setHasError(true)
      setStatus({ isConnected: false, missingTables: [], error: `Connection error: ${error.message || 'Unknown error'}` })
      setIsVisible(true)
    } finally {
      setIsLoading(false)
    }
  }

  // Auto-hide error messages after 30 seconds to not block UI permanently
  useEffect(() => {
    if (!isLoading && hasError && isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        console.info('🔕 DatabaseStatus auto-hidden after error timeout')
      }, 30000) // 30 seconds for errors
      return () => clearTimeout(timer)
    }
  }, [hasError, isVisible, isLoading])

  // Show loading state briefly
  if (isLoading && !checkAttempted) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: '#6b7280',
        color: 'white',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: '14px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '8px 20px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <span style={{ fontSize: '16px', flexShrink: 0 }}>⏳</span>
          <div>
            <span style={{ fontWeight: 500 }}>Checking database connection...</span>
          </div>
        </div>
      </div>
    )
  }

  // Don't render if not visible
  if (!isVisible) {
    return null
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: hasError ? '#dc3545' : status.missingTables.length > 0 ? '#1A73E8' : '#28a745',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '14px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      animation: 'slideDown 0.3s ease-out'
    }}>
      <style>
        {`
          @keyframes slideDown {
            from { transform: translateY(-100%); }
            to { transform: translateY(0); }
          }
        `}
      </style>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {!status.isConnected ? (
          <>
            <span style={{ fontSize: '20px', flexShrink: 0 }}>⚠️</span>
            <div style={{ flex: 1 }}>
              <strong style={{ display: 'block', fontWeight: 600, marginBottom: '2px' }}>Database Connection Issue</strong>
              <p style={{ margin: 0, opacity: 0.9, fontSize: '13px' }}>{status.error}</p>
              {hasError && (
                <p style={{ margin: 0, opacity: 0.8, fontSize: '12px', marginTop: '4px' }}>
                  Website works with fallback data. This notice auto-hides in 30 seconds.
                </p>
              )}
            </div>
          </>
        ) : status.missingTables.length > 0 ? (
          <>
            <span style={{ fontSize: '20px', flexShrink: 0 }}>🔧</span>
            <div style={{ flex: 1 }}>
              <strong style={{ display: 'block', fontWeight: 600, marginBottom: '2px' }}>Database Setup Required</strong>
              <p style={{ margin: 0, opacity: 0.9, fontSize: '13px' }}>
                {status.error}
              </p>
              <p style={{ margin: 0, opacity: 0.8, fontSize: '12px', marginTop: '4px' }}>
                Check QUICK_DATABASE_SETUP.md for instructions • Website works with fallback data
              </p>
            </div>
          </>
        ) : (
          <>
            <span style={{ fontSize: '20px', flexShrink: 0 }}>✅</span>
            <div style={{ flex: 1 }}>
              <strong style={{ display: 'block', fontWeight: 600, marginBottom: '2px' }}>Database Connected</strong>
              <p style={{ margin: 0, opacity: 0.9, fontSize: '13px' }}>All systems operational and tables ready</p>
            </div>
          </>
        )}
        <button
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '20px',
            cursor: 'pointer',
            padding: '4px 8px',
            borderRadius: '4px',
            opacity: 0.8,
            transition: 'all 0.2s ease'
          }}
          onClick={() => setIsVisible(false)}
          aria-label="Close notification"
          title="Close notification"
          onMouseOver={(e) => {
            e.currentTarget.style.opacity = '1'
            e.currentTarget.style.background = 'rgba(255,255,255,0.15)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.opacity = '0.8'
            e.currentTarget.style.background = 'none'
          }}
        >
          ×
        </button>
      </div>
    </div>
  )
}