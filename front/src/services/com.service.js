import httpService from "./http.service";
import axios from 'axios';

class ComService {
    comUrl = 'coms'

    async getAllComsOfOnePost(postId) {
        return httpService.get(this.comUrl + '/' + postId);
    }

    async createCom(post, file) {
        
        const userId = JSON.parse(localStorage.getItem('currentUserId'));
        
        return httpService.post(this.comUrl + '?userId=' + userId, {post, file});
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

export default new ComService()