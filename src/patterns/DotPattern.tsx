import type { CSSProperties } from 'react'
import { buildDotPatternStyle, dotPatternClassName } from './buildPattern'
import type { DotPatternConfig } from './types'

export type DotPatternProps = DotPatternConfig & {
  className?: string
  style?: CSSProperties
  /** Figma layer path for design ↔ code mapping */
  figma?: string
  /** Stable id for debugging / analytics */
  id?: string
}

export function DotPattern({
  className = '',
  style,
  figma,
  id,
  ...config
}: DotPatternProps) {
  return (
    <div
      className={`${dotPatternClassName(config)} ${className}`.trim()}
      style={{ ...buildDotPatternStyle(config), ...style }}
      aria-hidden="true"
      data-dot-pattern={config.variant ?? 'grid'}
      data-figma={figma}
      data-layer={id}
    />
  )
}
