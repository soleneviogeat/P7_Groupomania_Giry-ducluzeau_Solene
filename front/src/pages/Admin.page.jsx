import { useState, useEffect } from 'react'
import Header from '../components/Header';
import userService from '../services/user.service'

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

    function removeUser(id) {
        userService.deleteUser(id)
    }


    return (
        <div>
          <Header></Header>
            {loading && <div>Chargement de la page Administration...</div>}
            {error && (
              <div>{`Il y a un problème avec la récupération de la page - ${error}`}</div>
            )}
            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Email</th>
                        <th>Administrateur</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
              {userData &&
                userData.map(({ _id, lastname, firstname, email, password, isAdmin }) => (
                  <tr key={_id}>
                    <td>{lastname}</td>
                    <td>{firstname}</td>
                    <td>{email}</td>
                    <td>{isAdmin ? 'Oui' : 'Non'}</td>
                    <td>
                      <button onClick={() => removeUser(_id)}>Supprimer</button>
                    </td>
                  </tr>
                ))} 
                </tbody>
            </table>
        </div>
      )
}

export default AdminPage