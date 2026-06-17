import { Button } from '../components/Button'
import { Container } from '../components/Container'
import { Col, Grid } from '../components/Grid'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { VisualPlaceholder } from '../components/VisualPlaceholder'
import { content } from '../data/content'

const { nailIt } = content

export function NailIt() {
  return (
    <Section id="nail-it" className="bg-surface-alt/50">
      <Container>
        <Grid className="items-center gap-y-48">
          <Col span={4} spanMd={8} spanLg={6}>
            <Reveal className="flex flex-col gap-24">
              <h2 className="text-h2">{nailIt.title}</h2>
              <p className="text-body-lg text-text-secondary-alt">{nailIt.description}</p>
              <div>
                <Button variant="accent">{nailIt.cta}</Button>
              </div>
            </Reveal>
          </Col>

          <Col span={4} spanMd={8} spanLg={6}>
            <Reveal delay={0.1} className="flex flex-col gap-24">
              <VisualPlaceholder aspectRatio="aspect-[16/10]" className="shadow-200" />
              <VisualPlaceholder aspectRatio="aspect-[16/10]" className="shadow-200" />
            </Reveal>
          </Col>
        </Grid>
      </Container>
    </Section>
  )
}
