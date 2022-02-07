import React from 'react'
import { SideBar } from './Layout/SideBar'
import '../../assets/css/home.css'
import { getAllUsers } from '../../redux/actions/usersAction'
import { connect } from 'react-redux';
import MessageBox from '../MessageBox'
import { socket } from '../../services/socket'
import { MessageInput } from './Layout/MessageInput';
import { getIOChats, setActiveUser, setMessageCount } from '../../redux/actions/chatsAction';

function Home(props){
    const [serverState, setServerState] = React.useState({message:'fetching'})  
    const [users, setUsers] = React.useState([])
    const { active_user } = props.io_chats

    React.useEffect(() => {
      props.onGetUsers();
      initSocket()
      regNewUser()
    },[props.userinfo.username]);
    // [props.userinfo.username]

    const initSocket = () => {
        socket.on('connect', () => {
          console.log( 'Connected: ' + socket.id)
        })
        socket.on('disconnect',()=>setServerState('server disconnected'))
        socket.on('connect_error', ()=>{
          console.log("ERROR")
            setTimeout(()=>socket.connect(),3000)
        })
        socket.on('LOGOUT', (data) => {
          setUsers(data.newUsers)
        })
        socket.on('time', (data)=>setServerState(data))
        socket.on('NEW_USER', (data) => {
          setUsers(data.newUsers)
          props.onGetChats(data.newUsers)
        })
    }
    const regNewUser = () => {
        const {username, name, role, profile_picture} = props.userinfo
        props.userinfo.username 
        ? socket.emit('NEW_USER', {username, name, role, profile_picture, socketId: socket.id || 'k'}) 
        : console.log('hello')
    }
    const logout = () => {
        setUsers({}) 
        localStorage.removeItem('mechat_access_token')
        window.location.href = '/login'
    }

    const setActiveUser = (e, user) => {
      props.onSetActiveUser(user)
      props.onResetMessageCount(0, user)

    }
    
    
  const sendMessage = msg => {
      let receiver = users[ active_user ]
      let sender = props.userinfo;
      socket.emit( 'MESSAGE_SEND', { sender, receiver, msg })
  }

    return (
        <div className='home-container'>
            <div className='sidebar'>
                <SideBar 
                  getUser={props.userinfo} 
                  onlineUsers={users} 
                  io_chats={props.io_chats}
                  logout={logout} 
                  setActiveUser ={setActiveUser}
                  activeUser ={active_user}
                />
            </div>
            <div className="chat-container">
                {/*{JSON.stringify(serverState)} */}
                
                <MessageBox
                getUser={props.userinfo}
                activeUser={active_user}
                users={users}
                socket={socket} />
                {active_user ? 
                (<MessageInput
                  sendMessage={sendMessage} 
                />)
                : null}
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
      onGetUsers: () => {
        dispatch(getAllUsers())
      },
      onGetChats: (newUsers) => {
        dispatch(getIOChats(newUsers))
      },
      onSetActiveUser: (user) => {
        dispatch(setActiveUser(user))
      },
      onResetMessageCount: (count, channel) => {
        dispatch(setMessageCount(count, channel))
      }
    }
  }

const mapStateToProps = ({ userinfo, io_chats}) =>({
    userinfo,
    io_chats,
});

export {Home};
export default connect(mapStateToProps, mapDispatchToProps )(Home);
