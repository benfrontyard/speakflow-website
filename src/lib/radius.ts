/**
 * Nested border-radius — inner = max(0, outer − inset)
 *
 * Use when an inner element sits inside a padded/inset rounded container
 * so corner curves stay visually parallel.
 */

export const RADIUS_PX = {
  'sm-5': 2,
  'sm-4': 3,
  'sm-3': 4,
  md: 8,
  'lg-6': 12,
  'lg-5': 16,
  'lg-4': 24,
  full: 9999,
} as const

export const SPACING_PX = {
  4: 4,
  8: 8,
  12: 12,
  16: 16,
  20: 20,
  24: 24,
  32: 32,
} as const

export type RadiusToken = keyof typeof RADIUS_PX
export type SpacingToken = keyof typeof SPACING_PX

/** Compute nested inner radius from outer radius and inset spacing (px). */
export function nestedRadius(outer: number, inset: number): number {
  return Math.max(0, outer - inset)
}

/** Compute nested radius from design token keys. */
export function nestedRadiusFromTokens(
  outer: RadiusToken,
  inset: SpacingToken,
): number {
  return nestedRadius(RADIUS_PX[outer], SPACING_PX[inset])
}

/** CSS custom property name for a precomputed nested radius pair. */
export function nestedRadiusVar(
  outer: RadiusToken,
  inset: SpacingToken,
): `--radius-nested-${RadiusToken}-inset-${SpacingToken}` {
  return `--radius-nested-${outer}-inset-${inset}`
}
