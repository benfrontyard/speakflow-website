type ShimmerProps = {
  className?: string
  variant?: 'light' | 'dark'
}

export function Shimmer({ className = '', variant = 'light' }: ShimmerProps) {
  return (
    <div
      className={`animate-shimmer ${variant === 'dark' ? 'shimmer-dark' : 'shimmer-light'} ${className}`}
      aria-hidden="true"
    />
  )
}
