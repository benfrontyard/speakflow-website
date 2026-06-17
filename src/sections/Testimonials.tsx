import { ArrowRightIcon, PlayIcon } from '@phosphor-icons/react'
import { Container } from '../components/Container'
import { Col, Grid } from '../components/Grid'
import { MediaAsset } from '../components/MediaAsset'
import { Pill } from '../components/Pill'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { content } from '../data/content'

const { testimonials } = content

function PlayButton() {
  return (
    <span
      className="glass-base glass-dark glass-border flex size-40 shrink-0 items-center justify-center rounded-full"
      aria-hidden="true"
    >
      <PlayIcon aria-hidden="true" size={12} weight="fill" className="text-accent-alt" />
    </span>
  )
}

function FeaturedStoryCard({
  name,
  role,
  video,
  href,
}: {
  name: string
  role: string
  video: string
  href: string
}) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')

  return (
    <a
      href={href}
      className="group relative block overflow-hidden rounded-lg-4 focus-visible:outline-offset-4"
    >
      <MediaAsset
        source={{ type: 'video', src: video }}
        aspectRatio="aspect-[16/10]"
        className="rounded-lg-4 shadow-300 transition-transform duration-300 group-hover-scale-subtle"
      />
      <div className="pointer-events-none absolute inset-0 rounded-lg-4 bg-gradient-to-t from-[#0A1930]/78 via-[#1F4CE033] to-[#59E8FF1F]" />
      <div className="pointer-events-none absolute inset-0 rounded-lg-4 bg-[radial-gradient(120%_70%_at_12%_100%,rgba(61,135,255,0.44),transparent_58%),radial-gradient(90%_66%_at_100%_100%,rgba(90,239,255,0.32),transparent_52%)]" />

      <div className="absolute bottom-24 left-24 flex items-center gap-16">
        <PlayButton />
        <div className="glass-base glass-dark glass-border flex items-center gap-12 rounded-lg-6 px-12 py-8 backdrop-blur-md">
          <div
            className="relative flex size-40 shrink-0 items-center justify-center overflow-hidden rounded-md border border-white/35 bg-[linear-gradient(135deg,#ffffff_0%,#edf4ff_37%,#d3e9ff_100%)] shadow-[0_8px_22px_rgba(10,25,48,0.26)]"
            aria-label={`${name} logo`}
          >
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(39,99,255,0.26),transparent_60%),radial-gradient(circle_at_80%_88%,rgba(57,208,255,0.24),transparent_56%)]" />
            <span className="relative text-[11px] font-semibold tracking-[0.08em] text-[#0E2B66]">
              {initials}
            </span>
          </div>
          <div>
            <p className="text-body-sm font-semibold text-accent-alt">{name}</p>
            <p className="text-caption text-accent-alt/70">{role}</p>
          </div>
        </div>
      </div>
    </a>
  )
}

function QuoteCard({
  quote,
  company,
  logo,
}: {
  quote: string
  company: string
  logo: { src: string; alt: string }
}) {
  return (
    <blockquote className="glass-base glass-subtle glass-border glass-shadow flex h-full min-h-[220px] flex-col justify-between gap-32 rounded-lg-4 p-32">
      <p className="text-body-lg text-text-primary">&ldquo;{quote}&rdquo;</p>
      <footer className="flex items-center gap-12">
        <img
          src={logo.src}
          alt={logo.alt}
          className="h-20 w-auto max-w-[96px] object-contain opacity-70"
          loading="lazy"
        />
        <span className="sr-only">{company}</span>
      </footer>
    </blockquote>
  )
}

export function Testimonials() {
  return (
    <Section id="testimonials" className="bg-surface-alt/50">
      <Container>
        <Grid className="gap-section">
          <Col span={4} spanMd={8} spanLg={12}>
            <Reveal>
              <div className="flex flex-col gap-24 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <Pill variant="subtle" uppercase className="mb-16">
                    {testimonials.pill}
                  </Pill>
                  <h2 className="text-h2">
                    {testimonials.title.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </h2>
                  <p className="mt-8 text-body-lg text-text-secondary-alt">
                    {testimonials.subtitle}
                  </p>
                </div>
                <a
                  href={testimonials.viewAllHref}
                  className="inline-flex shrink-0 items-center gap-4 text-body-sm font-medium text-text-primary transition-opacity duration-150 hover-opacity-soft"
                >
                  {testimonials.viewAll}
                  <ArrowRightIcon aria-hidden="true" className="size-12" />
                </a>
              </div>
            </Reveal>
          </Col>

          {testimonials.featured.map((story, index) => (
            <Col key={story.name} span={4} spanMd={4} spanLg={6}>
              <Reveal delay={index * 0.06}>
                <FeaturedStoryCard
                  name={story.name}
                  role={story.role}
                  video={story.video}
                  href={story.href}
                />
              </Reveal>
            </Col>
          ))}

          {testimonials.quotes.map((item, index) => (
            <Col key={item.company} span={4} spanMd={4} spanLg={3}>
              <Reveal delay={0.12 + index * 0.06}>
                <QuoteCard quote={item.quote} company={item.company} logo={item.logo} />
              </Reveal>
            </Col>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}
