import React from 'react'
import '../../assets/css/login.css'
import { registerAction } from '../../redux/actions/registerAction';
import RegisterForm from '../RegisterForm';
import { connect } from 'react-redux';

function Register(props){  
    if(props.register.success){
        window.location.href = '/home';
    }
    const handleRegister = values => {
        props.onRegister(values)
        console.log(values);
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
                    Register
                </div>
                <RegisterForm onSubmit={handleRegister} />
                <div>
                    {props.register.error ? (
                        <span style={{color: 'red'}}>{props.register.error}</span>) : null
                    }
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
      onRegister: (values) => {
        dispatch(registerAction(values))
      }
    }
  }

const mapStateToProps = ({ register }) =>({
    register
});

export {Register};
export default connect(mapStateToProps, mapDispatchToProps )(Register);