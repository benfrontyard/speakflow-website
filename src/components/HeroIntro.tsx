import { motion, useReducedMotion } from 'motion/react'
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export const HERO_INTRO_EASE = [0.16, 1, 0.3, 1] as const
export const HERO_INTRO_DURATION = 0.42
export const HERO_INTRO_STAGGER = 0.055
export const HERO_INTRO_Y = 12
export const HERO_INTRO_STAT_STAGGER = 0.045

// Keep intro active across React Strict Mode's mount → unmount → remount cycle.
let introPlaying = false

export type HeroIntroStep = 'eyebrow' | 'headline' | 'copy' | 'cta' | 'stats' | 'productVisual'

const STEP_ORDER: Record<HeroIntroStep, number> = {
  eyebrow: 0,
  headline: 1,
  copy: 2,
  cta: 3,
  stats: 4,
  productVisual: 5,
}

function getIntroCompleteMs(hasEyebrow: boolean, statCount: number) {
  const statsStepIndex = STEP_ORDER.stats - (hasEyebrow ? 0 : 1)
  const productDelay =
    statsStepIndex * HERO_INTRO_STAGGER + statCount * HERO_INTRO_STAT_STAGGER + 0.03
  return (productDelay + HERO_INTRO_DURATION) * 1000 + 80
}

type HeroIntroContextValue = {
  animate: boolean
  getDelay: (step: HeroIntroStep, offset?: number) => number
  getTransition: (step: HeroIntroStep, offset?: number) => {
    duration: number
    delay: number
    ease: typeof HERO_INTRO_EASE
  }
}

const HeroIntroContext = createContext<HeroIntroContextValue | null>(null)

type HeroIntroProviderProps = {
  children: ReactNode
  hasEyebrow?: boolean
  statCount?: number
}

export function HeroIntroProvider({
  children,
  hasEyebrow = false,
  statCount = 3,
}: HeroIntroProviderProps) {
  const prefersReducedMotion = useReducedMotion()
  const [shouldAnimate] = useState(() => {
    if (introPlaying) return true
    introPlaying = true
    return true
  })

  useEffect(() => {
    if (!shouldAnimate) return

    const timeoutId = window.setTimeout(() => {
      introPlaying = false
    }, getIntroCompleteMs(hasEyebrow, statCount))

    return () => window.clearTimeout(timeoutId)
  }, [hasEyebrow, shouldAnimate, statCount])

  const animate = shouldAnimate && !prefersReducedMotion

  const value = useMemo<HeroIntroContextValue>(() => {
    const getStepIndex = (step: HeroIntroStep) => {
      const base = STEP_ORDER[step]
      if (!hasEyebrow && base > STEP_ORDER.eyebrow) return base - 1
      return base
    }

    const getDelay = (step: HeroIntroStep, offset = 0) => {
      if (!animate) return 0
      return getStepIndex(step) * HERO_INTRO_STAGGER + offset
    }

    const getTransition = (step: HeroIntroStep, offset = 0) => ({
      duration: prefersReducedMotion ? 0.01 : HERO_INTRO_DURATION,
      delay: getDelay(step, offset),
      ease: HERO_INTRO_EASE,
    })

    return { animate, getDelay, getTransition }
  }, [animate, hasEyebrow, prefersReducedMotion])

  return <HeroIntroContext.Provider value={value}>{children}</HeroIntroContext.Provider>
}

export function useHeroIntro() {
  const context = useContext(HeroIntroContext)
  if (!context) {
    throw new Error('useHeroIntro must be used within HeroIntroProvider')
  }
  return context
}

type HeroIntroItemProps = {
  step: HeroIntroStep
  offset?: number
  className?: string
  children: ReactNode
}

export function HeroIntroItem({ step, offset = 0, className = '', children }: HeroIntroItemProps) {
  const { animate, getTransition } = useHeroIntro()

  if (!animate) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: HERO_INTRO_Y }}
      animate={{ opacity: 1, y: 0 }}
      transition={getTransition(step, offset)}
    >
      {children}
    </motion.div>
  )
}
