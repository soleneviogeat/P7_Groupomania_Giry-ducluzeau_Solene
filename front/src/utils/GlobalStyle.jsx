import { createGlobalStyle } from 'styled-components'
import colors from './colors'
import { useTheme } from './hooks'

const StyledGlobalStyle = createGlobalStyle`
    * {
      font-family: Lato, Helvetica, sans-serif;
    }
    a {
      text-decoration: none;
    }
    body {
        background-color: ${(props) =>
          props.isDarkMode ? colors.tertiaire : colors.secondary};
        margin: 2rem;
    }
`


function GlobalStyle() {
  const { theme } = useTheme()

  return <StyledGlobalStyle isDarkMode={theme === 'dark'} />
}

export default GlobalStyle