import { Container } from '../components/Container'
import { Col, Grid } from '../components/Grid'
import { MediaAsset } from '../components/MediaAsset'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { content } from '../data/content'

const { blogPreview } = content

export function BlogPreview() {
  return (
    <Section id="blog-preview" className="bg-surface-alt/50">
      <Container>
        <Grid className="gap-y-48">
          <Col span={4} spanMd={8} spanLg={12}>
            <Reveal className="flex flex-col gap-16 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-h2">{blogPreview.title}</h2>
                <p className="mt-8 text-body-lg text-text-secondary-alt">{blogPreview.subtitle}</p>
              </div>
              <a
                href="#"
                className="text-body-sm font-medium text-text-primary transition-colors duration-150 hover:text-accent-5"
              >
                {blogPreview.viewAll}
              </a>
            </Reveal>
          </Col>

          {blogPreview.posts.map((post, index) => (
            <Col key={post.title} span={4} spanMd={4} spanLg={4}>
              <Reveal delay={index * 0.08}>
                <article className="group flex flex-col gap-16">
                  <MediaAsset
                    source={post.image}
                    aspectRatio="aspect-[16/10]"
                    className="transition-shadow duration-150 group-hover:shadow-200"
                  />
                  <h3 className="text-h6">{post.title}</h3>
                  <p className="text-body text-text-secondary-alt">{post.excerpt}</p>
                </article>
              </Reveal>
            </Col>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}
