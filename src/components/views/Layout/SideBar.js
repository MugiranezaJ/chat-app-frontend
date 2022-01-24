import React from 'react'

export function SideBar(props){

    let onlineUsers = Object.assign({ 'Me...': props.onlineUsers[props.getUser.username] }, props.onlineUsers)
    delete onlineUsers[props.getUser.username]

    const displayUsers = () => {
        if(props.onlineUsers != null) {
            return Object.keys(onlineUsers).map((user, index) => {
                const isActive = props.activeUser === user ? 'active' : ''
                return (
                    <div onClick={(e) => props.setActiveUser(e, user)}  className={'list-item ' + isActive} key={index}>
                        <img className='user-avatar' src={props.getUser.profile_picture} alt='username' />
                        {user}
                    </div>
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
            </div>
            <div className='users-list'>
                <p>online users</p>
                <hr/>
                {displayUsers()}
            </div>
        </div>
    )
}