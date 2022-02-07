import React from 'react'
import { Header } from './views/Layout/Header'
import '../assets/css/chat-box.css'
import { getMessages } from '../redux/actions/messagesAction'
import { connect } from 'react-redux'
import { getPIoMessage, setMessageCount } from '../redux/actions/chatsAction'

function MessageBox(props){
    const messagesEndRef = React.useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    React.useEffect(()=>{
        props.socket.on('MESSAGE_SEND', props.onAddMessage)
    },[props.socket, props.onAddMessage])
    // check this when it act weird

    const { chats } = props.io_chats

    const ioChat = chats ? chats.filter(chat => chat.name === props.activeUser) : null

    const ioUser = props.users && ioChat[0] ? props.users[ioChat[0].name] : {}

    const ioMessages = ioChat[0] ? ioChat[0].messages.length : null
    React.useEffect(()=>{
        scrollToBottom()
    },[ioMessages])
    return (
        <div className='message-page'>
            { props.activeUser ? <Header users = {ioUser}/> : null }
            <div className='message-container'>
                {
                    ioChat[0]  ? 
                    ioChat[0].messages.map(((msg, index) => {
                        const leftOrRight = msg.sender === props.getUser.username
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
                                    textAlign: 'left',
                                    borderRadius: '10px',
                                    borderBottomLeftRadius: leftOrRight ? '10px' : '0px',
                                    borderBottomRightRadius: leftOrRight ? '0px' : '10px'
                                    }}
                                >
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

const mapDispatchToProps = (dispatch) => {
    return {
      onGetMessages: (sender, receiver) => {
        dispatch(getMessages(sender, receiver))
      },
      onAddMessage: ({channel, message, status}) => {
          dispatch(getPIoMessage({ channel, message, status }))
      },
      onResetMessageCount: (count, channel) => {
        dispatch(setMessageCount(count, channel))
      }
    }
  }

const mapStateToProps = ({ messages, io_messages, io_chats }) =>({
    messages,
    io_messages,
    io_chats
});

export {MessageBox};
export default connect(mapStateToProps, mapDispatchToProps )(MessageBox);