import type { CSSProperties } from 'react'
import { DecorationLayerView } from './DecorationLayerView'
import type { DecorationScene } from './types'

type BackgroundDecorationProps = {
  scene: DecorationScene
  className?: string
}

export function BackgroundDecoration({ scene, className = '' }: BackgroundDecorationProps) {
  return (
    <div
      className={`decoration-scene pointer-events-none absolute inset-0 overflow-hidden ${className}`.trim()}
      aria-hidden="true"
      data-decoration={scene.id}
      data-figma={scene.figma}
      style={scene.vars as CSSProperties}
    >
      {scene.layers.map((layer) => (
        <DecorationLayerView key={layer.id} layer={layer} />
      ))}
    </div>
  )
}
