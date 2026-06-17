import { lazy, Suspense } from 'react'
import { Header } from './components/Header'
import { SectionFallback } from './components/SectionFallback'
import { Hero } from './sections/Hero'
import { ScriptSection } from './sections/ScriptSection'
import { Testimonials } from './sections/Testimonials'
import { UsedBy } from './sections/UsedBy'

const HowItWorks = lazy(() =>
  import('./sections/HowItWorks').then((module) => ({ default: module.HowItWorks })),
)
const Workflow = lazy(() =>
  import('./sections/Workflow').then((module) => ({ default: module.Workflow })),
)
const BlogPreview = lazy(() =>
  import('./sections/BlogPreview').then((module) => ({ default: module.BlogPreview })),
)
const ClosingSection = lazy(() =>
  import('./sections/ClosingSection').then((module) => ({ default: module.ClosingSection })),
)

function App() {
  return (
    <main>
      <Header />
      <Hero />
      <ScriptSection />
      <UsedBy />
      <Testimonials />
      <Suspense fallback={<SectionFallback />}>
        <HowItWorks />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Workflow />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <BlogPreview />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ClosingSection />
      </Suspense>
    </main>
  )
}

export default App
