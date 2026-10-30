import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { faBolt, faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSettings } from '../context/SettingsContext'

// Topnavigationen. Ligger i App.tsx så den vises på alle sider.
// Mobil: logo til venstre, faner til højre.
// Desktop: logo + sidenavn til venstre, faner til højre, lidt mere luft generelt,
// samt ét samlet tandhjul til indstillinger (i stedet for ét pr. panel).
export function Nav() {
  const { åbnIndstillinger } = useSettings()

  return (
    <Wrapper>
      <Indhold>
        <LogoLink to="/">
          <LogoCirkel>
            <FontAwesomeIcon icon={faBolt} />
          </LogoCirkel>
          <SiteNavn>ELPrisen.nu</SiteNavn>
        </LogoLink>

        <Faner>
          <Fane to="/oversigt">OVERSIGT</Fane>
          <Fane to="/" end>LIG NU</Fane>
          <Fane to="/historik">HISTORIK</Fane>
        </Faner>

        <TandhjulKnap type="button" onClick={åbnIndstillinger} aria-label="Åbn indstillinger">
          <FontAwesomeIcon icon={faGear} />
        </TandhjulKnap>
      </Indhold>
    </Wrapper>
  )
}

const Wrapper = styled.header`
  padding: 20px 20px 0;
`

const Indhold = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1100px;
  margin: 0 auto;
`

const LogoLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: ${(props) => props.theme.colors.tekst};
`

const LogoCirkel = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px dashed ${(props) => props.theme.colors.accent};

  color: ${(props) => props.theme.colors.accent};
  font-size: 12px;
`

const SiteNavn = styled.span`
  display: none;
  font-weight: 700;
  letter-spacing: 0.02em;

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
    display: inline;
  }
`

const Faner = styled.nav`
  display: flex;
  gap: 18px;

  /* Desktop viser alle paneler samlet i dashboardet, så faner til at skifte
     side giver ikke mening der. */
  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
    display: none;
  }
`

const Fane = styled(NavLink)`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-decoration: none;
  color: ${(props) => props.theme.colors.tekstDæmpet};

  &.active {
    color: ${(props) => props.theme.colors.accent};
  }

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
    font-size: 13px;
    color: ${(props) => props.theme.colors.tekst};

    &.active {
      color: ${(props) => props.theme.colors.accent};
    }
  }
`

const TandhjulKnap = styled.button`
  display: none;

  /* På mobil vises kun ét panel ad gangen, med sit eget tandhjul øverst i
     kortet. På desktop vises alle paneler samlet, så tandhjulet flyttes
     herop i stedet, så det kun optræder ét sted. */
  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 28px;
    height: 28px;
    border: none;
    border-radius: 50%;
    background: transparent;

    color: ${(props) => props.theme.colors.tekst};
    font-size: 15px;
    cursor: pointer;

    &:hover {
      color: ${(props) => props.theme.colors.accent};
    }
  }
`
