import styled from 'styled-components'
import colors from '../utils/colors'
import { StyledButton, StyledLink } from '../utils/Atoms'
import '../styles/Services.css'
import '../styles/Home.css'
import { useTheme } from '../utils/hooks'
import { useState } from 'react'
import userService from '../services/user.service'
import { useNavigate } from "react-router-dom";
import { InputWrapper, StyledTitle } from '../utils/Components'
import LightLogo from '../assets/logo-fond-blanc.png'
import RedLogo from '../assets/logo-fond-noir.png'
import ImageBulle1 from "../assets/wetransfer_img_1210-jpg_2022-01-13_0808/DSC_2520.jpg"
import ImageBulle2 from '../assets/wetransfer_img_1210-jpg_2022-01-13_0808/DSC_2825.jpg'


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
        
          <LeftCol>
          <div className='flex center'>
            <HomeLogo src={theme === 'light' ? RedLogo : LightLogo} />
          </div>
          <StyledForm>
          <section>
            <h1>N<span class="souligne">os offre</span>s</h1>
            <div class="idea">
                <div class="bulle">
                    <StyledLink className="img-bulle" to="/events"><img src={ImageBulle1} alt="bulle1"/></StyledLink>
                    <div class="text-bulle">
                        <StyledLink to="/events">Envie d'organiser un événement ?</StyledLink>
                        <p>Organisation clé en main de votre anniversaire, baby shower, reveal garden, evjf...</p>
                    </div>
                </div>
                <div class="bulle">
                    <StyledLink className="img-bulle" to="/brunch"><img src={ImageBulle2} alt="bulle2"/></StyledLink>
                    <div class="text-bulle">
                        <StyledLink to="/brunch">Envie de rassembler vos proches autour d'un déjeuner ?</StyledLink>
                        <p>Organisation d'un déjeuner comprenant la location d'un jardin, la décoration, l'installation & le nettoyage</p>
                    </div>
                </div>
            </div>

        </section>
            
              <div className="flex column center">
           
            </div>
                </StyledForm>
          </LeftCol>
        
      </SignupWrapper>
    )
  }
  
  export default Signup
