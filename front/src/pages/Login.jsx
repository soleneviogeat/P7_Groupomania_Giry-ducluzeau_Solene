import styled from 'styled-components'
import colors from '../utils/colors'
import { StyledButton, StyledLink } from '../utils/Atoms'
import { useTheme } from '../utils/hooks'
import { useState } from 'react'
import userService from '../services/user.service'
import { useNavigate } from 'react-router-dom'
import { InputWrapper, StyledInput, StyledLabel, StyledTitle } from '../utils/Components'


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


function Login() {
    const { theme } = useTheme()
    const [userLogin, setUserLogin] = useState({
        user_email: "",
        user_password: ""
    });

    const navigate = useNavigate();

    function submitLogin() { 
      userService.login(userLogin.user_email, userLogin.user_password)
      .then(() => navigate('/post'))
      .catch(console.error)
    }


    return (
      <LoginWrapper>
        <LoginContainer theme={theme}>
          <LeftCol>
            <StyledTitle theme={theme}>
              Bienvenue sur le réseau social de communication et d'échange de Groupomania 
            </StyledTitle>
                <InputWrapper theme={theme}>
                    <StyledLabel theme={theme}>Adresse email</StyledLabel>
                    <StyledInput
                        theme={theme}
                        type="text"
                        placeholder='email'
                        id='email'
                        name='email'
                        value={userLogin.user_email}
                        onChange={(e) => setUserLogin({
                            ...userLogin,
                            user_email: e.target.value
                        })}
                    />
                </InputWrapper>
                <InputWrapper theme={theme}>
                    <StyledLabel theme={theme}>Mot de passe</StyledLabel>
                    <StyledInput
                        theme={theme}
                        type="text"
                        placeholder='mot de passe'
                        id='password'
                        name='password'
                        value={userLogin.user_password}
                        onChange={(e) => setUserLogin({
                            ...userLogin,
                            user_password: e.target.value
                        })}
                    />
                </InputWrapper>
                <StyledButton onClick={submitLogin}>Se connecter</StyledButton>
          </LeftCol>
        </LoginContainer>
      </LoginWrapper>
    )
  }
  
  export default Login