import { Container } from '../components/Container'
import { LogoMarquee } from '../components/LogoMarquee'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { content } from '../data/content'

const { usedBy } = content

export function UsedBy() {
  return (
    <Section id="used-by" size="compact" className="border-y border-border-alt/20">
      <Container>
        <Reveal>
          <p className="text-center text-body-sm font-medium uppercase tracking-widest text-text-secondary-alt">
            {usedBy.title}
          </p>
        </Reveal>
      </Container>

      <div className="mt-[var(--space-section-compact)]">
        <LogoMarquee logos={usedBy.logos} />
      </div>
    </Section>
  )
}
