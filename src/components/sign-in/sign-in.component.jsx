// In this version we are going to use the functional component with React hooks in the place of Class component.

import React, { useState } from 'react';
import './sign-in.styles.scss';

import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from  '../custom-button/custom-button.component';

// import {signInWithGoogle, auth} from '../../firebase/firebase.utils';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.action.js';



const SignIn = ({ emailSignInStart, googleSignInStart }) => {   // No more setState. Redux will handle the state from here on out with saga...........
    // As we were extracting the 'emailSignInStart' Action from this.props in class component, But here in functional component we have to pass the props {emailSignInStart} inside the argument.

    const [ userCredential, setCredential ] = useState({ email: '', password: ''})

    const { email, password } = userCredential;
    
    const handleSubmit = async event => {    // This handleSubmit() method is created for preventing the default event on submit. and this will erase the input field after submitting the form. 
        event.preventDefault();

        emailSignInStart( email, password );

    }
    
    
    const handleChange = event => {        // This handleChange() method is created because when there is a change happens in the input field it will track the data input and set to the ths.state.
        const { value, name } = event.target;
        
        setCredential ({ ...userCredential, [name]: value }) 
    }

    
    return(

        <div className='sign-in'>
            <h2>I already have an account</h2>
            <span>Sign in with your Email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput name='email' type='email' value={email} label='email' handleChange={handleChange} required />
                
                <FormInput name='password' type='password' value={password} label='password' handleChange={handleChange} required />
                
                <div className='button'>
                    <CustomButton type='submit' value='Submit Form'> Sign In </CustomButton>
                    <CustomButton type ='button' onClick={googleSignInStart} isGoogleSignIn > Sign In with Google </CustomButton>
                </div>
            </form>
        </div>
    )
    
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart:  (email, password) => dispatch(emailSignInStart({email, password}))
})

export default connect(null, mapDispatchToProps)( SignIn );