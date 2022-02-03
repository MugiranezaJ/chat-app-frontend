import React from 'react'
import { SideBar } from './Layout/SideBar'
import '../../assets/css/home.css'
import { getAllUsers } from '../../redux/actions/usersAction'
import { connect } from 'react-redux';
import { MessageBox } from '../MessageBox'
import { socket } from '../../services/socket'
import { MessageInput } from './Layout/MessageInput';

function Home(props){
    const [serverState, setServerState] = React.useState({message:'fetching'})  
    const [users, setUsers] = React.useState([])
    const [connected, setConnected] = React.useState('')
    const [activeUser, updateActiveUser] = React.useState(null)
    const [chats, setChats] = React.useState([])
    // const chatsRef = React.useRef()
    // chatsRef.current = chats

    console.log(props)
    React.useEffect(() => {
      props.onGetUsers();
      initSocket()
      regNewUser()
    },[props.userinfo.username]);

    React.useEffect(() => {
      socket.on('NEW_USER', (data) => {
        setChatObject(data.newUsers)
      })
    },[])

    const initSocket = () => {
        socket.on('connect', () => {
          console.log( 'Connected: ' + socket.id)
          setConnected(socket.id)
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
        
        // socket.on("NEW_USER", (data) => {
        //   console.log('New User')
        //   // setUsers( data.newUsers )
        // })
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
      updateActiveUser(user)
    }

    const setChatObject = (newUsers) => {
        let currentChats = [ ...chats]
        let previousChats = chats.map( chat => chat.name )
        Object.keys( newUsers ).map( async (newUser) => {
          if(!previousChats.includes( newUser )){
            currentChats.push({
                name: newUser,
                role: newUsers[newUser].role,
                messages: [],
                msgCount: 0,
            })
          }
          return null
      }) 
      setUsers( newUsers )
      setChats(currentChats)
    }
    
    
  const sendMessage = msg => {
      let receiver = users[ activeUser ]
      socket.emit( 'MESSAGE_SEND', { receiver, msg })
  }

    return (
        <div className='home-container'>
            <div className='sidebar'>
                <SideBar 
                  getUser={props.userinfo} 
                  onlineUsers={users} 
                  chats = {chats}
                  logout={logout} 
                  setActiveUser ={setActiveUser}
                  activeUser ={activeUser}
                />
            </div>
            <div className="chat-container">
                {/* {JSON.stringify(users)}
                {JSON.stringify(connected)}
                {JSON.stringify(serverState)} */}
                
                <MessageBox
                getUser={props.userinfo}
                activeUser={activeUser}
                chats={chats}
                setChats={setChats}
                users={users}
                socket={socket} />
                {activeUser ? 
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
      }
    }
  }

const mapStateToProps = ({ userinfo }) =>({
    userinfo
});

export {Home};
export default connect(mapStateToProps, mapDispatchToProps )(Home);
