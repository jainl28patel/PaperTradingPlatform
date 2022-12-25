import React, { useState } from 'react'
import "./home.css"
import home_img from "../../assests/images/home_img.svg"
import Modal from '../../components/modals/Modal'
import Signup from "../../components/signup/Signup"
import Login from "../../components/login/Login"

const Home = () => {
    const [signup_modal, setSignup_modal] = useState(true)

    return (
        <>
            {signup_modal ? <Modal modal_body={<Signup login_modal={setSignup_modal} />} modal_title={"Register"} /> :
                <Modal modal_body={<Login />} modal_title={"Login"} />}
            <div className='home-container'>
                <div className='box box-1'>
                    <div className="card c-card">
                        <div className="card-body">
                            <h5 className="card-title">Paper Trading</h5>
                            <p className="card-text">Welcome to paper trading platform.
                                Login or signup to continue.</p>
                            <button onClick={() => setSignup_modal(true)} className="btn c-btn me-3" data-bs-toggle="modal" data-bs-target="#exampleModal">Signup</button>
                            <button onClick={() => setSignup_modal(false)} className="btn c-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">Login</button>
                        </div>
                    </div>
                </div>
                <div className='box box-2'>
                    <img src={home_img} className="promotion-img" alt='promotion-img' />
                </div>
            </div>
        </>
    )
}

export default Home