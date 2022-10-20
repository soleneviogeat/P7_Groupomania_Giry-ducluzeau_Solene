import React from 'react'
import { useState, useEffect } from 'react'
import { StyledLink } from '../utils/Atoms'
import { useTheme } from '../utils/hooks'
import userService from '../services/user.service';


function SignOutButton(userId) {

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { theme } = useTheme()
    const currentUserId = JSON.parse(localStorage.getItem('currentUserId'));


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

        localStorage.removeItem('token', 'currentUserId');
        localStorage.clear();
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



