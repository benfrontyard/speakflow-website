import { Button } from '../components/Button'
import { Container } from '../components/Container'
import { Col, Grid } from '../components/Grid'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { content } from '../data/content'

const { cta } = content

export function CTA() {
  return (
    <Section id="cta">
      <Container>
        <Grid>
          <Col span={4} spanMd={8} spanLg={8} className="lg:col-start-3">
            <Reveal>
              <div className="relative overflow-hidden rounded-lg-4 bg-background px-32 py-48 text-center shadow-200 md:px-48 md:py-80">
                <div
                  className="pointer-events-none absolute inset-0 opacity-20"
                  aria-hidden="true"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 15% 80%, var(--color-border) 1px, transparent 1px), radial-gradient(circle at 85% 20%, var(--color-border) 1px, transparent 1px)',
                    backgroundSize: '48px 48px',
                  }}
                />

                <div className="relative flex flex-col items-center gap-24">
                  <h2 className="text-h2">{cta.headline}</h2>
                  <p className="text-body-lg text-text-secondary-alt">{cta.body}</p>
                  <Button size="lg">{cta.ctaLabel}</Button>
                </div>
              </div>
            </Reveal>
          </Col>
        </Grid>
      </Container>
    </Section>
  )
}
