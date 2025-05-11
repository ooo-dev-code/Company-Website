// context/AuthContext.jsx


import { createContext, useReducer, useEffect, useState } from 'react';

export const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload };
        case 'LOGOUT':
            return { user: null };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
    });

    const [userLoaded, setUserLoaded] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            dispatch({ type: 'LOGIN', payload: user });
        }
        setUserLoaded(true);
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, dispatch, userLoaded }}>
            {children}
        </AuthContext.Provider>
    );

};