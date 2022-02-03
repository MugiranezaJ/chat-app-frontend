import React from 'react'
import { Link } from 'react-router-dom'

export function SideBar(props){

    let onlineUsers = Object.assign({ 'Me...': props.onlineUsers[props.getUser.username] }, props.onlineUsers)
    delete onlineUsers[props.getUser.username]

    const displayUsers = () => {
        if(props.onlineUsers != null) {
            return Object.keys(onlineUsers).map((user, index) => {
                const chat = props.chats  ? props.chats.filter(chat => chat.name == user) : null
                const isActive = props.activeUser === user ? 'active' : ''
                
                return (
                    onlineUsers[user] && props.getUser.role != onlineUsers[user].role
                        ?   (<div onClick={(e) => props.setActiveUser(e, user)}  className={'list-item ' + isActive} key={index}>
                                <img className='user-avatar' src={props.getUser.profile_picture} alt='username' />
                                {user}
                                {chat[0] && chat[0].msgCount > 0 && chat[0].name != props.activeUser && (
                                    <div style={{marginLeft:'auto', backgroundColor:'black', borderRadius:'10px', padding:'3px'}}>
                                        {chat[0].msgCount}
                                    </div>
                                )}
                            </div>)
                        : ('')
                )
            })
        }else{
            return 'Loading...'
        }
    }
    return (
        <div>
            <div className='user-box'>
                {/* <p>user info here</p> */}
                <p className='p-title'>Username</p>
                <p className='p-data'>{props.getUser.username}</p>
                <p className='p-title'>Names</p>
                <p className='p-data'>{props.getUser.name}</p>
                <p className='p-title'>Email</p>
                <p className='p-data'>{props.getUser.email}</p>
                <button className='out-button' onClick={props.logout}>Logout</button>
                {/* <Link 
                    role={'button'}
                    className='out-button'
                    onClick={props.logout}
                    to={'/login'}
                >Logout</Link> */}
            </div>
            <div className='users-list'>
                <p>{props.getUser.role == "ADMIN" ? 'Online users' : 'Online admins'}</p>
                <hr/>
                {displayUsers()}
            </div>
        </div>
    )
}