import type { Layer, RenderContext } from './types'
import { DISPLAY, spectralColor, starRadius } from '../../config/display'
import { projectStar, isVisible } from '../../utils/projection'
import { STARS } from '../types'

export class StarsLayer implements Layer {
  draw(rc: RenderContext) {
    const { ctx, w, h, proj, zoom } = rc

    for (const star of STARS) {
      const [x, y] = projectStar(star.ra, star.dec, proj)
      if (!isVisible(x, y, w, h)) continue

      const radius = starRadius(star.mag, zoom)
      const color = spectralColor(star.spectral)

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * DISPLAY.star.glowScale)
      gradient.addColorStop(0, color)
      gradient.addColorStop(1, 'transparent')
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(x, y, radius * DISPLAY.star.glowScale, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = color
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()
    }
  }
}
