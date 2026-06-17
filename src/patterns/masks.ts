import type { DotPatternFade } from './types'

/**
 * Mask gradients dissolve dots from 100% → 0% visibility.
 * `black` = fully visible, `transparent` = hidden.
 */
const FADE_MASKS: Record<Exclude<DotPatternFade, 'none'>, string> = {
  left: 'linear-gradient(to right, black 0%, rgba(0, 0, 0, 0.55) 30%, transparent 100%)',
  right: 'linear-gradient(to left, black 0%, rgba(0, 0, 0, 0.5) 28%, transparent 100%)',
  top: 'linear-gradient(to bottom, black 0%, rgba(0, 0, 0, 0.45) 35%, transparent 100%)',
  bottom: 'linear-gradient(to top, black 0%, rgba(0, 0, 0, 0.45) 35%, transparent 100%)',
  radial:
    'radial-gradient(ellipse 75% 70% at 50% 50%, black 0%, rgba(0, 0, 0, 0.35) 50%, transparent 100%)',
  diagonal:
    'linear-gradient(135deg, black 0%, rgba(0, 0, 0, 0.4) 38%, transparent 100%)',
  'radial-tl':
    'radial-gradient(ellipse 95% 85% at 0% 0%, black 0%, rgba(0, 0, 0, 0.3) 55%, transparent 100%)',
  'radial-tr':
    'radial-gradient(ellipse 95% 85% at 100% 0%, black 0%, rgba(0, 0, 0, 0.3) 55%, transparent 100%)',
  'radial-bl':
    'radial-gradient(ellipse 95% 85% at 0% 100%, black 0%, rgba(0, 0, 0, 0.3) 55%, transparent 100%)',
  'radial-br':
    'radial-gradient(ellipse 95% 85% at 100% 100%, black 0%, rgba(0, 0, 0, 0.3) 55%, transparent 100%)',
}

export function dotPatternMask(fade: DotPatternFade = 'none'): string | undefined {
  if (fade === 'none') {
    return undefined
  }

  return FADE_MASKS[fade]
}
