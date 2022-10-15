import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import colors from '../../utils/colors'
import { ThemeContext } from '../../utils/ColorContext'
import postService from '../../services/post.service'
import userService from '../../services/user.service'
import CreationPost from './CreationPost.component'
import CreationComment from '../Comment/CreationComment.component'
import comService from '../../services/commment.service'
import CommentComponent from '../Comment/Comment.component'
import LikeOrDislikePost from '../LikeOrDislike.component'


const PostWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 2rem 0;
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
`

const PostDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: ${({ theme }) => (theme === 'light' ? colors.dark : 'white')};
`

const Picture = styled.img`
  max-height: 400px;
  border-radius: 0 15px 15px 0;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
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
  padding: 1em;
`


function PostComponent({post, updatePost, deletePost, com, updateCom, deleteCom}) {
  const [userData, setUserData] = useState(null);
  const [comData, setComData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isOpened, setIsOpened] = useState(false)
  const [inModification, setInModification] = useState(false)
  const [currentPost, setCurrentPost] = useState(post);
  const [postUpdate, setPostUpdate] = useState({
    text: post.text,
  });

  const [file, setFile] = useState()

  function handleChange(event) {
    setFile(event.target.files[0])
  }

  const currentUserId = JSON.parse(localStorage.getItem('currentUserId'));
  const openCommentSection = () => {setIsOpened(element => !element)}
  const changeStatusOfPost = () => {setInModification(element => !element)}

  const removePost = () => {
    const alertDelete = window.confirm("Voulez-vous supprimer définitivement ce post ?");
    if (alertDelete) {
      postDelete();
      deletePost(true);
     }
  }

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
      return <div className="flex">
          <p>le </p>
          <p>{createdAtDatePost}</p>
          <p> à </p>
          <p>{createdAtTimePost}</p>
      </div>
    } else {
      return <div className="flex">
            <p>le </p>
            <p>{createdAtDatePost}</p>
            <p> à </p>
            <p>{createdAtTimePost}</p>
            <p>, modifié le </p>
            <p>{updatedAtDatePost}</p>
            <p> à </p>
            <p>{updatedAtTimePost}</p>
      </div>
    }
  }

  const PostInReadOnly = props => {
    return <div>
      <div className="flex space-between">
        <div className="flex column w-100">
          <div className="flex column center">
            <div className="flex">
              <p>Créé par </p>
              <p><strong>{userData.firstname}</strong></p>
              <p><strong>{userData.lastname}</strong></p>
              <DisplayDatePost post={currentPost}></DisplayDatePost> 
            </div>
            <TitleWrapper>
              <Title>{currentPost.text}</Title>
            </TitleWrapper>
          </div>
          <div className="flex space-around">
            <LikeOrDislikePost
              postId={currentPost._id}
              userId={userData._id}
              usersLiked={currentPost.usersLiked}
              usersDisliked={currentPost.usersDisliked} />
            {isOpened? 
              <div>
                <button onClick={openCommentSection}>Annuler</button>
                <CreationComment postId={currentPost._id} ></CreationComment>
              </div> :
              <button onClick={openCommentSection}>Commenter</button>
            } 
            {post.userId === currentUserId ?
              <div className="flex">
                <button onClick={changeStatusOfPost}>Modifier</button>
                <button onClick={removePost}>Supprimer</button>
              </div> : null
              }
          </div>
        </div>   
        <Picture src={`${currentPost.imageUrl}`} alt=""></Picture>
      </div>
      
                
    <ul>
      {comData &&
        comData.map(({ _id, text, userId, createdAt, updatedAt, imageUrl }) => (
          <li key={_id}>
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
      <h1>Modifier la publication</h1>
    <input autoFocus
        type="text"
        name="text"
        id="post"
        value= {currentPost.text}
        onChange={(e) => setCurrentPost({
            ...currentPost,
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
    formData.append('text', currentPost.text)
    postService.updatePost(formData, post._id)
    .then((res)=>changeStatusOfPost())
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
 

  return (
        <ThemeContext.Consumer key={post._id}>
        {({ theme }) => (
            <PostWrapper theme={theme} className="card">
                {loading && <div>Chargement de la publication...</div>}
                {error && (
                <div>{`There is a problem fetching the post data - ${error}`}</div>
                )}
                {userData && 
                <PostDetails theme={theme} >
                  { inModification ? 
                      <PostInModification post={currentPost} ></PostInModification> :
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

