import React, { useEffect, useState } from 'react'
import "./stockAnalysis.css"
import stock_img from "../../assests/images/stock_img.png"
import Buy from "../Buy"
import Sell from "../Sell"
import Modal from "../modals/Modal"
import { Line } from 'react-chartjs-2';
import { basicAxios } from '../../api/customAxios'
import { profile_options } from '../../constants/rapid_const'
import axios from 'axios'

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

const graph_options = {
    scales: {
        y: {
            ticks: {
                callback: function (value, index, ticks) {
                    return 'USD ' + value;
                }
            },
            grid: {
                borderColor: "white",
                color: "rgb(255, 255, 255)",
                lineWidth: 0.1
            }
        },
        x: {
            grid: {
                borderColor: "white",
                color: "rgb(255, 255, 255)",
                lineWidth: 0.1
            }
        }
    },
    plugins: {
        legend: {
            position: "bottom"
        },
    },
    maintainAspectRatio: false
}

const StockAnalysis = ({ stock }) => {
    const [buy_modal, setBuy_modal] = useState(true)
    const [bookmarked, setBookmarked] = useState(false)
    const [change, setChange] = useState({ price: "0", change: "0" })
    const [sma, setSma] = useState([])

    const bookmark = async () => {
        await basicAxios.post("/trading/bookmark/", {
            jwt_token: localStorage.getItem("jwt_token"),
            stock_name: stock.stockname,
            stock_price: parseFloat(change.price)
        })
        setBookmarked(true)
    }

    useEffect(() => {
        const func = async () => {
            try {
                const options1 = { ...profile_options, params: { ...profile_options.params, symbol: stock.stockname } }
                const res1 = await axios.request(options1)
                const price = res1.data.price.regularMarketOpen.raw
                let del = parseFloat(price) - parseFloat(res1.data.price.regularMarketPreviousClose.raw)
                del = Math.round(del * 100) / 100;
                setChange({ price: price, change: del })
                const arr = stock.actual_prices.prices;

                let sma1 = []
                for (let j = 0; j < arr.length - 20; j += 20) {
                    let sum = 0
                    for (let i = j; i < j + 20; i++) sum += parseFloat((arr[i].open))
                    sma1.push((sum / 20))
                }
                sma1.push(arr[arr.length - 1].open)
                setSma(sma1)

                const res2 = await basicAxios.post("/trading/getbookmark/", {
                    jwt_token: localStorage.getItem("jwt_token")
                })
                for (let i = 0; i < res2.data.length; i++) if (res2.data[i].stock_name === stock.stockname) {
                    setBookmarked(true)
                    break
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        func()
    }, [stock.stockname, stock.actual_prices])

    return (
        <>
            {buy_modal ? <Modal modal_body={<Buy stock={{ ...stock, price: change.price }} />} modal_title={"Buy Stock"} /> :
                <Modal modal_body={<Sell stock={{ ...stock, price: change.price }} />} modal_title={"Sell Stock"} />}

            <>
                <div className='w-100 d-flex mt-1'>
                    <div className='flex-grow-1 my-auto d-flex'>
                        <img src={stock_img} className="stock-img my-auto" alt="stock-brand" />
                        <h4 className='ms-2 my-auto'>{stock.stockname}</h4>
                    </div>
                    <button onClick={() => setBuy_modal(true)} data-bs-toggle="modal" data-bs-target="#exampleModal" className='btn m-2 buy-btn'>Buy</button>
                    <button onClick={() => setBuy_modal(false)} data-bs-toggle="modal" data-bs-target="#exampleModal" className='btn m-2 sell-btn'>Sell</button>
                </div>

                <div className='w-100 d-flex align-items-center'>
                    <div className='flex-grow-1 my-auto d-flex flex-column'>
                        <h4 className='ms-2'>{`USD ${change.price} $`}</h4>
                        {change.change >= 0 ? <span className='ms-2 text-success'>{`+ USD ${change.change}K`}</span> :
                            <span className='ms-2 text-danger'>{`- USD ${-change.change}K`}</span>}
                    </div>
                    {bookmarked ? <button onClick={bookmark} disabled={true} className='btn my-auto btn-dark text-light m-2'>Bookmarked<i className="ms-1 fa-regular fa-bookmark"></i></button> : <button onClick={bookmark} className='btn my-auto btn-outline-dark m-2'>Bookmark<i className="ms-1 fa-regular fa-bookmark"></i></button>}
                </div>
                <div className='m-3 stock-graph p-5'>
                    {sma.length !== 0 && <Line data={{
                        labels: stock.labels,
                        datasets: [{
                            label: 'Price vs Time',
                            data: stock.prices,
                            ...opt[0]
                        }, {
                            label: 'SMA vs Time',
                            data: sma,
                            ...opt[2]
                        }]
                    }} options={graph_options} />}
                </div></>
        </>
    )
}

export default StockAnalysis