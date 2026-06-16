export const DISPLAY = {
  background: '#000814',

  bgStars: {
    count: 300,
    seed: 42,
    maxOpacity: 0.4,
    maxRadius: 1.5,
  },

  grid: {
    color: 'rgba(100,100,200,0.15)',
    lineWidth: 1,
    decStep: 30,
    decMin: -60,
    decMax: 60,
    raStep: 2,
    raDetailStep: 0.5,
  },

  constLines: {
    color: 'rgba(100,180,255,0.4)',
    lineWidth: 1.5,
  },

  star: {
    glowScale: 3,
    minRadius: 1,
    baseRadius: 5,
    labelMagThreshold: 2.5,
    labelColor: 'rgba(200,200,255,0.7)',
    labelFontSize: 10,
    labelOffsetX: 4,
    labelOffsetY: 4,
  },

  horizon: {
    color: 'rgba(0,200,100,0.3)',
    lineWidth: 2,
    step: 5,
  },

  constLabels: {
    color: 'rgba(100,180,255,0.8)',
    fontSize: 12,
    fontWeight: 'bold',
    offsetX: -20,
    offsetY: 15,
  },
} as const

const SPECTRAL_COLORS: Record<string, string> = {
  'O': '#9bb0ff',
  'B': '#aabfff',
  'A': '#cad7ff',
  'F': '#f8f7ff',
  'G': '#fff4ea',
  'K': '#ffd2a1',
  'M': '#ffcc6f',
}

export function spectralColor(spectral: string): string {
  return SPECTRAL_COLORS[spectral] || '#ffffff'
}

export function starRadius(mag: number, zoom: number): number {
  return Math.max(DISPLAY.star.minRadius, DISPLAY.star.baseRadius - mag) * zoom
}

export function rng(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return s / 2147483647
  }
}
