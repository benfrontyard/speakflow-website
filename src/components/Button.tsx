import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'tertiary'
type ButtonSize = 'sm' | 'md' | 'lg'
type ButtonTone = 'default' | 'on-dark'

type ButtonBaseProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  tone?: ButtonTone
  children: ReactNode
  className?: string
}

type ButtonAsButton = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined
  }

type ButtonAsLink = ButtonBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string
  }

export type ButtonProps = ButtonAsButton | ButtonAsLink

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  tertiary: 'btn-tertiary',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
}

const toneClasses: Record<ButtonTone, Partial<Record<ButtonVariant, string>>> = {
  default: {},
  'on-dark': {
    tertiary: 'btn-tertiary-on-dark',
  },
}

function getButtonClassName({
  variant = 'primary',
  size = 'md',
  tone = 'default',
  className = '',
}: Pick<ButtonBaseProps, 'variant' | 'size' | 'tone' | 'className'>) {
  return [
    'btn-base',
    variantClasses[variant],
    sizeClasses[size],
    toneClasses[tone][variant] ?? '',
    className,
  ]
    .filter(Boolean)
    .join(' ')
}

export function Button({
  variant = 'primary',
  size = 'md',
  tone = 'default',
  children,
  className = '',
  href,
  ...props
}: ButtonProps) {
  const classes = getButtonClassName({ variant, size, tone, className })

  if (href) {
    return (
      <a href={href} className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    )
  }

  return (
    <button
      type="button"
      className={classes}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  )
}
