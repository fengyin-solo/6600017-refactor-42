import type { Layer, RenderContext } from './types'
import type { ProjectionContext } from '../utils/projection'
import { BackgroundLayer } from './layers/BackgroundLayer'
import { GridLayer } from './layers/GridLayer'
import { ConstLinesLayer } from './layers/ConstLinesLayer'
import { StarsLayer } from './layers/StarsLayer'
import { HorizonLayer } from './layers/HorizonLayer'
import { StarLabelsLayer } from './layers/StarLabelsLayer'
import { ConstLabelsLayer } from './layers/ConstLabelsLayer'

export interface SkyRendererOptions {
  zoom: number
  showLabels: boolean
  showConstLines: boolean
  showGrid: boolean
  projection: ProjectionContext
}

export class SkyRenderer {
  private layers: Layer[] = []

  constructor() {
    this.layers = [
      new BackgroundLayer(),
      new GridLayer(),
      new ConstLinesLayer(),
      new StarsLayer(),
      new HorizonLayer(),
      new StarLabelsLayer(),
      new ConstLabelsLayer(),
    ]
  }

  render(ctx: CanvasRenderingContext2D, w: number, h: number, opts: SkyRendererOptions) {
    const rc: RenderContext = {
      ctx,
      w,
      h,
      proj: opts.projection,
      zoom: opts.zoom,
      showLabels: opts.showLabels,
      showConstLines: opts.showConstLines,
      showGrid: opts.showGrid,
    }

    for (const layer of this.layers) {
      layer.draw(rc)
    }
  }
}
