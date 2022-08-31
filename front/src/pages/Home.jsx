import styled from 'styled-components'
import colors from '../utils/colors'
import { StyledLink } from '../utils/Atoms'
import { useTheme } from '../utils/hooks'
//import HomeIllustration from '../../assets/home-illustration.svg'

const HomeWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const HomerContainer = styled.div`
  margin: 30px;
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
  display: flex;
  flex-direction: row;
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

const Illustration = styled.img`
  flex: 1;
`

function Home() {
  const { theme } = useTheme()

  return (
    <HomeWrapper>
      <HomerContainer theme={theme}>
        <LeftCol>
          <StyledTitle theme={theme}>
            Bienvenue sur le réseau social de communication et d'échange de Groupomania 
          </StyledTitle>
          <StyledLink to="/" $isFullLink>
            Créer un post
          </StyledLink>
        </LeftCol>
        
      </HomerContainer>
    </HomeWrapper>
  )
}

export default Home

/*<Illustration src={HomeIllustration} />*/