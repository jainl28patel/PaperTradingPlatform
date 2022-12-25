import React, { useEffect, useState } from 'react'
import "./dashboard.css"
import { basicAxios } from "../../api/customAxios"
import MyPie from './MyPie'
import MyBar from './MyBar'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { profile_options, history_options } from '../../constants/rapid_const'
const obj = {
    animationName: "anime-bg", animationDuration: "2s", animationIterationCount: "infinite",
}

const opt = [{
    backgroundColor: "#F9A785",
    borderColor: "#F9A785",
    fill: {
        target: 'origin',
        above: 'rgb(249, 167, 133,0.5)'
    }
}, {
    backgroundColor: "#C0C0C0",
    borderColor: "#C0C0C0",
    fill: {
        target: 'origin',
        above: 'rgb(192, 192, 192,0.5)'
    }
}, {
    backgroundColor: "#98FB98",
    borderColor: "#98FB98",
    fill: {
        target: 'origin',
        above: 'rgb(152, 251, 152,0.5)'
    }
}]

const Dashboard = () => {
    const [balance, setBalance] = useState("")
    const [bookarr, setBookarr] = useState([])
    const [pieData, setPieData] = useState()
    const [loading, setLoading] = useState(true)
    const [change, setChange] = useState(0)
    const [lineData, setLineData] = useState()

    useEffect(() => {
        const func = async () => {
            try {
                const res1 = await basicAxios.post("/trading/getbalance/", {
                    jwt_token: localStorage.getItem("jwt_token")
                })
                setBalance(res1.data.balance)

                const res2 = await basicAxios.post("/trading/getbookmark/", {
                    jwt_token: localStorage.getItem("jwt_token")
                })
                const arr1 = res2.data.filter((ele, i) => {
                    if (i < 3) return true
                    return false
                })
                setBookarr(arr1)

                const res4 = await basicAxios.post("/trading/getstock/", {
                    jwt_token: localStorage.getItem("jwt_token")
                })

                const arr = res4.data.map((ele) => { return ele.stock_quantity })
                const arr2 = res4.data.map((ele) => { return ele.stock_name })


                const prices_arr = []
                const labels_arr = []

                for (let i = 0; i < arr1.length; i++) {
                    const options = { ...history_options, params: { ...history_options.params, symbol: arr1[i].stock_name } }
                    const res = await axios.request(options)
                    const prices = []
                    for (let i = 1; i <= res.data.prices.length; i += 20) {
                        prices.push(res.data.prices[i - 1].open)
                    }
                    prices_arr.push(prices)

                    const labels = []
                    for (let i = 1; i <= res.data.prices.length; i += 20) {
                        const myDate = new Date(res.data.prices[i - 1].date);
                        const label = `${("0" + myDate.getHours()).slice(-2)}:${("0" + myDate.getMinutes()).slice(-2)} hrs`
                        labels.push(label);
                    }
                    labels_arr.push(labels)
                }
                const data_arr = []
                for (let i = 0; i < prices_arr.length; i++) {
                    data_arr.push({
                        label: arr1[i].stock_name,
                        data: prices_arr[i],
                        ...opt[i]
                    })
                }

                setLineData({ data: data_arr, labels: labels_arr[0] })
                setPieData({ data: arr, labels: arr2 })

                let prev_wealth = res1.data.balance, current_wealth = 0;
                for (let i = 0; i < res4.data.length; i++) {
                    const options = { ...profile_options, params: { ...profile_options.params, symbol: res4.data[i].stock_name } }
                    const response = await axios.request(options)
                    current_wealth += (parseFloat(response.data.price.regularMarketOpen.raw) * (parseInt(res4.data[i].stock_quantity)))
                }
                let del = prev_wealth + current_wealth - 100000
                del = Math.round(del * 100) / 100;
                setChange(del)
                setLoading(false)
            }
            catch (err) {

            }
        }
        func()
    }, [])
    return (
        <div className='dashbrd-container'>
            <div className='box-1 mx-auto p-4' style={loading ? obj : {}}>
                {!loading && <MyBar lineData={lineData} />}
            </div>

            <div className='box-2 mt-1'>

                <div className='wid-50 hei-100'>

                    <div className='d-flex justify-content-center wid-100 info-div'>
                        <div className=' m-3 change d-flex flex-column justify-content-center align-items-center' style={loading ? obj : {}}>
                            <b>Net Profit/Loss</b>
                            {change >= 0 ? <span className='text-success'>{`+ INR ${change}k`}</span> :
                                <span className='text-danger'>{`- INR ${-change}k`}</span>}
                        </div>
                        <div className='wid-50 mt-3 mb-3 d-flex flex-column justify-content-center align-items-center available-fund' style={loading ? obj : {}}>
                            <b>Available Funds</b>
                            <span>{`INR ${balance}k`}</span>
                        </div>
                    </div>

                    <Link to="/bookmark"><div className='bookmark-cont mx-auto d-flex flex-column align-items-center' style={loading ? obj : {}}>
                        <b className='mt-2'>Bookmark Stocks</b>
                        <div className="wid-100 mt-2 d-flex flex-column justify-content-center align-items-center">
                            {bookarr.map((stk) => {
                                return <div key={stk.stock_name} className='p-2 m-1 bookmark-item d-flex'>
                                    <span className='flex-grow-1'>{stk.stock_name}</span>
                                    <span>{`INR ${stk.stock_price}k`}</span>
                                </div>
                            })}
                        </div>
                    </div></Link>
                </div>

                <div className='hei-100 stock-dist-cont mt-2 d-flex flex-column align-items-center' style={loading ? obj : {}}>
                    <b className='mt-3 mb-3'>Stocks Distribution</b>
                    <div className='wid-100 pie-div d-flex'>
                        {!loading && <MyPie pieData={pieData} />}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Dashboard