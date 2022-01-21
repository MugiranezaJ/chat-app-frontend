import React from 'react'
import { connect } from 'react-redux';
import '../../assets/css/login.css'
import '../../assets/css/fields.css'
import { loginAction } from '../../redux/actions/loginAction';
import SignInForm from '../LoginForm'

function Login(props){  
    const token = localStorage.getItem('mechat_access_token');
    if(token){
        window.location.href = '/home'
    }
    
    if(props.login.success){
        window.location.href = '/home';
    }


    const handleLogin = values => {
        props.onLogin(values)
    };
    console.log(props)
    return (
        
        <div className="container">
<<<<<<< HEAD
            
            <div className='login-box'>
                <div className='app-title'>MeChat</div>
=======
            <div style={{margin: '0 auto', fontSize: '23px'}}>MeChat</div>
            <div className='login-box'>
>>>>>>> da585dfa749d31b236cd6b129e2ca5d8e8f6675f
                <div style={{fontSize: 20}}>
                    Login
                </div>
                <SignInForm onSubmit={handleLogin}/>
                <div>
                    {props.login.error ? (
                        <span style={{color: 'red'}}>{props.login.error}</span>) : 
                        <span style={{color: 'green'}}>{token ? "Redirectig...": null}</span>
                    }
                </div>
            </div>
        </div>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
      onLogin: (values) => {
        dispatch(loginAction(values))
      }
    }
  }

const mapStateToProps = ({ login }) =>({
    login
});

export {Login};
export default connect(mapStateToProps, mapDispatchToProps )(Login);