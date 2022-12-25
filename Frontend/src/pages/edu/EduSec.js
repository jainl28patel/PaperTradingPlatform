import React from 'react'
import "./edu.css"
import { arr } from "../../constants/educonstants"

const EduSec = () => {
    return (
        <div className='row row-cols-3 mt-5'>
            {arr.map((ele) => {
                return <div className='card-cont'>
                    <a href={ele.card_link} className="mx-auto col c-card card text-light">
                        <div className="card-body">
                            <h5 className='text-center mt-3'>{ele.card_title}</h5>
                            <p className='text-center'>{ele.card_body}</p>
                        </div>
                    </a></div>
            })}
        </div>
    )
}

export default EduSec