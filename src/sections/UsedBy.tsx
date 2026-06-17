import { Container } from '../components/Container'
import { Col, Grid } from '../components/Grid'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { content } from '../data/content'

const { usedBy } = content

export function UsedBy() {
  return (
    <Section id="used-by" size="compact" className="border-y border-border-alt/20">
      <Container>
        <Grid className="gap-section">
          <Col span={4} spanMd={8} spanLg={12}>
            <Reveal>
              <p className="text-center text-body-sm font-medium uppercase tracking-widest text-text-secondary-alt">
                {usedBy.title}
              </p>
            </Reveal>
          </Col>

          <Col span={4} spanMd={8} spanLg={12}>
            <div className="flex flex-wrap items-center justify-center gap-x-40 gap-y-24">
              {usedBy.logos.map((logo, index) => (
                <Reveal key={logo.name} delay={index * 0.04}>
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="h-24 w-auto max-w-[120px] object-contain opacity-60 grayscale transition-opacity duration-150 hover-opacity"
                    loading="lazy"
                  />
                </Reveal>
              ))}
            </div>
          </Col>
        </Grid>
      </Container>
    </Section>
  )
}
