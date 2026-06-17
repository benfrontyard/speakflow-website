import { Container } from '../components/Container'
import { Col, Grid } from '../components/Grid'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { content } from '../data/content'

const { usedBy } = content

export function UsedBy() {
  return (
    <Section id="used-by" className="border-y border-border-alt/20 py-32 md:py-48">
      <Container>
        <Grid className="gap-y-32">
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
                <Reveal key={logo} delay={index * 0.04}>
                  <span className="text-body-sm font-semibold text-text-secondary-alt/70">
                    {logo}
                  </span>
                </Reveal>
              ))}
            </div>
          </Col>
        </Grid>
      </Container>
    </Section>
  )
}
