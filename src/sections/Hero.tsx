import { ArrowDownRightIcon } from '@phosphor-icons/react'
import { Container } from '../components/Container'
import { Col, Grid } from '../components/Grid'
import { HeroVideoBackground } from '../components/HeroVideoBackground'
import { Reveal } from '../components/Reveal'
import { content } from '../data/content'

const { hero } = content

function HeroStats({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      {hero.stats.map((stat, index) => (
        <div key={stat.label}>
          {index > 0 ? <div className="border-t border-white/20" aria-hidden="true" /> : null}
          <div className="flex items-end justify-between gap-24 py-16 md:py-20">
            <div>
              <p className="mb-6 text-[0.6875rem] font-medium tracking-[0.04em] text-accent-alt/55 uppercase">
                {stat.label}
              </p>
              <p className="text-[2rem] leading-none font-semibold tracking-[-0.03em] text-accent-alt tabular-nums text-shadow-200 md:text-[2.75rem]">
                {stat.value}
              </p>
            </div>
            <span
              className="pb-6 text-[0.625rem] tracking-[0.2em] text-accent-alt/35"
              aria-hidden="true"
            >
              ···
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

function HeroLearnMore() {
  return (
    <a
      href={hero.learnMore.href}
      className="group hero-learn-more relative inline-flex h-[5.25rem] w-[8.75rem] flex-col justify-between border border-white/10 bg-white/8 p-16 backdrop-blur-sm transition-[background-color,border-color] duration-150"
    >
      <span className="text-body-sm text-accent-alt/88">{hero.learnMore.label}</span>
      <ArrowDownRightIcon
        aria-hidden="true"
        className="hero-learn-more-icon absolute right-12 bottom-12 size-14 text-accent-alt/55 transition-[color,transform] duration-150"
      />
    </a>
  )
}

export function Hero() {
  return (
    <section id="hero" className="relative min-h-svh overflow-hidden">
      <HeroVideoBackground />

      <Container className="relative z-10 grid min-h-svh grid-rows-[1fr_auto] pt-[calc(var(--space-80)+var(--space-32))] pb-32 md:pt-[calc(var(--space-80)+var(--space-48))] md:pb-48">
        <div className="relative row-start-1 hidden min-h-0 lg:block">
          <aside className="absolute top-1/2 right-0 w-full max-w-[17.5rem] -translate-y-1/2 xl:max-w-[19rem]">
            <Reveal intro delay={0.12}>
              <HeroStats />
            </Reveal>
          </aside>
        </div>

        <Grid className="row-start-2 w-full items-end gap-y-32">
          <Col span={4} spanMd={6} spanLg={6}>
            <Reveal intro>
              <h1 className="text-h1 text-accent-alt text-shadow-200 md:text-display">
                {hero.headline.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h1>
              <p className="mt-24 max-w-lg text-body text-accent-alt/75 text-shadow-200 md:mt-32 md:text-body-lg md:text-accent-alt/80">
                {hero.subhead}
              </p>
            </Reveal>
          </Col>

          <Col
            span={4}
            spanMd={2}
            spanLg={3}
            className="flex justify-start md:col-start-7 md:justify-end lg:col-start-10"
          >
            <Reveal intro delay={0.16}>
              <HeroLearnMore />
            </Reveal>
          </Col>

          <Col span={4} spanMd={8} spanLg={12} className="lg:hidden">
            <Reveal intro delay={0.08}>
              <HeroStats />
            </Reveal>
          </Col>
        </Grid>
      </Container>
    </section>
  )
}
