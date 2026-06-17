import type { ReactNode } from 'react'

type ContainerProps = {
  children: ReactNode
  className?: string
}

export function Container({ children, className = '' }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-[var(--grid-max-width)] px-20 md:px-32 lg:px-40 ${className}`}
    >
      {children}
    </div>
  )
}
