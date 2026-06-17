import { CaretDownIcon } from '@phosphor-icons/react'
import { useState } from 'react'
import { Button } from './Button'
import { Container } from './Container'
import { Col, Grid } from './Grid'
import { content } from '../data/content'
import { assetUrl } from '../lib/assetUrl'
import { useHeaderOnDarkBackground } from '../hooks/useHeaderOnDarkBackground'
import { useHeaderScrollState } from '../hooks/useHeaderScrollState'

const { header } = content

const navLinkClass =
  'header-nav-link inline-flex min-h-11 items-center px-12 py-8 text-body-sm font-medium'

export function Header() {
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const onDarkBackground = useHeaderOnDarkBackground()
  const isScrolled = useHeaderScrollState()

  const navToneClass = onDarkBackground
    ? 'text-accent-alt/92 hover:text-accent-alt text-shadow-hero-sm'
    : 'text-text-primary/90 hover:text-text-primary'

  return (
    <header
      className="header-nav fixed inset-x-0 top-0 z-20"
      data-scrolled={isScrolled ? 'true' : 'false'}
      data-theme={onDarkBackground ? 'dark' : 'light'}
    >
      <Container className="relative">
        <Grid className="items-center py-32">
          <Col span={2} spanLg={2}>
            <a href="#" className="inline-flex shrink-0">
              <img
                src={onDarkBackground ? assetUrl('/speakflow-wordmark-light.svg') : assetUrl('/speakflow-wordmark-dark.svg')}
                alt="Speakflow"
                className={`h-32 w-auto transition-[filter,opacity] duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
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
                  <CaretDownIcon
                    aria-hidden="true"
                    className={`size-12 opacity-70 transition-transform duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      resourcesOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <div
                  className={`header-nav-dropdown glass-base glass-medium glass-border glass-shadow absolute top-full left-0 w-56 rounded-lg-6 p-8 ${
                    resourcesOpen ? 'is-open' : ''
                  }`}
                  inert={resourcesOpen ? undefined : true}
                >
                  {header.resources.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="header-nav-link block rounded-md px-12 py-8 text-body-sm font-medium text-text-primary hover:bg-surface-alt"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
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
