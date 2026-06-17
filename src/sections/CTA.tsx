import { motion, useReducedMotion } from 'motion/react'
import { Button } from '../components/Button'
import { Container } from '../components/Container'
import { content } from '../data/content'

const { cta } = content

const easeOut = [0.16, 1, 0.3, 1] as const

type IllustrationConfig = {
  src: string
  alt: string
  className: string
  initial: { opacity: number; x: number; y: number }
  delay: number
}

const illustrations: IllustrationConfig[] = [
  {
    src: cta.illustrations.prompter.src,
    alt: cta.illustrations.prompter.alt,
    className:
      'pointer-events-none absolute top-0 left-0 z-10 hidden w-[min(36%,26rem)] -translate-x-[5%] lg:block',
    initial: { opacity: 0, x: -48, y: -32 },
    delay: 0,
  },
  {
    src: cta.illustrations.mic.src,
    alt: cta.illustrations.mic.alt,
    className:
      'pointer-events-none absolute top-[8%] right-0 z-20 hidden w-[min(24%,17rem)] translate-x-[2%] lg:block',
    initial: { opacity: 0, x: 48, y: -32 },
    delay: 0.12,
  },
  {
    src: cta.illustrations.laptop.src,
    alt: cta.illustrations.laptop.alt,
    className:
      'pointer-events-none absolute right-0 bottom-[6%] z-10 hidden w-[min(30%,22rem)] translate-x-[2%] lg:block',
    initial: { opacity: 0, x: 48, y: 40 },
    delay: 0.24,
  },
]

function CTAIllustration({
  illustration,
  prefersReducedMotion,
}: {
  illustration: IllustrationConfig
  prefersReducedMotion: boolean | null
}) {
  return (
    <motion.img
      src={illustration.src}
      alt={illustration.alt}
      loading="lazy"
      decoding="async"
      className={illustration.className}
      initial={prefersReducedMotion ? false : illustration.initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: prefersReducedMotion ? 0.15 : 0.75,
        delay: prefersReducedMotion ? 0 : illustration.delay,
        ease: easeOut,
      }}
    />
  )
}

export function CTA() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="cta" aria-labelledby="cta-heading" className="relative">
      <div className="cta-surface relative overflow-hidden bg-surface-alt">
        <div className="cta-illustrations pointer-events-none absolute inset-0" aria-hidden="true">
          {illustrations.map((illustration) => (
            <CTAIllustration
              key={illustration.src}
              illustration={illustration}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>

        <Container>
          <div className="relative z-30 mx-auto flex min-h-[min(640px,80vh)] max-w-xl items-center justify-center py-80 text-center md:max-w-2xl md:py-128">
            <motion.div
              className="flex w-full flex-col items-center gap-24 md:gap-32"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: prefersReducedMotion ? 0.15 : 0.55,
                delay: prefersReducedMotion ? 0 : 0.18,
                ease: easeOut,
              }}
            >
              <img
                src="/speakflow-logo.svg"
                alt=""
                aria-hidden="true"
                className="h-40 w-40 shrink-0 rounded-lg-5"
                width={40}
                height={40}
              />

              <div className="flex flex-col gap-12 md:gap-16">
                <h2
                  id="cta-heading"
                  className="text-h2 tracking-[-0.021em] text-text-primary md:text-[2.625rem] md:leading-[1.25]"
                >
                  {cta.headline}
                </h2>
                <p className="mx-auto max-w-xl text-body-lg text-text-secondary-alt">{cta.body}</p>
              </div>

              <Button href={cta.ctaHref} size="lg" className="w-fit">
                {cta.ctaLabel}
              </Button>
            </motion.div>
          </div>
        </Container>
      </div>
    </section>
  )
}
