import type { ReactNode } from 'react'
import styled from 'styled-components'

interface ContentWrapperProps {
  children: ReactNode
}

// Fælles wrapper omkring siden-indholdet (mellem Nav og Footer).
// Sørger for at #root's min-height: 100vh presser Footer ned i bunden,
// selv på sider med lidt indhold.
export function ContentWrapper({ children }: ContentWrapperProps) {
  return <Main>{children}</Main>
}

const Main = styled.main`
  flex: 1;
`
