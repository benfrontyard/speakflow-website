import { Container } from '../components/Container'
import { Col, Grid } from '../components/Grid'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { VisualPlaceholder } from '../components/VisualPlaceholder'
import { content } from '../data/content'

const { creators } = content

export function Creators() {
  return (
    <Section id="creators">
      <Container>
        <Grid className="gap-y-48">
          <Col span={4} spanMd={8} spanLg={8} className="lg:col-start-3">
            <Reveal className="text-center">
              <h2 className="text-h2">
                {creators.title.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>
            </Reveal>
          </Col>

          {creators.items.map((creator, index) => (
            <Col key={`${creator.name}-${index}`} span={4} spanMd={4} spanLg={6}>
              <Reveal delay={index * 0.08}>
                <div className="flex flex-col gap-24">
                  <VisualPlaceholder aspectRatio="aspect-[4/3]" className="shadow-300" />
                  <div className="flex items-center gap-16">
                    <div
                      className="size-48 shrink-0 rounded-full bg-surface shadow-100"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-body-sm font-semibold">{creator.name}</p>
                      <p className="text-caption text-text-secondary-alt">{creator.role}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </Col>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}
