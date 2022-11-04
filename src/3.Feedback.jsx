import './3.feedback.css'
import { AiOutlineSend } from "react-icons/ai"
import { publicRequest } from './requestMethods';
import { useState } from 'react';

function Feedback({ setError, setMessage, setAlertType }) {

    const [feedback, setFeedback] = useState("")


    const handleSubmition = (e) => {
        e.preventDefault()

        const body = { feedback: feedback }
        publicRequest.post('/feedback/', body)
        .then(res => {
            res.data && setError(res.data.error)
            res.data  && setMessage(res.data.message)
            res.data  && setAlertType(res.data.alertType)
        })
    }

  return (
    <div className='feedback-container'>
        <form onSubmit={handleSubmition} >
            <input className='input' type="text" placeholder="What's the glitch...?" onChange={(e) => {setFeedback(e.target.value)}}/>
            <button type='submit'><AiOutlineSend /></button>
        </form>
    </div>
  );
}

export default Feedback;