import styled from 'styled-components'
import colors from '../utils/colors'
import { StyledButton, StyledLink } from '../utils/Atoms'
import '../styles/Contact.css'
import '../styles/Home.css'
import { useTheme } from '../utils/hooks'
import { useState } from 'react'
import userService from '../services/user.service'
import { useNavigate } from 'react-router-dom'
import { InputWrapper, StyledTitle } from '../utils/Components'
import LightLogo from '../assets/logo-fond-blanc.png'
import RedLogo from '../assets/logo-fond-noir.png'
import ImagePresentation from '../assets/wetransfer_img_1210-jpg_2022-01-13_0808/DSC_2637.jpg'

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
                <section class="text-contact">
                    <h1>Nou<span class="souligne">s contac</span>ter</h1>
                    <div>
                    <p class="titre-contact">Vous souhaitez organiser un événement ?</p>
                    <p>Pour contacter l'équipe de Shelter Events, 
                    il vous suffit d'envoyer un mail à l'adresse : <a href="mailto:contact@shelterevents.com">contact@shelterevents.com</a> </p>

                    <p>Merci de nous préciser le type d'événement et le thème souhaités (Anniversaire, EVJF, 
                    Gender Reveal, Brunch privé, autres), ainsi que le nombre d'invités, le lieu et la date.</p>

                    <p>A très vite !</p>
                    </div>
  
                </section>


                <section>

                    <div id="formulaire">
                    <form method="post" action="#">
                        <h1>Contactez-nous pour que votre idée devienne réalité</h1>
                        
                        <fieldset class="contact-info">  
                        <input type="text" placeholder="Nom*" autofocus required/>
                        <input type="text" placeholder="Prénom" required/>
                        <input type="text" placeholder="Adresse mail*" required/>
                        </fieldset>

                        <fieldset class="colum-form">


                        <div class="contact-evt-type">
                            <p>Type d'événement* :<br />
                            <label class="bouton_radio"><input type="radio" name="type" value="anniversaire"/>Anniversaire</label>
                            <label class="bouton_radio"><input type="radio" name="type" value="evjf"/>EVJF</label>
                            <label class="bouton_radio"><input type="radio" name="type" value="gender reveal"/>Gender Reveal</label>
                            <label class="bouton_radio"><input type="radio" name="type" value="brunch privé"/>Brunch privé</label>
                            <label class="bouton_radio"><input type="radio" name="type" value="brunch privé"/>Autres</label>
                            </p>
                        </div>


                        <div class="contact-evt">
                            <p class="date">Date souhaitée* : <input type="date" placeholder="Date souhaitée de l'événement"/></p>
                            <input type="number" placeholder="Nombre d'invités*" required/>
                            <input type="text" placeholder="Lieu de l'événement" required/>
                        </div>
                            
                        <div class="contact-evt">
                            <textarea name="" placeholder="Description de votre événement"></textarea>
                        </div>

                        
                        </fieldset>


                        <div class="container">
                        <div class="center">
                            <button class="btn">
                            <a href=""><svg width="180px" height="60px" viewBox="0 0 180 60" class="border">
                                <polyline points="179,1 179,59 1,59 1,1 179,1" class="bg-line" />
                                <polyline points="179,1 179,59 1,59 1,1 179,1" class="hl-line" />
                            </svg></a>
                            <span>ENVOYER</span>
                            </button>
                        </div>
                        </div>

                    </form>
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