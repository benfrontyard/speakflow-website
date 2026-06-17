import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import type { RefObject } from 'react'
import { Button } from '../components/Button'
import { Container } from '../components/Container'
import { FlowTeleprompterPreview } from '../components/FlowTeleprompterPreview'
import { Col, Grid } from '../components/Grid'
import { MediaAsset } from '../components/MediaAsset'
import { Pill } from '../components/Pill'
import { Section } from '../components/Section'
import { content } from '../data/content'
import { useActiveStep } from '../hooks/useActiveStep'

const { howItWorks } = content

const stepVisualAspectClass = 'aspect-[16/9]'

const motionEase = [0.22, 1, 0.36, 1] as const
const motionDuration = 0.3

const stickyTopClass = 'top-[var(--nav-height,96px)]'
const stickyHeightClass = 'h-[calc(100vh-var(--nav-height,96px))]'

type Step = (typeof howItWorks.steps)[number]

function isFlowDemoStep(step: Step) {
  return 'demo' in step && step.demo === 'flow-teleprompter'
}

function useStepMotion() {
  const prefersReducedMotion = useReducedMotion()

  return {
    prefersReducedMotion,
    transition: {
      duration: prefersReducedMotion ? 0.15 : motionDuration,
      ease: motionEase,
    },
    initial: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 8,
    },
    animate: { opacity: 1, y: 0 },
    exit: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : -8,
    },
  }
}

function StepDots({
  activeStep,
  stepCount,
}: {
  activeStep: number
  stepCount: number
}) {
  return (
    <ol
      className="flex items-center gap-8"
      aria-label="How it works steps"
    >
      {Array.from({ length: stepCount }, (_, index) => {
        const isActive = activeStep === index

        return (
          <li key={index}>
            <span
              className={`block h-8 rounded-full transition-[width,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isActive
                  ? 'w-24 bg-[color-mix(in_srgb,var(--color-accent-5)_72%,transparent)]'
                  : 'w-8 bg-black/[0.08]'
              }`}
              aria-current={isActive ? 'step' : undefined}
            />
          </li>
        )
      })}
    </ol>
  )
}

function StepIntro({ compact = false }: { compact?: boolean }) {
  return (
    <header
      className={`flex max-w-[36rem] flex-col transition-[gap] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        compact ? 'gap-8' : 'gap-16'
      }`}
    >
      <Pill variant="subtle" uppercase>
        {howItWorks.eyebrow}
      </Pill>
      <h2
        className={`transition-[font-size,line-height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          compact ? 'text-h4' : 'text-h2'
        }`}
      >
        {howItWorks.title}
      </h2>
      <p
        className={`text-body-lg text-text-secondary-alt transition-[opacity,max-height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          compact ? 'max-h-0 overflow-hidden opacity-0' : 'max-h-24 opacity-100'
        }`}
      >
        {howItWorks.intro}
      </p>
    </header>
  )
}

function StepContent({ step }: { step: Step }) {
  const motionProps = useStepMotion()

  return (
    <motion.div
      key={step.number}
      className="flex max-w-[36rem] flex-col gap-16"
      initial={motionProps.initial}
      animate={motionProps.animate}
      exit={motionProps.exit}
      transition={motionProps.transition}
    >
      <div className="flex flex-wrap items-center gap-10">
        <Pill variant="brand" size="sm" uppercase>
          {step.pill}
        </Pill>
        <p className="text-caption font-medium uppercase tracking-[0.12em] text-text-tertiary">
          {step.number}
        </p>
      </div>
      <h3 className="text-h3">{step.title}</h3>
      <p className="text-body-lg text-text-secondary-alt">{step.copy}</p>
      <div className="flex flex-wrap gap-12 pt-4">
        <Button href={step.primaryCtaHref}>{step.primaryCta}</Button>
        <Button variant="tertiary" href={step.secondaryCtaHref}>
          {step.secondaryCta}
        </Button>
      </div>
    </motion.div>
  )
}

function StepMedia({
  step,
  isActive,
}: {
  step: Step
  isActive: boolean
}) {
  const { prefersReducedMotion, transition } = useStepMotion()

  const visual =
    isFlowDemoStep(step) ? (
      <FlowTeleprompterPreview script={howItWorks.flowScript} active={isActive} />
    ) : (
      <MediaAsset
        source={step.media}
        aspectRatio={stepVisualAspectClass}
        objectFit="contain"
        className="h-full w-full rounded-lg-5 bg-background shadow-none"
        label={step.title}
        eager={isActive}
      />
    )

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      aria-hidden={!isActive}
      style={{ zIndex: isActive ? 1 : 0 }}
      initial={false}
      animate={{
        opacity: isActive ? 1 : 0,
        y: isActive || prefersReducedMotion || isFlowDemoStep(step) ? 0 : 8,
        visibility: isActive ? 'visible' : 'hidden',
      }}
      transition={transition}
    >
      {visual}
    </motion.div>
  )
}

function StepVisualFrame({ activeStep }: { activeStep: number }) {
  return (
    <div
      className={`relative w-full overflow-hidden radius-inset ${stepVisualAspectClass} ${
        isFlowDemoStep(howItWorks.steps[activeStep] ?? howItWorks.steps[0])
          ? 'bg-black'
          : 'bg-surface-alt/60'
      }`}
    >
      {howItWorks.steps.map((step, index) => (
        <StepMedia
          key={step.number}
          step={step}
          isActive={activeStep === index}
        />
      ))}
    </div>
  )
}

function DesktopStickySteps({
  activeStep,
  containerRef,
  stepCount,
}: {
  activeStep: number
  containerRef: RefObject<HTMLDivElement | null>
  stepCount: number
}) {
  const step = howItWorks.steps[activeStep] ?? howItWorks.steps[0]

  return (
    <div
      ref={containerRef}
      className="relative hidden lg:block"
      style={{ height: `${stepCount * 100}vh` }}
    >
      <div
        className={`sticky ${stickyTopClass} ${stickyHeightClass} min-h-[calc(100vh-var(--nav-height,96px))] pb-48`}
      >
        <div className="flex h-full items-center">
          <Grid className="w-full items-center gap-x-48 gap-y-24">
            <Col span={4} spanMd={8} spanLg={5}>
              <div className="flex flex-col gap-24">
                <StepIntro compact />
                <StepDots activeStep={activeStep} stepCount={stepCount} />
                <AnimatePresence mode="wait" initial={false}>
                  {step ? <StepContent key={step.number} step={step} /> : null}
                </AnimatePresence>
              </div>
            </Col>

            <Col span={4} spanMd={8} spanLg={7}>
              {isFlowDemoStep(howItWorks.steps[activeStep] ?? howItWorks.steps[0]) ? (
                <div className="radius-frame-lg-5 radius-inset-4 overflow-hidden bg-black p-4 shadow-300 md:p-6">
                  <StepVisualFrame activeStep={activeStep} />
                </div>
              ) : (
                <div className="glass-base glass-medium glass-border glass-shadow radius-frame-lg-5 radius-inset-8 p-8 md:p-10">
                  <StepVisualFrame activeStep={activeStep} />
                </div>
              )}
            </Col>
          </Grid>
        </div>
      </div>
    </div>
  )
}

function MobileSteps() {
  return (
    <div className="flex flex-col gap-48 lg:hidden">
      <StepIntro />

      {howItWorks.steps.map((step) => (
        <article key={step.number} className="flex flex-col gap-24">
          <div className="flex max-w-[36rem] flex-col gap-16">
            <div className="flex flex-wrap items-center gap-10">
              <Pill variant="brand" size="sm" uppercase>
                {step.pill}
              </Pill>
              <p className="text-caption font-medium uppercase tracking-[0.12em] text-text-tertiary">
                {step.number}
              </p>
            </div>
            <h3 className="text-h3">{step.title}</h3>
            <p className="text-body-lg text-text-secondary-alt">{step.copy}</p>
            <div className="flex flex-wrap gap-12 pt-4">
              <Button href={step.primaryCtaHref}>{step.primaryCta}</Button>
              <Button variant="tertiary" href={step.secondaryCtaHref}>
                {step.secondaryCta}
              </Button>
            </div>
          </div>

          {isFlowDemoStep(step) ? (
            <FlowTeleprompterPreview script={howItWorks.flowScript} active />
          ) : (
            <MediaAsset
              source={step.media}
              aspectRatio={stepVisualAspectClass}
              objectFit="contain"
              className="rounded-lg-5 bg-surface-alt/60 shadow-200"
              label={step.title}
            />
          )}
        </article>
      ))}
    </div>
  )
}

export function HowItWorks() {
  const stepCount = howItWorks.steps.length
  const { activeStep, containerRef } = useActiveStep({ stepCount })

  return (
    <Section id="how-it-works" className="relative bg-background/80 py-0 max-lg:py-[var(--space-section)]">
      <Container className="relative">
        <DesktopStickySteps
          activeStep={activeStep}
          containerRef={containerRef}
          stepCount={stepCount}
        />

        <MobileSteps />

        <div className="hidden h-48 lg:block" aria-hidden="true" />
      </Container>
    </Section>
  )
}
