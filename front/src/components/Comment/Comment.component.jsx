import { useState, useEffect } from 'react'
import styled from 'styled-components'
import colors from '../../utils/colors'
import { ThemeContext } from '../../utils/ColorContext'
import postService from '../../services/post.service'
import userService from '../../services/user.service'
import CreationComment from './CreationComment.component'
import comService from '../../services/commment.service'


const PostWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 90px 0;
  margin: 2rem 5rem;
  border-radius: 1rem;
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
`

const PostDetails = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => (theme === 'light' ? colors.dark : 'white')};
  img {
    max-height: 5rem;
  }
`

const Picture = styled.img`
  height: 150px;
  width: 150px;
  border-radius: 75px;
`

const Title = styled.h1`
  font-size: 25px;
  margin: 0;
  font-weight: 500;
`

const JobTitle = styled.h2`
  padding-top: 10px;
  font-size: 20px;
  margin: 0;
  font-weight: 500;
`

const Location = styled.span`
  margin-left: 15px;
  color: ${colors.secondary};
`

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Price = styled.span`
  padding-top: 10px;
  font-weight: 500;
  font-size: 20px;
`

const SkillsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 0;
`

const Skill = styled.span`
  border-radius: 5px;
  padding: 5px;
  margin-right: 5px;
  border: 1px solid
    ${({ theme }) => (theme === 'light' ? colors.dark : 'white')};
`


function CommentComponent({ com, updateCom, deleteCom }) {
  const [userData, setUserData] = useState(null);
  const [comData, setComData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [inModification, setInModification] = useState(false)
  const [comUpdate, setComUpdate] = useState({
    text: com.text,
  });

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

  const removeCom = () => {
    const alertDeleteCom = window.confirm("Voulez-vous supprimer définitivement ce commentaire ?");
    if (alertDeleteCom) {
      comDelete();
      deleteCom(true);
     }
  }

  useEffect(() => {
    userService.getOneUser(com.userId)
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

    comService.getAllComsOfOnePost(com._id)
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


  const DisplayDateCom = props => {
    const {com} = props;
    const createdAtDateCom = new Date(com.createdAt).toLocaleDateString();
    const createdAtTimeCom = new Date(com.createdAt).toLocaleTimeString();
    const updatedAtDateCom = new Date(com.updatedAt).toLocaleDateString();
    const updatedAtTimeCom = new Date(com.updatedAt).toLocaleTimeString();

    if (createdAtDateCom === updatedAtDateCom && createdAtTimeCom === updatedAtTimeCom) {
      return <div>
        <Price>{createdAtDateCom}</Price>
        <Price>{createdAtTimeCom}</Price>
      </div>
    } else {
      return <div>
        <Price>{createdAtDateCom}</Price>
        <Price>{createdAtTimeCom}</Price>
        <Price>{updatedAtDateCom}</Price>
        <Price>{updatedAtTimeCom}</Price>
      </div>
    }
  }

  const ComInReadOnly = props => {
    return <div>
      <div>
        <JobTitle>{userData.lastname}</JobTitle>
        <Price>{userData.firstname}</Price>
        <DisplayDateCom com={com}></DisplayDateCom> 
        <TitleWrapper>
          <Title>{com.text}</Title>
        </TitleWrapper>
        <img src={`${com.imageUrl}`} alt="" />
      </div> 

     

      {com.userId === currentUserId ?
      <div>
        <button onClick={changeStatusOfCom}>Modifier</button>
        <button onClick={removeCom}>Supprimer</button>
      </div> : null
      }                     
  </div>
  }


  const ComInModification = props => {
    return <form onSubmit={modifyCom}>
    <input autoFocus
        type="text"
        name="text"
        id="com"
        value= {comUpdate.text}
        onChange={(e) => setComUpdate({
            ...comUpdate,
            text: e.target.value
        })}/>
    <input type="file" name='image' title={comUpdate.imageUrl} onChange={handleChange}/>
    <button type="submit">Modifier</button>
    <button onClick={changeStatusOfCom}>Annuler</button> 
    </form>
  }

  function modifyCom(event) {
    event.preventDefault()
    const formData = new FormData();
    formData.append('image', file);
    formData.append('text', comUpdate.text)
    
    comService.updateCom(formData, com._id)
    .then((res)=>console.log('nice', res))
    .catch((err)=>console.log('boooo', err));
  }

  const ComInDelete = props => {
    return <form onSubmit={comDelete}> 
      <button type="submit">Supprimer</button>
      <button onClick={() => removeCom(com._id)}>Annuler</button> 
  </form>
  }
  function comDelete(event) {
    
    comService.deleteCom(com._id)
    .then((res)=>console.log('good', res))
    .catch((err)=>console.log('bad', err));
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
                      <ComInModification com={com} ></ComInModification> :
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

/**
 * { inModification ? 
                      <ComInModification com={com} ></ComInModification> :
                      <ComInReadOnly></ComInReadOnly>
                  } 
 */

/**
 * com={{text, userId, createdAt, updatedAt, imageUrl, _id}}
                            updateCom={updateCom}
                            deleteCom={deleteCom}
 */

/**
 *       {post.userId === currentUserId ?
      <div>
        <button onClick={changeStatusOfPost}>Modifier</button>
        <button onClick={removePost}>Supprimer</button>
      </div> : null
      } 
 */

