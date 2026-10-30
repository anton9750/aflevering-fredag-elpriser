import styled from 'styled-components'
import { Card } from '../components/Card'
import { PrisListeLinje } from '../components/PrisListeLinje'
import { useElpriser } from '../hooks/useElpriser'
import { useSettings } from '../context/SettingsContext'
import { medEventueltMoms, formaterPris } from '../utils/pris'
import { farveForPris } from '../utils/prisfarve'
import { formaterKlokkeslæt } from '../utils/dato'


export function OversigtPanel() {
  const { region, visMedMoms } = useSettings()

  const { priser, henterData, fejl } = useElpriser(new Date(), region)

  const alleKwhPriser = priser.map((punkt) => medEventueltMoms(punkt.dkkPerKwh, visMedMoms))
  const minPris = Math.min(...alleKwhPriser)
  const maxPris = Math.max(...alleKwhPriser)

  return (
    <Card>

      <Titel>OVERSIGT</Titel>

      {henterData && <StatusTekst>Henter priser...</StatusTekst>}
      {fejl && <StatusTekst>{fejl}</StatusTekst>}

      {!henterData && !fejl && (
        <>
          <Liste>
            {priser.map((punkt) => {
              const kwhPris = medEventueltMoms(punkt.dkkPerKwh, visMedMoms)

              return (
                <PrisListeLinje
                  key={punkt.timeStart.toISOString()}
                  klokkeslæt={formaterKlokkeslæt(punkt.timeStart)}
                  pris={formaterPris(kwhPris)}
                  farve={farveForPris(kwhPris, minPris, maxPris)}
                />
              )
            })}
          </Liste>
        </>
      )}
    </Card>
  )
}

const Titel = styled.h1`
  margin: 0 0 24px;

  text-align: center;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.06em;
`

const StatusTekst = styled.p`
  text-align: center;
  color: ${(props) => props.theme.colors.tekstDæmpet};
  font-size: 13px;
`

const Liste = styled.div`
  max-height: 420px;
  overflow-y: auto;
`
