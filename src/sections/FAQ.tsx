import { CaretDownIcon } from '@phosphor-icons/react'
import { Container } from '../components/Container'
import { Col, Grid } from '../components/Grid'
import { Pill } from '../components/Pill'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { content } from '../data/content'

const { faq } = content

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="glass-base glass-subtle glass-border group rounded-lg-4 open:glass-shadow">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-16 p-24 md:p-32 [&::-webkit-details-marker]:hidden">
        <span className="text-left text-h6">{question}</span>
        <CaretDownIcon
          aria-hidden="true"
          size={16}
          className="shrink-0 text-text-secondary-alt transition-transform duration-200 group-open:rotate-180"
        />
      </summary>
      <div className="border-t border-border-alt/20 px-24 pb-24 pt-16 md:px-32 md:pb-32 md:pt-20">
        <p className="text-body text-text-secondary-alt">{answer}</p>
      </div>
    </details>
  )
}

export function FAQ() {
  return (
    <Section id="faq" className="bg-surface-alt/30">
      <Container>
        <Grid className="gap-section">
          <Col span={4} spanMd={8} spanLg={8} className="lg:col-start-3">
            <Reveal className="flex flex-col items-center gap-16 text-center">
              <Pill variant="subtle" uppercase>
                {faq.pill}
              </Pill>
              <h2 className="text-h2">{faq.title}</h2>
              <p className="text-body-lg text-text-secondary-alt">{faq.subtitle}</p>
            </Reveal>
          </Col>

          <Col span={4} spanMd={8} spanLg={8} className="lg:col-start-3">
            <div className="flex flex-col gap-12">
              {faq.items.map((item, index) => (
                <Reveal key={item.question} delay={index * 0.04}>
                  <FaqItem question={item.question} answer={item.answer} />
                </Reveal>
              ))}
            </div>
          </Col>
        </Grid>
      </Container>
    </Section>
  )
}
