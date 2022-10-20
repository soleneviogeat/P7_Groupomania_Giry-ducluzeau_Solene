import styled from 'styled-components'
import colors from '../utils/colors'
import { StyledButton, StyledLink } from '../utils/Atoms'
import { useTheme } from '../utils/hooks'
import { useState } from 'react'
import userService from '../services/user.service'
import { useNavigate } from 'react-router-dom'
import { InputWrapper, StyledTitle } from '../utils/Components'
import LightLogo from '../assets/light-logo.png'
import RedLogo from '../assets/red-logo.png'


const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
`

const LoginContainer = styled.div`

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
const HomeLogo = styled.img`
  width: 22rem;
`

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  padding: 2rem;
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
        <LoginContainer theme={theme} className='card'>
          <LeftCol>
            <div className='flex center'>
              <HomeLogo src={theme === 'light' ? RedLogo : LightLogo} />
            </div>
            <StyledForm>
            <StyledTitle theme={theme}>
              Bienvenue sur le réseau social de communication et d'échange de Groupomania 
            </StyledTitle>
              <div className="flex column center">
                <InputWrapper theme={theme} className="form-group">
                    <span theme={theme} className="form-text">Adresse email</span>
                    <input
                        type="text"
                        placeholder='email'
                        id='email'
                        name='email'
                        value={userLogin.user_email}
                        onChange={(e) => setUserLogin({
                            ...userLogin,
                            user_email: e.target.value
                        })}
                        className="form-input"
                    />
                </InputWrapper>
                <InputWrapper theme={theme}  className="form-group">
                    <span className="form-text">Mot de passe</span>
                    <input
                        theme={theme}
                        type="password"
                        placeholder='mot de passe'
                        id='password'
                        name='password'
                        value={userLogin.user_password}
                        onChange={(e) => setUserLogin({
                            ...userLogin,
                            user_password: e.target.value
                        })}
                        className="form-input"
                    />
                </InputWrapper>
                <StyledButton onClick={submitLogin}>Se connecter</StyledButton>
                </div>
            </StyledForm> 
          </LeftCol>
        </LoginContainer>
      </LoginWrapper>
    )
  }
  
  export default Login