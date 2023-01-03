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
import Image_Events_1 from '../assets/wetransfer_img_1210-jpg_2022-01-13_0808/DSC_2659-Modifier.jpg'
import Image_Events_2 from '../assets/wetransfer_img_1210-jpg_2022-01-13_0808/DSC_2506.jpg'


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

            <h4>Organisation d'événement privé</h4>
            <h3>Pour célébrer, partager, rassembler</h3>

            <div className="evenement">

                <div className="img-evenement">
                    <img src={Image_Events_1} alt="Image_Events_1"/>
                    <img src={Image_Events_2} alt="Image_Events_2"/>
                </div>

                <div class="text-evenement">
                    <p>Vous souhaitez organiser un événement dans les mois à venir ? Shelter Events vous accompagne pour faire de votre événement un moment inoubliable !</p>
                    <div class="btn-evenement">
                        <a href="contact.html#contact">Je souhaite faire une demande d'événement</a>
                    </div>

                    <div class="lien-evenement">
                        <nav>
                            <ul>
                                <li><a href="maquette/Pack evenement simple.jpg">- Pack Evénement (anniversaire, baptême, gender reveal, baby shower, fête de naissance...)</a></li>
                                <li><a href="nomfichier.zip">- Pack Evénement Premium (anniversaire, baptême, gender reveal, baby shower, fête de naissance...)</a></li>
                                <li><a href="maquette/Pack anniversaire enfant.jpg">- Pack Anniversaire Enfant</a></li>
                                <li><a href="nomfichier.zip">- Pack EVJF</a></li>
                            </ul>
                        </nav>
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