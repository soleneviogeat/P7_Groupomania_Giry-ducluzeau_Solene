class UserService {
    apiUrl = "http://localhost:3000/api/";
    
    async login(email, password) {
        const body = {
            email,
            password
        };
        return fetch(this.apiUrl + 'auth/login', {
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
        return fetch(this.apiUrl + 'auth/signup', {
            method: "POST",
            body: JSON.stringify(user),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        .then((res) => {
            if (res.ok === true) {
                return res.json()
            }
        })
        .then((signUpRes) => {
            const object = {
                user: signUpRes,
                pass: user
            }
            console.log(signUpRes);
            localStorage.setItem("currentUserId", JSON.stringify(signUpRes.id));
            return object;
        })
        .catch((err) => {
            console.error(err);
        });
    }

    async getAllUser() {
        const token = JSON.parse(localStorage.getItem('token'));
        return fetch(this.apiUrl + 'users', {
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

}
export default new UserService();