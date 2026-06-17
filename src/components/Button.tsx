import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost' | 'gradient'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  children: ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-accent-alt hover:bg-text-primary shadow-200',
  secondary: 'bg-accent-alt text-text-primary border border-border-alt hover:bg-surface-alt',
  accent: 'bg-accent-5 text-accent-alt hover:bg-accent-14 shadow-200',
  ghost:
    'border border-accent-alt/30 bg-transparent text-accent-alt hover:border-accent-alt/60 hover:bg-accent-alt/10',
  gradient:
    'bg-gradient-to-r from-accent-5 via-accent-20 to-accent-5 text-accent-alt shadow-200 hover:brightness-110',
}

export function Button({
  variant = 'primary',
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center rounded-md px-24 py-12 text-body-sm font-medium transition-colors duration-150 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
