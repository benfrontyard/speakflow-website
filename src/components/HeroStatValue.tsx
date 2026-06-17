import { animate } from 'motion/react'
import { useEffect, useState } from 'react'
import { HERO_INTRO_DURATION, HERO_INTRO_EASE, type HeroIntroStep, useHeroIntro } from './HeroIntro'

type HeroStatValueProps = {
  value: string
  step?: HeroIntroStep
  offset?: number
}

function isPlainInteger(value: string) {
  return /^\d+$/.test(value)
}

export function HeroStatValue({ value, step = 'stats', offset = 0 }: HeroStatValueProps) {
  const { animate: shouldAnimate, getDelay } = useHeroIntro()
  const [display, setDisplay] = useState(() => (shouldAnimate && isPlainInteger(value) ? '0' : value))

  useEffect(() => {
    if (!shouldAnimate || !isPlainInteger(value)) {
      setDisplay(value)
      return
    }

    const target = Number.parseInt(value, 10)
    const controls = animate(0, target, {
      duration: HERO_INTRO_DURATION,
      delay: getDelay(step, offset),
      ease: HERO_INTRO_EASE,
      onUpdate: (latest) => setDisplay(String(Math.round(latest))),
    })

    return () => controls.stop()
  }, [getDelay, offset, shouldAnimate, step, value])

  return <>{display}</>
}
