import React from 'react'
import { useState, useEffect } from 'react'
import postService from '../services/post.service'
import userService from '../services/user.service'


function LikeOrDislikePost({postId, userId, usersLiked, usersDisliked}) {

    const [userData, setUserData] = useState(null);
    const [postData, setPostData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const currentUserId = JSON.parse(localStorage.getItem('currentUserId'));
    const currentPostId = JSON.parse(localStorage.getItem('currentPostId'));

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


    let numbLikes = usersLiked.length;
    

    function likeByPost() {
        if (usersLiked.includes(currentUserId)) {
            usersLiked.splice(usersLiked.findIndex(currentUserId => userId === currentUserId))

            postService.likePost(postId, 0)
            .then((res)=>console.log('yeah', usersLiked))
            .catch((err)=>console.log('nine', usersDisliked));
        } else {
            usersLiked.push(userId);
            console.log('avant postService', userId);

            postService.likePost(postId, 1)
            .then((res)=>console.log('super', postId))
            .catch((err)=>console.log('pourri', postId));
        }
    }

    function LikeButton(props) {
        return (
            <div className="flex" >
              <button onClick={likeByPost} class='likeButton' disabled={usersDisliked.includes(currentUserId)} >
                  Like
              </button>
            <p>{numbLikes}</p>
            </div>
        );
    }


    function dislikeByPost(props) {
        if (usersDisliked.includes(currentUserId)) {
            usersDisliked.splice(usersDisliked.findIndex(currentUserId => userId === currentUserId))

            postService.likePost(postId, 0)
            .then((res)=>console.log('yo', postId))
            .catch((err)=>console.log('ah', postId));
        } else {
            usersDisliked.push(userId);

            postService.likePost(postId, -1)
            .then((res)=>console.log('génial', postId))
            .catch((err)=>console.log('null', err));
        }        
    }

    let numbDislikes = usersDisliked.length
        
    function DislikeButton(props) {
        return (
            <div className="flex" >
                <button onClick={dislikeByPost} class='dislikeButton' disabled={usersLiked.includes(currentUserId)}>
                    Dislike
                </button>
                <p>{ numbDislikes }</p>
            </div>
            );
    }
        

    return (
        <div Name="flex">
            <LikeButton postId={postId} />
            <DislikeButton postId={postId} />   
        </div>
    );
}

export default LikeOrDislikePost
