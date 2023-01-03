import styled from 'styled-components'
import colors from '../utils/colors'
import { StyledButton, StyledLink } from '../utils/Atoms'
import '../styles/Pictures.css'
import '../styles/Home.css'
import { useTheme } from '../utils/hooks'
import { useState } from 'react'
import userService from '../services/user.service'
import { useNavigate } from 'react-router-dom'
import { InputWrapper, StyledTitle } from '../utils/Components'
import LightLogo from '../assets/logo-fond-blanc.png'
import RedLogo from '../assets/logo-fond-noir.png'
import Image_Anniv_enfant_1 from '../assets/wetransfer_img_1210-jpg_2022-01-13_0808/DSC_2557-Modifier.jpg'
import Image_Anniv_enfant_2 from '../assets/wetransfer_img_1210-jpg_2022-01-13_0808/DSC_2457.jpg'
import Image_Anniv_enfant_3 from '../assets/wetransfer_img_1210-jpg_2022-01-13_0808/DSC_2486.jpg'
import Image_Anniv_enfant_4 from '../assets/wetransfer_img_1210-jpg_2022-01-13_0808/DSC_2520.jpg'
import Image_Anniv_enfant_5 from '../assets/wetransfer_img_1210-jpg_2022-01-13_0808/DSC_2506.jpg'
import Image_Anniv_enfant_6 from '../assets/wetransfer_img_1210-jpg_2022-01-13_0808/DSC_2569.jpg'
import Image_Anniv_enfant_7 from '../assets/wetransfer_img_1210-jpg_2022-01-13_0808/DSC_2524.jpg'
import Image_Anniv_enfant_8 from '../assets/wetransfer_img_1210-jpg_2022-01-13_0808/DSC_2588.jpg'
import Image_Anniv_enfant_9 from '../assets/wetransfer_img_1210-jpg_2022-01-13_0808/DSC_2502.jpg'
import Image_Christmas_party_1 from '../assets/wetransfer_img_1210-jpg_2022-01-13_0808/DSC_1217.JPG'
import Image_Christmas_party_2 from '../assets/wetransfer_img_1210-jpg_2022-01-13_0808/DSC_2802.jpg'
import Image_Christmas_party_3 from '../assets/wetransfer_img_1210-jpg_2022-01-13_0808/DSC_2795.jpg'
import Image_Christmas_party_4 from '../assets/wetransfer_img_1210-jpg_2022-01-13_0808/DSC_2842.jpg'
import Image_Christmas_party_5 from '../assets/wetransfer_img_1210-jpg_2022-01-13_0808/DSC_2855.jpg'
import Image_Christmas_party_6 from '../assets/wetransfer_img_1210-jpg_2022-01-13_0808/DSC_2830.jpg'
import Image_Christmas_party_7 from '../assets/wetransfer_img_1210-jpg_2022-01-13_0808/DSC_2954.jpg'
import Image_Christmas_party_8 from '../assets/wetransfer_img_1210-jpg_2022-01-13_0808/IMG_9685 copie.jpeg'
import Image_Christmas_party_9 from '../assets/wetransfer_img_1210-jpg_2022-01-13_0808/DSC_2876.jpg'
import Image_Christmas_party_10 from '../assets/wetransfer_img_1210-jpg_2022-01-13_0808/DSC_2837.jpg'
import Image_Christmas_party_11 from '../assets/wetransfer_img_1210-jpg_2022-01-13_0808/DSC_2966-Modifier.jpg'
import Image_Birthday_party_1 from '../assets/wetransfer_img_1210-jpg_2022-01-13_0808/IMG_1580.jpeg'
import Image_Birthday_party_2 from '../assets/wetransfer_img_1210-jpg_2022-01-13_0808/IMG_9657.jpeg'
import Image_Birthday_party_3 from '../assets/wetransfer_img_1210-jpg_2022-01-13_0808/IMG_1587.jpeg'
import Image_Birthday_party_4 from '../assets/wetransfer_img_1210-jpg_2022-01-13_0808/IMG_1583.jpeg'


const ImagePres = styled.div`
  width: 25%;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

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
        
          <LeftCol>
            <div className='flex center'>
              <HomeLogo src={theme === 'light' ? RedLogo : LightLogo} />
            </div>
            
            <StyledForm>
            <StyledTitle theme={theme}>
                <section>
                <h1>Gal<span class="souligne">erie pho</span>tos</h1>
                
                <div class="gallery">

                <div class="photos">
                    <img src={Image_Anniv_enfant_1} alt="Anniv enfant 1"/>
                </div>

                <div class="photos"> 
                    <img src={Image_Anniv_enfant_2} alt="Anniv enfant 2"/>
                    <img src={Image_Anniv_enfant_3} alt="Anniv enfant 3"/>
                </div>
                
                <div class="photos">
                    <img src={Image_Anniv_enfant_4} alt="Anniv enfant 4"/>
                </div>

                <div class="photos">
                    <img src={Image_Anniv_enfant_5} alt="Anniv enfant 5"/>
                    <img src={Image_Anniv_enfant_6} alt="Anniv enfant 6"/>
                </div>

                <div class="photos">
                    <img src={Image_Anniv_enfant_7} alt="Anniv enfant 7"/>
                    <img src={Image_Anniv_enfant_8} alt="Anniv enfant 8"/>
                </div>

                <div class="photos">
                    <img src={Image_Anniv_enfant_9} alt="Anniv enfant 9"/>
                </div>
                
                <div class="photos">
                    <img src={Image_Christmas_party_1} alt="Christmas party 1"/>
                    <img src={Image_Christmas_party_2} alt="Christmas party 2"/>
                </div>
                
                <div class="photos">
                    <img src={Image_Christmas_party_3} alt="Christmas party 3"/>
                </div>
        

                <div class="photos">
                    <img src={Image_Christmas_party_4} alt="Christmas party 4"/>
                </div>
            
                <div class="photos">
                    <img class="four-photos-img" src={Image_Christmas_party_5} alt="Christmas party 5"/>
                    <img class="four-photos-img" src={Image_Christmas_party_6} alt="Christmas party 6"/>
                </div>
                
                <div class="photos">
                    <img src={Image_Christmas_party_7} alt="Christmas party 7"/>
                </div>

                <div class="photos">
                    <img src={Image_Christmas_party_8} alt="Christmas party 8"/>
                    <img src={Image_Christmas_party_9} alt="Christmas party 9"/>
                </div>

                <div class="photos">
                    <img src={Image_Christmas_party_10} alt="Christmas party 10"/>
                    <img src={Image_Christmas_party_11} alt="Christmas party 11"/>
                </div>

                <div class="photos">
                    <img src={Image_Birthday_party_1} alt="Birthday party 1"/>
                </div>

                <div class="photos">
                    <img src={Image_Birthday_party_2} alt="Birthday party 2"/>
                    <img src={Image_Birthday_party_3} alt="Birthday party 3"/>
                </div>

                <div class="photos">
                    <img src={Image_Birthday_party_4} alt="Birthday party 4"/>
                </div>
            
            </div>

        </section>
        

        <aside class="insta">
            <a href="https://www.instagram.com/shelter_events/" target="_blank">
              <span class="lg-insta"><i class="fab fa-instagram-square"></i></span>
              <p>SUIVEZ-NOUS SUR INSTAGRAM</p>
            </a>
        </aside>
        
            </StyledTitle>
              <div className="flex column center">
                
                
              </div>
            </StyledForm> 
          </LeftCol>
        
      </LoginWrapper>
    )
  }
  
  export default Login