import React, { useEffect, useState } from 'react'
import { basicAxios } from '../api/customAxios'

const Transactions = () => {
    const [trans, setTrans] = useState([])
    useEffect(() => {
        const func = async () => {
            const res = await basicAxios.post("/trading/gettransaction/", {
                jwt_token: localStorage.getItem("jwt_token")
            })
            setTrans(res.data)
        }
        func()
    }, [])
    return (
        <div>
            <h6 className='ms-5 mt-3'>TRANSACTION HISTORY</h6>
            <table className="table table-striped table-borderless mx-auto mt-4" style={{ width: "90%" }}>
                <thead>
                    <tr>
                        <th scope="col">Stock</th>
                        <th scope="col">Bought/Sold</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Stock Price</th>
                        <th scope="col">Time</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {trans.map((stk) => {
                        return <tr key={stk.date_time}>
                            <td>{stk.stock_name}</td>
                            <td>{stk.buy_sell}</td>
                            <td>{stk.stock_quantity}</td>
                            <td>{stk.stock_price}</td>
                            <td>{stk.date_time}</td>
                            <td className='text-success'>Success</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Transactions