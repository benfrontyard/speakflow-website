import { Shimmer } from './Shimmer'

type VisualPlaceholderProps = {
  variant?: 'checkerboard' | 'surface' | 'shimmer'
  aspectRatio?: string
  label?: string
  className?: string
}

export function VisualPlaceholder({
  variant = 'surface',
  aspectRatio = 'aspect-video',
  label,
  className = '',
}: VisualPlaceholderProps) {
  if (variant === 'shimmer') {
    return (
      <div
        className={`${aspectRatio} w-full ${className}`}
        aria-hidden={!label}
        aria-label={label}
      >
        <Shimmer className="h-full w-full rounded-lg-4" />
      </div>
    )
  }

  return (
    <div
      className={`${aspectRatio} w-full overflow-hidden rounded-lg-4 ${
        variant === 'checkerboard' ? 'visual-checkerboard' : 'bg-surface-alt'
      } ${className}`}
      aria-hidden={!label}
      aria-label={label}
    >
      {label ? (
        <div className="flex h-full items-center justify-center text-body-sm text-text-secondary-alt">
          {label}
        </div>
      ) : null}
    </div>
  )
}
