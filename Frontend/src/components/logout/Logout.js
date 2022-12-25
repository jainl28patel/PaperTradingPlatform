import React from 'react'
import { basicAxios } from '../../api/customAxios'
import logout_icon from "../../assests/images/logout_icon.png"

const Logout = () => {
    const signout = async () => {
        localStorage.setItem("jwt_token", "")
        await basicAxios.get("/accounts/logout/")
        window.location.reload()
    }

    return (
        <button onClick={signout} className='btn btn-outline-danger signout'><img className='me-2' src={logout_icon} alt="Logout" />Logout</button>
    )
}

export default Logout