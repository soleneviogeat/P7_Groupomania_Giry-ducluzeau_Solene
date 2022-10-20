import { useState, useEffect } from 'react'
import postService from '../services/post.service'
import CreationPost from '../components/Post/CreationPost.component'
import PostComponent from '../components/Post/Post.component'
import Header from '../components/Header';
import userService from '../services/user.service';

function HomePage() {
  const [data, setData] = useState(null);
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const createPost = (childData) => {}
  const deletePost = (childData) => {    
    getAllPosts();
  }
  
  function getAllPosts() {
    postService.getAllPosts()
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
  }

  function getCurrentUser() {

    userService.getOneUser(JSON.parse(localStorage.getItem('currentUserId')))
    .then((res)=>setUserData(res)) 
  }
  
  useEffect(() => {
    getAllPosts();
    getCurrentUser();
  }, [])


  return (
    <div className="homepage">
      <Header></Header>
        {loading && <div>Chargement des publications...</div>}
        {error && (
          <div>{`Il y a un problème avec la récupération des publications - ${error}`}</div>
        )}
        <h1 className='flex center'>Bienvenue {userData.firstname} {userData.lastname}</h1>

        <CreationPost createPost={createPost}></CreationPost>
        <ul className='margin-page'>
          {data &&
            data.map(({ _id, text, userId, createdAt, updatedAt, imageUrl, usersLiked, usersDisliked }) => (
              <li key={_id}>
                <PostComponent
                  post={{text, userId, createdAt, updatedAt, imageUrl, _id, usersLiked, usersDisliked}}
                  deletePost={deletePost}>
                </PostComponent>
              </li>
            ))}
        </ul>
    </div>
  )
}

export default HomePage