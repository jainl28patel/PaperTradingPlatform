import React, { useRef, useState } from 'react'
import "./signup.css"
import { basicAxios } from '../../api/customAxios'

const Signup = ({ login_modal }) => {
    const usernameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const cpasswordRef = useRef()
    const [error, setError] = useState("")

    const register = async (e) => {
        e.preventDefault()
        const password = passwordRef.current.value
        const cpassword = cpasswordRef.current.value
        const username = usernameRef.current.value
        const email = emailRef.current.value

        try {
            if (username === "" || email === "" || password === "" || cpassword === "")
                throw new Error("Fields can not be left empty")
            if (password !== cpassword)
                throw new Error("Password and Confirm Password should be same")

            await basicAxios.post("/accounts/register/", {
                username,
                password,
                email
            })
            login_modal(false)
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

            <form onSubmit={register} noValidate>
                <div className="form-floating mb-3">
                    <input ref={emailRef} type="email" className="form-control" id="signupEmail" placeholder="name@example.com" />
                    <label forhtml="signupEmail">Email address</label>
                </div>
                <div className="form-floating mb-3">
                    <input ref={usernameRef} type="text" className="form-control" id="signupUsername" placeholder="Username" />
                    <label forhtml="signupUsername">Username</label>
                </div>
                <div className="form-floating mb-3">
                    <input ref={passwordRef} type="password" className="form-control" id="signupPassword" placeholder="Password" />
                    <label forhtml="signupPassword">Password</label>
                </div>
                <div className="form-floating">
                    <input ref={cpasswordRef} type="password" className="form-control" id="signupCPassword" placeholder="Confirm Password" />
                    <label forhtml="signupCPassword">Confirm Password</label>
                </div>
                <div className="mt-3 d-flex justify-content-center">
                    <button className='btn btn-primary'>Signup</button>
                </div>
            </form>
        </>
    )
}

export default Signup