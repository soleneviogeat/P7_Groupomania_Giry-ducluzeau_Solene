import React from 'react'
import { useState, useEffect } from 'react'
import postService from '../services/post.service'
import userService from '../services/user.service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function LikeOrDislikePost({postId, userId, usersLiked, usersDisliked}) {

    const [userData, setUserData] = useState(null);
    const [postData, setPostData] = useState(null);
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
    

    function likeByPost() {
        if (currentUsersLiked.includes(currentUserId)) {
            currentUsersLiked.splice(currentUsersLiked.findIndex(currentUserId => userId === currentUserId))
            console.log(currentUsersLiked);
            console.log(currentUserId);
            console.log(currentUsersLiked.findIndex(currentUserId => userId === currentUserId));

            postService.likePost(postId, 0)
            .then((res)=>{
                setCurrentUsersLiked(currentUsersLiked);
                setNumbLikes(currentUsersLiked.length)
            })
            .catch((err)=>console.log('nine', currentUsersDisliked));
        } else {
            currentUsersLiked.push(userId);
            console.log(currentUsersLiked);
            console.log(currentUserId);
            console.log(currentUsersLiked.findIndex(currentUserId => userId === currentUserId));
            postService.likePost(postId, 1)
            .then((res)=>{
                setCurrentUsersLiked(currentUsersLiked);
                setNumbLikes(currentUsersLiked.length)
            })
            .catch((err)=>console.log('pourri', postId));
        }
    }

    function LikeButton(props) {
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


    function dislikeByPost(props) {
        if (currentUsersDisliked.includes(currentUserId)) {
            currentUsersDisliked.splice(currentUsersDisliked.findIndex(currentUserId => userId === currentUserId))
            console.log(currentUsersDisliked.findIndex(currentUserId => userId === currentUserId));

            postService.likePost(postId, 0)
            .then((res)=>{
                console.log('mmmm', res);
                setCurrentUsersDisliked(currentUsersDisliked);
                setNumbDislikes(currentUsersDisliked.length)
            })
            .catch((err)=>console.log('ah', postId));
        } else {
            currentUsersDisliked.push(userId);

            postService.likePost(postId, -1)
            .then((res)=>{
                setCurrentUsersDisliked(currentUsersDisliked);
                setNumbDislikes(currentUsersDisliked.length)
            })
            .catch((err)=>console.log('null', err));
        }        
    }

        
    function DislikeButton(props) {
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
