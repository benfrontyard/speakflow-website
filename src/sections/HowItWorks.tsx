import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import type { RefObject } from 'react'
import { Button } from '../components/Button'
import { Container } from '../components/Container'
import { CollaboratePreview } from '../components/CollaboratePreview'
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

function isCollaborateDemoStep(step: Step) {
  return 'demo' in step && step.demo === 'teams-collaborate'
}

function isInteractiveDemoStep(step: Step) {
  return isFlowDemoStep(step) || isCollaborateDemoStep(step)
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

const stepBodyMaxWidthClass = 'max-w-[33.75rem]'

const secondaryCtaClassName =
  'border-black/[0.08] text-text-secondary-alt shadow-none hover:bg-black/[0.03]'

function StepDots({
  activeStep,
  stepCount,
  onSelectStep,
}: {
  activeStep: number
  stepCount: number
  onSelectStep: (index: number) => void
}) {
  return (
    <ol
      className="flex items-center gap-6"
      aria-label="How it works steps"
    >
      {Array.from({ length: stepCount }, (_, index) => {
        const isActive = activeStep === index

        return (
          <li key={index}>
            <button
              type="button"
              onClick={() => onSelectStep(index)}
              className="-m-4 cursor-pointer rounded-full p-4 transition-opacity duration-150 hover:opacity-80"
              aria-label={`Go to step ${index + 1}`}
              aria-current={isActive ? 'step' : undefined}
            >
              <span
                className={`block h-8 rounded-full transition-[width,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isActive
                    ? 'w-24 bg-[color-mix(in_srgb,var(--color-accent-5)_72%,transparent)]'
                    : 'w-8 bg-black/[0.08]'
                }`}
              />
            </button>
          </li>
        )
      })}
    </ol>
  )
}

function StepIntro({ compact = false }: { compact?: boolean }) {
  return (
    <header
      className={`flex flex-col transition-[gap] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        compact ? 'max-w-[32rem] gap-12' : 'max-w-[36rem] gap-16'
      }`}
    >
      <Pill variant="subtle" uppercase>
        {howItWorks.eyebrow}
      </Pill>
      <h2
        className={`transition-[font-size,line-height,font-weight] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          compact
            ? 'text-h6 font-semibold tracking-[-0.02em] text-text-primary'
            : 'text-h2'
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

function StepMetadataRow({ step }: { step: Step }) {
  return (
    <div className="flex items-center gap-8">
      <span className="text-caption font-medium tabular-nums text-text-tertiary">
        {step.number}
      </span>
      <Pill variant="brand" size="sm" uppercase>
        {step.pill}
      </Pill>
    </div>
  )
}

function StepFeatureCopy({ step }: { step: Step }) {
  return (
    <div className="flex flex-col gap-20">
      <h3 className="text-h2 leading-[1.1] tracking-[-0.03em]">{step.title}</h3>
      <p className={`text-body-lg text-text-secondary ${stepBodyMaxWidthClass}`}>
        {step.copy}
      </p>
      <div className="flex flex-wrap items-center gap-8">
        <Button href={step.primaryCtaHref}>{step.primaryCta}</Button>
        <Button
          variant="tertiary"
          href={step.secondaryCtaHref}
          className={secondaryCtaClassName}
        >
          {step.secondaryCta}
        </Button>
      </div>
    </div>
  )
}

function StepContent({ step }: { step: Step }) {
  const motionProps = useStepMotion()

  return (
    <motion.div
      key={step.number}
      className="flex max-w-[36rem] flex-col gap-20"
      initial={motionProps.initial}
      animate={motionProps.animate}
      exit={motionProps.exit}
      transition={motionProps.transition}
    >
      <StepMetadataRow step={step} />
      <StepFeatureCopy step={step} />
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

  const visual = isCollaborateDemoStep(step) ? (
    <CollaboratePreview active={isActive} />
  ) : isFlowDemoStep(step) ? (
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
        y: isActive || prefersReducedMotion || isInteractiveDemoStep(step) ? 0 : 8,
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
          : isCollaborateDemoStep(howItWorks.steps[activeStep] ?? howItWorks.steps[0])
            ? 'bg-[#EDEDED]'
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
  onSelectStep,
}: {
  activeStep: number
  containerRef: RefObject<HTMLDivElement | null>
  stepCount: number
  onSelectStep: (index: number) => void
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
              <div className="flex flex-col gap-32">
                <StepIntro compact />
                <div className="flex flex-col gap-20">
                  <StepDots
                    activeStep={activeStep}
                    stepCount={stepCount}
                    onSelectStep={onSelectStep}
                  />
                  <AnimatePresence mode="wait" initial={false}>
                    {step ? <StepContent key={step.number} step={step} /> : null}
                  </AnimatePresence>
                </div>
              </div>
            </Col>

            <Col span={4} spanMd={8} spanLg={7}>
              <div className="mx-auto w-full max-w-[93%] translate-y-12 lg:translate-y-16">
                {isFlowDemoStep(howItWorks.steps[activeStep] ?? howItWorks.steps[0]) ? (
                  <div className="radius-frame-lg-5 radius-inset-4 overflow-hidden bg-black p-4 shadow-300 md:p-6">
                    <StepVisualFrame activeStep={activeStep} />
                  </div>
                ) : (
                  <div className="glass-base glass-medium glass-border glass-shadow radius-frame-lg-5 radius-inset-8 p-8 md:p-10">
                    <StepVisualFrame activeStep={activeStep} />
                  </div>
                )}
              </div>
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
        <article key={step.number} className="flex flex-col gap-32">
          <div className="flex max-w-[36rem] flex-col gap-20">
            <StepMetadataRow step={step} />
            <StepFeatureCopy step={step} />
          </div>

          {isCollaborateDemoStep(step) ? (
            <CollaboratePreview active />
          ) : isFlowDemoStep(step) ? (
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
  const { activeStep, containerRef, goToStep } = useActiveStep({ stepCount })

  return (
    <Section id="how-it-works" className="relative bg-background/80 py-0 max-lg:py-[var(--space-section)]">
      <Container className="relative">
        <DesktopStickySteps
          activeStep={activeStep}
          containerRef={containerRef}
          stepCount={stepCount}
          onSelectStep={goToStep}
        />

        <MobileSteps />

        <div className="hidden h-48 lg:block" aria-hidden="true" />
      </Container>
    </Section>
  )
}
