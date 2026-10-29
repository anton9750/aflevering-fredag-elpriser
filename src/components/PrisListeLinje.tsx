import styled from 'styled-components'

interface PrisListeLinjeProps {
  klokkeslæt: string
  pris: string
}

export function PrisListeLinje({ klokkeslæt, pris }: PrisListeLinjeProps) {
  return (
    <Linje>
      <Klokkeslæt>{klokkeslæt}</Klokkeslæt>
      <Pris>{pris} kr</Pris>
    </Linje>
  )
}

const Linje = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 10px 2px;
  border-bottom: 1px solid #333436;

  font-size: 13px;

  &:last-child {
    border-bottom: none;
  }
`

const Klokkeslæt = styled.span`
  color: ${(props) => props.theme.colors.tekstDæmpet};
`

const Pris = styled.span`
  font-weight: 700;
  color: ${(props) => props.theme.colors.tekst};
`
