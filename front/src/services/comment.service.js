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

    async createComFile(formData) {
        const userId = JSON.parse(localStorage.getItem('currentUserId'));
        const url = "http://localhost:3000/api/coms?userId=" + userId;
        const token = JSON.parse(localStorage.getItem('token'));
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
              'content-type': 'multipart/form-data',
            },
          };
        return axios.post(url, formData, config).then((response) => {
            console.log(response.data);
          });
    }

    async updateCom(formData, comId) {
      const userId = JSON.parse(localStorage.getItem('currentUserId'));
      const url = "http://localhost:3000/api/" + this.comUrl + '/' + comId + '?userId=' + userId;
      const token = JSON.parse(localStorage.getItem('token'));
      const config = {
          headers: {
              Authorization: `Bearer ${token}`,
            'content-type': 'multipart/form-data',
          },
        };
        return axios.put(url, formData, config);
    }


    async deleteCom(comId) {
      const userId = JSON.parse(localStorage.getItem('currentUserId'));      
      return httpService.delete(this.comUrl + '/' + comId + '?userId=' + userId);
    }
}

export default new ComService()