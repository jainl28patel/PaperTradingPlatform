import React from 'react'

const Success = ({ success_text }) => {
    return (
        <div className="alert alert-success mt-3" role="alert">
            <i className="fa-solid fa-check check-icon border border-success rounded-circle p-1 me-1"></i>
            {success_text}
        </div>
    )
}

export default Success