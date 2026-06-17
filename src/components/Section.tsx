import type { ReactNode } from 'react'

type SectionProps = {
  id: string
  children: ReactNode
  className?: string
  size?: 'default' | 'compact'
}

export function Section({ id, children, className = '', size = 'default' }: SectionProps) {
  const paddingClass =
    size === 'compact' ? 'py-[var(--space-section-compact)]' : 'py-[var(--space-section)]'

  return (
    <section id={id} className={`${paddingClass} ${className}`}>
      {children}
    </section>
  )
}
