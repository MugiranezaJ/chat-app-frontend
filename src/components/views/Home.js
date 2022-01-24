import React from 'react'
import { SideBar } from './Layout/SideBar'
import '../../assets/css/home.css'
import { getAllUsers } from '../../redux/actions/usersAction'
import { connect } from 'react-redux';
import { MessageBox } from '../MessageBox'
import { socket } from '../../services/socket'

function Home(props){
    const [serverState, setServerState] = React.useState({message:'fetching'})  
    const [users, setUsers] = React.useState([])
    const [connected, setConnected] = React.useState('')
    const [activeUser, updateActiveUser] = React.useState(null)
    const [chats, setChats] = React.useState({})

    const initSocket = () => {
        socket.on('connect', () => {
          console.log( 'Connected: ' + socket.id)
          setConnected(socket.id)
          // regNewUser()
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
        props.userinfo.username 
        ? socket.emit('NEW_USER', {username: props.userinfo.username, socketId: socket.id || 'k'}) 
        : console.log('hello')
    }
    const logout = () => {
        socket.emit( 'LOGOUT' )
        setUsers({}) 
        localStorage.removeItem('mechat_access_token')
        window.location.href = '/login'
    }

    const setActiveUser = (e, user) => {
      updateActiveUser(user)
    }

    const setChatObject = (newUsers) => {
      let newChats = Object.assign({}, chats)
      let oldChats = Object.keys(chats).map( chat => chat.name )
      Object.keys( newUsers ).map( newUser => {
        if(!oldChats.includes( newUser )){
          newChats = Object.assign({[newUser]:{
              name: newUser,
              description: 'direct message',
              messages: [],
              isTyping: false,
              msgCount: 0,
              type: 'Private'
          }, ...newChats})
        }
        return null
    }) 
    setChats(newChats)
    }
    React.useEffect(() => {
      props.onGetUsers();
      initSocket()
      regNewUser()
    },[props.userinfo.username]);

    React.useEffect(() => {
      socket.on('NEW_USER', (data) => {
        setUsers( data.newUsers )
        setChatObject(data.newUsers)
      })
    },[])

    return (
        <div className='home-container'>
            <div className='sidebar'>
                <SideBar 
                  getUser={props.userinfo} 
                  onlineUsers={users} 
                  logout={logout} 
                  setActiveUser ={setActiveUser}
                  activeUser ={activeUser}
                />
            </div>
            <div className="chat-container">
                {JSON.stringify(users)}
                {JSON.stringify(connected)}
                {JSON.stringify(serverState)}
                <MessageBox
                  getUser={props.userinfo} 
                  activeUser = {activeUser}
                  chats = {chats}
                />
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
