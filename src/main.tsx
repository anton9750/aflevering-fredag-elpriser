import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import { registerSW } from 'virtual:pwa-register'
import { GlobalStyle } from './styles/GlobalStyle'
import { theme } from './styles/theme'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </StrictMode>,
)

if (import.meta.env.PROD) {
  registerSW({ immediate: true })
}
