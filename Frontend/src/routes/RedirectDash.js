import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const RedirectDash = ({ children }) => {

    const { auth, loading } = useAuth()

    return (
        <>{!loading && (!auth ? children : <Navigate to={"/dashboard"} />)}</>
    )
}

export default RedirectDash