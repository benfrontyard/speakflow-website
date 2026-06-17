import { useEffect, useRef, useState } from 'react'

type UseActiveStepOptions = {
  stepCount: number
}

function getActiveStepIndex(steps: HTMLElement[], anchorY: number) {
  for (let index = steps.length - 1; index >= 0; index -= 1) {
    const rect = steps[index].getBoundingClientRect()
    if (rect.top <= anchorY && rect.bottom >= anchorY) {
      return index
    }
  }

  let closestIndex = 0
  let closestDistance = Number.POSITIVE_INFINITY

  steps.forEach((step) => {
    const stepIndex = Number(step.dataset.stepIndex)
    if (Number.isNaN(stepIndex)) return

    const rect = step.getBoundingClientRect()
    const stepCenter = rect.top + rect.height / 2
    const distance = Math.abs(stepCenter - anchorY)

    if (distance < closestDistance) {
      closestDistance = distance
      closestIndex = stepIndex
    }
  })

  return closestIndex
}

export function useActiveStep({ stepCount }: UseActiveStepOptions) {
  const [activeStep, setActiveStep] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (stepCount === 0) return

    let frame = 0

    const updateActiveStep = () => {
      const container = containerRef.current
      if (!container) return

      const steps = Array.from(
        container.querySelectorAll<HTMLElement>('[data-step-index]'),
      )

      if (steps.length === 0) return

      const anchorY = window.innerHeight * 0.45
      const nextStep = getActiveStepIndex(steps, anchorY)

      setActiveStep((current) => (current === nextStep ? current : nextStep))
    }

    const scheduleUpdate = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(updateActiveStep)
    }

    scheduleUpdate()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
    }
  }, [stepCount])

  return { activeStep, containerRef }
}
