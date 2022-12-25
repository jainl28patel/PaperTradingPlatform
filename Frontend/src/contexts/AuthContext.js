import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { basicAxios } from '../api/customAxios'
import { authReducer } from '../reducers/authReducer'
import { authConstant } from "../constants/authConstant"
import AuthLoader from '../components/AuthLoader'

const AuthContext = createContext()
const useAuth = () => {
    return useContext(AuthContext)
}

const initialState = {
    user: null,
    auth: false,
    loading: true,
    msignup: false,
    mlogin: false,
    mlogout: false,
    mbuy: false,
    msell: false
}

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState)

    const fetchUserDetails = async () => {
        try {
            if (localStorage.getItem("jwt_token")) {
                const response = await basicAxios.post("/trading/getbalance/", {
                    jwt_token: localStorage.getItem("jwt_token")
                })
                const user = response.data.username
                dispatch({ type: authConstant.USER, payload: { user: user } })
                dispatch({ type: authConstant.AUTH, payload: { auth: true } })
            }
        }
        catch {
            dispatch({ type: authConstant.AUTH, payload: { auth: false } })
        }
    }

    useEffect(() => {
        const func = async () => {
            await fetchUserDetails();
            dispatch({ type: authConstant.LOADING, payload: { loading: false } })
        }
        if (state.loading) func()
    }, [state.loading])

    const value = { ...state, dispatch }

    return (
        <AuthContext.Provider value={value}>
            {state.loading ? <AuthLoader /> : children}
        </AuthContext.Provider>)
}

export { useAuth, AuthProvider }