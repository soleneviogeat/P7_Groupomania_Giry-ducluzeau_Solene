import styled from 'styled-components'
import colors from '../utils/colors'
import { StyledLink } from '../utils/Atoms'
import { useTheme } from '../utils/hooks'
import { StyledTitle } from '../utils/Components'
//import HomeIllustration from '../../assets/home-illustration.svg'


// Design de la bannière de la page d'accueil
const HomeWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const HomeContainer = styled.div`
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


function Home() {
  const { theme } = useTheme()

  return (
    <HomeWrapper>
      <HomeContainer theme={theme}>
        <LeftCol>
          <StyledTitle theme={theme}>
            Bienvenue sur le réseau social de communication et d'échange de Groupomania 
          </StyledTitle>
          <StyledLink to="/login" $isFullLink>
            Se connecter
          </StyledLink>
          <StyledLink to="/signup" $isFullLink>
            S'inscrire
          </StyledLink>
        </LeftCol>
        
      </HomeContainer>
    </HomeWrapper>    
  )
}

export default Home

/*<Illustration src={HomeIllustration} /> */