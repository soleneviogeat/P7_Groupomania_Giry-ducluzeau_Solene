import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import LightLogo from '../assets/logo-fond-blanc.png'
import DarkLogo from '../assets/logo-fond-noir.png'
import { useTheme } from '../utils/hooks'
import SignOutButton from './SignOutButton'
import colors from '../utils/colors'

const HomeLogo = styled.img`
  height: 0%;
  width: 18rem;
`

const NavContainer = styled.nav`
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: solid 0.3rem ${colors.tertiaire}
`

function Header(userId) {
  const { theme } = useTheme()
  

  return (
    <NavContainer className='header'>
      <div>
      <Link to="/">
        <HomeLogo src={theme === 'light' ? DarkLogo : LightLogo} />
      </Link>
      </div>
      <div className='navbar'>
        <SignOutButton 
        $theme={theme} 
        to="/"
        userId={userId} />
      </div>
    </NavContainer>
  )
}

export default Header
