import React from 'react'
import about_img from "../assests/images/about_img.png"

const Aboutus = () => {
    return (
        <div className='about-div d-flex flex-column'>
            <div className='upper-div d-flex align-items-center'>
                <img src={about_img} alt="about" className="about-img rounded-circle p-2 ms-5 me-5" />
                <div className='about-content p-5'>
                    <h5>About us</h5>
                    <p>We are a team of 4 CSE undergraduate students studying in IIT Roorkee. We love to explore various fields in the world of technology, learning new things at each step. We aim to contribute to the society by the implementation of our acquired skills and experience. We are interested in open source contribution and making the existing softwares even better.</p>
                </div>
            </div>
            <div className='about-footer d-flex flex-column align-items-center'>
                <h6 className="text-uppercase fw-bold">Contact</h6>
                <p><i className="fas fa-home mr-3"></i> Roorkee , Uttarakhand, India</p>
                <p><i className="fas fa-phone mr-3"></i> + 789 790 9087</p>
            </div>
        </div>
    )
}

export default Aboutus