import type { DotPatternPreset } from './types'

/** Speakflow marketing defaults — 3px dots, 18px gap, subtle neutral */
export const dotPatternPresets = {
  speakflowGrid: {
    id: 'speakflow-grid',
    name: 'Speakflow / Dot Grid / Neutral',
    figma: 'Decoration / Dot Grid / 18',
    variant: 'grid',
    color: 'neutral',
    size: 3,
    gap: 22,
    opacity: 0.14,
    fade: 'radial',
  },

  speakflowFadedGrid: {
    id: 'speakflow-faded-grid',
    name: 'Speakflow / Dot Grid / Faded Right',
    figma: 'Decoration / Dot Grid / Faded',
    variant: 'grid',
    color: 'neutral',
    size: 3,
    gap: 18,
    opacity: 0.18,
    fade: 'right',
  },

  speakflowBrandGradient: {
    id: 'speakflow-brand-gradient',
    name: 'Speakflow / Dot Grid / Brand Gradient',
    figma: 'Decoration / Dot Grid / Brand Gradient',
    variant: 'gradient-grid',
    color: 'brand',
    size: 3,
    gap: 18,
    opacity: 0.22,
    gradient: 'brand',
    fade: 'diagonal',
  },

  speakflowRadial: {
    id: 'speakflow-radial',
    name: 'Speakflow / Dot Grid / Radial',
    figma: 'Decoration / Dot Grid / Radial',
    variant: 'radial',
    color: 'neutral',
    size: 3,
    gap: 18,
    opacity: 0.16,
  },

  speakflowScatter: {
    id: 'speakflow-scatter',
    name: 'Speakflow / Dot Grid / Scatter',
    figma: 'Decoration / Dot Grid / Scatter',
    variant: 'scatter',
    color: 'neutral',
    size: 3,
    gap: 22,
    opacity: 0.14,
    fade: 'bottom',
  },

  speakflowHex: {
    id: 'speakflow-hex',
    name: 'Speakflow / Dot Grid / Hex',
    figma: 'Decoration / Dot Grid / Hex',
    variant: 'hex',
    color: 'neutral',
    size: 3,
    gap: 18,
    opacity: 0.15,
    fade: 'radial',
  },

  marketingFlowBase: {
    id: 'marketing-flow-base',
    name: 'Marketing Flow / Sparse Grid Patch',
    figma: 'Decoration / Dot Patch / Upper Left',
    variant: 'grid',
    color: 'neutral',
    size: 3,
    gap: 22,
    opacity: 0.15,
    fade: 'right',
    region: {
      position: { x: '0', y: '6rem', anchor: 'top-left' },
      size: { w: '48%', h: '30%' },
    },
  },

  marketingFlowAccent: {
    id: 'marketing-flow-accent',
    name: 'Marketing Flow / Brand Gradient Patch',
    figma: 'Decoration / Dot Patch / Lower Brand',
    variant: 'gradient-grid',
    color: 'brand',
    size: 3,
    gap: 22,
    opacity: 0.09,
    gradient: 'brand',
    fade: 'diagonal',
    region: {
      position: { x: '0', y: '82%', anchor: 'top-right' },
      size: { w: '46%', h: '22%' },
    },
  },
} as const satisfies Record<string, DotPatternPreset>

export type DotPatternPresetId = keyof typeof dotPatternPresets
