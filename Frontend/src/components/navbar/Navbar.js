import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import "./navbar.css"
import dashboard_icon from "../../assests/images/dashboard_icon.png"
import stock_window_icon from "../../assests/images/stock_window_icon.png"
import transactions_icon from "../../assests/images/transactions_icon.png"
import edu_icon from "../../assests/images/edu_icon.svg"
import Logout from '../logout/Logout'

const Navbar = () => {
    const { auth, user } = useAuth()
    return (
        <>
            <nav className="navbar navbar-dark cnavbar">
                {auth ? <div className="d-flex w-100 align-items-center">
                    <div className='flex-grow-1 d-flex ms-3'>
                        <button className="navbar-toggler border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <h4 className='my-auto ms-2'><Link className='orgname' to={"/"}>Paper Trading</Link></h4>
                    </div>
                    <span className='me-3'>{user}
                        <i className="ms-3 fa-solid fa-user logout"></i></span>
                </div> :
                    <h4 className='my-auto ms-4'><Link className='orgname' to={"/"}>Paper Trading</Link></h4>
                }
            </nav>
            <div className="offcanvas offcanvas-start" style={{ backgroundColor: "#321570" }} tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel"><NavLink className={"orgname"} to={"/"}>Paper Trading</NavLink></h5>
                    <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body canvas-bg d-flex flex-column">
                    <div className="mt-3 flex-grow-1">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item d-flex align-items-center">
                                <img className='me-2' src={dashboard_icon} alt="dashboard" />
                                <NavLink className='w-50' to={"/dashboard"}>Dashboard</NavLink>
                            </li>
                            <li className="list-group-item d-flex align-items-center">
                                <img className='me-2' src={stock_window_icon} alt="stock window" />
                                <NavLink className='w-50' to={"/stockwindow"}>Stock Window</NavLink>
                            </li>
                            <li className="list-group-item d-flex align-items-center">
                                <img className='me-2' src={transactions_icon} alt="transactions_icon" />
                                <NavLink className='w-50' to={"/transactions"}>Transactions</NavLink></li>
                            <li className="list-group-item d-flex align-items-center">
                                <img className='me-2' src={edu_icon} alt="transactions_icon" />
                                <NavLink className="w-50" to={"/edusec"}>Educational</NavLink>
                            </li>
                            <li className="list-group-item d-flex align-items-center">
                                <i className="text-light border rounded-circle p-1 fa-solid fa-info me-2"></i>
                                <NavLink className="w-50" to={"/aboutus"}>About us</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div><Logout /></div>
                </div>
            </div>
        </>
    )
}

export default Navbar