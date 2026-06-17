import type { ReactNode } from 'react'
import { Container } from '../components/Container'
import { Col, Grid } from '../components/Grid'
import { MediaAsset } from '../components/MediaAsset'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { content } from '../data/content'

const { blogPreview } = content

function BlogTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-text-primary px-12 py-6 text-caption font-medium uppercase tracking-[0.04em] text-text-primary">
      {children}
    </span>
  )
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M3 11L11 3M11 3H4.5M11 3V9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ExploreJournalLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="group inline-flex shrink-0 items-center gap-8 transition-opacity duration-150 hover:opacity-80"
    >
      <span className="rounded-full bg-[#F9B14B] px-24 py-12 text-body-sm font-medium text-text-primary">
        {label}
      </span>
      <span className="flex size-40 shrink-0 items-center justify-center rounded-full bg-[#F9B14B] text-text-primary">
        <ArrowIcon />
      </span>
    </a>
  )
}

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
    <article className="group flex flex-col">
      <div className="mb-16 flex flex-wrap items-center gap-8">
        <BlogTag>{category}</BlogTag>
        <BlogTag>{date}</BlogTag>
      </div>

      <a href={href} className="flex flex-col gap-16">
        <MediaAsset
          source={image}
          aspectRatio="aspect-[4/3]"
          className="rounded-lg-6 bg-transparent transition-shadow duration-150 group-hover:shadow-200"
        />
        <h3 className="text-h6 text-text-primary">{title}</h3>
        <p className="text-body text-text-primary">{excerpt}</p>
      </a>
    </article>
  )
}

export function BlogPreview() {
  return (
    <Section id="blog-preview" className="bg-[#F9F1E1]">
      <Container>
        <Grid className="gap-section">
          <Col span={4} spanMd={8} spanLg={12}>
            <Reveal className="flex flex-col gap-24 md:flex-row md:items-end md:justify-between">
              <h2 className="text-h2 text-text-primary">{blogPreview.title}</h2>
              <ExploreJournalLink label={blogPreview.viewAll} href={blogPreview.viewAllHref} />
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
