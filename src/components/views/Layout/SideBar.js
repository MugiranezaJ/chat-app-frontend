import React from 'react'

export function SideBar(props){
    
    const { chats } = props.io_chats

    let onlineUsers = Object.assign({ 'Me...': props.onlineUsers[props.getUser.username] }, props.onlineUsers)
    delete onlineUsers[props.getUser.username]

    const displayUsers = () => {
        if(props.onlineUsers != null) {
            return Object.keys(onlineUsers).map((user, index) => {
                const ioChat = chats ? chats.filter(chat => chat.name === user) : null
                const isActive = props.activeUser === user ? 'active' : ''
                
                return (
                    onlineUsers[user] && props.getUser.role !== onlineUsers[user].role
                        ?   (<div onClick={(e) => props.setActiveUser(e, user)}  className={'list-item ' + isActive} key={index}>
                                <img className='user-avatar' src={props.getUser.profile_picture} alt='username' />
                                {user}
                                {ioChat[0] && ioChat[0].msgCount > 0 && ioChat[0].name !== props.activeUser && (
                                    <div style={{marginLeft:'auto', backgroundColor:'black', borderRadius:'10px', padding:'3px'}}>
                                        {ioChat[0].msgCount}
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
                <p className='p-title'>Username</p>
                <p className='p-data'>{props.getUser.username}</p>
                <p className='p-title'>Names</p>
                <p className='p-data'>{props.getUser.name}</p>
                <p className='p-title'>Email</p>
                <p className='p-data'>{props.getUser.email}</p>
                <button className='out-button' onClick={props.logout}>Logout</button>
            </div>
            <div className='users-list'>
                <p>{props.getUser.role === "ADMIN" ? 'Online users' : 'Online admins'}</p>
                <hr/>
                {displayUsers()}
            </div>
        </div>
    )
}