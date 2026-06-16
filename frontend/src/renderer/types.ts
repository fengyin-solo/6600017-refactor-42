import type { ProjectionContext } from '../utils/projection'
import { STARS, CONSTELLATIONS } from '../data/stars'

export interface RenderContext {
  ctx: CanvasRenderingContext2D
  w: number
  h: number
  proj: ProjectionContext
  zoom: number
  showLabels: boolean
  showConstLines: boolean
  showGrid: boolean
}

export interface Layer {
  draw(rc: RenderContext): void
}

export { STARS, CONSTELLATIONS }
