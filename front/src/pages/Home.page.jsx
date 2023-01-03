import styled from 'styled-components'
import colors from '../utils/colors'
import { StyledLink } from '../utils/Atoms'
import { useTheme } from '../utils/hooks'
import { StyledTitle } from '../utils/Components'
import '../styles/Home.css'
import LightLogo from '../assets/logo-fond-blanc.png'
import RedLogo from '../assets/logo-fond-noir.png'


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
          
          
          <StyledFlexContainer>
            <StyledLink to="/presentation" $isFullLink>
              Présentation
            </StyledLink>
            <StyledLink to="/services" $isFullLink>
              Nos offres
            </StyledLink>
            <StyledLink to="/pictures" $isFullLink>
              Galerie photos
            </StyledLink>
            <StyledLink to="/contact" $isFullLink>
              Formulaire de contact
            </StyledLink>
          </StyledFlexContainer>
        </LeftCol>
      </HomeContainer>
    </HomeWrapper>    
  )
}

export default Home

//<div className='flex center'>
            //<HomeLogo src={theme === 'light' ? RedLogo : LightLogo} />
          //</div>
