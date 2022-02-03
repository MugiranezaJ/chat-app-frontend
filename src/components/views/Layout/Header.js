import React from 'react'

export function Header(props){
    let profile_picture = null
    let name =  null
    let username = null
    let offline = 'https://i.pinimg.com/564x/4d/87/1e/4d871e64ba479c32fa50302aa0cb679e.jpg'
    try{
        profile_picture = props.users.profile_picture ? props.users.profile_picture : offline
        name = props.users.name ? props.users.name : null
        username = props.users.username ? props.users.username : null
    }catch(error){
        console.log(error)
    }
    return (
        <div className='header-container'>
                <div className='header-image'>
                    <img src={profile_picture || offline} alt=''/>
                </div>
                <div className='header-info'>
                    <p className='header-name'>{name || 'User offline'}</p>
                    <p className='header-username'>{username || ':/'}</p>
                </div>
        </div>
    )
}