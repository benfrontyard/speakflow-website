import { useReducedMotion } from 'motion/react'

type Logo = {
  readonly name: string
  readonly src: string
}

type LogoMarqueeProps = {
  logos: readonly Logo[]
}

function LogoItem({ logo, hidden = false }: { logo: Logo; hidden?: boolean }) {
  return (
    <li className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      <img
        src={logo.src}
        alt={hidden ? '' : logo.name}
        loading="lazy"
        draggable={false}
      />
    </li>
  )
}

export function LogoMarquee({ logos }: LogoMarqueeProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return (
      <ul className="logo-marquee logo-marquee--static mx-auto flex max-w-[var(--grid-max-width)] flex-wrap items-center justify-center px-[var(--grid-margin)]">
        {logos.map((logo) => (
          <LogoItem key={logo.name} logo={logo} />
        ))}
      </ul>
    )
  }

  return (
    <div className="logo-marquee relative w-full" aria-label="Company logos">
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <ul className="logo-marquee-track flex w-max list-none animate-logo-marquee items-center py-3">
          {logos.map((logo) => (
            <LogoItem key={logo.name} logo={logo} />
          ))}
          {logos.map((logo) => (
            <LogoItem key={`${logo.name}-duplicate`} logo={logo} hidden />
          ))}
        </ul>
      </div>
    </div>
  )
}
