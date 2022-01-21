import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom'
import renderField from './Fields';
let SignInForm = props => {
    const { handleSubmit } = props;
    // const handleLogin = values => {
        
    //     console.log(values);
    // };
    // console.log(props)
    return (
        <form onSubmit={handleSubmit} className="form">
            <Field name="email" component={renderField} type="email" label="Email Address"/>
            <Field name="password" component={renderField} type="password" label="Password"/>
            <div className='text-center'>
              Don't have an account? <Link to={'/register'}>Register</Link>
            </div>
            <div className="field">
                <div className="control">
                <button className="button is-link">Submit</button>
                </div>
            </div>
        </form>
    )
  };
  
  const validate = val => {
    const errors = {};
    // if (!val.names) {
    //   console.log('Names is required');
    //   errors.names = 'Required';
    // }
    if (!val.email) {
      console.log('email is required');
      errors.email = 'Required';
    } else if (!/^.+@.+$/i.test(val.email)) {
      console.log('email is invalid');
      errors.email = 'Invalid email address';
    }
    // if (!val.username) {
    //     console.log("Username is required")
    //   errors.username = 'Required'
    // } 
    if (!val.password) {
        console.log("Password is required")
      errors.password = 'Required'
    } 
    return errors;
  };
  
SignInForm = reduxForm({
    form: 'loginForm',
    validate,
})(SignInForm);

export default SignInForm