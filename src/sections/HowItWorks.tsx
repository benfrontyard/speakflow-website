import { motion, useReducedMotion } from 'framer-motion'
import { Button } from '../components/Button'
import { Container } from '../components/Container'
import { Col, Grid } from '../components/Grid'
import { MediaAsset } from '../components/MediaAsset'
import { Pill } from '../components/Pill'
import { Section } from '../components/Section'
import { content } from '../data/content'
import { useActiveStep } from '../hooks/useActiveStep'

const { howItWorks } = content

const dotBackgroundStyle = {
  backgroundImage: 'url(/images/marketing/dot-grid.svg)',
  backgroundSize: '48px 48px',
} as const

const stepVisualAspectClass = 'aspect-[706/387]'

const stickyTopClass = 'top-[calc(var(--space-32)+var(--space-32)+2rem)]'

function StepMedia({
  step,
  isActive,
  prefersReducedMotion,
}: {
  step: (typeof howItWorks.steps)[number]
  isActive: boolean
  prefersReducedMotion: boolean | null
}) {
  return (
    <motion.div
      className="absolute inset-0"
      aria-hidden={!isActive}
      style={{ zIndex: isActive ? 1 : 0 }}
      initial={false}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{
        duration: prefersReducedMotion ? 0.15 : 0.45,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <MediaAsset
        source={step.media}
        aspectRatio={stepVisualAspectClass}
        objectFit="contain"
        className="h-full rounded-lg-5 bg-background shadow-none"
        label={step.title}
      />
    </motion.div>
  )
}

function StepVisualFrame({
  activeStep,
  className = '',
}: {
  activeStep: number
  className?: string
}) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div
      className={`relative w-full overflow-hidden rounded-lg-5 bg-background shadow-300 ${stepVisualAspectClass} ${className}`}
    >
      {howItWorks.steps.map((step, index) => (
        <StepMedia
          key={step.number}
          step={step}
          isActive={activeStep === index}
          prefersReducedMotion={prefersReducedMotion}
        />
      ))}
    </div>
  )
}

function StepVisual({
  activeStep,
  className = '',
}: {
  activeStep: number
  className?: string
}) {
  return <StepVisualFrame activeStep={activeStep} className={className} />
}

export function HowItWorks() {
  const { activeStep, containerRef } = useActiveStep({
    stepCount: howItWorks.steps.length,
  })

  return (
    <Section id="how-it-works" className="relative bg-background">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.12]"
        aria-hidden="true"
        style={dotBackgroundStyle}
      />

      <Container className="relative">
        <header className="mb-40 flex max-w-[34rem] flex-col gap-16 lg:mb-48 lg:pt-8">
          <Pill variant="subtle" uppercase>
            {howItWorks.eyebrow}
          </Pill>
          <h2 className="text-h2">{howItWorks.title}</h2>
          <p className="text-body-lg text-text-secondary-alt">{howItWorks.intro}</p>
        </header>

        <div ref={containerRef}>
          <Grid className="lg:gap-48">
            <Col span={4} spanMd={8} spanLg={5}>
              <div className="flex flex-col">
                {howItWorks.steps.map((step, index) => {
                  const isActive = activeStep === index

                  return (
                    <article
                      key={step.number}
                      data-step-index={index}
                      className={`flex flex-col gap-32 border-l-2 py-40 pl-24 transition-[border-color,opacity] duration-300 first:pt-0 last:pb-0 lg:min-h-[100vh] lg:justify-center ${
                        isActive ? 'border-accent-5 opacity-100' : 'border-border/30 opacity-40'
                      }`}
                    >
                      <div className="flex max-w-[34rem] flex-col gap-16">
                        <div className="flex flex-wrap items-center gap-12">
                          <Pill variant="brand" size="sm" uppercase>
                            {step.pill}
                          </Pill>
                          <p className="text-caption font-medium uppercase tracking-[0.12em] text-text-secondary-alt">
                            {step.number}
                          </p>
                        </div>
                        <h3 className="text-h3">{step.title}</h3>
                        <p className="text-body-lg text-text-secondary-alt">{step.copy}</p>
                        <div className="flex flex-wrap gap-12 pt-8">
                          <Button href={step.primaryCtaHref}>{step.primaryCta}</Button>
                          <Button variant="tertiary" href={step.secondaryCtaHref}>
                            {step.secondaryCta}
                          </Button>
                        </div>
                      </div>

                      <div className="lg:hidden">
                        <MediaAsset
                          source={step.media}
                          aspectRatio={stepVisualAspectClass}
                          objectFit="contain"
                          className="rounded-lg-5 bg-background shadow-200"
                          label={step.title}
                        />
                      </div>
                    </article>
                  )
                })}
              </div>
            </Col>

            <Col span={4} spanMd={8} spanLg={7} className="hidden lg:block">
              <div className={`sticky ${stickyTopClass}`}>
                <StepVisual activeStep={activeStep} />
              </div>
            </Col>
          </Grid>
        </div>
      </Container>
    </Section>
  )
}
