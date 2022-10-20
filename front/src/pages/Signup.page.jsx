import styled from 'styled-components'
import colors from '../utils/colors'
import { StyledButton, StyledLink } from '../utils/Atoms'
import { useTheme } from '../utils/hooks'
import { useState } from 'react'
import userService from '../services/user.service'
import { useNavigate } from "react-router-dom";
import { InputWrapper, StyledTitle } from '../utils/Components'
import LightLogo from '../assets/light-logo.png'
import RedLogo from '../assets/red-logo.png'


const SignupWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
`

const SignupContainer = styled.div`
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

function Signup() {
    const { theme } = useTheme()
    const [userSignup, setUserSignup] = useState({
        user_lastname: "",
        user_firstname: "",
        user_email: "",
        user_password: ""
    });

    const navigate = useNavigate();

    const submitSignup = () => {
      const user = {
        lastname: userSignup.user_lastname,
        firstname: userSignup.user_firstname,
        email: userSignup.user_email,
        password: userSignup.user_password
      };
      userService.signup(user)
      .then(()=>navigate('/post'))
  };

    return (
      <SignupWrapper>
        <SignupContainer theme={theme} className='card'>
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
                    <span theme={theme} className="form-text">Nom de famille</span>
                    <input
                        theme={theme}
                        type="text"
                        placeholder='nom de famille'
                        id='lastname'
                        name='lastname'
                        value={userSignup.user_lastname}
                        onChange={(e) => setUserSignup({
                            ...userSignup,
                            user_lastname: e.target.value
                        })}
                        className="form-input"
                    />
                </InputWrapper>
                <InputWrapper theme={theme} className="form-group">
                    <span theme={theme} className="form-text">Prénom</span>
                    <input
                        theme={theme}
                        type="text"
                        placeholder='prénom'
                        id='firstname'
                        name='firstname'
                        value={userSignup.user_firstname}
                        onChange={(e) => setUserSignup({
                            ...userSignup,
                            user_firstname: e.target.value
                        })}
                        className="form-input"
                    />
                </InputWrapper>
                <InputWrapper theme={theme} className="form-group">
                    <span theme={theme} className="form-text">Adresse email</span>
                    <input
                        theme={theme}
                        type="text"
                        placeholder='email'
                        id='email'
                        name='email'
                        value={userSignup.user_email}
                        onChange={(e) => setUserSignup({
                            ...userSignup,
                            user_email: e.target.value
                        })}
                        className="form-input"
                    />
                </InputWrapper>
                <InputWrapper theme={theme} className="form-group">
                    <span theme={theme} className="form-text">Mot de passe</span>
                    <input
                        theme={theme}
                        type="password"
                        placeholder='mot de passe'
                        id='password'
                        name='password'
                        value={userSignup.user_password}
                        onChange={(e) => setUserSignup({
                            ...userSignup,
                            user_password: e.target.value
                        })}
                        className="form-input"
                    />
                </InputWrapper>
                <StyledButton onClick={submitSignup}>S'inscrire</StyledButton>
            </div>
                </StyledForm>
          </LeftCol>
        </SignupContainer>
      </SignupWrapper>
    )
  }
  
  export default Signup
