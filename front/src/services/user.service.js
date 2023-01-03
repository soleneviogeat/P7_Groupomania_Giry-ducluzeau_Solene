import httpService from "./http.service";
class UserService {
    apiUrl = "http://localhost:3000/api/";
    
    async login(email, password) {
        const body = {
            email,
            password
        };
        return fetch(this.apiUrl + 'auth/presentation', {
            method: "POST",
            body: JSON.stringify(body),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        .then((res) => {
            if (res.ok === true) {
                return res.json()
            }
        })
        .then((res) => {
            localStorage.setItem("currentUserId", JSON.stringify(res.userId));
            localStorage.setItem("token", JSON.stringify(res.token));
            return res.userId;
        })
        .catch(() => {
            alert("Identifiants de connexion erronés")
        });
    }

    async signup(user) {
        return fetch(this.apiUrl + 'auth/services', {
            method: "POST",
            body: JSON.stringify(user),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        .then((res) => {
            if (res.ok === true) {
                return res.json()
            }
        })
        .then(() => {
            return this.login(user.email, user.password)
        })
        .catch((err) => {
            console.error(err);
        });
    }

    async getAllUser() {
        const token = JSON.parse(localStorage.getItem('token'));
        return fetch(this.apiUrl + 'auth/users', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": "application/json; charset=UTF-8",
            }
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .catch((err) => this.handleError(err));
    }

    async getOneUser(id) {
        const token = JSON.parse(localStorage.getItem('token'));
        return fetch(this.apiUrl + 'auth/users/' + id, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": "application/json; charset=UTF-8",
            }
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .catch((err) => this.handleError(err));
    }

    async deleteUser(userId) {    
        return httpService.delete('auth/?userId=' + userId);
      }

      async changeToAdmin(userId) {     
        return httpService.put('auth/changeToAdmin/' + userId);
      }

}
export default new UserService();