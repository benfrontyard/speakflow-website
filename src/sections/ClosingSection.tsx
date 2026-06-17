import { BackgroundDecoration, decorationPresets } from '../decorations'
import { CTA } from './CTA'
import { Footer } from './Footer'

export function ClosingSection() {
  return (
    <div id="closing" className="relative overflow-hidden bg-accent text-accent-alt">
      <BackgroundDecoration scene={decorationPresets.closingDarkAmbient} />
      <div className="relative z-10">
        <CTA />
        <Footer />
      </div>
    </div>
  )
}
