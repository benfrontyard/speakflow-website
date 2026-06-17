import { BlogPreview } from './sections/BlogPreview'
import { Creators } from './sections/Creators'
import { CTA } from './sections/CTA'
import { Footer } from './sections/Footer'
import { Hero } from './sections/Hero'
import { NailIt } from './sections/NailIt'
import { ScriptSection } from './sections/ScriptSection'
import { Testimonials } from './sections/Testimonials'
import { UsedBy } from './sections/UsedBy'
import { Workflow } from './sections/Workflow'

function App() {
  return (
    <main>
      <Hero />
      <ScriptSection />
      <UsedBy />
      <Creators />
      <NailIt />
      <Workflow />
      <Testimonials />
      <BlogPreview />
      <CTA />
      <Footer />
    </main>
  )
}

export default App
