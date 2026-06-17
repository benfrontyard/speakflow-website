import {
  layerClassName,
  layerDataAttributes,
  layerStyleVars,
} from './buildStyles'
import type { DecorationLayer } from './types'

type DecorationLayerViewProps = {
  layer: DecorationLayer
}

export function DecorationLayerView({ layer }: DecorationLayerViewProps) {
  return (
    <div
      className={layerClassName(layer)}
      style={layerStyleVars(layer)}
      data-figma={layer.figma}
      data-layer={layer.id}
      {...layerDataAttributes(layer)}
    />
  )
}
