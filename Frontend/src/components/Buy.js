import React, { useState } from 'react'
import { basicAxios } from "../api/customAxios"
import Success from "../components/Success"

const Buy = ({ stock }) => {
    const [quantity, setQuan] = useState("0")
    const [amount, setAmount] = useState("0")
    const [show, setShow] = useState(false)
    const [error, setError] = useState("")

    const bought = async (e) => {
        e.preventDefault()
        try {
            if (parseInt(quantity) <= 0) throw new Error("Quantity should be more than zero")
            await basicAxios.post("/trading/buy/", {
                jwt_token: localStorage.getItem("jwt_token"),
                stock_name: stock.stockname,
                stock_quantity: parseInt(quantity),
                stock_price: parseFloat(stock.price),
            })
            setShow(true)
        }
        catch (err) {
            setError(err?.message || "Error occured while searching")
        }
    }
    return (
        <form onSubmit={bought} noValidate>
            {error !== "" && <div className="mt-2 alert alert-warning" role="alert">
                {error}
            </div>}
            {show && <Success success_text={"Bought"} />}
            <div className="form-floating mb-3">
                <input type="text" value={stock.price} className="form-control" id="buy-price" placeholder="Price" readOnly={true} />
                <label forhtml="buy-price">Price</label>
            </div>
            <div className="form-floating mb-3">
                <input value={quantity} onChange={(e) => {
                    setQuan(e.target.value);
                    const am = (Math.round(100 * parseFloat(stock.price) * parseInt((e.target.value) || "0")) / 100).toString()
                    setAmount(am)
                }} type="text" className="form-control" id="buy-quantity" placeholder="Quantity" />
                <label forhtml="buy-quantity">Quantity</label>
            </div>
            <div className="form-floating mb-3">
                <input value={amount} readOnly={true} type="text" className="form-control" id="buy-invest-amount" placeholder="Investment Amount" />
                <label forhtml="buy-invest-amount">Investment Amount</label>
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="buy-question" placeholder="Why I bought this Stock?" />
                <label forhtml="buy-question">Why I bought this Stock?</label>
            </div>
            <div className="modal-footer border-0">
                <button className='btn buy-btn'>Buy</button>
            </div>
        </form>
    )
}

export default Buy