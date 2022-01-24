import React from 'react'

export function MessageBox(props){
    // console.log(props)
    return (
        <div>
            <p>Message shows up here!</p>
            <div>{props.activeUser}</div>
            <br/>
            <div>{JSON.stringify(props.chats[props.activeUser])}</div>
        </div>
    )
}