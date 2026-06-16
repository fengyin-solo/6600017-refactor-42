import type { Layer, RenderContext } from './types'
import { DISPLAY, starRadius } from '../../config/display'
import { projectStar, isVisible } from '../../utils/projection'
import { STARS } from '../types'

export class StarLabelsLayer implements Layer {
  draw(rc: RenderContext) {
    if (!rc.showLabels) return

    const { ctx, w, h, proj, zoom } = rc
    const { labelColor, labelFontSize, labelMagThreshold, labelOffsetX, labelOffsetY } = DISPLAY.star

    ctx.fillStyle = labelColor
    ctx.font = `${labelFontSize * zoom}px system-ui`

    for (const star of STARS) {
      if (star.mag >= labelMagThreshold) continue
      const [x, y] = projectStar(star.ra, star.dec, proj)
      if (!isVisible(x, y, w, h)) continue
      const radius = starRadius(star.mag, zoom)
      ctx.fillText(star.name, x + radius + labelOffsetX, y + labelOffsetY)
    }
  }
}
