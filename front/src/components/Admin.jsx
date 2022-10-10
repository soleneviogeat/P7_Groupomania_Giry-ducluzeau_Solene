import AdminPage from '../pages/Admin.page'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import userService from '../services/user.service'

function AdminTable({user}) {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        userService.getAllUser(user._id)
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

    let AdminOne = user.map((user) =>
    //faire une boucle dans le tableau 
    //<th> en-tête du tableau
    //<tr> à l'intérieur des cases
    //les données d'un utilisateur par ligne
    //au bout de la ligne, bouton "supprimer" et "modifier" pour chaque utilisateur
    
    <li>{user}</li>)

    return (
        <div>
                {loading && <div>Chargement de la publication...</div>}
                {error && (
                <div>{`There is a problem fetching the post data - ${error}`}</div>
                )}
                
                <ul>{AdminOne}</ul>
                
           </div>
  )
}


export default AdminTable