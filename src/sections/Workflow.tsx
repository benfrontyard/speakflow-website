import { Button } from '../components/Button'
import { Container } from '../components/Container'
import { Col, Grid } from '../components/Grid'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { VisualPlaceholder } from '../components/VisualPlaceholder'
import { content } from '../data/content'

const { workflow } = content

export function Workflow() {
  return (
    <Section id="workflow">
      <Container>
        <Grid className="gap-section gap-section-md-xl">
          <Col span={4} spanMd={8} spanLg={8} className="lg:col-start-3">
            <Reveal className="flex flex-col items-center gap-16 text-center">
              <h2 className="text-h2">{workflow.title}</h2>
              <p className="text-body-lg text-text-secondary-alt">{workflow.description}</p>
              <Button>{workflow.cta}</Button>
            </Reveal>
          </Col>

          {workflow.features.map((feature, index) => (
            <Col key={feature.label} span={4} spanMd={4} spanLg={4}>
              <Reveal delay={index * 0.08}>
                <article className="flex flex-col gap-16">
                  <VisualPlaceholder
                    aspectRatio="aspect-[4/3]"
                    label={feature.label}
                    className="shadow-200"
                  />
                  <div className="flex flex-col gap-8 px-4">
                    <h3 className="text-h6">{feature.title}</h3>
                    <p className="text-body text-text-secondary-alt">{feature.description}</p>
                  </div>
                </article>
              </Reveal>
            </Col>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}
