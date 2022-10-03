import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import colors from '../utils/colors'
import { ThemeContext } from '../utils/ColorContext'
import userService from '../services/user.service'
import comService from '../services/com.service'


const Price = styled.span`
  padding-top: 10px;
  font-weight: 500;
  font-size: 20px;
`
const JobTitle = styled.h2`
  padding-top: 10px;
  font-size: 20px;
  margin: 0;
  font-weight: 500;
`


function CreationComment(com, updateCom, deleteCom) {
  const [userData, setUserData] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [file, setFile] = useState()
  const [comCreate, setComCreate] = useState({
    text: "",
});
/*const [inModification, setInModification] = useState(false)
const [inDelete, setInDelete] = useState(true)

const currentUserId = JSON.parse(localStorage.getItem('currentUserId'));*/

function handleChange(event) {
  setFile(event.target.files[0])
}

function handleSubmit(event) {
  
  const formData = new FormData();
  formData.append('image', file);
  formData.append('text', comCreate.text)
  formData.append('postId', com.postId)

  comService.createComFile(formData)
  .then((res)=>console.log('ouiii', res))
  .catch((err)=>console.log('nooon', err));
}

/*const changeStatusOfCom = () => {
  setInModification(element => !element)
}

const removeCom = () => {
  const alertDelete = window.confirm("Voulez-vous supprimer définitivement ce commentaire ?");
  if (alertDelete) {
    comDelete();
    deleteCom(true);
   }
}*/

  useEffect(() => {
    const userId = localStorage.getItem("currentUserId");
    userService.getOneUser(JSON.parse(userId))
    .then((res) => {
      setData(res);
      setError(null);
    })
    .catch((err) => {
      setError(err.message);
      setData(null);
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);


  /*const DisplayDateCom = props => {
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
    <p>{com.text}</p>
    <img src={`${com.imageUrl}`} alt="" />
    <div>
      <p>{userData.lastname}</p>
      <Price>{userData.firstname}</Price>
      <DisplayDateCom com={com}></DisplayDateCom>                        
    </div>


  </div>
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
}*/


  return (
        <ThemeContext.Consumer key={com._id}>
        {({ theme }) => (
            <div theme={theme}>
                {loading && <div>Chargement de la section commentaire...</div>}
                {error && (
                <div>{`There is a problem fetching the com data - ${error}`}</div>
                )}
                {data &&
                      <div theme={theme} >
                        <form onSubmit={handleSubmit}>
                          

                          <input
                          type="text"
                          name="com"
                          id="com"
                          placeholder='écrire un commentaire'
                          value={ comCreate.text }
                          onChange={(e) => setComCreate({
                              ...comCreate,
                              text: e.target.value
                          })}/>
                        <input type="file" name='image' onChange={handleChange}/>
                        
                        <button type="submit">Envoyer</button>
                      </form>
 
                    </div>
                }
            </div>
        )}
        </ThemeContext.Consumer>
  )
}

export default CreationComment



