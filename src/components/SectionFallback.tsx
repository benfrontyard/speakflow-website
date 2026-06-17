import { Container } from './Container'
import { Shimmer } from './Shimmer'

export function SectionFallback() {
  return (
    <section
      className="py-[var(--space-section)]"
      aria-busy="true"
      aria-label="Loading section"
    >
      <Container>
        <div className="flex flex-col gap-24">
          <Shimmer className="h-32 w-48 rounded-full" />
          <Shimmer className="h-64 w-full max-w-xl rounded-lg-4" />
          <Shimmer className="aspect-video w-full rounded-lg-4" />
        </div>
      </Container>
    </section>
  )
}
