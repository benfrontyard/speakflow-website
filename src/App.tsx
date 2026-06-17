import { Header } from './components/Header'
import { BlogPreview } from './sections/BlogPreview'
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
      <Header />
      <Hero />
      <ScriptSection />
      <UsedBy />
      <Testimonials />
      <NailIt />
      <Workflow />
      <BlogPreview />
      <CTA />
      <Footer />
    </main>
  )
}

export default App
