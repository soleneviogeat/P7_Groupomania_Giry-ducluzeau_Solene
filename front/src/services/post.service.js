import httpService from "./http.service";
import axios from 'axios';

class PostService {
    postUrl = 'posts'

    async getAllPosts() {
        return httpService.get(this.postUrl);
    }

    async createPost(post, file) {
        console.log('b');
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
        return axios.post(url, formData, config).then((response) => {
            console.log(response.data);
            //const filename = response.data.file.filename;
          });
    }


}

export default new PostService()