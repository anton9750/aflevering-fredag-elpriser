const FARVE_STOPS = [
  '#00FF29',
  '#33FF00',
  '#B8FF22',
  '#EDFF23',
  '#FFD645',
  '#FF7A00',
  '#FF8717',
  '#FF4D00',
]

export function farveForPris(pris: number, min: number, max: number): string {
  if (max === min) {
    return FARVE_STOPS[0]
  }

  const andel = Math.min(1, Math.max(0, (pris - min) / (max - min)))
  const indeks = Math.round(andel * (FARVE_STOPS.length - 1))

  return FARVE_STOPS[indeks]
}
