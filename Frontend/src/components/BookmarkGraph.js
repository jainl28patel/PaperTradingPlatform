import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { history_options } from '../constants/rapid_const'
import axios from 'axios'
import Loader from "./Loader"
import StockAnalysis from './stockAnalysis.js/StockAnalysis'

const BookmarkGraph = () => {
    const [stock, setStock] = useState({ prices: [] })
    const { stockname } = useParams()
    useEffect(() => {
        const func = async () => {
            const options = { ...history_options, params: { ...history_options.params, symbol: stockname } }
            const res = await axios.request(options)
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

            setStock({ prices: prices, labels: labels, stockname: stockname, actual_prices: res.data })
        }
        func()
    }, [stockname])
    return (
        <div style={{ height: "100vh", width: "95%" }} className="mx-auto stock-anlys">
            {stock.prices.length === 0 ? < Loader /> : <StockAnalysis stock={stock} />}
        </div>
    )
}

export default BookmarkGraph