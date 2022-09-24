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


function PostComponent(props) {
  const [userData, setUserData] = useState(null);
  const [comData, setComData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //let commentSectionOpened = false;
  const [isOpened, setIsOpened] = useState(false)

  const openCommentSection = () => {
    setIsOpened(element => !element)
  }

  useEffect(() => {
    console.log(props);
    userService.getOneUser(props.post.userId)
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
    comService.getAllComsOfOnePost(props.post._id)
    .then((res) => {
      console.log('lzzzzz', res);
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
            <PostWrapper theme={theme}>
                {loading && <div>Chargement de la publication...</div>}
                {error && (
                <div>{`There is a problem fetching the post data - ${error}`}</div>
                )}
                {userData && 
                      <PostDetails theme={theme} >
                        <TitleWrapper>
                          <Title>{props.post.post}</Title>
                        </TitleWrapper>
                        <img src={`${props.post.imageUrl}`} alt="" />
                        <div>
                          
                          <JobTitle>{userData.lastname}</JobTitle>
                          <Price>{userData.firstname}</Price>
                          

                        </div>
                        <button onClick={openCommentSection}>Commenter</button>
                        <ul>
                      {comData &&
                        comData.map(({ com, imageUrl }) => (
                          <li>
                            <p>Commentaire : {com}</p>
                            <img src={imageUrl} alt="" />
                          </li>
                          
                        ))}
                    </ul>
                       {isOpened? <CommentComponent comment={props.post._id}></CommentComponent> : null
                        } 
                        
                    </PostDetails>
                }
            </PostWrapper>
        )}
        </ThemeContext.Consumer>

    
  )
}

export default PostComponent

/**
 * <Price>{createdAtDate}</Price>
                        <Price>{createdAtTime}</Price>
                        <Price>{updatedAtDate}</Price>
                        <Price>{updatedAtTime}</Price>
 */