import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/home/Home'
import Dashboard from "../pages/dashboard/Dashboard"
import Transactions from '../pages/Transactions'
import StockWindow from '../pages/StockWindow'
import Aboutus from '../pages/Aboutus'
import PrivateRoute from "./PrivateRoute"
import RedirectDash from './RedirectDash'
import BookMark from '../pages/bookmark/BookMark'
import BookmarkGraph from '../components/BookmarkGraph'
import EduSec from '../pages/edu/EduSec'

const BasicRoutes = () => {

    return (
        <Routes>
            <Route path='/' element={<RedirectDash><Home /></RedirectDash>} />
            <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path='/stockwindow' element={<PrivateRoute><StockWindow /></PrivateRoute>} />
            <Route path='/transactions' element={<PrivateRoute><Transactions /></PrivateRoute>} />
            <Route path='/bookmark' element={<PrivateRoute><BookMark /></PrivateRoute>} />
            <Route path='/bookmark/:stockname' element={<PrivateRoute><BookmarkGraph /></PrivateRoute>} />
            <Route path='/edusec' element={<EduSec />} />
            <Route path='/aboutus' element={<Aboutus />} />
        </Routes>
    )
}

export default BasicRoutes