import type { Layer, RenderContext } from './types'
import { DISPLAY } from '../../config/display'

export class HorizonLayer implements Layer {
  draw(rc: RenderContext) {
    const { ctx, proj } = rc
    const { color, lineWidth, step } = DISPLAY.horizon
    const { cx, cy, scale, panX, panY } = proj

    ctx.strokeStyle = color
    ctx.lineWidth = lineWidth
    ctx.beginPath()

    for (let az = 0; az <= 360; az += step) {
      const azRad = az * Math.PI / 180
      const r = (Math.PI / 2) * scale * 0.45
      const x = cx + panX + r * Math.sin(azRad)
      const y = cy + panY - r * Math.cos(azRad)
      az === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
    }

    ctx.closePath()
    ctx.stroke()
  }
}
