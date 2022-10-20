import { useState, useEffect } from 'react'
import { ThemeContext } from '../../utils/ColorContext'
import userService from '../../services/user.service'
import comService from '../../services/commment.service'
import { StyledButton } from '../../utils/Atoms'


function CreationComment(com, commentCreated, updateCom, deleteCom) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [file, setFile] = useState()
  const [comCreate, setComCreate] = useState({
    text: "",
});

function handleChange(event) {
  setFile(event.target.files[0])
}

function handleSubmit(event) {
  
  const formData = new FormData();
  formData.append('image', file);
  formData.append('text', comCreate.text)
  formData.append('postId', com.postId)
  comService.createComFile(formData)
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



  return (
        <ThemeContext.Consumer key={com._id}>
        {({ theme }) => (
            <div theme={theme}>
                {loading && <div>Chargement de la section commentaire...</div>}
                {error && (
                <div>{`There is a problem fetching the com data - ${error}`}</div>
                )}
                {data &&
                      <div theme={theme} className='creationPost' >
                        <h1 className='titleCom'>Commentez...</h1>
                        <form onSubmit={handleSubmit} className="formCreationPost padding-2">
                          <input 
                          className='inputFileCreationPost'
                          type="text"
                          name="com"
                          id="com"
                          placeholder='Ecrire un commentaire'
                          value={ comCreate.text }
                          onChange={(e) => setComCreate({
                              ...comCreate,
                              text: e.target.value
                          })}/>
                        <div className='buttonCreationPost'>
                          <input type="file" name='image' onChange={handleChange}/>
                          <StyledButton type="submit">Publier</StyledButton>
                        </div>
                      </form>
                    </div>
                }
            </div>
        )}
        </ThemeContext.Consumer>
  )
}

export default CreationComment



