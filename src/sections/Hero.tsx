import { Button } from '../components/Button'
import { Container } from '../components/Container'
import { Col, Grid } from '../components/Grid'
import { HeroStatCycle } from '../components/HeroStatCycle'
import { HeroVideoBackground } from '../components/HeroVideoBackground'
import { Reveal } from '../components/Reveal'
import { content } from '../data/content'

const { hero, header } = content

function HeroStatsInline({ className = '' }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-end justify-end gap-x-32 gap-y-16 ${className}`}>
      {hero.stats.map((stat, index) => (
        <li key={stat.label} className="flex items-end gap-32">
          {index > 0 ? (
            <span className="mb-6 hidden h-24 w-px shrink-0 bg-white/20 sm:block" aria-hidden="true" />
          ) : null}
          <div className="text-right">
            <p className="text-[0.6875rem] font-medium tracking-[0.04em] text-accent-alt/72 uppercase text-shadow-hero-sm">
              {stat.label}
            </p>
            <p className="mt-4 text-h4 tabular-nums text-accent-alt text-shadow-hero">{stat.value}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

export function Hero() {
  return (
    <section id="hero" className="relative min-h-svh overflow-hidden">
      <HeroVideoBackground />

      <Container className="relative z-10 flex min-h-svh flex-col justify-end pt-[calc(var(--space-80)+var(--space-32))] pb-32 md:pt-[calc(var(--space-80)+var(--space-48))] md:pb-48">
        <Grid className="w-full items-end gap-y-32">
          <Col span={4} spanMd={7} spanLg={7}>
            <Reveal intro>
              <h1 className="text-h1 text-accent-alt text-shadow-hero md:text-display">
                {hero.headline.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h1>
              <p className="mt-24 max-w-lg text-body text-accent-alt/90 text-shadow-hero-sm md:mt-32 md:text-body-lg">
                {hero.subhead}
              </p>
            </Reveal>

            <Reveal intro delay={0.08}>
              <div className="mt-32 flex flex-wrap items-center gap-12 md:mt-40">
                <Button href={header.ctaHref} size="lg">
                  {header.cta}
                </Button>
                <Button variant="tertiary" tone="on-dark" href={hero.learnMore.href} size="lg">
                  {hero.learnMore.label}
                </Button>
              </div>
            </Reveal>

            <Reveal intro delay={0.14} className="lg:hidden">
              <div className="mt-32 sm:hidden">
                <HeroStatCycle stats={hero.stats} />
              </div>
              <div className="mt-32 hidden sm:block lg:hidden">
                <HeroStatsInline className="justify-start" />
              </div>
            </Reveal>
          </Col>

          <Col span={4} spanMd={8} spanLg={5} className="hidden lg:flex lg:justify-end">
            <Reveal intro delay={0.12}>
              <HeroStatsInline />
            </Reveal>
          </Col>
        </Grid>
      </Container>
    </section>
  )
}
