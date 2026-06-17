import { useCallback, useEffect, useRef, useState } from 'react'

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

function getScrollTargetForStep(
  container: HTMLElement,
  stepIndex: number,
  stepCount: number,
) {
  const scrollRange = container.offsetHeight - window.innerHeight
  if (scrollRange <= 0) {
    return container.getBoundingClientRect().top + window.scrollY
  }

  const targetProgress = Math.min(0.999, (stepIndex + 0.5) / stepCount)
  const containerTop = container.getBoundingClientRect().top + window.scrollY

  return containerTop + targetProgress * scrollRange
}

export function useActiveStep({ stepCount, enabled = true }: UseActiveStepOptions) {
  const [activeStep, setActiveStep] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const programmaticScrollRef = useRef<number | null>(null)
  const scrollEndTimeoutRef = useRef<number | null>(null)

  const clearProgrammaticScroll = useCallback(() => {
    programmaticScrollRef.current = null
    if (scrollEndTimeoutRef.current !== null) {
      window.clearTimeout(scrollEndTimeoutRef.current)
      scrollEndTimeoutRef.current = null
    }
  }, [])

  const goToStep = useCallback(
    (stepIndex: number) => {
      const container = containerRef.current
      if (!container || stepCount === 0) return

      const nextStep = Math.max(0, Math.min(stepCount - 1, stepIndex))
      programmaticScrollRef.current = nextStep
      setActiveStep(nextStep)

      const targetScrollY = getScrollTargetForStep(container, nextStep, stepCount)

      window.scrollTo({ top: targetScrollY, behavior: 'smooth' })

      if (scrollEndTimeoutRef.current !== null) {
        window.clearTimeout(scrollEndTimeoutRef.current)
      }

      scrollEndTimeoutRef.current = window.setTimeout(clearProgrammaticScroll, 900)
    },
    [clearProgrammaticScroll, stepCount],
  )

  useEffect(() => {
    if (!enabled || stepCount === 0) return

    let frame = 0

    const updateActiveStep = () => {
      if (programmaticScrollRef.current !== null) return

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

    const handleScrollEnd = () => {
      clearProgrammaticScroll()
      scheduleUpdate()
    }

    scheduleUpdate()
    requestAnimationFrame(() => {
      requestAnimationFrame(scheduleUpdate)
    })

    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate, { passive: true })
    window.addEventListener('scrollend', handleScrollEnd, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      window.removeEventListener('scrollend', handleScrollEnd)
      clearProgrammaticScroll()
    }
  }, [clearProgrammaticScroll, enabled, stepCount])

  return { activeStep, containerRef, goToStep }
}
