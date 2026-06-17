import { Container } from '../components/Container'
import { Col, Grid } from '../components/Grid'
import { content } from '../data/content'

const { footer } = content

export function Footer() {
  return (
    <footer id="footer" className="bg-accent py-[var(--space-section)] text-accent-alt">
      <Container>
        <Grid className="gap-section">
          <Col span={4} spanMd={4} spanLg={3}>
            <span className="font-display text-h6">Speakflow</span>
          </Col>

          {footer.columns.map((column) => (
            <Col key={column.title} span={4} spanMd={4} spanLg={3}>
              <nav aria-label={column.title}>
                <h3 className="mb-16 text-body-sm font-semibold">{column.title}</h3>
                <ul className="flex flex-col gap-12">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-body-sm text-accent-alt/70 transition-colors duration-150 hover:text-accent-alt"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </Col>
          ))}

          <Col span={4} spanMd={8} spanLg={12}>
            <div className="flex flex-col gap-16 border-t border-accent-alt/15 pt-32 md:flex-row md:items-center md:justify-between">
              <p className="text-caption text-accent-alt/60">{footer.copyright}</p>
              <div className="flex flex-wrap gap-24">
                {footer.legal.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-caption text-accent-alt/60 transition-colors duration-150 hover:text-accent-alt"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </Col>
        </Grid>
      </Container>
    </footer>
  )
}
