import React, {useState} from 'react';
import axios from 'axios';
import postService from '../services/post.service';

function CreationPost() {

  const [file, setFile] = useState()
  const [postCreate, setPostCreate] = useState({
    post: "",
});

  function handleChange(event) {
    setFile(event.target.files[0])
  }
  
  function handleSubmit(event) {
    event.preventDefault()
    //const url = 'http://localhost:3000/api/posts/upload';
    const formData = new FormData();
    formData.append('image', file);
    //formData.append('fileName', file.name);
    formData.append('post', postCreate.post)
    /*const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };*/
    postService.createPostFile(formData)
    .then((res)=>console.log('ouiii', res))
    .catch((err)=>console.log('nooon', err));
    /*
   axios.post(url, formData, config).then((response) => {
      //console.log(response.data);
      //const filename = response.data.file.filename;
      postService.createPost(formData, config).then((res)=> {
        console.log('post créé', res);
      }).catch((err)=>console.log('nop', err))

    });
    */

  }

  return (
    <div className="creationPost">
        <form onSubmit={handleSubmit}>
          <h1>Créer un post</h1>
            <input
            type="text"
            name="post"
            id="post"
            placeholder='écrire un post'
            value={postCreate.post}
            onChange={(e) => setPostCreate({
                ...postCreate,
                post: e.target.value
            })}/>
          <input type="file" name='image' onChange={handleChange}/>
          <button type="submit">Upload</button>
        </form>
    </div>
  );
}

export default CreationPost;