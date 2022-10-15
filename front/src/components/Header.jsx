import React from 'react'
import ReactDOM from 'react-dom/client'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { StyledLink } from '../utils/Atoms'
import LightLogo from '../assets/light-logo.png'
import DarkLogo from '../assets/dark-logo.png'
import { useTheme } from '../utils/hooks'
import SignOutButton from './SignOutButton'
import Admin from '../pages/Admin.page'

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

function Header(userId) {
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
          Publications
        </StyledLink>
        <SignOutButton 
        userId={userId} />
        <StyledLink $theme={theme} to="/admin">
        Admin
        </StyledLink>
      </div>
    </NavContainer>
  )
}

export default Header
