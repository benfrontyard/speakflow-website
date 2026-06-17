/** Figma layer path, e.g. "Decoration / Dot Grid / 18" */
export type FigmaLayerName = string

export type DotPatternVariant =
  | 'grid'
  | 'gradient-grid'
  | 'radial'
  | 'scatter'
  | 'squares'
  | 'crosses'
  | 'diagonal-lines'
  | 'hex'

export type DotPatternColorPreset = 'neutral' | 'brand'

export type DotPatternGradientPreset = 'none' | 'brand'

export type DotPatternFade =
  | 'none'
  | 'left'
  | 'right'
  | 'top'
  | 'bottom'
  | 'radial'
  | 'diagonal'
  | 'radial-tl'
  | 'radial-tr'
  | 'radial-bl'
  | 'radial-br'

export type DotPatternRegion = {
  position: {
    x: number | string
    y: number | string
    anchor?: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  }
  size: { w: number | string; h: number | string }
}

export type DotPatternConfig = {
  variant?: DotPatternVariant
  color?: DotPatternColorPreset | string
  size?: number | string
  gap?: number | string
  opacity?: number
  fade?: DotPatternFade
  gradient?: DotPatternGradientPreset
  animated?: boolean
  blend?: 'normal' | 'overlay' | 'multiply' | 'soft-light' | 'screen'
  /** Sparse placement — omit for full-bleed */
  region?: DotPatternRegion
}

export type DotPatternPreset = DotPatternConfig & {
  id: string
  name: string
  figma?: FigmaLayerName
}
