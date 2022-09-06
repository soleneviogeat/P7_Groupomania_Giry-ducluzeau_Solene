import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import colors from '../utils/colors'
import { ThemeContext } from '../utils/context'

const CreatePostWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 90px 0;
  margin: 0 90px;
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
`

const CreatePostDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  color: ${({ theme }) => (theme === 'light' ? colors.dark : 'white')};
`

const CreatePicture = styled.img`
  height: 150px;
  width: 150px;
  border-radius: 75px;
`


function CreatePost() {
  const { id: queryId } = useParams()
  const [postData, setPostData] = useState({})
  useEffect(() => {
    fetch(`http://localhost:8000/post?id=${queryId}`)
      .then((response) => response.json())
      .then((jsonResponse) => {
        setPostData(jsonResponse?.postData)
      })
  }, [queryId])

  const {
    picture,
    name,
  } = postData

  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <CreatePostWrapper theme={theme}>
          <CreatePicture src={picture} alt={name} height={150} width={150} />
          <CreatePostDetails theme={theme}>
            
           
           
          </CreatePostDetails>
        </CreatePostWrapper>
      )}
    </ThemeContext.Consumer>
  )
}

export default CreatePost