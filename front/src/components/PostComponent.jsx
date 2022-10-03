import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import colors from '../utils/colors'
import { ThemeContext } from '../utils/ColorContext'
import postService from '../services/post.service'
import userService from '../services/user.service'
import CreationPost from '../components/CreationPost'
import CreationComment from './CreationComment'
import comService from '../services/com.service'
import CommentComponent from './CommentComponent'


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


function PostComponent({post, updatePost, deletePost, com, updateCom, deleteCom}) {
  const [userData, setUserData] = useState(null);
  const [comData, setComData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isOpened, setIsOpened] = useState(false)
  const [inModification, setInModification] = useState(false)
  const [inDelete, setInDelete] = useState(true)
  const [postUpdate, setPostUpdate] = useState({
    text: post.text,
  });

  const [file, setFile] = useState()

  function handleChange(event) {
    setFile(event.target.files[0])
    const formData = new FormData();
    formData.append('image', file);
  }

  const currentUserId = JSON.parse(localStorage.getItem('currentUserId'));

  const openCommentSection = () => {
    setIsOpened(element => !element)
  }

  const changeStatusOfPost = () => {
    setInModification(element => !element)
  }

  /*const changeStatusOfCom = () => {
    setInModification(element => !element)
  }*/

  const removePost = () => {
    const alertDelete = window.confirm("Voulez-vous supprimer définitivement ce post ?");
    if (alertDelete) {
      postDelete();
      deletePost(true);
     }
  }

  /*const removeCom = () => {
    const alertDeleteCom = window.confirm("Voulez-vous supprimer définitivement ce commentaire ?");
    if (alertDeleteCom) {
      comDelete();
      deleteCom(true);
     }
  }*/

  useEffect(() => {
    userService.getOneUser(post.userId)
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
    
    comService.getAllComsOfOnePost(post._id)
    .then((res) => {
      console.log(res);
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

  const DisplayDatePost = props => {
    const {post} = props;
    const createdAtDatePost = new Date(post.createdAt).toLocaleDateString();
    const createdAtTimePost = new Date(post.createdAt).toLocaleTimeString();
    const updatedAtDatePost = new Date(post.updatedAt).toLocaleDateString();
    const updatedAtTimePost = new Date(post.updatedAt).toLocaleTimeString();

    if (createdAtDatePost === updatedAtDatePost && createdAtTimePost === updatedAtTimePost) {
      return <div>
        <Price>{createdAtDatePost}</Price>
        <Price>{createdAtTimePost}</Price>
      </div>
    } else {
      return <div>
        <Price>{createdAtDatePost}</Price>
        <Price>{createdAtTimePost}</Price>
        <Price>{updatedAtDatePost}</Price>
        <Price>{updatedAtTimePost}</Price>
      </div>
    }
  }

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
  }*/

  const PostInReadOnly = props => {
    return <div>
      <div>
        <JobTitle>{userData.lastname}</JobTitle>
        <Price>{userData.firstname}</Price>
        <DisplayDatePost post={post}></DisplayDatePost> 
        <TitleWrapper>
          <Title>{post.text}</Title>
        </TitleWrapper>
        <img src={`${post.imageUrl}`} alt="" />
      </div>         
      
      {isOpened? 
      <div>
        <button onClick={openCommentSection}>Annuler</button>
        <CreationComment postId={post._id} ></CreationComment>
      </div> :
      <button onClick={openCommentSection}>Commenter</button>
      } 
      {post.userId === currentUserId ?
      <div>
        <button onClick={changeStatusOfPost}>Modifier</button>
        <button onClick={removePost}>Supprimer</button>
      </div> : null
      }                    
    <ul>
      {comData &&
        comData.map(({ _id, text, userId, createdAt, updatedAt, imageUrl }) => (
          <li>
          <CommentComponent
            com={{text, userId, createdAt, updatedAt, imageUrl, _id}}
            updateCom={updatePost}
            deleteCom={deletePost}>
          </CommentComponent>
        </li>
        ))}                                                  
    </ul> 
  </div>
  }


  const PostInModification = props => {
    return <form onSubmit={modifyPost}>
    <input autoFocus
        type="text"
        name="text"
        id="post"
        value= {postUpdate.text}
        onChange={(e) => setPostUpdate({
            ...postUpdate,
            text: e.target.value
        })}/>
    <input type="file" name='image' onChange={handleChange}/>
    <button type="submit">Modifier</button>
    <button onClick={changeStatusOfPost}>Annuler</button> 
    </form>
  }

  function modifyPost(event) {
    event.preventDefault()
    const formData = new FormData();
    formData.append('image', file);
    formData.append('text', postUpdate.text)
console.log(post.imageUrl);
    postService.updatePost(formData, post._id)
    .then((res)=>console.log('nice', res))
    .catch((err)=>console.log('boooo', err));
  }

  const PostInDelete = props => {
      return <form onSubmit={postDelete}> 
        <button type="submit">Supprimer</button>
        <button onClick={() => removePost(post._id)}>Annuler</button> 
    </form>
  }
  function postDelete(event) {
    
    postService.deletePost(post._id)
    .then((res)=>console.log('good', res))
    .catch((err)=>console.log('bad', err));
  }


  /*const ComInDelete = props => {
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
        <ThemeContext.Consumer key={post._id}>
        {({ theme }) => (
            <PostWrapper theme={theme}>
                {loading && <div>Chargement de la publication...</div>}
                {error && (
                <div>{`There is a problem fetching the post data - ${error}`}</div>
                )}
                {userData && 
                <PostDetails theme={theme} >
                  { inModification ? 
                      <PostInModification post={post} ></PostInModification> :
                      <PostInReadOnly></PostInReadOnly>
                  }  
                </PostDetails>
                }
            </PostWrapper>
        )}
        </ThemeContext.Consumer>

    
  )
}

export default PostComponent

/**{ inDelete ? 
                      < PostInDelete post={post}></PostInDelete> :
                      null
                  } */

