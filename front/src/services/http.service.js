class HttpService {
    apiUrl = "http://localhost:3000/api/";
    currentUserId = localStorage.getItem('currentUserId');

    async handleError(error) {
        console.error('handleError', error);
    }

    async get(route) {
        const token = JSON.parse(localStorage.getItem('token'));
        return fetch(this.apiUrl + route, {
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

    async postFile(route, body) {
        const token = JSON.parse(localStorage.getItem("token"));
        return fetch(this.apiUrl + route, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": "application/json; charset=UTF-8; multipart/form-data",
            },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            }).catch((err) => this.handleError(err));
    }

    async post(route, body) {
        const token = JSON.parse(localStorage.getItem("token"));
        return fetch(this.apiUrl + route, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            }).catch((err) => this.handleError(err));
    }

    async put(route, body) {
        const token = JSON.parse(localStorage.getItem("token"));
        this.get('user/' + this.currentUserId).then((user) => {
            body.isAdmin = user.isAdmin;
            body.userConnected = user.id;
            return fetch(this.apiUrl + route, {
                method: "PUT",
                body: JSON.stringify(body),
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-type": "application/json; charset=UTF-8",
                },
            }).then((res) => {
                if (res.ok) {
                    return res.json();
                }
            }).catch((err) => this.handleError(err));
        })
    }

    async delete(route) {
        const token = JSON.parse(localStorage.getItem("token"))
            return fetch(this.apiUrl + route, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-type": "application/json; charset=UTF-8",
                },
            }).then((res) => {
                if (res.ok) {
                    return res.json();
                }
            }).catch((err) => this.handleError(err));
    }

    
}

export default new HttpService()