import { useState, useEffect } from 'react'
import userService from '../services/user.service'
import Admin from '../components/Admin'

function AdminPage() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        userService.getAllUser()
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
    })


    return (
        <div>
            {loading && <div>Chargement de la page Administration...</div>}
            {error && (
              <div>{`Il y a un problème avec la récupération de la page - ${error}`}</div>
            )}
            <ul>
              {userData &&
                userData.map(({ _id, lastname, firstname, email, password, role }) => (
                  <li>
                    <Admin
                      userData={{ _id, lastname, firstname, email, password, role }}>
                    </Admin>
                  </li>
                ))}
            </ul>
        </div>
      )
}

export default AdminPage