import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import colors from '../utils/colors'
import { ThemeContext } from '../utils/ColorContext'
import postService from '../services/post.service'
import userService from '../services/user.service'
import CreationPost from '../components/CreationPost'
import CommentComponent from './CommentComponent.'
import comService from '../services/com.service'
import { element } from 'prop-types'

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


function PostComponent({post, updatePost, deletePost}) {
  const [userData, setUserData] = useState(null);
  const [comData, setComData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //let commentSectionOpened = false;
  const [isOpened, setIsOpened] = useState(false)
  const [inModification, setInModification] = useState(false)
  const [postUpdate, setPostUpdate] = useState({
    text: post.text,
});

  const [file, setFile] = useState()

  function handleChange(event) {
    setFile(event.target.file)
  }

  const currentUserId = JSON.parse(localStorage.getItem('currentUserId'));

  const openCommentSection = () => {
    setIsOpened(element => !element)
  }

  const changeStatusOfPost = () => {
    setInModification(element => !element)
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

  const DisplayDate = props => {
    const {post} = props;
    const createdAtDate = new Date(post.createdAt).toLocaleDateString();
    const createdAtTime = new Date(post.createdAt).toLocaleTimeString();
    const updatedAtDate = new Date(post.updatedAt).toLocaleDateString();
    const updatedAtTime = new Date(post.updatedAt).toLocaleTimeString();

    if (createdAtDate === updatedAtDate && createdAtTime === updatedAtTime) {
      return <div>
        <Price>{createdAtDate}</Price>
        <Price>{createdAtTime}</Price>
      </div>
    } else {
      return <div>
        <Price>{createdAtDate}</Price>
        <Price>{createdAtTime}</Price>
        <Price>{updatedAtDate}</Price>
        <Price>{updatedAtTime}</Price>
      </div>
    }
  }

  const PostInReadOnly = props => {
    return <div>
      <TitleWrapper>
        <Title>{post.text}</Title>
      </TitleWrapper>
      <img src={`${post.imageUrl}`} alt="" />
      <div>
        <JobTitle>{userData.lastname}</JobTitle>
        <Price>{userData.firstname}</Price>
        <DisplayDate post={post}></DisplayDate>                        
      </div>
      {isOpened? 
      <div>
        <button onClick={openCommentSection}>Annuler</button>
        <CommentComponent postId={post._id} ></CommentComponent>
      </div> :
      <button onClick={openCommentSection}>Commenter</button>
      } 
      {post.userId === currentUserId ?
      <div>
        <button onClick={changeStatusOfPost}>Modifier</button>
        <button>Supprimer</button>
      </div> : null
      }                    
  <ul>

    {comData &&
      comData.map(({ com, imageUrl }) => (
        <li>
          <p>Commentaire : {com}</p>
          <img src={imageUrl} alt="" />
        </li>
        
      ))}
  </ul> 
  </div>
  }


  const PostInModification = props => {
    //const {post} = props;
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
    const formData = new FormData();
    formData.append('image', file);
    formData.append('text', postUpdate.text)

    postService.updatePost(formData, post._id)
    .then((res)=>console.log('nice', res))
    .catch((err)=>console.log('boooo', err));
  }

  const PostInDelete = props => {
      return <div onSubmit={postDelete}>
      <p>Êtes-vous sûr de vouloir supprimer ce post ?</p>
      <button type="submit">Supprimer</button>
      <button onClick={changeStatusOfPost}>Annuler</button> 
    </div>
  }
  function postDelete(event) {
    const formData = new FormData();
    delete postUpdate.text,
    localStorage.clear();

    postService.deletePost(formData, post._id)
    .then((res)=>console.log('good', res))
    .catch((err)=>console.log('bad', err));
  }
 


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
                      <PostInModification post={post}></PostInModification> :
                      <PostInReadOnly></PostInReadOnly>
                  } 
                  < PostInDelete post={post}></PostInDelete>
                </PostDetails>
                }
            </PostWrapper>
        )}
        </ThemeContext.Consumer>

    
  )
}

export default PostComponent

