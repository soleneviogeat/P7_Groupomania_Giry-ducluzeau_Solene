import React from 'react'
import { useState, useEffect } from 'react'
import postService from '../services/post.service'
import userService from '../services/user.service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function LikeOrDislikePost({postId, userId, usersLiked, usersDisliked}) {

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentUsersLiked, setCurrentUsersLiked] = useState(usersLiked);
    const [currentUsersDisliked, setCurrentUsersDisliked] = useState(usersDisliked);
    const [numbLikes, setNumbLikes] = useState(currentUsersLiked.length);
    const [numbDislikes, setNumbDislikes] = useState(currentUsersDisliked.length);

    const currentUserId = JSON.parse(localStorage.getItem('currentUserId'));

    useEffect(() => {
        userService.getOneUser(userId)
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
    }, []);
    

    //Gestion des likes sur les posts
    function likeByPost() {
        let code = 0
        if (!currentUsersLiked.includes(currentUserId)) {
            code = 1;
        } 
        postService.likePost(postId, code)
        .then((res)=>{
            setCurrentUsersLiked(res.post.usersLiked);
            setNumbLikes(res.post.likes)
        })
    }

    //Bouton "like"
    function LikeButton() {
        return (
            <div className="flex" >
              <button 
              onClick={likeByPost}
              className='likeButton' 
              disabled={currentUsersDisliked.includes(currentUserId)} >
                <FontAwesomeIcon icon="fa-solid fa-thumbs-up" />
              </button>
            <p>{numbLikes}</p>
            </div>
        );
    }

    //Gestion des dislikes sur les posts
    function dislikeByPost() {
        let code = 0
        if (!currentUsersDisliked.includes(currentUserId)) {
            code = -1;
        }       
        postService.likePost(postId, code)
        .then((res)=>{
            setCurrentUsersDisliked(res.post.usersDisliked);
            setNumbDislikes(res.post.dislikes)
        })
    }

    //Bouton "dislike"
    function DislikeButton() {
        return (
            <div className="flex" >
                <button 
                onClick={dislikeByPost} 
                className='dislikeButton' 
                disabled={currentUsersLiked.includes(currentUserId)}>
                    <FontAwesomeIcon icon="fa-solid fa-thumbs-down" />
                </button>
                <p>{ numbDislikes }</p>
            </div>
            );
    }
        

    return (
        <div className="flex">
            <LikeButton postId={postId} />
            <DislikeButton postId={postId} />   
        </div>
    );
}

export default LikeOrDislikePost
