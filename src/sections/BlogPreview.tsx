import { ArrowRightIcon } from '@phosphor-icons/react'
import { Container } from '../components/Container'
import { Col, Grid } from '../components/Grid'
import { MediaAsset } from '../components/MediaAsset'
import { Pill } from '../components/Pill'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { content } from '../data/content'

const { blogPreview } = content

function BlogCard({
  category,
  date,
  title,
  excerpt,
  href,
  image,
}: {
  category: string
  date: string
  title: string
  excerpt: string
  href: string
  image: (typeof blogPreview.posts)[number]['image']
}) {
  return (
    <article className="glass-base glass-subtle glass-border glass-shadow group flex flex-col overflow-hidden rounded-lg-4">
      <a href={href} className="flex flex-col gap-16">
        <MediaAsset
          source={image}
          aspectRatio="aspect-video"
          objectFit="cover"
          className="rounded-none bg-surface-alt shadow-none transition-transform duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover-scale-subtle"
        />
        <div className="flex flex-col gap-8 px-20 pb-20">
          <div className="flex flex-wrap items-center gap-8">
            <Pill variant="subtle" size="sm" uppercase>
              {category}
            </Pill>
            <span className="text-caption text-text-secondary-alt">{date}</span>
          </div>
          <h3 className="text-h6 text-text-primary">{title}</h3>
          <p className="text-body text-text-secondary-alt">{excerpt}</p>
        </div>
      </a>
    </article>
  )
}

export function BlogPreview() {
  return (
    <Section
      id="blog-preview"
      className="bg-gradient-to-b from-surface-alt/50 to-white pb-48 md:pb-64"
    >
      <Container>
        <Grid className="gap-section">
          <Col span={4} spanMd={8} spanLg={12}>
            <Reveal>
              <div className="flex flex-col gap-24 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <Pill variant="subtle" uppercase className="mb-16">
                    {blogPreview.pill}
                  </Pill>
                  <h2 className="text-h2">{blogPreview.title}</h2>
                  <p className="mt-8 text-body-lg text-text-secondary-alt">{blogPreview.subtitle}</p>
                </div>
                <a
                  href={blogPreview.viewAllHref}
                  className="inline-flex shrink-0 items-center gap-4 text-body-sm font-medium text-text-primary transition-opacity duration-150 hover-opacity-soft"
                >
                  {blogPreview.viewAll}
                  <ArrowRightIcon aria-hidden="true" className="size-12" />
                </a>
              </div>
            </Reveal>
          </Col>

          {blogPreview.posts.map((post, index) => (
            <Col key={post.title} span={4} spanMd={4} spanLg={4}>
              <Reveal delay={index * 0.08}>
                <BlogCard
                  category={post.category}
                  date={post.date}
                  title={post.title}
                  excerpt={post.excerpt}
                  href={post.href}
                  image={post.image}
                />
              </Reveal>
            </Col>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}
