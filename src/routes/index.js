import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { createBrowserHistory } from 'history';
import Home from '../components/views/Home'
import Login from '../components/views/Login'
import Register from '../components/views/Register'
import PrivateRoute from './PrivateRoute'
const history = createBrowserHistory()
export default function appRoutes(){
    return (
        <BrowserRouter history={history}>
            <Routes>
                <Route exact path='/login' element={<Login/>}/>
                <Route exact path='/register' element={<Register/>} />
                {/* <ProtectedRoute exact path='/home' component={Home} /> */}
                <Route exact path='/home' element={<PrivateRoute/>}>
                    <Route exact path='/home' element={<Home/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
    
}