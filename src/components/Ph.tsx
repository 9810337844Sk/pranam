import { useState } from 'react'
import { cn } from '~/lib/utils'

/**
 * Image frame from the design: shows the photo, and falls back to the initials
 * plate underneath if the photo is missing or blocked.
 */
export function Ph({
  ini,
  src,
  alt,
  className,
  style,
  eager,
  children,
}: {
  ini: string
  src?: string
  alt?: string
  className?: string
  style?: React.CSSProperties
  eager?: boolean
  children?: React.ReactNode
}) {
  const [broken, setBroken] = useState(false)
  return (
    <div className={cn('ph', className)} data-ini={ini} style={style}>
      {src && !broken && (
        <img
          src={src}
          alt={alt ?? ''}
          loading={eager ? 'eager' : 'lazy'}
          onError={() => setBroken(true)}
        />
      )}
      {children}
    </div>
  )
}
