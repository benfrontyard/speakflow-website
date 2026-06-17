import type { DotPatternConfig, DotPatternRegion } from '../patterns/types'

/** Figma layer path, e.g. "Decoration / Dot Grid / 48" */
export type FigmaLayerName = string

export type ColorToken =
  | 'accent'
  | 'accent-5'
  | 'accent-14'
  | 'accent-20'
  | 'accent-alt'
  | 'button-primary-gradient-start'
  | 'background'
  | 'surface-alt'
  | 'transparent'

export type BlurToken = 'sm' | 'md' | 'lg' | number

export type Anchor =
  | 'center'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'

export type Position = {
  x: number | string
  y: number | string
  anchor?: Anchor
}

export type DriftPreset = 'drift-a' | 'drift-b' | 'drift-c' | 'none'

export type GradientBlobLayer = {
  type: 'gradient-blob'
  id: string
  figma?: FigmaLayerName
  color: ColorToken
  colorMix?: number
  colorStop?: number
  size: { w: number | string; h: number | string }
  position: Position
  blur: BlurToken
  opacity?: number
  motion?: { preset: DriftPreset }
}

export type DotPattern = 'dot-grid'

/** CSS/SVG dot pattern config — see `src/patterns` */
export type DotFieldLayer = {
  type: 'dot-field'
  id: string
  figma?: FigmaLayerName
  /** @deprecated Use dotPattern preset fields instead */
  pattern?: DotPattern
  /** @deprecated Use `gap` instead */
  tileSize?: number
  dotPattern?: DotPatternConfig
  /** Sparse dot patch placement — omit for full-bleed */
  region?: DotPatternRegion
  opacity?: number
  blend?: 'normal' | 'overlay' | 'multiply' | 'soft-light' | 'screen'
}

export type LinearFadeLayer = {
  type: 'linear-fade'
  id: string
  figma?: FigmaLayerName
  edge: 'top' | 'bottom' | 'left' | 'right'
  height: number | string
  from: ColorToken
  fromOpacity?: number
  to?: ColorToken | 'transparent'
}

export type DecorationLayer = GradientBlobLayer | DotFieldLayer | LinearFadeLayer

export type DecorationScene = {
  id: string
  name: string
  figma?: FigmaLayerName
  layers: DecorationLayer[]
  vars?: Record<string, string | number>
}
