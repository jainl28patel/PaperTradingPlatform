import React from 'react'
import loader from "../assests/animations/loader.gif"

const Loader = () => {
    return (
        <div className='d-flex flex-column justify-content-center align-items-center' style={{ width: "100%", height: "100%" }}>
            <img src={loader} className="mb-2" style={{ height: "100px" }} alt="Loader" />
            <small>Loading the resources</small>
        </div>
    )
}

export default Loader