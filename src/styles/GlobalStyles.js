import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --primary-dark: #0B1529;
    --primary-main: #1B6AFC;
    --bg-default: #EEF3F6;
    --yellow: #FFC247;
    --white: #FFFFFF;
    --border: rgba(0, 0, 0, 0.12);
    --text-primary: #1E1F20;
    --text-secondary: #595C5F;
    --text-disabled: #879099;
    --text-link: #1B6AFC;
    --success: #187637;
    --success-disabled: rgba(24, 118, 55, 0.5);
    --neutral-dark: #1E1F20;
    --neutral-main: #D1D8DF;
    --info-main: #1B6AFC;
    --info-light: #94B3EE;
    
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Outfit', sans-serif;
    background-color: var(--bg-default);
  }

  h1, h2, h3, h4, h5, h6, p, span {
    color: var(--text-primary);
  }
`;

export default GlobalStyles;
