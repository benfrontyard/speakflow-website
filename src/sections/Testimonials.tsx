import { Container } from '../components/Container'
import { Col, Grid } from '../components/Grid'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { content } from '../data/content'

const { testimonials } = content

export function Testimonials() {
  return (
    <Section id="testimonials" className="bg-surface-alt/50">
      <Container>
        <Grid className="gap-y-48">
          <Col span={4} spanMd={8} spanLg={8} className="lg:col-start-3">
            <Reveal className="text-center">
              <h2 className="text-h2">
                {testimonials.title.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>
            </Reveal>
          </Col>

          {testimonials.items.map((item, index) => (
            <Col key={`${item.author}-${index}`} span={4} spanMd={4} spanLg={6}>
              <Reveal delay={index * 0.06}>
                <blockquote className="flex h-full flex-col gap-24 rounded-lg-6 bg-background p-32 shadow-200">
                  <p className="text-body-lg text-text-primary">&ldquo;{item.quote}&rdquo;</p>
                  <footer className="mt-auto flex items-center gap-16">
                    <div
                      className="size-40 shrink-0 rounded-full bg-surface shadow-100"
                      aria-hidden="true"
                    />
                    <cite className="not-italic">
                      <span className="block text-body-sm font-semibold">{item.author}</span>
                      <span className="text-caption text-text-secondary-alt">{item.role}</span>
                    </cite>
                  </footer>
                </blockquote>
              </Reveal>
            </Col>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}
