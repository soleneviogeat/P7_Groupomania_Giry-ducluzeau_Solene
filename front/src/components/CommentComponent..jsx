import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import colors from '../utils/colors'
import { ThemeContext } from '../utils/ColorContext'
import postService from '../services/post.service'
import userService from '../services/user.service'


function CommentComponent(props) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    console.log('ici', props);
    const userId = localStorage.getItem("currentUserId");
    console.log(userId);
    userService.getOneUser(JSON.parse(userId))
    .then((res) => {
        //console.log(new Date(props.post.createdAt).toLocaleTimeString());
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
                <div>{`There is a problem fetching the post data - ${error}`}</div>
                )}
                {data &&
                      <div theme={theme} >
                        <div>
                            <p>Commentaire : </p>
                            <input type="text" />
                        </div>
                        <div>
                            <p>Ajouter une image</p>
                            <input type="file" name='image'/>
                        </div>
                        
                        
                        
                       
                    </div>
                }
            </div>
        )}
        </ThemeContext.Consumer>

    
  )
}

export default CommentComponent

