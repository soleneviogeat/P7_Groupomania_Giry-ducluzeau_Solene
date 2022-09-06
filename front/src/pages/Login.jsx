import styled from 'styled-components'
import colors from '../utils/colors'
import { StyledLink } from '../utils/Atoms'
import { useTheme } from '../utils/hooks'
import EmailInput from '../components/EmailInput'
import PasswordInput from '../components/PasswordInput'

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const LoginContainer = styled.div`
  margin: 30px;
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
`

const LeftCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  ${StyledLink} {
    max-width: 250px;
  }
`

const StyledTitle = styled.h2`
  display: flex;
  padding-bottom: 30px;
  width: 100%;
  text-align: center;
  font-size: 26px;
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`

function Login() {
    const { theme } = useTheme()
  
    return (
      <LoginWrapper>
        <LoginContainer theme={theme}>
          <LeftCol>
            <StyledTitle theme={theme}>
              Bienvenue sur le réseau social de communication et d'échange de Groupomania 
            </StyledTitle>
            <EmailInput theme={theme} />
            <PasswordInput theme={theme} />
            <StyledLink to="/post" $isFullLink>
              Se connecter
            </StyledLink>
          </LeftCol>
        </LoginContainer>
      </LoginWrapper>
    )
  }
  
  export default Login