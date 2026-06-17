import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { HeroIntroItem } from './HeroIntro'
import { HeroStatValue } from './HeroStatValue'

type HeroStat = {
  label: string
  value: string
}

type HeroStatCycleProps = {
  stats: readonly HeroStat[]
  interval?: number
  className?: string
}

export function HeroStatCycle({ stats, interval = 4000, className = '' }: HeroStatCycleProps) {
  const [index, setIndex] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || stats.length <= 1) return

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % stats.length)
    }, interval)

    return () => window.clearInterval(id)
  }, [interval, stats.length, prefersReducedMotion])

  const stat = stats[index] ?? stats[0]

  if (!stat) return null

  const statContent = (
    <>
      <p className="text-h4 tabular-nums text-accent-alt text-shadow-hero">
        <HeroStatValue value={stat.value} />
      </p>
      <p className="mt-4 text-[0.6875rem] font-medium tracking-[0.04em] text-accent-alt/72 uppercase text-shadow-hero-sm">
        {stat.label}
      </p>
    </>
  )

  if (prefersReducedMotion || stats.length <= 1) {
    return (
      <HeroIntroItem step="stats" className={className}>
        {statContent}
      </HeroIntroItem>
    )
  }

  return (
    <HeroIntroItem step="stats" className={`relative min-h-[3.25rem] ${className}`}>
      <span className="sr-only" aria-live="polite">
        {stat.value} {stat.label}
      </span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        >
          {statContent}
        </motion.div>
      </AnimatePresence>
    </HeroIntroItem>
  )
}
