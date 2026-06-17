import type { ReactNode } from 'react'

type ColSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

type GridProps = {
  children: ReactNode
  className?: string
}

type ColProps = {
  children: ReactNode
  className?: string
  span?: ColSpan | 'full'
  spanMd?: ColSpan | 'full'
  spanLg?: ColSpan | 'full'
}

const colSpan: Record<ColSpan | 'full', string> = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
  5: 'col-span-5',
  6: 'col-span-6',
  7: 'col-span-7',
  8: 'col-span-8',
  9: 'col-span-9',
  10: 'col-span-10',
  11: 'col-span-11',
  12: 'col-span-12',
  full: 'col-span-full',
}

const colSpanMd: Record<ColSpan | 'full', string> = {
  1: 'md:col-span-1',
  2: 'md:col-span-2',
  3: 'md:col-span-3',
  4: 'md:col-span-4',
  5: 'md:col-span-5',
  6: 'md:col-span-6',
  7: 'md:col-span-7',
  8: 'md:col-span-8',
  9: 'md:col-span-9',
  10: 'md:col-span-10',
  11: 'md:col-span-11',
  12: 'md:col-span-12',
  full: 'md:col-span-full',
}

const colSpanLg: Record<ColSpan | 'full', string> = {
  1: 'lg:col-span-1',
  2: 'lg:col-span-2',
  3: 'lg:col-span-3',
  4: 'lg:col-span-4',
  5: 'lg:col-span-5',
  6: 'lg:col-span-6',
  7: 'lg:col-span-7',
  8: 'lg:col-span-8',
  9: 'lg:col-span-9',
  10: 'lg:col-span-10',
  11: 'lg:col-span-11',
  12: 'lg:col-span-12',
  full: 'lg:col-span-full',
}

export function Grid({ children, className = '' }: GridProps) {
  return (
    <div
      className={`grid grid-cols-4 gap-x-24 md:grid-cols-8 lg:grid-cols-12 ${className}`}
    >
      {children}
    </div>
  )
}

export function Col({ children, className = '', span, spanMd, spanLg }: ColProps) {
  const classes = [
    'min-w-0',
    span ? colSpan[span] : 'col-span-4 md:col-span-8 lg:col-span-12',
    spanMd ? colSpanMd[spanMd] : '',
    spanLg ? colSpanLg[spanLg] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <div className={classes}>{children}</div>
}
