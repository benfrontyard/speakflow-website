import type { ReactNode } from 'react'

export const teleprompterBarClass =
  'flex items-center gap-4 rounded-lg-6 border border-white/10 bg-[#181818]/96 px-8 py-[6px]'

export const teleprompterChipClass =
  'flex items-center gap-4 rounded-md border border-white/[0.12] px-8 py-[5px]'

export const teleprompterIconBtnClass =
  'flex size-32 shrink-0 items-center justify-center rounded-md border border-white/[0.12]'

export const teleprompterTopBtnClass =
  'flex items-center gap-4 rounded-md border border-white/[0.12] px-8 py-4 text-caption font-medium leading-none text-accent-alt/90'

export function TeleprompterBar({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={`${teleprompterBarClass} ${className}`}>{children}</div>
}

export function TeleprompterChip({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={`${teleprompterChipClass} ${className}`}>{children}</div>
}

export function TeleprompterIconButton({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={`${teleprompterIconBtnClass} ${className}`}>{children}</div>
}

export function TeleprompterTopButton({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return <span className={`${teleprompterTopBtnClass} ${className}`}>{children}</span>
}

export function TeleprompterRecordSquare({ className = '' }: { className?: string }) {
  return (
    <span
      className={`size-16 shrink-0 rounded-[4px] ${className}`}
      style={{
        background:
          'linear-gradient(180deg, var(--color-button-primary-gradient-start) 0%, var(--color-accent-5) 100%)',
      }}
      aria-hidden="true"
    />
  )
}
