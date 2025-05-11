import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSignup } from '../hooks/useSignup';

function Register() {
    
    const [users, setUsers] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { signup, isLoading, error } = useSignup()

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
        e.preventDefault();

        await signup(username, password);
        console.log("Signup submitted");

    }

    return (
        <div className='login-container'>
            <h1>register</h1>
            <form onSubmit={handleSubmit}>

                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" value={username} onChange={(e) => {setUsername(e.target.value)}} required />
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={password} onChange={(e) => {setPassword(e.target.value)}} required />
                </div>

                <button type="submit" disabled={isLoading}>Register</button>
                {isLoading && <p>Loading...</p>}
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    )
}

export default Register