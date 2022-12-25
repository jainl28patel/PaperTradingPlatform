import React, { useState, useRef } from 'react'
import StockAnalysis from '../components/stockAnalysis.js/StockAnalysis'
import stock_window_img from "../assests/images/stock_window_img.svg"
import axios from 'axios'
import Loader from "../components/Loader"
import { profile_options, history_options } from '../constants/rapid_const'

const StockWindow = () => {
    const [error, setError] = useState("")
    const [show, setShow] = useState(true)
    const [stock, setStock] = useState({ prices: [] })
    const srchRef = useRef()

    const handleSearch = async (e) => {
        e.preventDefault()
        const srch = srchRef.current.value
        const options = { ...history_options, params: { ...history_options.params, symbol: srch } }
        const options1 = { ...profile_options, params: { ...profile_options.params, symbol: srch } }
        try {
            if (srch === "") throw new Error("Type Stock Name in search box and then hit enter")
            setError("")
            setStock({ prices: [] })
            setShow(false)
            const res = await axios.request(options)
            const res1 = await axios.request(options1)
            const stockname = res1.data.quoteType.symbol;
            const price = res1.data.price.regularMarketOpen.raw
            let change = parseFloat(price) - parseFloat(res1.data.price.regularMarketPreviousClose.raw)
            change = Math.round(change * 100) / 100;
            const prices = []
            for (let i = 1; i <= res.data.prices.length; i += 20) {
                prices.push(res.data.prices[i - 1].open)
            }
            const labels = []
            for (let i = 1; i <= res.data.prices.length; i += 20) {
                const myDate = new Date(res.data.prices[i - 1].date);
                const label = `${("0" + myDate.getHours()).slice(-2)}:${("0" + myDate.getMinutes()).slice(-2)} hrs`
                labels.push(label);
            }
            setStock({ prices: [...prices], labels: [...labels], stockname, price, change, actual_prices: res.data })
        }
        catch (err) {
            setError(err?.message || "Error occured while searching")
            setShow(true)
        }
    }
    return (
        <div className='stock-anlys m-4'>
            <form className="d-flex justify-content-center w-100" role="search">
                <input ref={srchRef} className="form-control w-50 srch-inp" type="search" placeholder="Search" aria-label="Search" />
                <button onClick={handleSearch} className="ms-1 fa-solid fa-magnifying-glass srch-btn p-2" type="submit"></button>
            </form>
            {error !== "" && <div className="mt-2 alert alert-warning" role="alert">
                {error}
            </div>}
            {show ? <img className='mt-1' style={{ width: "35%" }} alt="stock window" src={stock_window_img} /> :
                stock.prices.length === 0 ?
                    <div className='mt-5'>
                        <Loader />
                    </div>
                    : <StockAnalysis stock={stock} />}
        </div>
    )
}

export default StockWindow
