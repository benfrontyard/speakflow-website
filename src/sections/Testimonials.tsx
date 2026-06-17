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
      className="flex size-40 shrink-0 items-center justify-center rounded-full bg-white/95 shadow-200"
      aria-hidden="true"
    >
      <PlayIcon aria-hidden="true" size={12} weight="fill" className="text-text-primary" />
    </span>
  )
}

function FeaturedStoryCard({
  name,
  role,
  video,
  logo,
  href,
}: {
  name: string
  role: string
  video: string
  logo: { src: string; alt: string }
  href: string
}) {
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
      <div className="pointer-events-none absolute inset-0 rounded-lg-4 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      <div className="absolute bottom-24 left-24 flex items-center gap-16">
        <PlayButton />
        <img
          src={logo.src}
          alt={logo.alt}
          className="size-40 shrink-0 rounded-md bg-white object-contain p-6"
        />
        <div>
          <p className="text-body-sm font-semibold text-white">{name}</p>
          <p className="text-caption text-white/70">{role}</p>
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
    <blockquote className="flex h-full min-h-[220px] flex-col justify-between gap-32 rounded-lg-4 bg-accent-alt p-32 shadow-200">
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
                  logo={story.logo}
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
