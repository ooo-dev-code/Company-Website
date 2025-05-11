import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

import Login from '../pages/Login'
import Register from '../pages/Register'

import Home from '../pages/Home'
import News from '../pages/News'
import Commands from '../pages/Commands'
import Read from '../pages/Read'

function Router() {

    const { user, userLoaded } = useAuthContext();

    if (!userLoaded) {
        return <div>Loading...</div>; // or a spinner
    }

    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/home" element={user ? <Home /> : <Navigate to="/" />} />
                <Route path="/addnews" element={user && user.user?.username === "admin" ? <News /> : <Navigate to="/" />} />
                <Route path="/news/:id" element={user ? <Read /> : <Navigate to="/" />} />


                <Route path="/commands" element={user ? <Commands /> : <Navigate to="/" />} />

            </Routes>
        </BrowserRouter>
    )
}

export default Router
