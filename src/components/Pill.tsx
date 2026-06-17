import type { ReactNode } from 'react'

type PillVariant = 'default' | 'brand' | 'subtle'
type PillSize = 'sm' | 'md'
type PillTone = 'default' | 'on-dark'

export type PillProps = {
  variant?: PillVariant
  size?: PillSize
  tone?: PillTone
  uppercase?: boolean
  icon?: ReactNode
  children: ReactNode
  className?: string
}

const variantClasses: Record<PillVariant, string> = {
  default: 'pill-default',
  brand: 'pill-brand',
  subtle: 'pill-subtle',
}

const sizeClasses: Record<PillSize, string> = {
  sm: 'pill-sm',
  md: 'pill-md',
}

export function Pill({
  variant = 'default',
  size = 'md',
  tone = 'default',
  uppercase = false,
  icon,
  children,
  className = '',
}: PillProps) {
  return (
    <span
      role="status"
      className={[
        'pill-base',
        variantClasses[variant],
        sizeClasses[size],
        tone === 'on-dark' ? 'pill-on-dark' : '',
        uppercase ? 'pill-uppercase' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {icon ? (
        <span className="pill-icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      {children}
    </span>
  )
}
