import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { basicAxios } from '../../api/customAxios'
import "./bookmark.css"

const BookMark = () => {
    const [book, setBook] = useState([])
    useEffect(() => {
        const func = async () => {
            const res = await basicAxios.post("/trading/getbookmark/", {
                jwt_token: localStorage.getItem("jwt_token")
            })
            setBook(res.data)
        }
        func()
    }, [])
    return (
        <div className='bookmark-page d-flex flex-column justify-content-center align-items-center'>
            <h5 className='mt-4'>Bookmark Stocks</h5>
            {
                book.map((ele) => {
                    return <Link className='bookmark-item text-dark p-2 m-1 d-flex' key={ele.stock_name} to={`/bookmark/${ele.stock_name}`}>
                        <span className='flex-grow-1'>{ele.stock_name}</span>
                        <span>{`INR ${ele.stock_price}k`}</span>
                    </Link>
                })
            }</div>
    )
}

export default BookMark