import { Link } from 'react-router-dom'
import colors from './colors'
import styled from 'styled-components'


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
    background-color: ${colors.primary};`}
`

export const StyledButton = styled.button`
padding: 10px 15px;
color: white; 
border-radius: 30px; 
background-color: ${colors.primary};
font-size: 18px;
text-align: center;
`

export const StyledTitle = styled.h2`
  display: flex;
  padding-top: 30px;
  padding-bottom: 30px;
  width: 100%;
  text-align: center;
  font-size: 23px;
  color: ${({ theme }) => (theme === 'light' ? colors.tertiaire : '#ffffff')};
`
export const InputWrapper = styled.div`
  color: ${({ theme }) => (theme === 'light' ? colors.dark : 'white')};
  display: flex;
`

export const StyledLabel = styled.label`
  color: ${({ theme }) => (theme === 'light' ? colors.dark : 'white')};
`

export const StyledInput = styled.input`
  border: none;
  color: ${({ theme }) => (theme === 'light' ? colors.dark : 'white')};
  background-color: transparent;
  border-bottom: 1px solid
    ${({ theme }) => (theme === 'light' ? colors.dark : 'white')};
  margin-top: 5px;
  margin-bottom: 15px;
`