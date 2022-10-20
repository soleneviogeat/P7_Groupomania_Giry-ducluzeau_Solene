import { useState, useEffect } from 'react'
import styled from 'styled-components'
import colors from '../../utils/colors'
import { ThemeContext } from '../../utils/ColorContext'
import userService from '../../services/user.service'
import comService from '../../services/commment.service'
import { StyledButton } from '../../utils/Atoms'


const PostWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 1em;
  border-radius: 1rem;
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
`

const PostDetails = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => (theme === 'light' ? colors.dark : 'white')};
`

const Picture = styled.img`
  max-height: 15em;
  width: 100%;
  object-fit: cover;
  border-radius: 15px;
`

const Title = styled.h1`
  font-size: 25px;
  margin: 0;
  font-weight: 500;
`

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`


function CommentComponent({ com, updateCom, deleteCom }) {
  const [userData, setUserData] = useState(null);
  const [comData, setComData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentCom, setCurrentCom] = useState(com)
  const [inModification, setInModification] = useState(false)

  const [file, setFile] = useState()

  function handleChange(event) {
    setFile(event.target.files[0])
    const formData = new FormData();
    formData.append('image', file);
  }

  const currentUserId = JSON.parse(localStorage.getItem('currentUserId'));

  const changeStatusOfCom = () => {
    setInModification(element => !element)
  }


  useEffect(() => {
    userService.getOneUser(currentUserId)
    .then((res) => {
      setCurrentUser(res);
      setError(null);
    })
    .catch((err) => {
      setError(err.message);
      setCurrentUser(null);
    })
    .finally(() => {
      setLoading(false);
    });

    userService.getOneUser(currentCom.userId)
    .then((res) => {
      setUserData(res);
      setError(null);
    })
    .catch((err) => {
      setError(err.message);
      setUserData(null);
    })
    .finally(() => {
      setLoading(false);
    });

    comService.getAllComsOfOnePost(currentCom._id)
    .then((res) => {
      setComData(res);
      setError(null)
    }).catch((err) => {
      setError(err.message);
      setUserData(null);
    })
    .finally(() => {
      setLoading(false);
    });

  }, []);


  //Gestion des dates de création et de modification des commentaires
  const InfosCom = props => {
    const createdAtDateCom = new Date(currentCom.createdAt).toLocaleDateString();
    const createdAtTimeCom = new Date(currentCom.createdAt).toLocaleTimeString();
    const updatedAtDateCom = new Date(currentCom.updatedAt).toLocaleDateString();
    const updatedAtTimeCom = new Date(currentCom.updatedAt).toLocaleTimeString();

    if (createdAtDateCom === updatedAtDateCom && createdAtTimeCom === updatedAtTimeCom) {
      return <div className="infosPost">
        <div className='flex start'>
          <p>Créé par</p>
          <p><strong>{userData.lastname}</strong></p>
          <p><strong>{userData.firstname}</strong></p>
        </div>
        <div className='flex start'>
          <p>le </p>
          <p>{createdAtDateCom}</p>
          <p> à </p>
          <p>{createdAtTimeCom}</p>
        </div>
        
      </div>
    } else {
      return <div className="infosPost">
        <div className='flex start'>
          <p>Créé par</p>
          <p><strong>{userData.lastname}</strong></p>
          <p><strong>{userData.firstname}</strong></p>
        </div>
         
        <div className='flex start'>
            <p>le </p>
          <p>{createdAtDateCom}</p>
          <p> à </p>
          <p>{createdAtTimeCom}</p>
        </div>
        <div className='flex start'>
          <p>Modifié le </p>
          <p>{updatedAtDateCom}</p>
          <p> à </p>
          <p>{updatedAtTimeCom}</p>
        </div>
      </div>
    }
  }

  //Visualisation d'un commentaire
  const ComInReadOnly = props => {
    return <div className="flex column">
      <div className="flex column">
        <div className="flex commentDetails">
          <InfosCom com={currentCom}></InfosCom> 
        </div>
        <TitleWrapper>
          <Title>{currentCom.text}</Title>
        </TitleWrapper>
        <Picture src={`${currentCom.imageUrl}`} alt=""></Picture>
      </div> 
      {currentCom.userId === currentUserId || (currentUser && currentUser.isAdmin === true) ?
        <div className='padding-1'>
          <button className='buttonUser' onClick={changeStatusOfCom}>Modifier</button>
          <button className='buttonUser' onClick={removeCom}>Supprimer</button>
        </div> : null
      } 
                         
    </div>
  }

  //Modification d'un commentaire
  const ComInModification = props => {
    return <form onSubmit={modifyCom} className="formCreationPost">
      <p>Modification du commentaire</p>
      <input autoFocus
        className='inputFileCreationPost'
          type="text"
          name="text"
          id="com"
          value= {currentCom.text}
          onChange={(e) => setCurrentCom({
              ...currentCom,
              text: e.target.value
          })}/>
      <div className='buttonCreationPost'>
        <input type="file" name='image' title={currentCom.imageUrl} onChange={handleChange}/>
        <StyledButton type="submit">Modifier</StyledButton>
        <StyledButton onClick={changeStatusOfCom}>Annuler</StyledButton>
      </div> 
    </form>
  }

  function modifyCom(event) {
    event.preventDefault()
    const formData = new FormData();
    formData.append('image', file);
    formData.append('text', currentCom.text)
    
    comService.updateCom(formData, currentCom._id)
    .then((res)=>changeStatusOfCom())
  }

//Suppression d'un commentaire
  const removeCom = () => {
    const alertDeleteCom = window.confirm("Voulez-vous supprimer définitivement ce commentaire ?");
    if (alertDeleteCom) {
      comDelete();
      deleteCom(true);
     }
  }

  const ComInDelete = props => {
    return <form onSubmit={comDelete}> 
      <button type="submit">Supprimer</button>
      <button onClick={() => removeCom(currentCom._id)}>Annuler</button> 
  </form>
  }

  function comDelete(event) { 
    comService.deleteCom(currentCom._id)
  }
 

  return (
        <ThemeContext.Consumer >
        {({ theme }) => (
            <PostWrapper theme={theme}>
                {loading && <div>Chargement du commentaire...</div>}
                {error && (
                <div>{`There is a problem fetching the com data - ${error}`}</div>
                )}
                 {userData && comData &&
                <PostDetails theme={theme} >
                   
                  { inModification ? 
                      <ComInModification com={currentCom} ></ComInModification> :
                      <ComInReadOnly></ComInReadOnly>
                  }  
                </PostDetails>
                }                  
            </PostWrapper>
        )}
        </ThemeContext.Consumer>
  )
}

export default CommentComponent



