import styled from 'styled-components'
import colors from '../utils/colors'
import { StyledButton, StyledLink } from '../utils/Atoms'
import '../styles/Events.css'
import '../styles/Home.css'
import { useTheme } from '../utils/hooks'
import { useState } from 'react'
import userService from '../services/user.service'
import { useNavigate } from 'react-router-dom'
import { InputWrapper, StyledTitle } from '../utils/Components'
import LightLogo from '../assets/logo-fond-blanc.png'
import RedLogo from '../assets/logo-fond-noir.png'
import Image_Brunch_1 from '../assets/wetransfer_img_1210-jpg_2022-01-13_0808/DSC_2869.jpg'
import Image_Brunch_2 from '../assets/wetransfer_img_1210-jpg_2022-01-13_0808/DSC_2824.jpg'


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

                    <h4>Organisation d'un déjeuner privé</h4>
                    <h3>Venez, profitez et repartez avec tout plein de souvenir</h3>

                    <div class="evenement">

                        <div class="img-evenement">
                            <img src={Image_Brunch_1} alt='Image_Brunch_1'/>
                            <img src={Image_Brunch_2} alt='Image_Brunch_2'/>
                        </div>

                        <div class="text-evenement">
                            <p>Shelter Event vous propose l'organisation d'un déjeuner conçu parfaitement pour vous et vos proches.</p>

                            <div class="detail-evenement">
                                <p>Tous les déjeuners privés comprennent :</p>
                                <div class="list-evenement">
                                    <p>- La location d'un jardin privé (selon la saison)</p>
                                    <p>- La table de pique-nique</p>
                                    <p>- Tapis et les oreillers</p>
                                    <p>- Les assiettes et les ustensiles</p>
                                    <p>- La décoration</p>
                                    <p>- Une enceinte bluetooth</p>
                                    <p>- La personnalisation d'un message d'accueil</p>
                                    <p>- L'installation & le nettoyage</p>
                                    <p>- Un traiteur salé en option</p>
                                </div>

                                <span class="envies-evenement">Cette offre est modulable selon vos envies !</span>
                            </div>
                                
                            <div class="btn-evenement">
                                <a href="contact.html#contact">Je souhaite organiser un déjeuner privé</a>
                            </div> 
                        

                        </div>
                    </div>
    
                </section>
            </StyledTitle>
              <div className="flex column center">
                
                
              </div>
            </StyledForm> 
          </LeftCol>
        
      </LoginWrapper>
    )
  }
  
  export default Login