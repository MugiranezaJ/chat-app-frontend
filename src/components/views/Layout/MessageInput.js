import React from 'react'
import sendIcon from '../../../assets/icons/send-button.png'

export function MessageInput(props){
    const [message, setMessage] = React.useState('')

    const handleChange = e => setMessage(e.target.value)
    const auto_grow = element => {
        element.target.style.height = "5px";
        element.target.style.height = (element.target.scrollHeight)+"px";
    }
    return(
        <div className='message-input-box'>
            <form 
                onSubmit={(e) => {
                    e.preventDefault()
                    e.target.reset()
                    props.sendMessage(message)
                }}>
                <textarea className='message-input' name='msg' placeholder='type message' onInput={(e) => auto_grow(e)} onChange={handleChange}></textarea>
                <button type='submit' className='message-input-button'><img src={sendIcon} className='icon' alt='Send'/></button>
            </form>
        </div>
    )
}