import type { Layer, RenderContext } from './types'
import { DISPLAY } from '../../config/display'
import { projectStar } from '../../utils/projection'
import { CONSTELLATIONS, STARS } from '../types'

export class ConstLabelsLayer implements Layer {
  draw(rc: RenderContext) {
    if (!rc.showLabels) return

    const { ctx, proj, zoom } = rc
    const { color, fontSize, fontWeight, offsetX, offsetY } = DISPLAY.constLabels

    ctx.fillStyle = color
    ctx.font = `${fontWeight} ${fontSize * zoom}px system-ui`

    for (const c of CONSTELLATIONS) {
      const midStar = STARS[c.stars[0]]
      const [x, y] = projectStar(midStar.ra, midStar.dec, proj)
      if (x < -500) continue
      ctx.fillText(c.nameCn, x + offsetX, y - offsetY * zoom)
    }
  }
}
