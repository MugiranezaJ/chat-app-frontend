import React from 'react'
import {io} from 'socket.io-client'

export function Home(){
    const [time, setTime] = React.useState('fetching')  
    React.useEffect(()=>{
        const socket = io('http://localhost:4200')
        socket.on('connect', ()=>console.log(socket.id))
        socket.on('connect_error', ()=>{
            setTimeout(()=>socket.connect(),4200)
        })
        socket.on('time', (data)=>setTime(data))
        socket.on('disconnect',()=>setTime('server disconnected'))
    },[])
    return (
        <div>
            <div>Home view</div>
            <div className="App">
                {time}
            </div>
        </div>
    )
}