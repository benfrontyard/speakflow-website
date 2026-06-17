import type { CSSProperties } from 'react'
import { dotPatternMask } from './masks'
import type {
  DotPatternColorPreset,
  DotPatternConfig,
  DotPatternGradientPreset,
  DotPatternRegion,
  DotPatternVariant,
} from './types'

export type DotPatternCSSVars = CSSProperties & Record<`--${string}`, string | number>

const COLOR_PRESETS: Record<DotPatternColorPreset, string> = {
  neutral: 'var(--dot-color-neutral)',
  brand: 'var(--dot-color-brand)',
}

const GRADIENT_PRESETS: Record<Exclude<DotPatternGradientPreset, 'none'>, string> = {
  brand: 'linear-gradient(128deg, var(--dot-gradient-from), var(--dot-gradient-to))',
}

function toPx(value: number | string): string {
  return typeof value === 'number' ? `${value}px` : value
}

function toRadius(size: number | string): string {
  const numeric = typeof size === 'number' ? size : Number.parseFloat(size)
  if (Number.isNaN(numeric)) {
    return '1.5px'
  }

  return `${numeric / 2}px`
}

function resolveColor(color: DotPatternColorPreset | string = 'neutral'): string {
  if (color in COLOR_PRESETS) {
    return COLOR_PRESETS[color as DotPatternColorPreset]
  }

  return color
}

function scatterPattern(color: string, gap: string): Pick<CSSProperties, 'backgroundImage' | 'backgroundSize' | 'backgroundPosition'> {
  const positions = ['18% 22%', '62% 14%', '84% 48%', '34% 58%', '72% 76%', '12% 82%', '48% 88%']
  const layers = positions.map(() => `radial-gradient(circle, ${color} 1.5px, transparent 1.5px)`)

  return {
    backgroundImage: layers.join(', '),
    backgroundSize: positions.map(() => `${gap} ${gap}`).join(', '),
    backgroundPosition: positions.join(', '),
  }
}

function crossesPattern(color: string, gap: string): Pick<CSSProperties, 'backgroundImage' | 'backgroundSize'> {
  return {
    backgroundImage: `linear-gradient(to bottom, transparent calc(50% - 1px), ${color} calc(50% - 1px), ${color} calc(50% + 1px), transparent calc(50% + 1px)), linear-gradient(to right, transparent calc(50% - 1px), ${color} calc(50% - 1px), ${color} calc(50% + 1px), transparent calc(50% + 1px))`,
    backgroundSize: `${gap} ${gap}`,
  }
}

function patternBackground(
  variant: DotPatternVariant,
  color: string,
  radius: string,
  gap: string,
  _gradient: DotPatternGradientPreset,
): Pick<CSSProperties, 'backgroundImage' | 'backgroundSize' | 'backgroundPosition'> {
  switch (variant) {
    case 'grid':
      return {
        backgroundImage: `radial-gradient(circle, ${color} ${radius}, transparent ${radius})`,
        backgroundSize: `${gap} ${gap}`,
      }

    case 'gradient-grid': {
      const brandGradient = GRADIENT_PRESETS.brand
      return {
        backgroundImage: `${brandGradient}, radial-gradient(circle, ${color} ${radius}, transparent ${radius})`,
        backgroundSize: `100% 100%, ${gap} ${gap}`,
        backgroundPosition: '0 0, 0 0',
      }
    }

    case 'hex':
      return {
        backgroundImage: `radial-gradient(circle, ${color} ${radius}, transparent ${radius}), radial-gradient(circle, ${color} ${radius}, transparent ${radius})`,
        backgroundSize: `${gap} ${gap}, ${gap} ${gap}`,
        backgroundPosition: `0 0, calc(${gap} / 2) calc(${gap} / 2)`,
      }

    case 'squares':
      return {
        backgroundImage: `linear-gradient(${color} ${radius}, transparent ${radius}), linear-gradient(90deg, ${color} ${radius}, transparent ${radius})`,
        backgroundSize: `${gap} ${gap}`,
      }

    case 'diagonal-lines':
      return {
        backgroundImage: `repeating-linear-gradient(135deg, ${color} 0, ${color} 1px, transparent 1px, transparent ${gap})`,
        backgroundSize: `${gap} ${gap}`,
      }

    case 'scatter':
      return scatterPattern(color, gap)

    case 'crosses':
      return crossesPattern(color, gap)

    case 'radial':
      return {
        backgroundImage: `radial-gradient(circle, ${color} ${radius}, transparent ${radius})`,
        backgroundSize: `${gap} ${gap}`,
      }
  }
}

export function buildDotPatternStyle(config: DotPatternConfig = {}): DotPatternCSSVars {
  const variant = config.variant ?? 'grid'
  const size = config.size ?? 3
  const gap = config.gap ?? 18
  const opacity = config.opacity ?? 0.14
  const fade = config.fade ?? 'none'
  const gradient = config.gradient ?? (variant === 'gradient-grid' ? 'brand' : 'none')
  const color = resolveColor(config.color ?? 'neutral')
  const radius = toRadius(size)
  const gapValue = toPx(gap)
  const mask = dotPatternMask(fade)

  const background = patternBackground(variant, color, radius, gapValue, gradient)

  const styles: DotPatternCSSVars = {
    '--dot-color': color,
    '--dot-size': toPx(size),
    '--dot-gap': gapValue,
    '--dot-opacity': opacity,
    '--dot-fade-direction': fade,
    ...background,
    opacity,
  }

  if (gradient === 'brand' && variant !== 'gradient-grid') {
    styles.backgroundImage = `${GRADIENT_PRESETS.brand}, ${styles.backgroundImage}`
    styles.backgroundSize = `100% 100%, ${styles.backgroundSize}`
  }

  if (config.blend) {
    styles.mixBlendMode = config.blend
  }

  if (mask) {
    styles.maskImage = mask
    styles.WebkitMaskImage = mask
  }

  if (variant === 'radial' && fade === 'none') {
    const radialMask = dotPatternMask('radial')
    styles.maskImage = radialMask
    styles.WebkitMaskImage = radialMask
  }

  if (config.region) {
    Object.assign(styles, regionStyles(config.region))
  }

  return styles
}

function regionStyles(region: DotPatternRegion): DotPatternCSSVars {
  const anchor = region.position.anchor ?? 'top-left'
  const styles: DotPatternCSSVars = {
    width: toPx(region.size.w),
    height: toPx(region.size.h),
  }

  if (anchor === 'center') {
    styles.left = toPx(region.position.x)
    styles.top = toPx(region.position.y)
    return styles
  }

  if (anchor.includes('left')) {
    styles.left = toPx(region.position.x)
  } else if (anchor.includes('right')) {
    styles.right = toPx(region.position.x)
  }

  if (anchor.includes('top')) {
    styles.top = toPx(region.position.y)
  } else if (anchor.includes('bottom')) {
    styles.bottom = toPx(region.position.y)
  }

  return styles
}

export function dotPatternClassName(config: DotPatternConfig = {}): string {
  const variant = config.variant ?? 'grid'
  const animated = config.animated ? 'dot-pattern--animated' : ''
  const fullBleed = config.region ? '' : 'dot-pattern--full'
  const centerAnchor =
    config.region?.position.anchor === 'center' ? 'dot-pattern--center' : ''

  return `dot-pattern dot-pattern--${variant} ${fullBleed} ${centerAnchor} ${animated}`.trim()
}
