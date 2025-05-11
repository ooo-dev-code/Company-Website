import React from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'
import "../style/navbar.css"

function Navbar() {

    const { user } = useAuthContext()
    const { logout } = useLogout()
    const handleClick = () => {
        logout()
    }

  return (
    <div>
        <nav className='navbar'>
            <h1 onClick={() => window.location.href = "/home"}>Home</h1>
            <ul>
                {user && (
                    <>
                        <li>
                            <button className='btn' onClick={handleClick}>Logout</button>
                        </li>
                        <li>
                            <a href="/commands">Commands</a>
                        </li>
                    </>
                )}
                {user && user.user.username == 'admin' && (
                    <li><a href="/addnews">News</a></li>
                )}
                {!user && (
                    <>
                        <li><a href="/login">Sign In</a></li>
                        <li><a href="/register">Sign Up</a></li>
                    </>
                )}
            </ul>
        </nav>
      
    </div>
  )
}

export default Navbar
