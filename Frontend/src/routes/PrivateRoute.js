import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const PrivateRoute = ({ children }) => {

    const { auth, loading } = useAuth()

    return (
        <>{!loading && (auth ? children : <Navigate to={"/"} />)}</>
    )
}

export default PrivateRoute