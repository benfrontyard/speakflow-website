import { useEffect, useRef, useState } from 'react'

type UseActiveStepOptions = {
  stepCount: number
  enabled?: boolean
}

function getScrollProgress(container: HTMLElement) {
  const rect = container.getBoundingClientRect()
  const scrollRange = container.offsetHeight - window.innerHeight
  if (scrollRange <= 0) return 0

  const progress = -rect.top / scrollRange

  if (progress >= 1 || rect.bottom <= window.innerHeight) {
    return 0.999
  }

  return Math.min(0.999, Math.max(0, progress))
}

function getActiveStepIndex(progress: number, stepCount: number) {
  return Math.min(stepCount - 1, Math.floor(progress * stepCount))
}

export function useActiveStep({ stepCount, enabled = true }: UseActiveStepOptions) {
  const [activeStep, setActiveStep] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!enabled || stepCount === 0) return

    let frame = 0

    const updateActiveStep = () => {
      const container = containerRef.current
      if (!container) return

      const progress = getScrollProgress(container)
      const nextStep = getActiveStepIndex(progress, stepCount)

      setActiveStep((current) => (current === nextStep ? current : nextStep))
    }

    const scheduleUpdate = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(updateActiveStep)
    }

    scheduleUpdate()
    requestAnimationFrame(() => {
      requestAnimationFrame(scheduleUpdate)
    })

    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
    }
  }, [stepCount, enabled])

  return { activeStep, containerRef }
}
