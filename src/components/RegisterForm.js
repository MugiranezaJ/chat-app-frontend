import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom'
import renderField from './Fields';
let RegisterForm = props => {
    const { handleSubmit } = props;
    return (
        <form onSubmit={handleSubmit} className="form">
            <Field name="name" component={renderField} type="text" label="Your Names"/>
            <Field name="username" component={renderField} type="text" label="Username"/>
            <Field name="email" component={renderField} type="email" label="Email Address"/>
            <Field name="password" component={renderField} type="password" label="Password"/>
            <div className='text-center'>
              Already have an account? <Link to={'/login'}>Login</Link>
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
    if (!val.name) {
      console.log('Name is required');
      errors.name = 'Required';
    }
    if (!val.email) {
      console.log('email is required');
      errors.email = 'Required';
    } else if (!/^.+@.+$/i.test(val.email)) {
      console.log('email is invalid');
      errors.email = 'Invalid email address';
    }
    if (!val.username) {
        console.log("Username is required")
      errors.username = 'Required'
    } 
    if (!val.password) {
        console.log("Password is required")
      errors.password = 'Required'
    } 
    return errors;
  };
  
RegisterForm = reduxForm({
    form: 'register',
    validate,
})(RegisterForm);

export default RegisterForm