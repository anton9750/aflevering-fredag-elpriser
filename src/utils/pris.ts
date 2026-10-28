
const MOMSSATS = 1.25

export function medEventueltMoms(prisUdenMoms: number, visInklMoms: boolean): number {
  return visInklMoms ? prisUdenMoms * MOMSSATS : prisUdenMoms
}


export function formaterPris(pris: number): string {
  return pris.toFixed(3)
}
