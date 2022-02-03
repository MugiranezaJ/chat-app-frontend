import React from 'react'
import { Header } from './views/Layout/Header'
import '../assets/css/chat-box.css'

export function MessageBox(props){
    const messagesEndRef = React.useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    React.useEffect(()=>{
        props.socket.on('MESSAGE_SEND', addMessage )
    },[props.chats])
    

    const addMessage = ({ channel, message, status }) => {
        props.chats.map( chat => {
          if( chat.name === channel ) {
            chat.messages.push(message)
            if( props.activeUser !== channel ) {
                chat.msgCount ++
            }
          }
          return null
        })
        // props.setChats(props.chats)
    }
    
    const chat = props.chats  ? props.chats.filter(chat => chat.name == props.activeUser) : null
    if(chat[0]) chat[0].msgCount = 0 
    const user = props.users && chat[0] ? props.users[chat[0].name] : {}
    const messages = chat[0] ? chat[0].messages.length : null
    React.useEffect(()=>{
        scrollToBottom()
    },[messages])
    return (
        <div className='message-page'>
            { props.activeUser ? <Header users = {user}/> : null }
            <div className='message-container'>
                {
                    chat[0]  ? 
                    chat[0].messages.map(((msg, index) => {
                        const leftOrRight = msg.sender == props.getUser.username
                        const msgTime = new Date(msg.time)
                        return (
                        <div key={index} 
                            style={{
                                width: '95%',
                                overflow: 'auto'
                            }}
                            >
                                <div
                                    className='message'
                                    style={{
                                    float: leftOrRight ? 'right' : 'left', 
                                    // textAlign: leftOrRight? 'right' : 'left', 
                                    textAlign: 'left',
                                    borderRadius: '10px',
                                    borderBottomLeftRadius: leftOrRight ? '10px' : '0px',
                                    borderBottomRightRadius: leftOrRight ? '0px' : '10px'
                                    }}
                                >
                                    {/* sender: {msg.sender} */}
                                    <p>{msg.message}</p>
                                    <p style={{textAlign: 'right', opacity: 0.5}}>{msgTime.getHours() + ':' + msgTime.getMinutes()}</p>
                                    </div>
                        </div>
                        ) 
                    }))
                    : 'Choose a chat to start'
                }
            </div>
            <div ref={messagesEndRef} />
        </div>
    )
}