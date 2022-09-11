import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { StyledLink } from '../utils/Atoms'
import LightLogo from '../assets/icon-left-font-monochrome-white.png'
import DarkLogo from '../assets/icon-left-font.png'
import { useTheme } from '../utils/hooks'

const HomeLogo = styled.img`
  height: 0%;
  width: 17rem;
`

const NavContainer = styled.nav`
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

function Header() {
  const { theme } = useTheme()

  return (
    <NavContainer>
      <Link to="/">
        <HomeLogo src={theme === 'light' ? DarkLogo : LightLogo} />
      </Link>
      <div>
        <StyledLink $theme={theme} to="/">
          Connexion
        </StyledLink>
        <StyledLink $theme={theme} to="/post">
          Posts
        </StyledLink>
        <StyledLink $theme={theme} to="/createPost">
          Créer un post
        </StyledLink>
        
    
      </div>
    </NavContainer>
  )
}

export default Header
