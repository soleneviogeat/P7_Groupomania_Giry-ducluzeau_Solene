import { useState, useEffect } from 'react'
import styled from 'styled-components'
import colors from '../../utils/colors'
import { ThemeContext } from '../../utils/ColorContext'
import postService from '../../services/post.service'
import userService from '../../services/user.service'
import CreationComment from '../Comment/CreationComment.component'
import comService from '../../services/commment.service'
import CommentComponent from '../Comment/Comment.component'
import LikeOrDislikePost from '../LikeOrDislike.component'
import { StyledButton } from '../../utils/Atoms'


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
  max-height: 30em;
  width: 100%;
  object-fit: cover;
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
  const [postUser, setPostUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [comData, setComData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isOpened, setIsOpened] = useState(false)
  const [inModification, setInModification] = useState(false)
  const [currentPost, setCurrentPost] = useState(post);

  const [file, setFile] = useState()

  function handleChange(event) {
    setFile(event.target.files[0])
  }

  const currentUserId = JSON.parse(localStorage.getItem('currentUserId'));
  const openCommentSection = () => {setIsOpened(element => !element)}
  const changeStatusOfPost = () => {setInModification(element => !element)}
  const commentCreated = () => {getAllcommentOfThePost()}


  function getAllcommentOfThePost() {
    comService.getAllComsOfOnePost(post._id)
    .then((res) => {
      setComData(res);
      setError(null)
    }).catch((err) => {
      setError(err.message);
      setPostUser(null);
    })
    .finally(() => {
      setLoading(false);
    });
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

    userService.getOneUser(post.userId)
    .then((res) => {
      setPostUser(res);
      setError(null);
    })
    .catch((err) => {
      setError(err.message);
      setPostUser(null);
    })
    .finally(() => {
      setLoading(false);
    });
    
    getAllcommentOfThePost();

  }, []);

  //Gestion des dates de création et de modification des posts
  const InfosPost = props => {
    const {post} = props;
    const createdAtDatePost = new Date(post.createdAt).toLocaleDateString();
    const createdAtTimePost = new Date(post.createdAt).toLocaleTimeString();
    const updatedAtDatePost = new Date(currentPost.updatedAt).toLocaleDateString();
    const updatedAtTimePost = new Date(currentPost.updatedAt).toLocaleTimeString();

    if (createdAtDatePost === updatedAtDatePost && createdAtTimePost === updatedAtTimePost) {
      return <div className="infosPost">
        <div className='flex start'>
            <p>Créé par </p>
            <p><strong>{postUser.firstname}</strong></p>
            <p><strong>{postUser.lastname}</strong></p>
          </div>
          <div className='flex start'>
            <p>le </p>
            <p>{createdAtDatePost}</p>
            <p> à </p>
            <p>{createdAtTimePost}</p>
          </div>
      </div>
    } else {
      return <div className="infosPost">
        <div className='flex start'>
            <p>Créé par </p>
            <p><strong>{postUser.firstname}</strong></p>
            <p><strong>{postUser.lastname}</strong></p>
        </div>
        <div className='flex start'>
            <p>le </p>
            <p>{createdAtDatePost}</p>
            <p> à </p>
            <p>{createdAtTimePost}</p>
        </div>
        <div className='flex start'>
          <p>Modifié le </p>
          <p>{updatedAtDatePost}</p>
          <p> à </p>
          <p>{updatedAtTimePost}</p>
        </div>
      </div>
    }
  }

  //Visualiation d'un post
  const PostInReadOnly = props => {
    return <div>
      <div className="flex column">
        <div className="flex start padding-1">
          <InfosPost post={currentPost}></InfosPost> 
        </div>
        <TitleWrapper>
          <Title>{currentPost.text}</Title>
        </TitleWrapper>
        <Picture src={`${currentPost.imageUrl}`} alt="" className='w-50'></Picture>
      </div>
      <div className="flex space-between postSection">
        <LikeOrDislikePost
          postId={currentPost._id}
          userId={postUser._id}
          usersLiked={currentPost.usersLiked}
          usersDisliked={currentPost.usersDisliked} />
        {post.userId === currentUserId || (currentUser && currentUser.isAdmin === true) ?
          <div className="flex">
            <button className='buttonUser' onClick={changeStatusOfPost}>Modifier</button>
            <button className='buttonUser' onClick={removePost}>Supprimer</button>
          </div> : null
          }
      </div>
      
      <div className='commentSection'>
        <p>Commentaires</p>
        <ul>
          <div className="flex start column">
            {comData &&
              comData.map(({ _id, text, userId, createdAt, updatedAt, imageUrl }) => (
                <li key={_id} className="margin-comment">
                <CommentComponent
                  com={{text, userId, createdAt, updatedAt, imageUrl, _id}}
                  updateCom={updatePost}
                  deleteCom={deletePost}>
                </CommentComponent>
                </li>
              ))}     
          </div>                                          
        </ul> 
        <div className='commentCreatSection'>
          {isOpened? 
            <div className='commentOpen flex column'>
              <CreationComment postId={currentPost._id} commentCreated={commentCreated}></CreationComment>
              <StyledButton onClick={openCommentSection}>Annuler</StyledButton>
            </div> :
            <StyledButton onClick={openCommentSection}>Commenter</StyledButton>
          } 
        </div>
      </div>
  </div>
  }

  //Modification d'un post
  const PostInModification = props => {
    return <form onSubmit={modifyPost} className="padding-2 formCreationPost">
      <h1>Modification de la publication</h1>
    <input autoFocus
      className='inputFileCreationPost'
      type="text"
      name="text"
      id="post"
      value= {currentPost.text}
      onChange={(e) => setCurrentPost({
          ...currentPost,
          text: e.target.value,
          updatedAt: new Date()
      })}/>
    <div className='buttonCreationPost'>
      <input type="file" name='image' onChange={handleChange}/>
      <StyledButton type="submit">Modifier</StyledButton>
      <StyledButton onClick={changeStatusOfPost}>Annuler</StyledButton> 
    </div>
    </form>
  }

  function modifyPost(event) {
    event.preventDefault()
    const formData = new FormData();
    formData.append('image', file);
    formData.append('text', currentPost.text)
    
    postService.updatePost(formData, post._id)
    .then((res)=>{
      changeStatusOfPost();
    })    
  }

  //Suppression d'un post
  const removePost = () => {
    const alertDelete = window.confirm("Voulez-vous supprimer définitivement ce post ?");
    if (alertDelete) {
      postDelete();
     }
  }

  function postDelete(event) {
    postService.deletePost(post._id)
    .then((res)=>deletePost(true))
  }
 

  return (
        <ThemeContext.Consumer key={post._id}>
        {({ theme }) => (
            <PostWrapper theme={theme} className="card">
                {loading && <div>Chargement de la publication...</div>}
                {error && (
                <div>{`There is a problem fetching the post data - ${error}`}</div>
                )}
                {postUser && 
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



