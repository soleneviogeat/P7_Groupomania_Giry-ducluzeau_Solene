import styled from 'styled-components'
import colors from '../utils/colors'
import { StyledButton, StyledLink } from '../utils/Atoms'
import { useTheme } from '../utils/hooks'
import { useState } from 'react'
import userService from '../services/user.service'
import { useNavigate } from "react-router-dom";
import { InputWrapper, StyledInput, StyledLabel, StyledTitle } from '../utils/Components'

const SignupWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const SignupContainer = styled.div`
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
      .catch((err)=>console.log('noooon', err));

  };

    return (
      <SignupWrapper>
        <SignupContainer theme={theme}>
          <LeftCol>
            <StyledTitle theme={theme}>
              Bienvenue sur le réseau social de communication et d'échange de Groupomania 
            </StyledTitle>
            <InputWrapper theme={theme}>
                    <StyledLabel theme={theme}>Nom de famille</StyledLabel>
                    <StyledInput
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
                    />
                </InputWrapper>
                <InputWrapper theme={theme}>
                    <StyledLabel theme={theme}>Prénom</StyledLabel>
                    <StyledInput
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
                    />
                </InputWrapper>
                <InputWrapper theme={theme}>
                    <StyledLabel theme={theme}>Adresse email</StyledLabel>
                    <StyledInput
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
                        value={userSignup.user_password}
                        onChange={(e) => setUserSignup({
                            ...userSignup,
                            user_password: e.target.value
                        })}
                    />
                </InputWrapper>
                <StyledButton onClick={submitSignup}>S'inscrire</StyledButton>
          </LeftCol>
        </SignupContainer>
      </SignupWrapper>
    )
  }
  
  export default Signup
