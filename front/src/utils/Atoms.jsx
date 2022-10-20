import { Link } from 'react-router-dom'
import colors from './colors'
import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const Loader = styled.div`
  padding: 10px;
  border: 6px solid ${colors.primary};
  border-bottom-color: transparent;
  border-radius: 22px;
  animation: ${rotate} 1s infinite linear;
  height: 0;
  width: 0;
`

export const StyledLink = styled(Link)`
  padding: 10px 15px;
  color: ${({ $theme }) => ($theme === 'light' ? '#8186a0' : '#ffffff')};
  text-decoration: none;
  font-size: 18px;
  text-align: center;
  ${(props) =>
    props.$isFullLink &&
    ` color: white; 
    border-radius: 30px; 
    background-color: ${colors.primary};
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`}


`

export const StyledButton = styled.button`
margin: 0.3em;
border: none;
padding: 10px 15px;
color: white; 
border-radius: 30px; 
background-color: ${colors.primary};
font-size: 18px;
text-align: center;
box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`