import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { STARS, CONSTELLATIONS } from '../data/stars'
import { calcLocalSiderealTime, projectStar as projectFn, type ProjectionContext } from '../utils/projection'
import { starRadius as radiusFn, spectralColor as colorFn } from '../config/display'
import type { Star } from '../types'

export const useSkyStore = defineStore('sky', () => {
  const viewDate = ref(new Date())
  const zoom = ref(1.0)
  const panX = ref(0)
  const panY = ref(0)
  const showLabels = ref(true)
  const showConstLines = ref(true)
  const showGrid = ref(true)
  const selectedStar = ref<Star | null>(null)
  const searchQuery = ref('')
  const latitude = ref(39.9)

  const localSiderealTime = computed(() => calcLocalSiderealTime(viewDate.value))

  const filteredStars = computed(() => {
    if (!searchQuery.value) return []
    const q = searchQuery.value.toLowerCase()
    return STARS.filter(s => s.name.toLowerCase().includes(q)).slice(0, 5)
  })

  function projectionContext(cx: number, cy: number, scale: number): ProjectionContext {
    return {
      cx,
      cy,
      scale,
      panX: panX.value,
      panY: panY.value,
      localSiderealTime: localSiderealTime.value,
      latitude: latitude.value,
    }
  }

  function projectStar(ra: number, dec: number, cx: number, cy: number, scale: number): [number, number] {
    return projectFn(ra, dec, projectionContext(cx, cy, scale))
  }

  function starRadius(mag: number): number {
    return radiusFn(mag, zoom.value)
  }

  function spectralColor(spectral: string): string {
    return colorFn(spectral)
  }

  function selectStar(x: number, y: number, cx: number, cy: number, scale: number) {
    let closest: Star | null = null
    let minDist = 20
    const ctx = projectionContext(cx, cy, scale)
    for (const star of STARS) {
      const [sx, sy] = projectFn(star.ra, star.dec, ctx)
      const dist = Math.hypot(sx - x, sy - y)
      if (dist < minDist) { minDist = dist; closest = star }
    }
    selectedStar.value = closest
  }

  return {
    viewDate, zoom, panX, panY, showLabels, showConstLines, showGrid,
    selectedStar, searchQuery, latitude, localSiderealTime, filteredStars,
    projectStar, starRadius, spectralColor, selectStar, projectionContext,
    STARS, CONSTELLATIONS
  }
})
