import styled from 'styled-components'
import colors from '../utils/colors'
import { StyledLink } from '../utils/Atoms'
import { useTheme } from '../utils/hooks'
import { StyledTitle } from '../utils/Components'
import LightLogo from '../assets/light-logo.png'
import RedLogo from '../assets/red-logo.png'


const HomeWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const HomeContainer = styled.div`
  margin: 100px;
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  padding: 15px;
`

const HomeLogo = styled.img`
  width: 22rem;
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

const StyledFlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex: 1;
  padding: 2rem;
`


function Home() {
  const { theme } = useTheme()

  return (
    <HomeWrapper className='HomeWrapper'>
      <HomeContainer theme={theme} className='card'>
        <LeftCol>
          <div className='flex center'>
            <HomeLogo src={theme === 'light' ? RedLogo : LightLogo} />
          </div>
          <StyledTitle theme={theme}>
            Bienvenue sur le réseau social de communication et d'échange de Groupomania 
          </StyledTitle>
          <StyledFlexContainer>
            <StyledLink to="/login" $isFullLink>
              Se connecter
            </StyledLink>
            <StyledLink to="/signup" $isFullLink>
              S'inscrire
            </StyledLink>
          </StyledFlexContainer>
        </LeftCol>
      </HomeContainer>
    </HomeWrapper>    
  )
}

export default Home
