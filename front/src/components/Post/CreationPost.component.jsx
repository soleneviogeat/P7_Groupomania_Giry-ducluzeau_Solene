import React, {useState} from 'react';
import postService from '../../services/post.service';
import { StyledButton } from '../../utils/Atoms'

function CreationPost({createPost}) {
  const [file, setFile] = useState()
  const [postCreate, setPostCreate] = useState({
    post: "",
});

  function handleChange(event) {
    setFile(event.target.files[0]);
  }
  
  function handleSubmit(event) {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('text', postCreate.text)

    postService.createPostFile(formData)
    .then((res)=>createPost(true))
  }

  return (
    <div className="creationPost margin-page">
        <form onSubmit={handleSubmit} className="formCreationPost">
          <h1>Exprimez-vous...</h1>
          <input className='inputFileCreationPost'
          type="text"
          name="text"
          id="post"
          placeholder='Ajouter un texte'
          value={postCreate.text}
          onChange={(e) => setPostCreate({
              ...postCreate,
              text: e.target.value
          })}/>
          <div className='buttonCreationPost'>
            <input type="file" onChange={handleChange}/>
            <StyledButton type="submit">Publier</StyledButton>
          </div>
        </form>
    </div>
  );
}

export default CreationPost