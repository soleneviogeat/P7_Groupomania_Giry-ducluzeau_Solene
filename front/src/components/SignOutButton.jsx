import React from 'react'
import ReactDOM from 'react-dom/client'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { StyledLink } from '../utils/Atoms'
import LightLogo from '../assets/light-logo.png'
import DarkLogo from '../assets/dark-logo.png'
import { useTheme } from '../utils/hooks'
import userService from '../services/user.service';


//Au moment du clic sur le bouton "déconnexion", l'utilisateur connecté doit être 
//effacé du LS. Dans ce cas, un bouton "Connexion" doit apparître à la place du 
//bouton "Déconnexion"

function SignOutButton(userId) {

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { theme } = useTheme()
    const currentUserId = JSON.parse(localStorage.getItem('currentUserId'));

    const logoutUser = (childData) => {
        window.location.reload();
      }

    useEffect(() => {
        userService.getOneUser(currentUserId)
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
    }, []);

    
    function Logout(props) {

        userService.getOneUser(currentUserId)
        .then((res)=>console.log('good', res))
        .catch((err)=>console.log('bad', err));

        localStorage.removeItem('token', 'currentUserId');
        localStorage.clear();
        //window.location.reload();
        }
    
    function LogoutButton(props) {
        return (
        <StyledLink onClick={Logout} $theme={theme} to="/" >
        Déconnexion
        </StyledLink>
        );
    }

    return (
        <div>
            { currentUserId ?
            <LogoutButton />
            : null
            }            
        </div>
    );
}

export default SignOutButton



