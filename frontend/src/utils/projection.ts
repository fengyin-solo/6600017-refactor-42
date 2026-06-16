export interface ProjectionContext {
  cx: number
  cy: number
  scale: number
  panX: number
  panY: number
  localSiderealTime: number
  latitude: number
}

export function calcLocalSiderealTime(date: Date): number {
  const jd = date.getTime() / 86400000 + 2440587.5
  const T = (jd - 2451545.0) / 36525.0
  let lst = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + T * T * (0.000387933 - T / 38710000)
  lst = ((lst % 360) + 360) % 360
  return lst / 15
}

export function projectStar(
  ra: number,
  dec: number,
  ctx: ProjectionContext
): [number, number] {
  const ha = (ctx.localSiderealTime - ra) * 15 * Math.PI / 180
  const decRad = dec * Math.PI / 180
  const latRad = ctx.latitude * Math.PI / 180

  const alt = Math.asin(
    Math.sin(decRad) * Math.sin(latRad) +
    Math.cos(decRad) * Math.cos(latRad) * Math.cos(ha)
  )
  const az = Math.atan2(
    -Math.cos(decRad) * Math.sin(ha),
    Math.sin(decRad) * Math.cos(latRad) - Math.cos(decRad) * Math.sin(latRad) * Math.cos(ha)
  )

  if (alt < -0.1) return [-999, -999]

  const r = (Math.PI / 2 - alt) * ctx.scale * 0.45
  const x = ctx.cx + ctx.panX + r * Math.sin(az)
  const y = ctx.cy + ctx.panY - r * Math.cos(az)
  return [x, y]
}

export function isVisible(x: number, y: number, w: number, h: number, margin = 500): boolean {
  return x >= -margin && x <= w + margin && y >= -margin && y <= h + margin
}
