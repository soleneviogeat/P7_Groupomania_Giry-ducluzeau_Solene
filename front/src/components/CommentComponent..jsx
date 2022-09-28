import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import colors from '../utils/colors'
import { ThemeContext } from '../utils/ColorContext'
import userService from '../services/user.service'
import comService from '../services/com.service'


const Price = styled.span`
  padding-top: 10px;
  font-weight: 500;
  font-size: 20px;
`


function CommentComponent(props) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [file, setFile] = useState()
  const [comCreate, setComCreate] = useState({
    com: "",
});

function handleChange(event) {
  setFile(event.target.files[0])
}

function handleSubmit(event) {
  event.preventDefault()
  const formData = new FormData();
  formData.append('image', file);
  formData.append('com', comCreate.com)
  formData.append('postId', props.postId)

  comService.createComFile(formData)
  .then((res)=>console.log('ouiii', res))
  .catch((err)=>console.log('nooon', err));
}


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
  

  function createdAtDate(props) {
    return new Date(props.post.createdAt).toLocaleDateString();
  }
  
  function createdAtTime(props) {
    return new Date(props.post.createdAt).toLocaleTimeString();
  } 

  function updatedAtDate(props) {
    return new Date(props.post.updateAt).toLocaleDateString();
  } 

  function updatedAtTime(props) {
    return new Date(props.post.updateAt).toLocaleTimeString();
  };


  if (updatedAtDate == null && updatedAtTime == null) {
    return createdAtDate();
  };



  return (
        <ThemeContext.Consumer key={props.id}>
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
                          value={comCreate.com }
                          onChange={(e) => setComCreate({
                              ...comCreate,
                              com: e.target.value
                          })}/>
                        <input type="file" name='image' onChange={handleChange}/>
                        
                        <button type="submit">Upload</button>
                      </form>
                    </div>
                }
            </div>
        )}
        </ThemeContext.Consumer>
  )
}

export default CommentComponent

/*{data && 
                      <div theme={theme} >
                        
                        <h1>{props.com}</h1>
                        
                        <img src={`${props.imageUrl}`} alt="" />
                        <div>
                          
                          <Price>{data.lastname}</Price>
                          <Price>{data.firstname}</Price>
                          <Price>{createdAtDate}</Price>
                          <Price>{createdAtTime}</Price>
                          <Price>{updatedAtDate}</Price>
                          <Price>{updatedAtTime}</Price>
                        </div>
                      </div>
                }*/

