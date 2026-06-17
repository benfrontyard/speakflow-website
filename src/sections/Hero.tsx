import { Button } from '../components/Button'
import { Container } from '../components/Container'
import { Col, Grid } from '../components/Grid'
import { HERO_INTRO_STAT_STAGGER, HeroIntroItem, HeroIntroProvider } from '../components/HeroIntro'
import { HeroStatCycle } from '../components/HeroStatCycle'
import { HeroStatValue } from '../components/HeroStatValue'
import { HeroVideoBackground } from '../components/HeroVideoBackground'
import { Pill } from '../components/Pill'
import { RotatingPhrase } from '../components/RotatingPhrase'
import { content } from '../data/content'

const { hero, header } = content
const heroEyebrow = (hero as { eyebrow?: string }).eyebrow

type HeroStat = (typeof hero.stats)[number]

function HeroStatItem({
  stat,
  index,
  className = '',
}: {
  stat: HeroStat
  index: number
  className?: string
}) {
  return (
    <HeroIntroItem step="stats" offset={index * HERO_INTRO_STAT_STAGGER} className={className}>
      <div className="text-right">
        <p className="text-[0.6875rem] font-medium tracking-[0.04em] text-accent-alt/72 uppercase text-shadow-hero-sm">
          {stat.label}
        </p>
        <p className="mt-4 text-h4 tabular-nums text-accent-alt text-shadow-hero">
          <HeroStatValue value={stat.value} offset={index * HERO_INTRO_STAT_STAGGER} />
        </p>
      </div>
    </HeroIntroItem>
  )
}

function HeroStatsInline({ className = '' }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-end justify-end gap-x-32 gap-y-16 ${className}`}>
      {hero.stats.map((stat, index) => (
        <li key={stat.label} className="flex items-end gap-32">
          {index > 0 ? (
            <span className="mb-6 hidden h-24 w-px shrink-0 bg-white/20 sm:block" aria-hidden="true" />
          ) : null}
          <HeroStatItem stat={stat} index={index} />
        </li>
      ))}
    </ul>
  )
}

export function Hero() {
  const hasEyebrow = Boolean(heroEyebrow)

  return (
    <HeroIntroProvider hasEyebrow={hasEyebrow} statCount={hero.stats.length}>
      <section id="hero" className="relative min-h-svh overflow-hidden">
        <HeroVideoBackground />

        <Container className="relative z-10 flex min-h-svh flex-col justify-end pt-[calc(var(--space-80)+var(--space-32))] pb-32 md:pt-[calc(var(--space-80)+var(--space-48))] md:pb-48">
          <Grid className="w-full items-end gap-y-32">
            <Col span={4} spanMd={7} spanLg={7}>
              {hasEyebrow ? (
                <HeroIntroItem step="eyebrow" className="mb-16 md:mb-20">
                  <Pill variant="subtle" tone="on-dark" size="sm" uppercase>
                    {heroEyebrow}
                  </Pill>
                </HeroIntroItem>
              ) : null}

              <HeroIntroItem step="headline">
                <h1 className="text-h1 text-accent-alt text-shadow-hero md:text-display">
                  <span className="block">{hero.headline.static}</span>
                  <span className="block">
                    <RotatingPhrase phrases={hero.headline.rotating} />
                  </span>
                </h1>
              </HeroIntroItem>

              <HeroIntroItem step="copy">
                <p className="mt-24 max-w-lg text-body text-accent-alt/90 text-shadow-hero-sm md:mt-32 md:text-body-lg">
                  {hero.subhead}
                </p>
              </HeroIntroItem>

              <HeroIntroItem step="cta">
                <div className="mt-32 flex flex-wrap items-center gap-12 md:mt-40">
                  <Button href={header.ctaHref} size="lg">
                    {header.cta}
                  </Button>
                  <Button variant="tertiary" tone="on-dark" href={hero.learnMore.href} size="lg">
                    {hero.learnMore.label}
                  </Button>
                </div>
              </HeroIntroItem>

              <div className="lg:hidden">
                <div className="mt-32 sm:hidden">
                  <HeroStatCycle stats={hero.stats} />
                </div>
                <div className="mt-32 hidden sm:block lg:hidden">
                  <HeroStatsInline className="justify-start" />
                </div>
              </div>
            </Col>

            <Col span={4} spanMd={8} spanLg={5} className="hidden lg:flex lg:justify-end">
              <HeroStatsInline />
            </Col>
          </Grid>
        </Container>
      </section>
    </HeroIntroProvider>
  )
}
