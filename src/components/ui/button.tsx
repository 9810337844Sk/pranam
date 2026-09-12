import { Link } from 'react-router-dom'
import { cn } from '~/lib/utils'

type Variant = 'blue' | 'ghost' | 'pink' | 'yellow'
const variants: Record<Variant, string> = {
  blue: 'btn-blue',
  ghost: 'btn-ghost',
  pink: 'btn-pink',
  yellow: 'btn-yellow',
}

type Common = { variant?: Variant; className?: string; children: React.ReactNode }

export function Button({
  variant = 'blue',
  className,
  children,
  ...props
}: Common & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn('btn', variants[variant], className)} {...props}>
      {children}
    </button>
  )
}

export function ButtonLink({
  variant = 'blue',
  className,
  children,
  to,
  href,
  ...props
}: Common & { to?: string; href?: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const cls = cn('btn', variants[variant], className)
  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    )
  }
  return (
    <a className={cls} href={href} {...props}>
      {children}
    </a>
  )
}
