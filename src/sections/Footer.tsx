import {
  ArrowRightIcon,
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  XLogo,
} from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'
import { Button } from '../components/Button'
import { Container } from '../components/Container'
import { Col, Grid } from '../components/Grid'
import { content } from '../data/content'

const { footer } = content

const socialIcons: Record<(typeof footer.social)[number]['icon'], Icon> = {
  instagram: InstagramLogo,
  x: XLogo,
  facebook: FacebookLogo,
  linkedin: LinkedinLogo,
}

function FooterPromo() {
  const { headline, links, cta } = footer.promo

  return (
    <Grid className="gap-y-40 gap-x-24 pb-40 md:gap-y-48 md:pb-48 lg:gap-x-48">
      <Col span={4} spanMd={8} spanLg={6}>
        <div className="flex flex-col gap-20">
          <h2 className="text-h4 tracking-[-0.02em] text-accent-alt">{headline}</h2>
          <ul className="flex flex-col gap-12">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-body-sm text-accent-alt/70 transition-colors duration-150 hover-fine-text-bright"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Button href={cta.href} size="lg" className="w-fit rounded-full">
            {cta.label}
            <ArrowRightIcon aria-hidden="true" className="size-16" weight="bold" />
          </Button>
        </div>
      </Col>
    </Grid>
  )
}

function FooterLinks() {
  return (
    <Grid className="gap-y-40 border-t border-accent-alt/12 pt-40 md:gap-y-48 md:pt-48">
      <Col span={4} spanMd={8} spanLg={3}>
        <a href="#" className="inline-flex shrink-0">
          <img
            src="/speakflow-logo.svg"
            alt="Speakflow"
            className="h-40 w-40 rounded-lg-5 opacity-35"
            width={40}
            height={40}
          />
        </a>
      </Col>

      {footer.columns.map((column) => (
        <Col key={column.title} span={4} spanMd={4} spanLg={3}>
          <nav aria-label={column.title}>
            <h3 className="mb-16 text-body-sm font-semibold text-accent-alt/80">{column.title}</h3>
            <ul className="flex flex-col gap-12">
              {column.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-body-sm text-accent-alt/70 transition-colors duration-150 hover-fine-text-bright"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Col>
      ))}
    </Grid>
  )
}

function FooterUtilityBar() {
  return (
    <div className="mt-40 flex flex-col gap-20 border-t border-accent-alt/12 pt-32 md:mt-48 md:flex-row md:items-center md:justify-between md:pt-40">
      <div className="flex flex-wrap items-center gap-16">
        <a href="#" className="inline-flex shrink-0">
          <img
            src="/speakflow-wordmark-light.svg"
            alt="Speakflow"
            className="h-24 w-auto opacity-90"
            width={140}
            height={24}
          />
        </a>
        <ul className="flex items-center gap-8">
          {footer.social.map((item) => {
            const IconComponent = socialIcons[item.icon]

            return (
              <li key={item.label}>
                <a
                  href={item.href}
                  aria-label={item.label}
                  className="inline-flex size-40 items-center justify-center rounded-full text-accent-alt/70 transition-colors duration-150 hover:bg-accent-alt/8 hover:text-accent-alt"
                >
                  <IconComponent aria-hidden="true" className="size-20" weight="regular" />
                </a>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="flex flex-col gap-8 md:items-end">
        <p className="text-caption text-accent-alt/50">{footer.copyright}</p>
        <ul className="flex flex-wrap items-center gap-x-8 gap-y-4">
          {footer.legal.map((link, index) => (
            <li key={link.label} className="flex items-center gap-8">
              {index > 0 ? (
                <span aria-hidden="true" className="text-accent-alt/25">
                  |
                </span>
              ) : null}
              <a
                href={link.href}
                className="text-caption text-accent-alt/50 transition-colors duration-150 hover:text-accent-alt/80"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function Footer() {
  return (
    <footer id="footer" className="relative z-10 px-[var(--grid-margin)] pb-48 pt-48 md:pb-56 md:pt-56">
      <Container>
        <FooterPromo />
        <FooterLinks />
        <FooterUtilityBar />
      </Container>
    </footer>
  )
}
