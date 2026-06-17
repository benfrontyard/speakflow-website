import { Button } from '../components/Button'
import { Container } from '../components/Container'
import { Col, Grid } from '../components/Grid'
import { HeroVideoBackground } from '../components/HeroVideoBackground'
import { Reveal } from '../components/Reveal'
import { content } from '../data/content'

const { hero } = content

export function Hero() {
  return (
    <section id="hero" className="relative flex min-h-svh flex-col justify-end overflow-hidden">
      <HeroVideoBackground />

      <Container className="relative z-10 pb-[var(--space-xl-responsive)]">
        <Grid className="items-end">
          <Col span={4} spanMd={6} spanLg={7}>
            <Reveal className="flex flex-col items-start gap-24 text-left">
              <h1 className="text-h1 text-accent-alt md:text-display">
                {hero.headline.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h1>
              <p className="max-w-xl text-body-lg text-accent-alt/85">{hero.subhead}</p>
              <Button size="lg">{hero.primaryCta}</Button>
            </Reveal>
          </Col>
        </Grid>
      </Container>
    </section>
  )
}
