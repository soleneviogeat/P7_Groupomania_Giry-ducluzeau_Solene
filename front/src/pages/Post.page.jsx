import { useState, useEffect } from 'react'
import postService from '../services/post.service'
import CreationPost from '../components/Post/CreationPost.component'
import PostComponent from '../components/Post/Post.component'

function HomePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [post, updatePost] = useState([]);
  const [com, updateCom] = useState([]);

  const createPost = (childData) => {}
  const deletePost = (childData) => {
    window.location.reload();
  }

  const createCom = (childData) => {}
  const deleteCom = (childData) => {
    window.location.reload();
  }
   
  useEffect(() => {
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
  }, [])


  return (
    <div className="homepage">
        {loading && <div>Chargement des publications...</div>}
        {error && (
          <div>{`Il y a un problème avec la récupération des publications - ${error}`}</div>
        )}
        <CreationPost createPost={createPost}></CreationPost>
        <ul>
          {data &&
            data.map(({ _id, text, userId, createdAt, updatedAt, imageUrl, usersLiked, usersDisliked }) => (
              <li key={_id}>
                <PostComponent
                  post={{text, userId, createdAt, updatedAt, imageUrl, _id, usersLiked, usersDisliked}}
                  updatePost={updatePost}
                  deletePost={deletePost}>
                </PostComponent>
              </li>
            ))}
        </ul>
    </div>
  )
}

export default HomePage