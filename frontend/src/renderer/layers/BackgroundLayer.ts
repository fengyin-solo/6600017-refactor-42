import type { Layer, RenderContext } from './types'
import { DISPLAY, rng } from '../../config/display'

export class BackgroundLayer implements Layer {
  draw(rc: RenderContext) {
    const { ctx, w, h } = rc
    ctx.fillStyle = DISPLAY.background
    ctx.fillRect(0, 0, w, h)

    const r = rng(DISPLAY.bgStars.seed)
    for (let i = 0; i < DISPLAY.bgStars.count; i++) {
      ctx.fillStyle = `rgba(255,255,255,${r() * DISPLAY.bgStars.maxOpacity})`
      ctx.beginPath()
      ctx.arc(r() * w, r() * h, r() * DISPLAY.bgStars.maxRadius, 0, Math.PI * 2)
      ctx.fill()
    }
  }
}
