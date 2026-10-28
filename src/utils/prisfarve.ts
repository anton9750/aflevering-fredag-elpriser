import { theme } from '../styles/theme'


export function prisfarve(pris: number, min: number, max: number): string {


  const skala = theme.colors.prisskala

  if (max === min) {
    return skala[0]
  }

  const ratio = (pris - min) / (max - min)
  const index = Math.min(skala.length - 1, Math.floor(ratio * skala.length))

  return skala[index]
}
