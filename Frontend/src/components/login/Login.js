import React, { useRef, useState } from 'react'
import "./login.css"
import { basicAxios } from '../../api/customAxios'

const Login = () => {
    const usernameRef = useRef()
    const passwordRef = useRef()
    const [error, setError] = useState("")

    const signin = async (e) => {
        e.preventDefault()
        const password = passwordRef.current.value
        const username = usernameRef.current.value

        try {
            if (username === "" || password === "")
                throw new Error("Fields can not be left empty")
            const res = await basicAxios.post("/accounts/login/", {
                username: usernameRef.current.value,
                password: passwordRef.current.value,
            })
            localStorage.setItem('jwt_token', res.data.jwt_token)
            window.location.reload()
        }
        catch (err) {
            setError(err?.message || "Signup failed")
        }
    }
    return (
        <>
            {error !== "" && <div className="alert alert-warning" role="alert">
                {error}
            </div>}
            <form onSubmit={signin} noValidate>
                <div className="form-floating mb-3">
                    <input ref={usernameRef} type="text" className="form-control" id="loginUsername" placeholder="Username" />
                    <label forhtml="loginUsername">Username</label>
                </div>
                <div className="form-floating">
                    <input ref={passwordRef} type="password" className="form-control" id="signupPassword" placeholder="Password" />
                    <label forhtml="signupPassword">Password</label>
                </div>
                <div className="mt-3 d-flex justify-content-center">
                    <button className='btn btn-primary'>Login</button>
                </div>
            </form>
        </>
    )
}

export default Login