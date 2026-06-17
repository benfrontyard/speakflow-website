import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'

type RotatingPhraseProps = {
  phrases: readonly string[]
  interval?: number
  duration?: number
  className?: string
}

export function RotatingPhrase({
  phrases,
  interval = 2800,
  duration = 0.5,
  className = '',
}: RotatingPhraseProps) {
  const [index, setIndex] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || phrases.length <= 1) return

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % phrases.length)
    }, interval)

    return () => window.clearInterval(id)
  }, [interval, phrases.length, prefersReducedMotion])

  const longestPhrase = phrases.reduce(
    (longest, phrase) => (phrase.length > longest.length ? phrase : longest),
    phrases[0] ?? '',
  )

  if (prefersReducedMotion || phrases.length <= 1) {
    return <span className={className}>{phrases[0]}</span>
  }

  return (
    <span className={`relative inline-grid [grid-template-areas:'stack'] ${className}`}>
      <span className="invisible [grid-area:stack]" aria-hidden="true">
        {longestPhrase}
      </span>
      <span className="sr-only" aria-live="polite">
        {phrases[index]}
      </span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={phrases[index]}
          className="inline-block [grid-area:stack]"
          initial={{ opacity: 0, y: '0.2em' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '-0.2em' }}
          transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        >
          {phrases[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
