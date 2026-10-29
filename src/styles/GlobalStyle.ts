import { createGlobalStyle } from 'styled-components'


export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    padding: 0;
  }

  body {
    background: ${(props) => props.theme.colors.baggrund};
    color: ${(props) => props.theme.colors.tekst};
    font-family: ${(props) => props.theme.skrifttype};

    /* Lidt luft mellem linjer generelt, så teksten ikke føles presset sammen */
    line-height: 1.6;

    -webkit-font-smoothing: antialiased;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  a {
    color: inherit;
  }

  button,
  input,
  select {
    font-family: inherit;
  }
`
