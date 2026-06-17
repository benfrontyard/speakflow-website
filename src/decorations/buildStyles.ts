import type { CSSProperties } from 'react'
import { buildDotPatternStyle, dotPatternClassName } from '../patterns/buildPattern'
import type {
  BlurToken,
  ColorToken,
  DecorationLayer,
  DotFieldLayer,
  LinearFadeLayer,
  Position,
} from './types'

export type DecorationCSSVars = CSSProperties & Record<`--${string}`, string | number>

const COLOR_MAP: Record<ColorToken, string> = {
  accent: 'var(--color-accent)',
  'accent-5': 'var(--color-accent-5)',
  'accent-14': 'var(--color-accent-14)',
  'accent-20': 'var(--color-accent-20)',
  'accent-alt': 'var(--color-accent-alt)',
  'button-primary-gradient-start': 'var(--color-button-primary-gradient-start)',
  background: 'var(--color-background)',
  'surface-alt': 'var(--color-surface-alt)',
  transparent: 'transparent',
}

const BLUR_MAP: Record<Exclude<BlurToken, number>, string> = {
  sm: 'var(--decoration-blur-sm)',
  md: 'var(--decoration-blur-md)',
  lg: 'var(--decoration-blur-lg)',
}

function formatUnit(value: number | string): string {
  return typeof value === 'number' ? `${value}px` : value
}

function resolveBlur(blur: BlurToken): string {
  return typeof blur === 'number' ? `${blur}px` : BLUR_MAP[blur]
}

export function blobFill(color: ColorToken, mix = 60, stop = 70): string {
  if (color === 'transparent') {
    return 'transparent'
  }

  return `radial-gradient(circle, color-mix(in srgb, ${COLOR_MAP[color]} ${mix}%, transparent) 0%, transparent ${stop}%)`
}

function linearFadeGradient(layer: LinearFadeLayer): string {
  const toColor = layer.to === 'transparent' || !layer.to ? 'transparent' : COLOR_MAP[layer.to]
  const fromOpacity = layer.fromOpacity ?? 1

  const fromColor =
    layer.from === 'transparent'
      ? 'transparent'
      : fromOpacity < 1
        ? `color-mix(in srgb, ${COLOR_MAP[layer.from]} ${fromOpacity * 100}%, transparent)`
        : COLOR_MAP[layer.from]

  const direction = {
    top: 'to bottom',
    bottom: 'to top',
    left: 'to right',
    right: 'to left',
  }[layer.edge]

  return `linear-gradient(${direction}, ${fromColor}, ${toColor})`
}

function positionStyles(position: Position): DecorationCSSVars {
  const anchor = position.anchor ?? 'top-left'

  if (anchor === 'center') {
    return {
      left: formatUnit(position.x),
      top: formatUnit(position.y),
    }
  }

  const styles: DecorationCSSVars = {}

  if (anchor.includes('left')) {
    styles.left = formatUnit(position.x)
  } else if (anchor.includes('right')) {
    styles.right = formatUnit(position.x)
  }

  if (anchor.includes('top')) {
    styles.top = formatUnit(position.y)
  } else if (anchor.includes('bottom')) {
    styles.bottom = formatUnit(position.y)
  }

  return styles
}

function resolveDotFieldConfig(layer: DotFieldLayer) {
  const base = layer.dotPattern
    ? {
        ...layer.dotPattern,
        opacity: layer.dotPattern.opacity ?? layer.opacity,
        blend: layer.dotPattern.blend ?? layer.blend,
        region: layer.dotPattern.region ?? layer.region,
      }
    : {
        variant: 'grid' as const,
        size: 3,
        gap: layer.tileSize ?? 18,
        opacity: layer.opacity ?? 0.14,
        color: 'neutral' as const,
        blend: layer.blend,
        region: layer.region,
      }

  return base
}

export function layerStyleVars(layer: DecorationLayer): DecorationCSSVars {
  switch (layer.type) {
    case 'gradient-blob':
      return {
        ...positionStyles(layer.position),
        width: formatUnit(layer.size.w),
        height: formatUnit(layer.size.h),
        '--sf-blob-fill': blobFill(layer.color, layer.colorMix ?? 60, layer.colorStop ?? 70),
        '--sf-blob-blur': resolveBlur(layer.blur),
        '--sf-blob-opacity': layer.opacity ?? 0.5,
      }

    case 'dot-field':
      return buildDotPatternStyle(resolveDotFieldConfig(layer))

    case 'linear-fade':
      return {
        '--sf-fade-gradient': linearFadeGradient(layer),
        '--sf-fade-size': formatUnit(layer.height),
      }
  }
}

export function layerClassName(layer: DecorationLayer): string {
  switch (layer.type) {
    case 'gradient-blob': {
      const anchor = layer.position.anchor ?? 'top-left'
      const anchorClass = anchor === 'center' ? 'decoration-blob--center' : ''
      return `decoration-layer decoration-blob ${anchorClass}`.trim()
    }
    case 'dot-field':
      return `decoration-layer decoration-dot-pattern ${dotPatternClassName(resolveDotFieldConfig(layer))}`.trim()
    case 'linear-fade':
      return `decoration-layer decoration-linear-fade decoration-linear-fade--${layer.edge}`
  }
}

export function layerDataAttributes(
  layer: DecorationLayer,
): Record<string, string | undefined> {
  if (layer.type !== 'gradient-blob' || !layer.motion || layer.motion.preset === 'none') {
    return {}
  }

  return { 'data-motion': layer.motion.preset }
}
