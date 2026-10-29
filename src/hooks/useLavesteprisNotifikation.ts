import { useEffect, useRef } from 'react'
import type { Prispunkt } from '../types/elpris'
import { medEventueltMoms, formaterPris } from '../utils/pris'

// Viser en lokal notifikation med dagens laveste pris, én gang pr. time,

export function useLavesteprisNotifikation(aktiv: boolean, priser: Prispunkt[], visMedMoms: boolean) {
  const sidsteNotifikationsTime = useRef<number | null>(null)

  useEffect(() => {
    if (!aktiv || priser.length === 0 || !('Notification' in window)) {
      return
    }

    if (Notification.permission === 'default') {
      Notification.requestPermission()
    }

    function visNotifikationHvisNyTime() {
      if (Notification.permission !== 'granted') {
        return
      }

      const nuværendeTime = new Date().getHours()

      if (sidsteNotifikationsTime.current === nuværendeTime) {
        return
      }

      const billigste = priser.reduce<Prispunkt | null>((billigst, punkt) => {
        if (!billigst || punkt.dkkPerKwh < billigst.dkkPerKwh) {
          return punkt
        }
        return billigst
      }, null)

      if (!billigste) {
        return
      }

      sidsteNotifikationsTime.current = nuværendeTime

      new Notification('Dagens laveste elpris', {
        body: `Den billigste pris i dag er ${formaterPris(medEventueltMoms(billigste.dkkPerKwh, visMedMoms))} kr/kWh kl. ${billigste.timeStart.getHours()}.00`,
        icon: '/pwa-icon-192.png',
      })
    }

    visNotifikationHvisNyTime()

    const interval = setInterval(visNotifikationHvisNyTime, 60_000)

    return () => clearInterval(interval)
  }, [aktiv, priser, visMedMoms])
}
