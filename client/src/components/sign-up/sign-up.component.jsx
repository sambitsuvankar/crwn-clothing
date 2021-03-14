// Here we have used the 'FunctionalComponent' with the react Hooks and 'useState'

import React, {useState} from 'react';

import FormInput from '../form-input/form-input.component';

import CustomButton from '../custom-button/custom-button.component';

import './sign-up.styles.scss'

// import { auth, createUserProfileDocument } from '../../firebase/firebase.utils.js';
import { connect } from 'react-redux';

import { signUpStart } from '../../redux/user/user.action'


const SignUp = ( {signUpStart} ) => {
    
    const [ userCredentials, setUserCredentials ] = useState({
                                                                displayName: '',
                                                                email: '',
                                                                password: '',
                                                                confirmPassword: '',
                                                            });
    const { displayName, email, password, confirmPassword } = userCredentials; //The values of the destructured variables we have got from the submission of <FormInput>
    

    const handleSubmit = async event => {
        event.preventDefault();

        if(password !== confirmPassword){
            alert("password don't match");
            return;
        };

        signUpStart( email, password, displayName )
    }

    const handleChange = event => {
        const { name, value } = event.target;

        setUserCredentials({...userCredentials, [name]: value})      // This will set the this.set properties on any changes in the input field.
    }


    return(
        <div className='sign-up'>
            <h2 className='title'>I do not have an account </h2>
            <span>Sign up with your Email and password</span>
            <form className='sign-up-form' onSubmit={handleSubmit}>

                <FormInput type='text' name='displayName' value ={displayName} onChange={handleChange} label='Display Name' required />
                <FormInput type='email' name='email' value ={email} onChange={handleChange} label='Email' required />    
                <FormInput type='password' name='password' value ={password} onChange={handleChange} label='Password' required />
                <FormInput type='password' name='confirmPassword' value ={confirmPassword} onChange={handleChange} label='Confirm Password' required />
                
                <CustomButton type='submit'>SIGN UP</CustomButton>
                
            </form>
        </div>
    )

}

const mapDispatchToProps = dispatch => ({
    signUpStart : (email,password,displayName) => dispatch(signUpStart({email,password,displayName}))
})

export default connect(null,mapDispatchToProps)( SignUp )