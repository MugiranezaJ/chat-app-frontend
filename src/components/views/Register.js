import React from 'react'
import '../../assets/css/login.css'
import { registerAction } from '../../redux/actions/registerAction';
import RegisterForm from '../RegisterForm';
import { connect } from 'react-redux';

function Register(props){  
    if(props.register.success){
        window.location.href = '/login';
    }
    const handleRegister = values => {
        props.onRegister(values)
        console.log(values);
    };
    console.log(props)
    return (
        
        <div className="container">
            <div className='login-box'>
                <div className='app-title'>MeChat</div>
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