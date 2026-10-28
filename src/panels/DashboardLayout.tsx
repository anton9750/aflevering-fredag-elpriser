import styled from 'styled-components'
import { LigeNuPanel } from './LigeNuPanel'
import { OversigtPanel } from './OversigtPanel'
import { HistorikPanel } from './HistorikPanel'

export type AktivtPanel = 'ligenu' | 'oversigt' | 'historik'

interface DashboardLayoutProps {
  aktivtPanel: AktivtPanel
}


export function DashboardLayout({ aktivtPanel }: DashboardLayoutProps) {
  return (
    <Grid>
      <PanelPlads $erAktiv={aktivtPanel === 'ligenu'}>
        <LigeNuPanel />
      </PanelPlads>

      <PanelPlads $erAktiv={aktivtPanel === 'oversigt'}>
        <OversigtPanel />
      </PanelPlads>

      <PanelPlads $erAktiv={aktivtPanel === 'historik'}>
        <HistorikPanel />
      </PanelPlads>
    </Grid>
  )
}

const Grid = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px;

  display: flex;
  flex-direction: column;

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
    display: grid;
    grid-template-columns: 1fr 1.3fr 1fr;
    gap: 24px;
    align-items: start;
  }
`

const PanelPlads = styled.div<{ $erAktiv: boolean }>`

  /* Mobil: kun det aktive panel vises, de andre to holdes ude af syne men i DOM'et */

  display: ${(props) => (props.$erAktiv ? 'block' : 'none')};

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {

    /* Desktop: alle tre paneler vises altid, uanset hvilken rute der er aktiv */
    
    display: block;
  }
`
