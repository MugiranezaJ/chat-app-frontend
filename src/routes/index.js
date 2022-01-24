import react from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from '../components/views/Home'
import Login from '../components/views/Login'
import Register from '../components/views/Register'

export default function appRoutes(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/home' element={<Home/>} />
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>} />
            </Routes>
        </BrowserRouter>
    )
    
}