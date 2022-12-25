import React from 'react'
import loader from "../assests/animations/loader.gif"

const Loader = () => {
    return (
        <div style={{ height: "100vh", width: "100%" }} className='d-flex flex-column justify-content-center align-items-center'>
            <img src={loader} className="mb-3" style={{ height: "100px" }} alt="Loader" />
            <small>Loading the resources</small>
        </div>
    )
}

export default Loader