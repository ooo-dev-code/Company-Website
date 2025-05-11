import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLogin } from '../hooks/useLogin';

function Login() {
    
    const [users, setUsers] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading } = useLogin()

    useEffect(() => {
        axios.get('/users')
             .then(response => {
                setUsers(response.data);
             })
             .catch(error => {
                console.error('Error fetching data:', error);
             });
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(username, password)
    }

    return (

        <div className='login-container'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>

                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" value={username} onChange={(e) => {setUsername(e.target.value)}} required />
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={password} onChange={(e) => {setPassword(e.target.value)}} required />
                </div>

                <button type="submit" disabled={isLoading}>Login</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    )
}

export default Login
