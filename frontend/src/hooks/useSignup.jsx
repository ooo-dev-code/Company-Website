import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import axios from 'axios';

export const useSignup = () => {
    
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = async (username, password) => {
        setIsLoading(true);
        setError(null);
    
        try {
            const response = await axios.post('http://localhost:5000/user/register', {
                username,
                password
            });
    
            const json = response.data;
    
            // Save the user to local storage
            localStorage.setItem('user', JSON.stringify(json));
    
            // Update the auth context
            dispatch({ type: 'LOGIN', payload: json });
    
            setIsLoading(false);
            window.location = '/home';
    
        } catch (err) {
            setIsLoading(false);
            setError(err.response?.data?.error || 'Signup failed');
            console.error(err);
        }
    };    

    return { signup, isLoading, error };
}