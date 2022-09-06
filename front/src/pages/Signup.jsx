import styled from 'styled-components'
import colors from '../utils/colors'
import { StyledLink } from '../utils/Atoms'
import { useTheme } from '../utils/hooks'
//import EmailInput from '../components/EmailInput'
//import PasswordInput from '../components/PasswordInput'
import { useEffect, useState } from 'react'

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

const StyledTitle = styled.h2`
  display: flex;
  padding-bottom: 30px;
  width: 100%;
  text-align: center;
  font-size: 26px;
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`
const InputWrapper = styled.div`
  color: ${({ theme }) => (theme === 'light' ? colors.dark : 'white')};
  display: flex;
  flex-direction: column;
`

const StyledLabel = styled.label`
  color: ${({ theme }) => (theme === 'light' ? colors.dark : 'white')};
`

const StyledInput = styled.input`
  border: none;
  color: ${({ theme }) => (theme === 'light' ? colors.dark : 'white')};
  background-color: transparent;
  border-bottom: 1px solid
    ${({ theme }) => (theme === 'light' ? colors.dark : 'white')};
  margin-top: 5px;
  margin-bottom: 15px;
`

function Signup() {
    const { theme } = useTheme()
    const [userSignup, setUserSignup] = useState({
        user_firstname: "",
        user_lastname: "",
        user_email: "",
        user_password: ""
    });

    const [userLogin, setUserLogin] = useState({
        user_email: "",
        user_password: ""
    });



    function submitSignup() {
        const signupBody = JSON.stringify({
            email: userSignup.user_email,
            password: userSignup.user_password
        })
        console.log(signupBody);
        fetch('http://localhost:3000/api/auth/signup', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: signupBody
        }).then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                console.log(response);
            }
        }).then((jsonResponse) => {
            console.log('a', jsonResponse);
            //alert(jsonResponse.message)
        }).catch((err)=>alert(err))
       
        
    }


    return (
      <SignupWrapper>
        <SignupContainer theme={theme}>
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
                <button onClick={submitSignup}>S'inscrire</button>
          </LeftCol>
        </SignupContainer>
      </SignupWrapper>
    )
  }
  
  export default Signup