import type { Layer, RenderContext } from './types'
import { DISPLAY } from '../../config/display'
import { projectStar } from '../../utils/projection'

export class GridLayer implements Layer {
  draw(rc: RenderContext) {
    if (!rc.showGrid) return

    const { ctx, proj } = rc
    const { decStep, decMin, decMax, raStep, raDetailStep, color, lineWidth } = DISPLAY.grid

    ctx.strokeStyle = color
    ctx.lineWidth = lineWidth

    for (let dec = decMin; dec <= decMax; dec += decStep) {
      ctx.beginPath()
      for (let ra = 0; ra <= 24; ra += raDetailStep) {
        const [x, y] = projectStar(ra, dec, proj)
        if (x < -500) continue
        ra === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      }
      ctx.stroke()
    }

    for (let ra = 0; ra < 24; ra += raStep) {
      ctx.beginPath()
      for (let dec = -90; dec <= 90; dec += 5) {
        const [x, y] = projectStar(ra, dec, proj)
        if (x < -500) continue
        dec === -90 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      }
      ctx.stroke()
    }
  }
}
