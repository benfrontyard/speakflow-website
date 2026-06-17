import { Button } from '../components/Button'
import { Container } from '../components/Container'
import { Col, Grid } from '../components/Grid'
import { MediaAsset } from '../components/MediaAsset'
import { Pill } from '../components/Pill'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { content } from '../data/content'

const { scriptSection } = content

const dotBackgroundStyle = {
  backgroundImage: 'url(/images/marketing/dot-grid.svg)',
  backgroundSize: '48px 48px',
} as const

export function ScriptSection() {
  return (
    <Section id="create-script" className="relative">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.1]"
        aria-hidden="true"
        style={dotBackgroundStyle}
      />
      <Container className="relative">
        <Grid className="gap-section">
          <Col span={4} spanMd={8} spanLg={8} className="lg:col-start-3">
            <Reveal className="flex flex-col items-center gap-24 text-center">
              <Pill variant="brand" uppercase>
                {scriptSection.pill}
              </Pill>
              <h2 className="text-h2">
                {scriptSection.headline.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>
              <p className="text-body-lg text-text-secondary-alt">{scriptSection.description}</p>
              <Button>{scriptSection.cta}</Button>
            </Reveal>
          </Col>

          <Col span={4} spanMd={8} spanLg={12}>
            <Reveal delay={0.1}>
              <div className="glass-base glass-medium glass-border glass-shadow radius-frame-lg-5 radius-inset-8 md:radius-inset-12 p-8 md:p-12">
                <MediaAsset
                  source={scriptSection.media}
                  aspectRatio="aspect-[16/9]"
                  className="radius-inset shadow-none"
                  label="Create your next video"
                />
              </div>
            </Reveal>
          </Col>
        </Grid>
      </Container>
    </Section>
  )
}
