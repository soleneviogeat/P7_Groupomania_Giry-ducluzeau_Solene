import httpService from "./http.service";
import axios from 'axios';

class PostService {
    postUrl = 'posts'

    async getAllPosts() {
        return httpService.get(this.postUrl);
    }

    async createPost(post, file) {
        const userId = JSON.parse(localStorage.getItem('currentUserId'));
        return httpService.post(this.postUrl + '?userId=' + userId, {post, file});
    }

    async createPostFile(formData) {
        const userId = JSON.parse(localStorage.getItem('currentUserId'));
        const url = "http://localhost:3000/api/posts?userId=" + userId;
        const token = JSON.parse(localStorage.getItem('token'));
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
              'content-type': 'multipart/form-data',
            },
          };
        return axios.post(url, formData, config);
    }

    async updatePost(formData, postId) {
      const userId = JSON.parse(localStorage.getItem('currentUserId'));
      const url = "http://localhost:3000/api/" + this.postUrl + '/' + postId + '?userId=' + userId;
      const token = JSON.parse(localStorage.getItem('token'));
      const config = {
          headers: {
              Authorization: `Bearer ${token}`,
            'content-type': 'multipart/form-data',
          },
        };
        return axios.put(url, formData, config);
    }

    async deletePost(postId) {
      const userId = JSON.parse(localStorage.getItem('currentUserId'));      
      return httpService.delete(this.postUrl + '/' + postId + '?userId=' + userId);
    }


    async likePost(postId, like) {
      const userId = JSON.parse(localStorage.getItem('currentUserId'));
      return httpService.post(this.postUrl + '/' + postId + '/like', {userId, like});
    }

}

export default new PostService()