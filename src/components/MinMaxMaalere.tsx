import styled from 'styled-components'
import { CirkelMaaler } from './CirkelMaaler'
import { medEventueltMoms, formaterPris } from '../utils/pris'

interface MinMaxMaalereProps {
  minPris: number
  maxPris: number
  visMedMoms: boolean
}

// De to små målere der viser dagens laveste og højeste pris.
// Bruges både på "lige nu"-siden og på oversigts-siden, jf. Figma-designet.
export function MinMaxMaalere({ minPris, maxPris, visMedMoms }: MinMaxMaalereProps) {
  return (
    <MåleRække>
      <MålerMedLabel>
        <CirkelMaaler størrelse={90} fylde={1}>
          <LilleStorPris>{formaterPris(medEventueltMoms(minPris, visMedMoms))} KR</LilleStorPris>
          <MikroTekst>PR. KWH</MikroTekst>
        </CirkelMaaler>
        <Label>LAVESTE PRIS</Label>
      </MålerMedLabel>

      <MålerMedLabel>
        <CirkelMaaler størrelse={90} fylde={1}>
          <LilleStorPris>{formaterPris(medEventueltMoms(maxPris, visMedMoms))} KR</LilleStorPris>
          <MikroTekst>PR. KWH</MikroTekst>
        </CirkelMaaler>
        <Label>HØJESTE PRIS</Label>
      </MålerMedLabel>
    </MåleRække>
  )
}

const MåleRække = styled.div`
  display: flex;
  justify-content: center;
  gap: 28px;

  margin-bottom: 26px;
`

const MålerMedLabel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`

const LilleStorPris = styled.span`
  display: block;
  color: ${(props) => props.theme.colors.accent};
  font-size: 11px;
  font-weight: 700;
`

const MikroTekst = styled.span`
  font-size: 8px;
  color: ${(props) => props.theme.colors.tekstDæmpet};
`

const Label = styled.span`
  font-size: 10px;
  letter-spacing: 0.05em;
  color: ${(props) => props.theme.colors.tekstDæmpet};
`
