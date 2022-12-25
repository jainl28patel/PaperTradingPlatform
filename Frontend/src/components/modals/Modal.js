import React from 'react'

const Modal = (props) => {
    return (
        <div className="modal fade" style={{ backgroundImage: "linear-gradient(180deg, #000000 0%, #321570 100%)" }} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">{props?.modal_title}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {props?.modal_body}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal