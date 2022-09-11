import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import colors from '../utils/colors'
import { ThemeContext } from '../utils/ColorContext'
import postService from '../services/post.service'
import userService from '../services/user.service'
import CreationPost from '../components/CreationPost'

const PostWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 90px 0;
  margin: 0 90px;
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
`

const PostDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  color: ${({ theme }) => (theme === 'light' ? colors.dark : 'white')};
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


function Post(props) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const createdAtDate = new Date(props.post.createdAt).toLocaleDateString();
  const createdAtTime = new Date(props.post.createdAt).toLocaleTimeString();
  let updatedAtDate = new Date(props.post.updateAt).toLocaleDateString();
  let updatedAtTime = new Date(props.post.updateAt).toLocaleTimeString();


  /*if (updatedAtDate == null && updatedAtTime == null) {
    delete updatedAtDate;
  }*/

  useEffect(() => {
    console.log(props);
    userService.getOneUser(props.post.userId).then((res) => {
        console.log(new Date(props.post.createdAt).toLocaleTimeString());
      setData(res);
      setError(null);
    }).catch((err) => {
      setError(err.message);
      setData(null);
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);


  return (
        <ThemeContext.Consumer>
        {({ theme }) => (
            <PostWrapper theme={theme}>
                {loading && <div>A moment please...</div>}
                {error && (
                <div>{`There is a problem fetching the post data - ${error}`}</div>
                )}
                {data &&
                        <PostDetails theme={theme}>
                        <TitleWrapper>
                        <Title>{props.post.post}</Title>
                        </TitleWrapper>
                        <JobTitle>{data.lastname}</JobTitle>
                        <Price>{data.firstname}</Price>
                        <Price>{createdAtDate}</Price>
                        <Price>{createdAtTime}</Price>
                        <Price>{updatedAtDate}</Price>
                        <Price>{updatedAtTime}</Price>
                        updatedAt
                    </PostDetails>
                }
            </PostWrapper>
        )}
        </ThemeContext.Consumer>

    
  )
}

export default Post