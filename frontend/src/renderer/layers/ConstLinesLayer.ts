import type { Layer, RenderContext } from './types'
import { DISPLAY } from '../../config/display'
import { projectStar } from '../../utils/projection'
import { CONSTELLATIONS, STARS } from '../types'

export class ConstLinesLayer implements Layer {
  draw(rc: RenderContext) {
    if (!rc.showConstLines) return

    const { ctx, proj } = rc
    const { color, lineWidth } = DISPLAY.constLines

    ctx.strokeStyle = color
    ctx.lineWidth = lineWidth

    for (const c of CONSTELLATIONS) {
      for (const [i, j] of c.lines) {
        const s1 = STARS[i], s2 = STARS[j]
        const [x1, y1] = projectStar(s1.ra, s1.dec, proj)
        const [x2, y2] = projectStar(s2.ra, s2.dec, proj)
        if (x1 < -500 || x2 < -500) continue
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
      }
    }
  }
}
