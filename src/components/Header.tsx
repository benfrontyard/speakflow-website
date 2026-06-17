import { useState } from 'react'
import { Button } from './Button'
import { Container } from './Container'
import { Col, Grid } from './Grid'
import { content } from '../data/content'
import { useHeaderOnDarkBackground } from '../hooks/useHeaderOnDarkBackground'

const { header } = content

const navLinkClass =
  'px-12 py-8 text-body-sm font-medium transition-colors duration-150'

function ChevronDownIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-12 opacity-70"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.5 4.5L6 8L9.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Header() {
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const onDarkBackground = useHeaderOnDarkBackground()

  const navToneClass = onDarkBackground
    ? 'text-accent-alt/90 hover:text-accent-alt text-shadow-200'
    : 'text-text-primary/90 hover:text-text-primary'

  return (
    <header className="fixed inset-x-0 top-0 z-20">
      <Container>
        <Grid className="items-center py-32">
          <Col span={2} spanLg={2}>
            <a href="#" className="inline-flex shrink-0">
              <img
                src={onDarkBackground ? '/speakflow-wordmark-light.svg' : '/speakflow-wordmark-dark.svg'}
                alt="Speakflow"
                className={`h-32 w-auto transition-[filter,opacity] duration-300 ${
                  onDarkBackground ? 'drop-shadow-200' : ''
                }`}
                width={180}
                height={32}
              />
            </a>
          </Col>

          <Col span={2} spanLg={8} className="hidden lg:block">
            <nav
              aria-label="Primary"
              className="flex items-center justify-center gap-24"
            >
              <div
                className="relative"
                onMouseEnter={() => setResourcesOpen(true)}
                onMouseLeave={() => setResourcesOpen(false)}
              >
                <button
                  type="button"
                  className={`inline-flex items-center gap-8 ${navLinkClass} ${navToneClass}`}
                  aria-expanded={resourcesOpen}
                  aria-haspopup="true"
                  onClick={() => setResourcesOpen((open) => !open)}
                >
                  Resources
                  <ChevronDownIcon />
                </button>

                {resourcesOpen ? (
                  <div className="absolute top-full left-0 w-56 rounded-lg-6 border border-border-alt/20 bg-accent-alt p-8 shadow-400">
                    {header.resources.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        className="block rounded-md px-12 py-8 text-body-sm font-medium text-text-primary transition-colors duration-150 hover:bg-surface-alt"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>

              {header.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`${navLinkClass} ${navToneClass}`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </Col>

          <Col span={2} spanLg={2} className="hidden lg:block">
            <div className="flex items-center justify-end gap-16">
              <Button
                href={header.signInHref}
                variant="tertiary"
                tone={onDarkBackground ? 'on-dark' : 'default'}
                className={onDarkBackground ? 'border-transparent' : undefined}
              >
                {header.signIn}
              </Button>
              <Button href={header.ctaHref} size="md">
                {header.cta}
              </Button>
            </div>
          </Col>
        </Grid>
      </Container>
    </header>
  )
}
