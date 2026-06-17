import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useState, type ReactNode } from 'react'

const INTRO_SESSION_KEY = 'sf-seen-intro'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  /** Hero-only mount animation; skips on repeat visits in the same session. */
  intro?: boolean
}

export function Reveal({ children, className = '', delay = 0, intro = false }: RevealProps) {
  const prefersReducedMotion = useReducedMotion()
  const [skipIntro] = useState(() => {
    if (!intro || typeof window === 'undefined') return false
    return window.sessionStorage.getItem(INTRO_SESSION_KEY) === '1'
  })

  useEffect(() => {
    if (!intro || skipIntro) return
    window.sessionStorage.setItem(INTRO_SESSION_KEY, '1')
  }, [intro, skipIntro])

  if (!intro || prefersReducedMotion || skipIntro) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
