import { useState } from "react"
import './modal.css'

const Modal = ({title, size, addOverflow, btnType, modalButtonName, className, setBidStatus, getBider, body, children}) => {

    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(true)
    
    const handleClose = () => setOpen(false)

    return(
        <div className='modal-container'>
            <button type="button" className={`btn btn-${btnType} ${className}`} onClick={() => {
                handleOpen()
                getBider && 
                getBider(body)
                setBidStatus &&
                setBidStatus(true)
                }}>{modalButtonName}</button>
        { open &&
            <div className='modal-background'>
                <div className={`modal-fade-container ${size}`}>
                    <div className='modal-title-contianer modal-header'>
                        <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
                        <button onClick={() => handleClose()} type="button" className="btn-close"></button>
                    </div>
                    <div className={addOverflow}>
                        <div className={`modal-body-contianer`}>
                            {children}
                        </div>
                    </div>
                    <div className='modal-footer-contianer modal-footer'>
                        <button onClick={() => handleClose()} type="button" className="btn btn-secondary close-btn">Close</button>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}

export default Modal